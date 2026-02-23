<?php

namespace Modules\TelegramBot\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\CustomerToken;
use App\Models\FeatureToggle;
use App\Models\Order;
use App\Services\CustomerIdentityService;
use App\Services\FeatureToggleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Modules\TelegramBot\Services\TelegramBotApiService;

class WebhookController extends Controller
{
    private const MINIAPP_LAUNCH_FEATURE_KEY = 'telegram_bot_miniapp_launch';
    private const TRACK_ID_HINT_TRIGGER = '__track_id_hint__';

    /**
     * Accept Telegram webhook updates and handle basic bot commands.
     */
    public function __invoke(
        Request $request,
        CustomerIdentityService $customerIdentityService,
        FeatureToggleService $featureToggleService,
        TelegramBotApiService $telegramBotApiService,
    ): JsonResponse {
        $this->logIncomingWebhook($request);

        if (! $this->passesWebhookSecret($request)) {
            Log::warning('telegram.webhook.invalid_secret', [
                'ip' => $request->ip(),
            ]);

            return response()->json([
                'ok' => false,
                'error' => 'invalid_secret',
            ], 403);
        }

        $messagePayload = $this->extractMessagePayload($request->json()->all());

        if ($messagePayload === null) {
            Log::info('telegram.webhook.ignored_update_without_message', [
                'ip' => $request->ip(),
            ]);

            return response()->json([
                'ok' => true,
                'ignored' => true,
            ]);
        }

        $chatId = $messagePayload['chat_id'];
        $telegramUserId = $messagePayload['telegram_user_id'];

        if ($chatId === null || $telegramUserId === null) {
            Log::info('telegram.webhook.ignored_update_without_chat_or_user', [
                'ip' => $request->ip(),
                'chat_id' => $chatId,
                'telegram_user_id' => $telegramUserId,
            ]);

            return response()->json([
                'ok' => true,
                'ignored' => true,
            ]);
        }

        $incomingMessage = $this->extractIncomingMessage($messagePayload);
        $isStartCommand = is_string($incomingMessage)
            && $incomingMessage !== ''
            && $this->matchesCommand($incomingMessage, 'start');
        $telegramToken = $this->telegramToken((string) $telegramUserId);
        $startDebugContext = null;

        if ($isStartCommand) {
            $normalizedTelegramUsername = null;

            if (is_string($messagePayload['telegram_username'])) {
                $normalizedTelegramUsername = strtolower(ltrim(trim($messagePayload['telegram_username']), '@'));
                $normalizedTelegramUsername = $normalizedTelegramUsername === '' ? null : $normalizedTelegramUsername;
            }

            $hadCustomerByTelegramId = Customer::query()
                ->where('telegram_id', (string) $telegramUserId)
                ->exists();
            $hadCustomerByTelegramUsername = $normalizedTelegramUsername !== null
                ? Customer::query()
                    ->whereRaw('LOWER(telegram_username) = ?', [$normalizedTelegramUsername])
                    ->exists()
                : false;
            $hadCustomerToken = CustomerToken::query()
                ->where('token', $telegramToken)
                ->exists();

            $startDebugContext = [
                'had_customer_by_telegram_id' => $hadCustomerByTelegramId,
                'had_customer_by_telegram_username' => $hadCustomerByTelegramUsername,
                'had_customer_token' => $hadCustomerToken,
                'is_new_telegram_customer' => ! $hadCustomerByTelegramId
                    && ! $hadCustomerByTelegramUsername
                    && ! $hadCustomerToken,
                'telegram_token_short' => substr($telegramToken, 0, 16),
            ];
        }

        $customer = $customerIdentityService->resolveCustomer(
            $telegramToken,
            [
                'name' => $messagePayload['display_name'],
                'telegram_id' => $telegramUserId,
                'telegram_username' => $messagePayload['telegram_username'],
                'source_channel' => Order::SOURCE_TELEGRAM,
                'user_agent' => 'telegram-webhook',
                'ip' => $request->ip(),
            ],
        );

        if ($messagePayload['contact_phone'] !== null) {
            $reply = $this->contactReply(
                $messagePayload,
                $request,
                $customerIdentityService,
            );

            $telegramBotApiService->sendMessage($chatId, $reply['text'], $reply['options'], [
                'source' => 'telegram.webhook.contact_reply',
                'telegram_user_id' => $telegramUserId,
            ]);

            if ($reply['contact_saved']) {
                $this->sendMiniAppLaunchMessage(
                    $chatId,
                    $featureToggleService,
                    $telegramBotApiService,
                );
            }

            return response()->json([
                'ok' => true,
            ]);
        }

        if (is_string($incomingMessage) && $incomingMessage !== '') {
            $reply = $this->buildReply(
                $incomingMessage,
                $customer,
                $featureToggleService,
                $telegramUserId,
            );

            if ($reply !== null) {
                $replyChatId = $this->replyTargetChatId($incomingMessage, $chatId, $telegramUserId);

                if (
                    $isStartCommand
                    && is_array($startDebugContext)
                    && ($startDebugContext['is_new_telegram_customer'] ?? false) === true
                ) {
                    $this->logNewStartCustomerDebug(
                        request: $request,
                        messagePayload: $messagePayload,
                        incomingMessage: $incomingMessage,
                        customer: $customer,
                        replyChatId: $replyChatId,
                        startDebugContext: $startDebugContext,
                    );
                }

                $telegramBotApiService->sendMessage($replyChatId, $reply['text'], array_merge([
                    'disable_web_page_preview' => true,
                ], $reply['options']), [
                    'source' => 'telegram.webhook.command_reply',
                    'telegram_user_id' => $telegramUserId,
                ]);
            }
        }

        if (
            is_string($messagePayload['callback_query_id'])
            && trim($messagePayload['callback_query_id']) !== ''
        ) {
            $telegramBotApiService->answerCallbackQuery(trim($messagePayload['callback_query_id']));
        }

        return response()->json([
            'ok' => true,
        ]);
    }

    protected function logIncomingWebhook(Request $request): void
    {
        if (! (bool) config('telegram.log_webhook_payload', false)) {
            return;
        }

        $rawPayload = $request->json()->all();

        if (! is_array($rawPayload) || $rawPayload === []) {
            $rawPayload = $request->all();
        }

        $payload = is_array($rawPayload) ? $this->sanitizeLogValue($rawPayload) : [];

        $context = [
            'ip' => $request->ip(),
            'path' => $request->path(),
            'update_id' => data_get($payload, 'update_id'),
            'payload' => $payload,
        ];

        if ((bool) config('telegram.log_webhook_headers', false)) {
            $context['headers'] = $this->sanitizeLogValue($request->headers->all());
        }

        Log::info('telegram.webhook.received', $context);
    }

    /**
     * @param  array{
     *     chat_id: int|string|null,
     *     telegram_user_id: int|null,
     *     telegram_username: string|null,
     *     display_name: string,
     *     text: string|null,
     *     callback_data: string|null,
     *     callback_query_id: string|null,
     *     contact_phone: string|null,
     *     contact_user_id: int|null
     * }  $messagePayload
     * @param  array{
     *     had_customer_by_telegram_id: bool,
     *     had_customer_by_telegram_username: bool,
     *     had_customer_token: bool,
     *     is_new_telegram_customer: bool,
     *     telegram_token_short: string
     * }  $startDebugContext
     */
    protected function logNewStartCustomerDebug(
        Request $request,
        array $messagePayload,
        string $incomingMessage,
        Customer $customer,
        int|string $replyChatId,
        array $startDebugContext,
    ): void {
        $rawUpdate = $request->json()->all();

        if (! is_array($rawUpdate) || $rawUpdate === []) {
            $rawUpdate = $request->all();
        }

        Log::info('telegram.webhook.start_new_customer_debug', [
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'path' => $request->path(),
            'incoming_message' => $incomingMessage,
            'reply_chat_id' => $replyChatId,
            'reply_chat_id_source' => $replyChatId === $messagePayload['telegram_user_id'] ? 'from.id' : 'chat.id',
            'chat_id' => $messagePayload['chat_id'],
            'telegram_user_id_from_id' => $messagePayload['telegram_user_id'],
            'telegram_username' => $messagePayload['telegram_username'],
            'preexisting' => [
                'customer_by_telegram_id' => $startDebugContext['had_customer_by_telegram_id'],
                'customer_by_telegram_username' => $startDebugContext['had_customer_by_telegram_username'],
                'customer_token' => $startDebugContext['had_customer_token'],
            ],
            'is_new_telegram_customer' => $startDebugContext['is_new_telegram_customer'],
            'telegram_token_short' => $startDebugContext['telegram_token_short'],
            'resolved_customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'phone' => $customer->phone,
                'telegram_id' => $customer->telegram_id,
                'telegram_username' => $customer->telegram_username,
                'created_at' => $customer->created_at?->toDateTimeString(),
                'updated_at' => $customer->updated_at?->toDateTimeString(),
            ],
            'message_payload' => $this->sanitizeLogValue($messagePayload),
            'raw_update' => $this->sanitizeLogValue(is_array($rawUpdate) ? $rawUpdate : []),
        ]);
    }

    protected function sanitizeLogValue(mixed $value, ?string $key = null): mixed
    {
        if ($key !== null && $this->shouldMaskLogKey($key)) {
            return $this->maskLogScalar($value);
        }

        if (! is_array($value)) {
            return $value;
        }

        $sanitized = [];

        foreach ($value as $childKey => $childValue) {
            $sanitized[$childKey] = $this->sanitizeLogValue(
                $childValue,
                is_string($childKey) ? $childKey : null,
            );
        }

        return $sanitized;
    }

    protected function shouldMaskLogKey(string $key): bool
    {
        $normalizedKey = strtolower($key);

        foreach (['phone', 'token', 'secret', 'hash', 'init_data'] as $fragment) {
            if (str_contains($normalizedKey, $fragment)) {
                return true;
            }
        }

        return false;
    }

    protected function maskLogScalar(mixed $value): mixed
    {
        if (is_array($value)) {
            return array_map(
                fn (mixed $item): mixed => $this->maskLogScalar($item),
                $value,
            );
        }

        if ($value === null) {
            return null;
        }

        $stringValue = trim((string) $value);

        if ($stringValue === '') {
            return '';
        }

        $length = strlen($stringValue);

        if ($length <= 4) {
            return str_repeat('*', $length);
        }

        return substr($stringValue, 0, 2)
            .str_repeat('*', max(1, $length - 4))
            .substr($stringValue, -2);
    }

    protected function passesWebhookSecret(Request $request): bool
    {
        if (! (bool) config('telegram.validate_webhook_secret', false)) {
            return true;
        }

        $expected = trim((string) config('telegram.webhook_secret', ''));

        if ($expected === '') {
            return true;
        }

        $actual = trim((string) $request->header('X-Telegram-Bot-Api-Secret-Token', ''));

        return $actual !== '' && hash_equals($expected, $actual);
    }

    /**
     * @param  array<string, mixed>  $update
     * @return array{
     *     chat_id: int|string|null,
     *     telegram_user_id: int|null,
     *     telegram_username: string|null,
     *     display_name: string,
     *     text: string|null,
     *     callback_data: string|null,
     *     callback_query_id: string|null,
     *     contact_phone: string|null,
     *     contact_user_id: int|null
     * }|null
     */
    protected function extractMessagePayload(array $update): ?array
    {
        $message = $update['message'] ?? $update['edited_message'] ?? null;
        $callbackQuery = $update['callback_query'] ?? null;

        if (! is_array($message) && ! is_array($callbackQuery)) {
            return null;
        }

        $chatId = is_array($message)
            ? data_get($message, 'chat.id')
            : data_get($callbackQuery, 'message.chat.id');
        $fromId = is_array($message)
            ? data_get($message, 'from.id')
            : data_get($callbackQuery, 'from.id');
        $username = is_array($message)
            ? data_get($message, 'from.username')
            : data_get($callbackQuery, 'from.username');
        $firstName = is_array($message)
            ? trim((string) data_get($message, 'from.first_name', ''))
            : trim((string) data_get($callbackQuery, 'from.first_name', ''));
        $lastName = is_array($message)
            ? trim((string) data_get($message, 'from.last_name', ''))
            : trim((string) data_get($callbackQuery, 'from.last_name', ''));
        $displayName = trim($firstName.' '.$lastName);
        $text = is_array($message) && is_string(data_get($message, 'text'))
            ? (string) data_get($message, 'text')
            : null;
        $callbackData = is_array($callbackQuery) && is_string(data_get($callbackQuery, 'data'))
            ? trim((string) data_get($callbackQuery, 'data'))
            : null;
        $callbackQueryId = is_array($callbackQuery) && is_string(data_get($callbackQuery, 'id'))
            ? trim((string) data_get($callbackQuery, 'id'))
            : null;
        $contactPhone = is_array($message) ? data_get($message, 'contact.phone_number') : null;
        $contactUserId = is_array($message) ? data_get($message, 'contact.user_id') : null;

        if ($displayName === '') {
            $displayName = is_string($username) && trim($username) !== ''
                ? '@'.trim($username)
                : 'Telegram Customer';
        }

        return [
            'chat_id' => is_int($chatId) || is_string($chatId) ? $chatId : null,
            'telegram_user_id' => is_int($fromId) ? $fromId : null,
            'telegram_username' => is_string($username) ? $username : null,
            'display_name' => $displayName,
            'text' => $text,
            'callback_data' => $callbackData,
            'callback_query_id' => $callbackQueryId,
            'contact_phone' => is_string($contactPhone) && trim($contactPhone) !== '' ? trim($contactPhone) : null,
            'contact_user_id' => is_int($contactUserId)
                ? $contactUserId
                : (is_string($contactUserId) && ctype_digit($contactUserId) ? (int) $contactUserId : null),
        ];
    }

    protected function telegramToken(string $telegramUserId): string
    {
        return 'tg_'.substr(hash('sha256', 'telegram:'.$telegramUserId), 0, 60);
    }

    /**
     * @param  array{
     *     text: string|null,
     *     callback_data: string|null
     * }  $messagePayload
     */
    protected function extractIncomingMessage(array $messagePayload): ?string
    {
        if (
            is_string($messagePayload['callback_data'])
            && trim($messagePayload['callback_data']) !== ''
        ) {
            return $this->normalizeCallbackDataToCommand(trim($messagePayload['callback_data']));
        }

        if (is_string($messagePayload['text']) && trim($messagePayload['text']) !== '') {
            return trim($messagePayload['text']);
        }

        return null;
    }

    /**
     * @return array{text: string, options: array<string, mixed>}|null
     */
    protected function buildReply(
        string $message,
        Customer $customer,
        FeatureToggleService $featureToggleService,
        int $telegramUserId,
    ): ?array {
        if ($message === self::TRACK_ID_HINT_TRIGGER) {
            return [
                'text' => 'Use /track <order_id> for one order, for example: /track 123',
                'options' => $this->commandShortcutsReplyOptions(),
            ];
        }

        if ($this->matchesCommand($message, 'start')) {
            if ($this->hasSavedPhone($customer)) {
                return [
                    'text' => $this->startReply(),
                    'options' => $this->miniAppLaunchOptions($featureToggleService),
                ];
            }

            return [
                'text' => $this->startReplyWithContactRequest(),
                'options' => [
                    'reply_markup' => $this->contactRequestReplyMarkup(),
                ],
            ];
        }

        if ($this->matchesCommand($message, 'help')) {
            return [
                'text' => $this->helpReply(),
                'options' => [],
            ];
        }

        if ($this->matchesCommand($message, 'menu')) {
            return $this->menuReply($featureToggleService);
        }

        if ($this->matchesCommand($message, 'id')) {
            return [
                'text' => "Your Telegram user ID: {$telegramUserId}",
                'options' => [],
            ];
        }

        if (preg_match('/^\/track(?:@[\w_]+)?\s+(\d{1,20})$/i', $message, $matches) === 1) {
            return [
                'text' => $this->trackReply($customer, (int) $matches[1]),
                'options' => [],
            ];
        }

        if ($this->matchesCommand($message, 'track')) {
            return $this->ordersMiniAppReply('active');
        }

        if ($this->matchesCommand($message, 'history') || $this->matchesCommand($message, 'myorders')) {
            return $this->ordersMiniAppReply('history');
        }

        return [
            'text' => 'Choose a command:',
            'options' => $this->commandShortcutsReplyOptions(),
        ];
    }

    protected function normalizeCallbackDataToCommand(string $callbackData): ?string
    {
        return match ($callbackData) {
            'cmd:start' => '/start',
            'cmd:help' => '/help',
            'cmd:menu' => '/menu',
            'cmd:id' => '/id',
            'cmd:track' => '/track',
            'cmd:history' => '/history',
            'cmd:track_id_hint' => self::TRACK_ID_HINT_TRIGGER,
            default => null,
        };
    }

    /**
     * @return array<string, mixed>
     */
    protected function commandShortcutsReplyOptions(): array
    {
        return [
            'reply_markup' => [
                'inline_keyboard' => [
                    [
                        [
                            'text' => '/start',
                            'style' => 'primary',
                            'callback_data' => 'cmd:start',
                        ],
                        [
                            'text' => '/help',
                            'style' => 'primary',
                            'callback_data' => 'cmd:help',
                        ],
                    ],
                    [
                        [
                            'text' => '/menu',
                            'style' => 'primary',
                            'callback_data' => 'cmd:menu',
                        ],
                        [
                            'text' => '/track',
                            'style' => 'primary',
                            'callback_data' => 'cmd:track',
                        ],
                    ],
                    [
                        [
                            'text' => '/history',
                            'style' => 'primary',
                            'callback_data' => 'cmd:history',
                        ],
                        [
                            'text' => '/track <123>',
                            'style' => 'primary',
                            'callback_data' => 'cmd:track_id_hint',
                        ],
                    ],
                    [
                        [
                            'text' => '/id',
                            'style' => 'primary',
                            'callback_data' => 'cmd:id',
                        ],
                    ],
                ],
            ],
        ];
    }

    protected function matchesCommand(string $message, string $command): bool
    {
        return preg_match('/^\/'.preg_quote($command, '/').'(?:@[\w_]+)?(?:\s|$)/i', $message) === 1;
    }

    protected function replyTargetChatId(string $message, int|string $chatId, int $telegramUserId): int|string
    {
        if ($this->matchesCommand($message, 'start')) {
            return $telegramUserId;
        }

        return $chatId;
    }

    protected function startReply(): string
    {
        return "Welcome to our cafe bot.\nUse /menu to order, /track for active orders, /history for your Telegram history, or /track <order_id> for one order.";
    }

    protected function startReplyWithContactRequest(): string
    {
        return "Welcome to our cafe bot.\nPlease share your phone number so we can send order updates.\nUse /menu to order, /track for active orders, /history for your Telegram history, or /track <order_id> for one order.";
    }

    protected function helpReply(): string
    {
        return "Available commands:\n/menu\n/id\n/track\n/history\n/track <order_id>";
    }

    /**
     * @return array{text: string, options: array<string, mixed>}
     */
    protected function menuReply(FeatureToggleService $featureToggleService): array
    {
        $launchPayload = $this->miniAppLaunchPayload($featureToggleService);

        if ($launchPayload !== null) {
            return [
                'text' => "Tap the button below to order.\nOr use this link: {$launchPayload['url']}",
                'options' => [
                    'reply_markup' => [
                        'inline_keyboard' => [
                            [
                                [
                                    'text' => $launchPayload['button_text'],
                                    'style' => 'primary',
                                    'web_app' => [
                                        'url' => $launchPayload['url'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ];
        }

        $fallbackUrl = $this->fallbackMenuUrl();

        if ($fallbackUrl === null) {
            return [
                'text' => 'Menu link is not configured yet.',
                'options' => [],
            ];
        }

        return [
            'text' => "Order here: {$fallbackUrl}",
            'options' => [],
        ];
    }

    protected function trackReply(Customer $customer, int $orderId): string
    {
        $order = Order::query()
            ->with('pickupLocation')
            ->where('customer_id', $customer->id)
            ->where('id', $orderId)
            ->first();

        if (! $order) {
            return 'Order not found for your account. Please check the order ID.';
        }

        $status = Str::of((string) $order->order_status)->replace('_', ' ')->title();
        $pickupDate = $order->pickup_date?->toDateString() ?? 'N/A';
        $pickupLocation = $order->pickupLocation?->name ?? 'Unknown branch';
        $trackingUrl = route('orders.track', $order->tracking_token);

        return "Order #{$order->id}\nStatus: {$status}\nPickup date: {$pickupDate}\nBranch: {$pickupLocation}\nTrack: {$trackingUrl}";
    }

    protected function myOrdersReply(Customer $customer): string
    {
        $orders = Order::query()
            ->where('customer_id', $customer->id)
            ->latest()
            ->limit(5)
            ->get(['id', 'order_status', 'pickup_date']);

        if ($orders->isEmpty()) {
            return 'No orders yet. Use /menu to place your first order.';
        }

        $lines = $orders->map(
            fn (Order $order) => '#'.$order->id
                .' - '
                .Str::of((string) $order->order_status)->replace('_', ' ')->title()
                .' - '
                .($order->pickup_date?->toDateString() ?? 'N/A'),
        )->all();

        return "Your recent orders:\n".implode("\n", $lines);
    }

    /**
     * @return array{text: string, options: array<string, mixed>}
     */
    protected function ordersMiniAppReply(string $scope): array
    {
        $normalizedScope = in_array($scope, ['active', 'history'], true) ? $scope : 'active';
        $ordersUrl = $this->ordersMiniAppUrl($normalizedScope);

        if ($ordersUrl === null) {
            return [
                'text' => 'Orders miniapp link is not configured yet.',
                'options' => [],
            ];
        }

        $buttonText = $this->ordersMiniAppButtonLabel($normalizedScope);
        $text = $normalizedScope === 'history'
            ? "Tap below to open your Telegram order history.\nOr use this link: {$ordersUrl}"
            : "Tap below to open your active Telegram orders.\nOr use this link: {$ordersUrl}";

        return [
            'text' => $text,
            'options' => [
                'reply_markup' => [
                    'inline_keyboard' => [
                        [
                            [
                                'text' => $buttonText,
                                'style' => 'primary',
                                'web_app' => [
                                    'url' => $ordersUrl,
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ];
    }

    protected function ordersMiniAppButtonLabel(string $scope): string
    {
        return $scope === 'history'
            ? 'Order History'
            : 'Track Active Orders';
    }

    protected function ordersMiniAppUrl(string $scope): ?string
    {
        $normalizedScope = in_array($scope, ['active', 'history'], true) ? $scope : 'active';
        $baseUrl = rtrim((string) config('app.url', ''), '/');

        if ($baseUrl !== '') {
            return "{$baseUrl}/telegram/orders?scope={$normalizedScope}";
        }

        try {
            return route('telegram.orders', [
                'scope' => $normalizedScope,
            ]);
        } catch (\Throwable) {
            return null;
        }
    }

    /**
     * @param  array{
     *     telegram_user_id: int,
     *     telegram_username: string|null,
     *     display_name: string,
     *     contact_phone: string|null,
     *     contact_user_id: int|null
     * }  $messagePayload
     * @return array{text: string, options: array<string, mixed>, contact_saved: bool}
     */
    protected function contactReply(
        array $messagePayload,
        Request $request,
        CustomerIdentityService $customerIdentityService,
    ): array {
        if (
            $messagePayload['contact_user_id'] !== null
            && $messagePayload['contact_user_id'] !== $messagePayload['telegram_user_id']
        ) {
            return [
                'text' => 'Please use the button to share your own Telegram contact.',
                'options' => [
                    'reply_markup' => $this->contactRequestReplyMarkup(),
                ],
                'contact_saved' => false,
            ];
        }

        $phone = $this->normalizePhoneFromContact($messagePayload['contact_phone']);

        if ($phone === null) {
            return [
                'text' => 'I could not read that phone number. Please try sharing your contact again.',
                'options' => [
                    'reply_markup' => $this->contactRequestReplyMarkup(),
                ],
                'contact_saved' => false,
            ];
        }

        $customer = $customerIdentityService->resolveCustomer(
            $this->telegramToken((string) $messagePayload['telegram_user_id']),
            [
                'name' => $messagePayload['display_name'],
                'phone' => $phone,
                'telegram_id' => $messagePayload['telegram_user_id'],
                'telegram_username' => $messagePayload['telegram_username'],
                'source_channel' => Order::SOURCE_TELEGRAM,
                'user_agent' => 'telegram-webhook',
                'ip' => $request->ip(),
            ],
        );

        return [
            'text' => "Thanks {$customer->name}, your phone number is saved.",
            'options' => [
                'disable_web_page_preview' => true,
                'reply_markup' => [
                    'remove_keyboard' => true,
                ],
            ],
            'contact_saved' => true,
        ];
    }

    protected function sendMiniAppLaunchMessage(
        int|string $chatId,
        FeatureToggleService $featureToggleService,
        TelegramBotApiService $telegramBotApiService,
    ): void {
        $menuReply = $this->menuReply($featureToggleService);

        if ($menuReply['text'] === 'Menu link is not configured yet.') {
            return;
        }

        $telegramBotApiService->sendMessage($chatId, $menuReply['text'], array_merge([
            'disable_web_page_preview' => true,
        ], $menuReply['options']), [
            'source' => 'telegram.webhook.miniapp_launch',
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    protected function miniAppLaunchOptions(FeatureToggleService $featureToggleService): array
    {
        $launchPayload = $this->miniAppLaunchPayload($featureToggleService);

        if ($launchPayload === null) {
            return [];
        }

        return [
            'reply_markup' => [
                'inline_keyboard' => [
                    [
                        [
                            'text' => $launchPayload['button_text'],
                            'style' => 'primary',
                            'web_app' => [
                                'url' => $launchPayload['url'],
                            ],
                        ],
                    ],
                ],
            ],
        ];
    }

    /**
     * @return array{button_text: string, url: string}|null
     */
    protected function miniAppLaunchPayload(FeatureToggleService $featureToggleService): ?array
    {
        if (! $featureToggleService->isEnabled(self::MINIAPP_LAUNCH_FEATURE_KEY)) {
            return null;
        }

        $url = $this->miniAppLaunchUrl();

        if ($url === null) {
            return null;
        }

        return [
            'button_text' => $this->miniAppButtonText(),
            'url' => $url,
        ];
    }

    protected function miniAppButtonText(): string
    {
        $feature = $this->miniAppFeatureOverride();
        $customButtonText = $this->normalizeButtonText($feature?->lock_message);

        if ($customButtonText !== null) {
            return $customButtonText;
        }

        $configuredFeature = config('feature-locks.features.'.self::MINIAPP_LAUNCH_FEATURE_KEY, []);
        $configuredButtonText = is_array($configuredFeature)
            ? $this->normalizeButtonText($configuredFeature['lock_message'] ?? null)
            : null;

        if ($configuredButtonText !== null) {
            return $configuredButtonText;
        }

        return $this->normalizeButtonText(config('telegram.miniapp_button_text')) ?? 'Order';
    }

    protected function miniAppLaunchUrl(): ?string
    {
        $feature = $this->miniAppFeatureOverride();
        $customUrl = $this->normalizeAbsoluteUrl($feature?->help_url);

        if ($customUrl !== null) {
            return $this->enforceTelegramMiniAppUrl($customUrl);
        }

        $configuredFeature = config('feature-locks.features.'.self::MINIAPP_LAUNCH_FEATURE_KEY, []);
        $configuredUrl = is_array($configuredFeature)
            ? $this->normalizeAbsoluteUrl($configuredFeature['help_url'] ?? null)
            : null;

        if ($configuredUrl !== null) {
            return $this->enforceTelegramMiniAppUrl($configuredUrl);
        }

        $telegramConfiguredUrl = $this->normalizeAbsoluteUrl(config('telegram.miniapp_url'));

        if ($telegramConfiguredUrl !== null) {
            return $this->enforceTelegramMiniAppUrl($telegramConfiguredUrl);
        }

        return $this->fallbackMenuUrl();
    }

    protected function fallbackMenuUrl(): ?string
    {
        $baseUrl = rtrim((string) config('app.url', ''), '/');

        if ($baseUrl === '') {
            return null;
        }

        return "{$baseUrl}/telegram/menu";
    }

    protected function normalizeButtonText(mixed $value): ?string
    {
        if (! is_string($value)) {
            return null;
        }

        $buttonText = trim($value);

        return $buttonText === '' ? null : $buttonText;
    }

    protected function normalizeAbsoluteUrl(mixed $value): ?string
    {
        if (! is_string($value)) {
            return null;
        }

        $url = trim($value);

        if ($url === '' || filter_var($url, FILTER_VALIDATE_URL) === false) {
            return null;
        }

        return $url;
    }

    protected function enforceTelegramMiniAppUrl(string $url): string
    {
        $fallbackTelegramUrl = $this->fallbackMenuUrl();

        if ($fallbackTelegramUrl !== null && $this->isSameOriginUrl($url, $fallbackTelegramUrl)) {
            return $fallbackTelegramUrl;
        }

        return $url;
    }

    protected function isSameOriginUrl(string $left, string $right): bool
    {
        $leftParts = parse_url($left);
        $rightParts = parse_url($right);

        if (! is_array($leftParts) || ! is_array($rightParts)) {
            return false;
        }

        $leftHost = strtolower((string) ($leftParts['host'] ?? ''));
        $rightHost = strtolower((string) ($rightParts['host'] ?? ''));

        return $leftHost !== '' && $leftHost === $rightHost;
    }

    protected function miniAppFeatureOverride(): ?FeatureToggle
    {
        if (! Schema::hasTable('feature_toggles')) {
            return null;
        }

        return FeatureToggle::query()->where('feature_key', self::MINIAPP_LAUNCH_FEATURE_KEY)->first();
    }

    /**
     * @return array{
     *     keyboard: array<int, array<int, array{text: string, request_contact: bool}>>,
     *     resize_keyboard: bool,
     *     one_time_keyboard: bool,
     *     input_field_placeholder: string
     * }
     */
    protected function contactRequestReplyMarkup(): array
    {
        return [
            'keyboard' => [
                [
                    [
                        'text' => 'Share Contact',
                        'style' => 'primary',
                        'request_contact' => true,
                    ],
                ],
            ],
            'resize_keyboard' => true,
            'one_time_keyboard' => true,
            'input_field_placeholder' => 'Tap to share your contact',
        ];
    }

    protected function normalizePhoneFromContact(?string $phone): ?string
    {
        if (! is_string($phone)) {
            return null;
        }

        $normalized = preg_replace('/[^\d+]/', '', $phone);

        if (! is_string($normalized) || trim($normalized) === '') {
            return null;
        }

        $normalized = trim($normalized);

        if (str_starts_with($normalized, '00')) {
            $normalized = '+'.substr($normalized, 2);
        }

        return $normalized;
    }

    protected function hasSavedPhone(Customer $customer): bool
    {
        if (! is_string($customer->phone) || trim($customer->phone) === '') {
            return false;
        }

        return preg_match('/^q[a-f0-9]{19}$/i', trim($customer->phone)) !== 1;
    }
}
