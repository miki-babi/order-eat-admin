<?php

namespace Modules\TelegramBot\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\FeatureToggle;
use App\Models\Order;
use App\Services\CustomerIdentityService;
use App\Services\FeatureToggleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;
use Modules\TelegramBot\Services\TelegramBotApiService;

class WebhookController extends Controller
{
    private const MINIAPP_LAUNCH_FEATURE_KEY = 'telegram_bot_miniapp_launch';

    /**
     * Accept Telegram webhook updates and handle basic bot commands.
     */
    public function __invoke(
        Request $request,
        CustomerIdentityService $customerIdentityService,
        FeatureToggleService $featureToggleService,
        TelegramBotApiService $telegramBotApiService,
    ): JsonResponse {
        if (! $this->passesWebhookSecret($request)) {
            return response()->json([
                'ok' => false,
                'error' => 'invalid_secret',
            ], 403);
        }

        $messagePayload = $this->extractMessagePayload($request->json()->all());

        if ($messagePayload === null) {
            return response()->json([
                'ok' => true,
                'ignored' => true,
            ]);
        }

        $chatId = $messagePayload['chat_id'];
        $telegramUserId = $messagePayload['telegram_user_id'];

        if ($chatId === null || $telegramUserId === null) {
            return response()->json([
                'ok' => true,
                'ignored' => true,
            ]);
        }

        $customer = $customerIdentityService->resolveCustomer(
            $this->telegramToken((string) $telegramUserId),
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

            $telegramBotApiService->sendMessage($chatId, $reply['text'], $reply['options']);

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

        $text = $messagePayload['text'];

        if ($text !== null && trim($text) !== '') {
            $reply = $this->buildReply(trim($text), $customer, $featureToggleService);

            if ($reply !== null) {
                $telegramBotApiService->sendMessage($chatId, $reply['text'], array_merge([
                    'disable_web_page_preview' => true,
                ], $reply['options']));
            }
        }

        return response()->json([
            'ok' => true,
        ]);
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
     *     contact_phone: string|null,
     *     contact_user_id: int|null
     * }|null
     */
    protected function extractMessagePayload(array $update): ?array
    {
        $message = $update['message'] ?? $update['edited_message'] ?? null;

        if (! is_array($message)) {
            return null;
        }

        $chatId = data_get($message, 'chat.id');
        $fromId = data_get($message, 'from.id');
        $username = data_get($message, 'from.username');
        $firstName = trim((string) data_get($message, 'from.first_name', ''));
        $lastName = trim((string) data_get($message, 'from.last_name', ''));
        $displayName = trim($firstName.' '.$lastName);
        $contactPhone = data_get($message, 'contact.phone_number');
        $contactUserId = data_get($message, 'contact.user_id');

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
            'text' => is_string(data_get($message, 'text')) ? (string) data_get($message, 'text') : null,
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
     * @return array{text: string, options: array<string, mixed>}|null
     */
    protected function buildReply(
        string $message,
        Customer $customer,
        FeatureToggleService $featureToggleService,
    ): ?array {
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

        if (preg_match('/^\/track(?:@[\w_]+)?\s+([A-Za-z0-9]{20,100})$/i', $message, $matches) === 1) {
            return [
                'text' => $this->trackReply($customer, $matches[1]),
                'options' => [],
            ];
        }

        if ($this->matchesCommand($message, 'myorders')) {
            return [
                'text' => $this->myOrdersReply($customer),
                'options' => [],
            ];
        }

        return [
            'text' => "I can help with:\n/start\n/help\n/menu\n/track <tracking_token>\n/myorders",
            'options' => [],
        ];
    }

    protected function matchesCommand(string $message, string $command): bool
    {
        return preg_match('/^\/'.preg_quote($command, '/').'(?:@[\w_]+)?(?:\s|$)/i', $message) === 1;
    }

    protected function startReply(): string
    {
        return "Welcome to our cafe bot.\nUse /menu to order, /track <tracking_token> to track, or /myorders for recent orders.";
    }

    protected function startReplyWithContactRequest(): string
    {
        return "Welcome to our cafe bot.\nPlease share your phone number so we can send order updates.\nUse /menu to order, /track <tracking_token> to track, or /myorders for recent orders.";
    }

    protected function helpReply(): string
    {
        return "Available commands:\n/menu\n/track <tracking_token>\n/myorders";
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

    protected function trackReply(Customer $customer, string $trackingToken): string
    {
        $order = Order::query()
            ->with('pickupLocation')
            ->where('customer_id', $customer->id)
            ->where('tracking_token', $trackingToken)
            ->first();

        if (! $order) {
            return 'Order not found for your account. Please check the tracking token.';
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
        ], $menuReply['options']));
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
            return $customUrl;
        }

        $configuredFeature = config('feature-locks.features.'.self::MINIAPP_LAUNCH_FEATURE_KEY, []);
        $configuredUrl = is_array($configuredFeature)
            ? $this->normalizeAbsoluteUrl($configuredFeature['help_url'] ?? null)
            : null;

        if ($configuredUrl !== null) {
            return $configuredUrl;
        }

        $telegramConfiguredUrl = $this->normalizeAbsoluteUrl(config('telegram.miniapp_url'));

        if ($telegramConfiguredUrl !== null) {
            return $telegramConfiguredUrl;
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
