<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\CustomerToken;
use App\Models\Order;
use App\Models\SmsLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CustomerIdentityService
{
    public const COOKIE_NAME = 'kds_customer_token';

    private const COOKIE_MINUTES = 2628000; // Five years.

    private const TOKEN_PATTERN = '/^[A-Za-z0-9_-]{20,120}$/';

    public function __construct(
        private SmsEthiopiaService $smsService,
    ) {}

    /**
     * Resolve a stable customer token from form payload, then cookie, then generate.
     */
    public function resolveClientToken(Request $request): string
    {
        return $this->sanitizeToken($request->input('customer_token'))
            ?? $this->sanitizeToken($request->cookie(self::COOKIE_NAME))
            ?? CustomerToken::generateToken();
    }

    /**
     * Persist customer token in a long-lived cookie.
     */
    public function queueClientTokenCookie(string $token): void
    {
        $cleanToken = $this->sanitizeToken($token);

        if (! $cleanToken) {
            return;
        }

        Cookie::queue(Cookie::make(
            self::COOKIE_NAME,
            $cleanToken,
            self::COOKIE_MINUTES,
            '/',
            null,
            null,
            true,
            false,
            'lax',
        ));
    }

    /**
     * Resolve a customer profile from token and known contact identifiers.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function resolveCustomer(string $clientToken, array $attributes = []): Customer
    {
        $token = $this->sanitizeToken($clientToken) ?? CustomerToken::generateToken();
        $rawTelegramId = $attributes['telegram_id'] ?? null;
        $name = $this->normalizeString($attributes['name'] ?? null);
        $phone = $this->normalizePhone($attributes['phone'] ?? null);
        $phoneCandidates = $this->phoneLookupCandidates($attributes['phone'] ?? null);
        $allowNameOverwrite = array_key_exists('allow_name_overwrite', $attributes)
            ? (bool) $attributes['allow_name_overwrite']
            : true;
        $telegramId = $this->normalizeTelegramId($attributes['telegram_id'] ?? null);
        $telegramUsername = $this->normalizeString($attributes['telegram_username'] ?? null);
        $lastSeenChannel = $this->normalizeString($attributes['source_channel'] ?? null);
        $lastSeenUserAgent = $this->normalizeString($attributes['user_agent'] ?? null);
        $lastSeenIp = $this->normalizeString($attributes['ip'] ?? null);

        /** @var Customer $customer */
        $customer = DB::transaction(function () use (
            $token,
            $rawTelegramId,
            $name,
            $phone,
            $phoneCandidates,
            $allowNameOverwrite,
            $telegramId,
            $telegramUsername,
            $lastSeenChannel,
            $lastSeenUserAgent,
            $lastSeenIp,
        ): Customer {
            $tokenRecord = CustomerToken::query()
                ->with('customer')
                ->where('token', $token)
                ->first();
            $tokenCustomer = $tokenRecord?->customer;
            $phoneCustomer = $phoneCandidates !== []
                ? Customer::query()->whereIn('phone', $phoneCandidates)->first()
                : null;
            $telegramCustomer = $telegramId ? Customer::query()->where('telegram_id', $telegramId)->first() : null;

            $customer = $phoneCustomer
                ?? $telegramCustomer
                ?? $tokenCustomer
                ?? new Customer();

            $matches = collect([$tokenCustomer, $phoneCustomer, $telegramCustomer])
                ->filter()
                ->unique('id');

            foreach ($matches as $match) {
                if (! $match instanceof Customer) {
                    continue;
                }

                if ($match->id === $customer->id) {
                    continue;
                }

                $this->mergeCustomerInto($match, $customer);
            }

            if ($name !== null && $this->shouldUpdateName($customer->name, $name, $allowNameOverwrite)) {
                $customer->name = $name;
            }

            if ($phone !== null) {
                $customer->phone = $phone;
            } elseif (! $customer->exists && ! is_string($customer->phone)) {
                $customer->phone = $this->syntheticPhoneFromToken($token);
            }

            $existingPhone = $this->normalizePhone($customer->phone);

            if ($existingPhone !== null) {
                $canonicalPhoneCustomer = Customer::query()
                    ->where('phone', $existingPhone)
                    ->when(
                        $customer->exists,
                        fn ($query) => $query->where('id', '!=', $customer->id),
                    )
                    ->first();

                if ($canonicalPhoneCustomer instanceof Customer) {
                    $this->mergeCustomerInto($customer, $canonicalPhoneCustomer);
                    $customer = $canonicalPhoneCustomer->fresh() ?? $canonicalPhoneCustomer;
                }

                $customer->phone = $existingPhone;
            }

            if ($telegramId !== null) {
                $customer->telegram_id = $telegramId;
            } elseif ($customer->telegram_id !== null && $this->normalizeTelegramId($customer->telegram_id) === null) {
                $customer->telegram_id = null;
            }

            if ($telegramUsername !== null) {
                $customer->telegram_username = ltrim($telegramUsername, '@');
            }

            if (! is_string($customer->name) || trim($customer->name) === '') {
                $customer->name = 'Guest';
            }

            if (! is_string($customer->phone) || trim($customer->phone) === '') {
                $customer->phone = $this->syntheticPhoneFromToken($token);
            }

            if ($lastSeenChannel === Order::SOURCE_TELEGRAM) {
                Log::info('telegram.identity.resolve_customer_before_save', [
                    'token_short' => substr($token, 0, 16),
                    'incoming_telegram_id_raw' => is_scalar($rawTelegramId) ? (string) $rawTelegramId : null,
                    'incoming_telegram_id_raw_type' => get_debug_type($rawTelegramId),
                    'normalized_telegram_id' => $telegramId,
                    'customer_exists' => $customer->exists,
                    'customer_id' => $customer->id,
                    'customer_telegram_id_before_save' => $customer->telegram_id,
                    'customer_telegram_username_before_save' => $customer->telegram_username,
                    'customer_name_before_save' => $customer->name,
                    'customer_phone_before_save' => $customer->phone,
                ]);
            }

            $customer->save();

            if ($lastSeenChannel === Order::SOURCE_TELEGRAM) {
                $customer->refresh();

                Log::info('telegram.identity.resolve_customer_after_save', [
                    'token_short' => substr($token, 0, 16),
                    'normalized_telegram_id' => $telegramId,
                    'saved_customer_id' => $customer->id,
                    'saved_customer_telegram_id' => $customer->telegram_id,
                    'saved_customer_telegram_username' => $customer->telegram_username,
                    'saved_customer_name' => $customer->name,
                    'saved_customer_phone' => $customer->phone,
                ]);
            }

            $this->touchToken(
                customer: $customer,
                token: $token,
                lastSeenChannel: $lastSeenChannel,
                lastSeenUserAgent: $lastSeenUserAgent,
                lastSeenIp: $lastSeenIp,
            );

            return $customer;
        });

        return $customer->fresh() ?? $customer;
    }

    /**
     * Resolve prefill-ready contact fields for an existing customer token.
     *
     * @return array{name: string|null, phone: string|null}
     */
    public function resolvePrefillFromToken(string $clientToken): array
    {
        $token = $this->sanitizeToken($clientToken);

        if (! $token) {
            return [
                'name' => null,
                'phone' => null,
            ];
        }

        $customer = CustomerToken::query()
            ->where('token', $token)
            ->with('customer')
            ->first()
            ?->customer;

        if (! $customer) {
            return [
                'name' => null,
                'phone' => null,
            ];
        }

        return [
            'name' => $this->isPlaceholderName($customer->name) ? null : $customer->name,
            'phone' => $this->isSyntheticPhone($customer->phone) ? null : $customer->phone,
        ];
    }

    protected function mergeCustomerInto(Customer $source, Customer $target): void
    {
        if ($source->id === $target->id) {
            return;
        }

        Order::query()
            ->where('customer_id', $source->id)
            ->update(['customer_id' => $target->id]);

        SmsLog::query()
            ->where('customer_id', $source->id)
            ->update(['customer_id' => $target->id]);

        CustomerToken::query()
            ->where('customer_id', $source->id)
            ->update([
                'customer_id' => $target->id,
                'updated_at' => now(),
            ]);

        $targetTelegramId = $this->normalizeTelegramId($target->telegram_id);
        $sourceTelegramId = $this->normalizeTelegramId($source->telegram_id);

        if ($targetTelegramId === null && $sourceTelegramId !== null) {
            $target->telegram_id = $sourceTelegramId;
        }

        if (
            (! is_string($target->telegram_username) || trim($target->telegram_username) === '')
            && is_string($source->telegram_username)
            && trim($source->telegram_username) !== ''
        ) {
            $target->telegram_username = $source->telegram_username;
        }

        if (
            $this->isPlaceholderName($target->name)
            && is_string($source->name)
            && trim($source->name) !== ''
        ) {
            $target->name = $source->name;
        }

        if (
            (
                ! is_string($target->phone)
                || trim($target->phone) === ''
                || $this->isSyntheticPhone($target->phone)
            )
            && is_string($source->phone)
            && trim($source->phone) !== ''
            && ! $this->isSyntheticPhone($source->phone)
        ) {
            $target->phone = $this->normalizePhone($source->phone) ?? $source->phone;
        }

        $source->delete();
    }

    protected function touchToken(
        Customer $customer,
        string $token,
        ?string $lastSeenChannel = null,
        ?string $lastSeenUserAgent = null,
        ?string $lastSeenIp = null,
    ): void {
        $now = now();

        $record = CustomerToken::query()->firstOrNew([
            'token' => $token,
        ]);

        if (! $record->exists) {
            $record->first_seen_at = $now;
        }

        $record->customer_id = $customer->id;
        $record->last_seen_at = $now;
        $record->last_seen_channel = $lastSeenChannel;
        $record->last_seen_user_agent = $lastSeenUserAgent;
        $record->last_seen_ip = $lastSeenIp;
        $record->save();
    }

    protected function syntheticPhoneFromToken(string $token): string
    {
        return 'q'.substr(hash('sha256', $token), 0, 19);
    }

    protected function sanitizeToken(mixed $value): ?string
    {
        if (! is_string($value)) {
            return null;
        }

        $token = trim($value);

        if ($token === '') {
            return null;
        }

        return preg_match(self::TOKEN_PATTERN, $token) === 1 ? $token : null;
    }

    protected function normalizeString(mixed $value): ?string
    {
        if (! is_string($value)) {
            return null;
        }

        $normalized = trim($value);

        return $normalized === '' ? null : $normalized;
    }

    protected function normalizePhone(mixed $value): ?string
    {
        if (! is_string($value)) {
            return null;
        }

        $normalized = $this->smsService->normalizePhone($value);

        return is_string($normalized) && $normalized !== '' ? $normalized : null;
    }

    /**
     * Build candidates that match both canonical and legacy phone formats.
     *
     * @return array<int, string>
     */
    protected function phoneLookupCandidates(mixed $value): array
    {
        $local = $this->normalizePhone($value);

        if ($local === null) {
            return [];
        }

        return array_values(array_unique([
            $local,
            '0'.$local,
            '251'.$local,
            '+251'.$local,
        ]));
    }

    protected function normalizeTelegramId(mixed $value): ?int
    {
        if (is_int($value)) {
            return $value > 0 ? $value : null;
        }

        if (! is_string($value) || trim($value) === '' || ! ctype_digit(trim($value))) {
            return null;
        }

        $telegramId = (int) trim($value);

        return $telegramId > 0 ? $telegramId : null;
    }

    protected function shouldUpdateName(?string $current, string $incoming, bool $allowOverwrite = true): bool
    {
        if ($this->isPlaceholderName($current)) {
            return true;
        }

        if (! $allowOverwrite) {
            return false;
        }

        return ! $this->isPlaceholderName($incoming);
    }

    protected function isPlaceholderName(?string $value): bool
    {
        if (! is_string($value)) {
            return true;
        }

        $name = trim($value);

        if ($name === '') {
            return true;
        }

        if (strcasecmp($name, 'guest') === 0) {
            return true;
        }

        return preg_match('/^Table\s+.+\s+Guest$/i', $name) === 1;
    }

    protected function isSyntheticPhone(?string $value): bool
    {
        if (! is_string($value)) {
            return false;
        }

        return preg_match('/^q[a-f0-9]{19}$/i', trim($value)) === 1;
    }
}
