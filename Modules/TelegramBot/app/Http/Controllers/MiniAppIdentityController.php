<?php

namespace Modules\TelegramBot\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Services\CustomerIdentityService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MiniAppIdentityController extends Controller
{
    /**
     * Validate Telegram miniapp init data and return customer prefill details.
     */
    public function __invoke(Request $request, CustomerIdentityService $customerIdentityService): JsonResponse
    {
        $validated = $request->validate([
            'init_data' => ['required', 'string', 'max:8192'],
        ]);

        $botToken = trim((string) config('telegram.bot_token', ''));

        if ($botToken === '') {
            return response()->json([
                'ok' => false,
                'error' => 'bot_token_not_configured',
            ], 503);
        }

        $identityPayload = $this->parseIdentityPayload((string) $validated['init_data']);

        if ($identityPayload === null) {
            return response()->json([
                'ok' => false,
                'error' => 'invalid_init_data',
            ], 422);
        }

        if (! $this->passesInitDataSignature($identityPayload['signed_fields'], $identityPayload['hash'], $botToken)) {
            return response()->json([
                'ok' => false,
                'error' => 'invalid_init_data_signature',
            ], 422);
        }

        $customerToken = $this->telegramToken((string) $identityPayload['telegram_id']);
        $customer = $customerIdentityService->resolveCustomer($customerToken, [
            'name' => $identityPayload['display_name'],
            'allow_name_overwrite' => false,
            'telegram_id' => $identityPayload['telegram_id'],
            'telegram_username' => $identityPayload['telegram_username'],
            'source_channel' => Order::SOURCE_TELEGRAM,
            'user_agent' => $request->userAgent(),
            'ip' => $request->ip(),
        ]);
        $customer = $this->syncTelegramIdentity(
            $customer,
            $identityPayload['telegram_id'],
            $identityPayload['telegram_username'],
        );

        $name = $this->isPlaceholderName($customer->name)
            ? ($identityPayload['display_name'] === 'Telegram Customer' ? null : $identityPayload['display_name'])
            : $customer->name;
        $phone = $this->isSyntheticPhone($customer->phone) ? null : $customer->phone;
        $telegramUsername = is_string($customer->telegram_username) && trim($customer->telegram_username) !== ''
            ? $customer->telegram_username
            : $identityPayload['telegram_username'];

        return response()->json([
            'ok' => true,
            'customer' => [
                'customer_token' => $customerToken,
                'name' => $name,
                'phone' => $phone,
                'telegram_id' => $identityPayload['telegram_id'],
                'telegram_username' => $telegramUsername,
            ],
        ]);
    }

    /**
     * @return array{
     *     telegram_id: int,
     *     telegram_username: string|null,
     *     display_name: string,
     *     hash: string,
     *     signed_fields: array<string, string>
     * }|null
     */
    protected function parseIdentityPayload(string $initData): ?array
    {
        parse_str($initData, $parsed);

        if (! is_array($parsed) || $parsed === []) {
            return null;
        }

        $hash = $parsed['hash'] ?? null;

        if (! is_string($hash) || trim($hash) === '') {
            return null;
        }

        $signedFields = [];

        foreach ($parsed as $key => $value) {
            if (! is_string($key) || $key === '' || $key === 'hash' || is_array($value)) {
                continue;
            }

            $signedFields[$key] = (string) $value;
        }

        $userJson = $signedFields['user'] ?? null;

        if (! is_string($userJson) || trim($userJson) === '') {
            return null;
        }

        $user = json_decode($userJson, true);

        if (! is_array($user)) {
            return null;
        }

        $telegramId = $this->normalizeTelegramId($user['id'] ?? null);

        if ($telegramId === null) {
            return null;
        }

        $telegramUsername = null;

        if (is_string($user['username'] ?? null) && trim((string) $user['username']) !== '') {
            $telegramUsername = ltrim(trim((string) $user['username']), '@');
        }

        $firstName = trim((string) ($user['first_name'] ?? ''));
        $lastName = trim((string) ($user['last_name'] ?? ''));
        $displayName = trim($firstName.' '.$lastName);

        if ($displayName === '') {
            $displayName = $telegramUsername !== null ? '@'.$telegramUsername : 'Telegram Customer';
        }

        return [
            'telegram_id' => $telegramId,
            'telegram_username' => $telegramUsername,
            'display_name' => $displayName,
            'hash' => trim($hash),
            'signed_fields' => $signedFields,
        ];
    }

    /**
     * @param  array<string, string>  $signedFields
     */
    protected function passesInitDataSignature(array $signedFields, string $hash, string $botToken): bool
    {
        if ($signedFields === []) {
            return false;
        }

        ksort($signedFields, SORT_STRING);

        $dataCheckLines = [];

        foreach ($signedFields as $key => $value) {
            $dataCheckLines[] = $key.'='.$value;
        }

        $dataCheckString = implode("\n", $dataCheckLines);
        $secretKey = hash_hmac('sha256', $botToken, 'WebAppData', true);
        $calculatedHash = hash_hmac('sha256', $dataCheckString, $secretKey);

        return hash_equals(strtolower($hash), strtolower($calculatedHash));
    }

    protected function telegramToken(string $telegramUserId): string
    {
        return 'tg_'.substr(hash('sha256', 'telegram:'.$telegramUserId), 0, 60);
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

    protected function syncTelegramIdentity(Customer $customer, int $telegramId, ?string $telegramUsername): Customer
    {
        $currentTelegramId = is_scalar($customer->telegram_id)
            ? trim((string) $customer->telegram_id)
            : '';
        $normalizedTelegramUsername = is_string($telegramUsername) && trim($telegramUsername) !== ''
            ? ltrim(trim($telegramUsername), '@')
            : null;
        $currentTelegramUsername = is_string($customer->telegram_username)
            ? trim($customer->telegram_username)
            : '';
        $targetTelegramId = (string) $telegramId;
        $shouldSyncTelegramId = $currentTelegramId !== $targetTelegramId;
        $shouldSyncTelegramUsername = $normalizedTelegramUsername !== null
            && strcasecmp($currentTelegramUsername, $normalizedTelegramUsername) !== 0;

        if (! $shouldSyncTelegramId && ! $shouldSyncTelegramUsername) {
            return $customer;
        }

        $customer->telegram_id = $targetTelegramId;

        if ($normalizedTelegramUsername !== null) {
            $customer->telegram_username = $normalizedTelegramUsername;
        }

        $customer->save();

        return $customer->fresh() ?? $customer;
    }
}
