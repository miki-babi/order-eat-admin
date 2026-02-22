<?php

use App\Models\Customer;
use App\Models\Order;
use App\Models\PickupLocation;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

test('telegram webhook rejects invalid secret token', function () {
    Config::set('telegram.validate_webhook_secret', true);
    Config::set('telegram.webhook_secret', 'expected-secret');

    Http::fake();

    $this->postJson(
        route('api.telegram.webhook'),
        [
            'update_id' => 1,
        ],
        [
            'X-Telegram-Bot-Api-Secret-Token' => 'wrong-secret',
        ],
    )->assertForbidden();

    Http::assertNothingSent();
});

test('telegram webhook ignores updates without message payload', function () {
    Config::set('telegram.validate_webhook_secret', false);

    Http::fake();

    $this->postJson(route('api.telegram.webhook'), [
        'update_id' => 777,
        'callback_query' => [
            'id' => 'abc123',
        ],
    ])
        ->assertOk()
        ->assertJson([
            'ok' => true,
            'ignored' => true,
        ]);

    Http::assertNothingSent();
});

test('telegram webhook creates telegram customer and sends start response', function () {
    Config::set('telegram.webhook_secret', null);
    Config::set('telegram.bot_token', 'test-bot-token');

    Http::fake([
        'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
    ]);

    $payload = [
        'update_id' => 10001,
        'message' => [
            'message_id' => 1,
            'date' => now()->timestamp,
            'chat' => [
                'id' => 99887766,
                'type' => 'private',
            ],
            'from' => [
                'id' => 11223344,
                'is_bot' => false,
                'first_name' => 'Alex',
                'last_name' => 'Guest',
                'username' => 'alex_guest',
            ],
            'text' => '/start',
        ],
    ];

    $this->postJson(route('api.telegram.webhook'), $payload)
        ->assertOk()
        ->assertJson([
            'ok' => true,
        ]);

    $customer = Customer::query()
        ->where('telegram_id', 11223344)
        ->first();

    expect($customer)->not->toBeNull();
    expect($customer?->telegram_username)->toBe('alex_guest');
    expect($customer?->tokens()->exists())->toBeTrue();
    expect($customer?->tokens()->where('last_seen_channel', Order::SOURCE_TELEGRAM)->exists())->toBeTrue();

    Http::assertSent(function ($request): bool {
        $data = $request->data();

        return is_array($data)
            && str_contains($request->url(), '/sendMessage')
            && (string) ($data['chat_id'] ?? '') === '99887766'
            && str_contains((string) ($data['text'] ?? ''), 'Welcome');
    });
});

test('telegram webhook replies with tracking details for customer order', function () {
    Config::set('telegram.webhook_secret', null);
    Config::set('telegram.bot_token', 'test-bot-token');
    Config::set('app.url', 'https://example.test');

    Http::fake([
        'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
    ]);

    $startPayload = [
        'update_id' => 10010,
        'message' => [
            'message_id' => 11,
            'date' => now()->timestamp,
            'chat' => [
                'id' => 70110022,
                'type' => 'private',
            ],
            'from' => [
                'id' => 300400500,
                'is_bot' => false,
                'first_name' => 'Tedi',
                'username' => 'tedi_guest',
            ],
            'text' => '/start',
        ],
    ];

    $this->postJson(route('api.telegram.webhook'), $startPayload)->assertOk();

    $customer = Customer::query()->where('telegram_id', 300400500)->firstOrFail();

    $location = PickupLocation::query()->create([
        'name' => 'Telegram Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $order = $customer->orders()->create([
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $location->id,
        'source_channel' => Order::SOURCE_TELEGRAM,
        'tracking_token' => str_repeat('z', 40),
        'total_amount' => 350,
    ]);

    $trackPayload = [
        'update_id' => 10011,
        'message' => [
            'message_id' => 12,
            'date' => now()->timestamp,
            'chat' => [
                'id' => 70110022,
                'type' => 'private',
            ],
            'from' => [
                'id' => 300400500,
                'is_bot' => false,
                'first_name' => 'Tedi',
                'username' => 'tedi_guest',
            ],
            'text' => '/track '.$order->tracking_token,
        ],
    ];

    $this->postJson(route('api.telegram.webhook'), $trackPayload)
        ->assertOk()
        ->assertJson([
            'ok' => true,
        ]);

    Http::assertSent(function ($request) use ($order): bool {
        $data = $request->data();

        return is_array($data)
            && str_contains($request->url(), '/sendMessage')
            && str_contains((string) ($data['text'] ?? ''), "Order #{$order->id}")
            && str_contains((string) ($data['text'] ?? ''), route('orders.track', $order->tracking_token));
    });
});
