<?php

namespace Modules\TelegramBot\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Services\CustomerIdentityService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Modules\TelegramBot\Services\TelegramBotApiService;

class WebhookController extends Controller
{
    /**
     * Accept Telegram webhook updates and handle basic bot commands.
     */
    public function __invoke(
        Request $request,
        CustomerIdentityService $customerIdentityService,
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

        $text = $messagePayload['text'];

        if ($text !== null && trim($text) !== '') {
            $reply = $this->buildReply(trim($text), $customer);

            if ($reply !== null) {
                $telegramBotApiService->sendMessage($chatId, $reply, [
                    'disable_web_page_preview' => true,
                ]);
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
     *     text: string|null
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
        ];
    }

    protected function telegramToken(string $telegramUserId): string
    {
        return 'tg_'.substr(hash('sha256', 'telegram:'.$telegramUserId), 0, 60);
    }

    protected function buildReply(string $message, Customer $customer): ?string
    {
        if ($this->matchesCommand($message, 'start')) {
            return $this->startReply();
        }

        if ($this->matchesCommand($message, 'help')) {
            return $this->helpReply();
        }

        if ($this->matchesCommand($message, 'menu')) {
            return $this->menuReply();
        }

        if (preg_match('/^\/track(?:@[\w_]+)?\s+([A-Za-z0-9]{20,100})$/i', $message, $matches) === 1) {
            return $this->trackReply($customer, $matches[1]);
        }

        if ($this->matchesCommand($message, 'myorders')) {
            return $this->myOrdersReply($customer);
        }

        return "I can help with:\n/start\n/help\n/menu\n/track <tracking_token>\n/myorders";
    }

    protected function matchesCommand(string $message, string $command): bool
    {
        return preg_match('/^\/'.preg_quote($command, '/').'(?:@[\w_]+)?(?:\s|$)/i', $message) === 1;
    }

    protected function startReply(): string
    {
        return "Welcome to our cafe bot.\nUse /menu to order, /track <tracking_token> to track, or /myorders for recent orders.";
    }

    protected function helpReply(): string
    {
        return "Available commands:\n/menu\n/track <tracking_token>\n/myorders";
    }

    protected function menuReply(): string
    {
        $baseUrl = rtrim((string) config('app.url', ''), '/');

        if ($baseUrl === '') {
            return 'Menu link is not configured yet.';
        }

        return "Order here: {$baseUrl}/?channel=telegram";
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
}
