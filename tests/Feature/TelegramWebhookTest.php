<?php

use App\Models\Customer;
use App\Models\FeatureToggle;
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
        $replyMarkup = is_array($data) ? ($data['reply_markup'] ?? null) : null;
        $decodedMarkup = is_string($replyMarkup) ? json_decode($replyMarkup, true) : null;

        return is_array($data)
            && str_contains($request->url(), '/sendMessage')
            && (string) ($data['chat_id'] ?? '') === '99887766'
            && str_contains((string) ($data['text'] ?? ''), 'Please share your phone number')
            && is_array($decodedMarkup)
            && data_get($decodedMarkup, 'keyboard.0.0.request_contact') === true;
    });
});

test('telegram webhook sends inline miniapp launch when customer already has a phone', function () {
    Config::set('telegram.webhook_secret', null);
    Config::set('telegram.bot_token', 'test-bot-token');
    Config::set('app.url', 'https://example.test');

    Customer::query()->create([
        'name' => 'Known Telegram Customer',
        'phone' => '251911555000',
        'telegram_id' => 55667788,
        'telegram_username' => 'known_guest',
    ]);

    Http::fake([
        'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
    ]);

    $payload = [
        'update_id' => 10002,
        'message' => [
            'message_id' => 2,
            'date' => now()->timestamp,
            'chat' => [
                'id' => 99887767,
                'type' => 'private',
            ],
            'from' => [
                'id' => 55667788,
                'is_bot' => false,
                'first_name' => 'Known',
                'last_name' => 'Guest',
                'username' => 'known_guest',
            ],
            'text' => '/start',
        ],
    ];

    $this->postJson(route('api.telegram.webhook'), $payload)
        ->assertOk()
        ->assertJson([
            'ok' => true,
        ]);

    Http::assertSent(function ($request): bool {
        $data = $request->data();
        $replyMarkup = is_array($data) ? ($data['reply_markup'] ?? null) : null;
        $decodedMarkup = is_string($replyMarkup) ? json_decode($replyMarkup, true) : null;

        return is_array($data)
            && str_contains($request->url(), '/sendMessage')
            && (string) ($data['chat_id'] ?? '') === '99887767'
            && str_contains((string) ($data['text'] ?? ''), 'Welcome')
            && is_array($decodedMarkup)
            && data_get($decodedMarkup, 'inline_keyboard.0.0.text') === 'Order'
            && data_get($decodedMarkup, 'inline_keyboard.0.0.web_app.url') === 'https://example.test/telegram/menu';
    });
});

test('telegram webhook stores phone number when contact is shared', function () {
    Config::set('telegram.webhook_secret', null);
    Config::set('telegram.bot_token', 'test-bot-token');
    Config::set('app.url', 'https://example.test');

    Http::fake([
        'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
    ]);

    $startPayload = [
        'update_id' => 10003,
        'message' => [
            'message_id' => 3,
            'date' => now()->timestamp,
            'chat' => [
                'id' => 99887768,
                'type' => 'private',
            ],
            'from' => [
                'id' => 22334455,
                'is_bot' => false,
                'first_name' => 'Contact',
                'last_name' => 'Guest',
                'username' => 'contact_guest',
            ],
            'text' => '/start',
        ],
    ];

    $contactPayload = [
        'update_id' => 10004,
        'message' => [
            'message_id' => 4,
            'date' => now()->timestamp,
            'chat' => [
                'id' => 99887768,
                'type' => 'private',
            ],
            'from' => [
                'id' => 22334455,
                'is_bot' => false,
                'first_name' => 'Contact',
                'last_name' => 'Guest',
                'username' => 'contact_guest',
            ],
            'contact' => [
                'phone_number' => '+251911222333',
                'first_name' => 'Contact',
                'user_id' => 22334455,
            ],
        ],
    ];

    $this->postJson(route('api.telegram.webhook'), $startPayload)->assertOk();

    $this->postJson(route('api.telegram.webhook'), $contactPayload)
        ->assertOk()
        ->assertJson([
            'ok' => true,
        ]);

    $customer = Customer::query()->where('telegram_id', 22334455)->first();

    expect($customer)->not->toBeNull();
    expect($customer?->phone)->toBe('+251911222333');

    Http::assertSentCount(3);

    Http::assertSent(function ($request): bool {
        $data = $request->data();
        $replyMarkup = is_array($data) ? ($data['reply_markup'] ?? null) : null;
        $decodedMarkup = is_string($replyMarkup) ? json_decode($replyMarkup, true) : null;

        return is_array($data)
            && str_contains($request->url(), '/sendMessage')
            && str_contains((string) ($data['text'] ?? ''), 'phone number is saved')
            && is_array($decodedMarkup)
            && data_get($decodedMarkup, 'remove_keyboard') === true;
    });

    Http::assertSent(function ($request): bool {
        $data = $request->data();
        $replyMarkup = is_array($data) ? ($data['reply_markup'] ?? null) : null;
        $decodedMarkup = is_string($replyMarkup) ? json_decode($replyMarkup, true) : null;

        return is_array($data)
            && str_contains($request->url(), '/sendMessage')
            && str_contains((string) ($data['text'] ?? ''), 'Tap the button below to order.')
            && is_array($decodedMarkup)
            && data_get($decodedMarkup, 'inline_keyboard.0.0.text') === 'Order'
            && data_get($decodedMarkup, 'inline_keyboard.0.0.web_app.url') === 'https://example.test/telegram/menu';
    });
});

test('telegram webhook uses admin miniapp button settings', function () {
    Config::set('telegram.webhook_secret', null);
    Config::set('telegram.bot_token', 'test-bot-token');
    Config::set('app.url', 'https://example.test');

    FeatureToggle::query()->updateOrCreate(
        ['feature_key' => 'telegram_bot_miniapp_launch'],
        [
            'name' => 'Telegram Miniapp Launch Button',
            'description' => 'Inline launch controls',
            'is_enabled' => true,
            'lock_message' => 'Order Drinks',
            'help_url' => 'https://miniapp.example.test/launch',
        ],
    );

    Customer::query()->create([
        'name' => 'Admin Config Customer',
        'phone' => '251911555111',
        'telegram_id' => 12345123,
        'telegram_username' => 'admin_cfg_guest',
    ]);

    Http::fake([
        'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
    ]);

    $payload = [
        'update_id' => 10005,
        'message' => [
            'message_id' => 5,
            'date' => now()->timestamp,
            'chat' => [
                'id' => 44001122,
                'type' => 'private',
            ],
            'from' => [
                'id' => 12345123,
                'is_bot' => false,
                'first_name' => 'Admin',
                'last_name' => 'Config',
                'username' => 'admin_cfg_guest',
            ],
            'text' => '/start',
        ],
    ];

    $this->postJson(route('api.telegram.webhook'), $payload)
        ->assertOk()
        ->assertJson([
            'ok' => true,
        ]);

    Http::assertSent(function ($request): bool {
        $data = $request->data();
        $replyMarkup = is_array($data) ? ($data['reply_markup'] ?? null) : null;
        $decodedMarkup = is_string($replyMarkup) ? json_decode($replyMarkup, true) : null;

        return is_array($data)
            && str_contains($request->url(), '/sendMessage')
            && (string) ($data['chat_id'] ?? '') === '44001122'
            && is_array($decodedMarkup)
            && data_get($decodedMarkup, 'inline_keyboard.0.0.text') === 'Order Drinks'
            && data_get($decodedMarkup, 'inline_keyboard.0.0.web_app.url') === 'https://miniapp.example.test/launch';
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

test('telegram miniapp identity endpoint rejects invalid init data signature', function () {
    Config::set('telegram.bot_token', 'test-bot-token');

    $this->postJson(route('api.telegram.miniapp.identity'), [
        'init_data' => 'query_id=abc123&user=%7B%22id%22%3A12345%7D&auth_date=1700000000&hash=invalid-hash',
    ])
        ->assertUnprocessable()
        ->assertJson([
            'ok' => false,
            'error' => 'invalid_init_data_signature',
        ]);
});

test('telegram miniapp identity endpoint auto-fills existing customer by telegram id', function () {
    Config::set('telegram.bot_token', 'test-bot-token');

    $customer = Customer::query()->create([
        'name' => 'MiniApp Existing Customer',
        'phone' => '251933445566',
        'telegram_id' => 88990011,
        'telegram_username' => 'miniapp_existing',
    ]);

    $user = [
        'id' => 88990011,
        'first_name' => 'Mini',
        'last_name' => 'App',
        'username' => 'miniapp_existing',
    ];

    $signedFields = [
        'auth_date' => (string) now()->timestamp,
        'query_id' => 'AAEAAAE',
        'user' => json_encode($user, JSON_THROW_ON_ERROR),
    ];

    ksort($signedFields, SORT_STRING);

    $dataCheckString = collect($signedFields)
        ->map(fn (string $value, string $key): string => $key.'='.$value)
        ->implode("\n");
    $secretKey = hash_hmac('sha256', 'test-bot-token', 'WebAppData', true);
    $hash = hash_hmac('sha256', $dataCheckString, $secretKey);
    $initData = http_build_query(array_merge($signedFields, [
        'hash' => $hash,
    ]));
    $expectedToken = 'tg_'.substr(hash('sha256', 'telegram:88990011'), 0, 60);

    $this->postJson(route('api.telegram.miniapp.identity'), [
        'init_data' => $initData,
    ])
        ->assertOk()
        ->assertJson([
            'ok' => true,
            'customer' => [
                'customer_token' => $expectedToken,
                'name' => 'MiniApp Existing Customer',
                'phone' => '251933445566',
                'telegram_id' => 88990011,
                'telegram_username' => 'miniapp_existing',
            ],
        ]);

    expect($customer->fresh()?->name)->toBe('MiniApp Existing Customer');
    expect($customer->fresh()?->tokens()->where('token', $expectedToken)->exists())->toBeTrue();
});
