<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\CustomerToken;
use App\Models\Order;
use App\Models\SmsLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;

class CustomerIdentityService
{
    public const COOKIE_NAME = 'kds_customer_token';

    private const COOKIE_MINUTES = 2628000; // Five years.

    private const TOKEN_PATTERN = '/^[A-Za-z0-9_-]{20,120}$/';

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
        $name = $this->normalizeString($attributes['name'] ?? null);
        $phone = $this->normalizeString($attributes['phone'] ?? null);
        $telegramId = $this->normalizeTelegramId($attributes['telegram_id'] ?? null);
        $telegramUsername = $this->normalizeString($attributes['telegram_username'] ?? null);
        $lastSeenChannel = $this->normalizeString($attributes['source_channel'] ?? null);
        $lastSeenUserAgent = $this->normalizeString($attributes['user_agent'] ?? null);
        $lastSeenIp = $this->normalizeString($attributes['ip'] ?? null);

        /** @var Customer $customer */
        $customer = DB::transaction(function () use (
            $token,
            $name,
            $phone,
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
            $phoneCustomer = $phone ? Customer::query()->where('phone', $phone)->first() : null;
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

            if ($name !== null && $this->shouldUpdateName($customer->name, $name)) {
                $customer->name = $name;
            }

            if ($phone !== null) {
                $customer->phone = $phone;
            } elseif (! $customer->exists && ! is_string($customer->phone)) {
                $customer->phone = $this->syntheticPhoneFromToken($token);
            }

            if ($telegramId !== null) {
                $customer->telegram_id = $telegramId;
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

            $customer->save();
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

        if (($target->telegram_id === null || $target->telegram_id === 0) && $source->telegram_id) {
            $target->telegram_id = $source->telegram_id;
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
            $target->phone = $source->phone;
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

    protected function shouldUpdateName(?string $current, string $incoming): bool
    {
        return $this->isPlaceholderName($current) || ! $this->isPlaceholderName($incoming);
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
