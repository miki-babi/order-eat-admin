<?php

use App\Models\Customer;
use App\Models\FeatureToggle;
use App\Models\Order;
use App\Models\PickupLocation;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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

test('telegram webhook sends inline command shortcuts for unknown message', function () {
    Config::set('telegram.webhook_secret', null);
    Config::set('telegram.bot_token', 'test-bot-token');

    Http::fake([
        'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
    ]);

    $payload = [
        'update_id' => 99001,
        'message' => [
            'message_id' => 21,
            'date' => now()->timestamp,
            'chat' => [
                'id' => 11220011,
                'type' => 'private',
            ],
            'from' => [
                'id' => 11220011,
                'is_bot' => false,
                'first_name' => 'Unknown',
                'username' => 'unknown_guest',
            ],
            'text' => '/what',
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
            && (string) ($data['text'] ?? '') === 'Choose a command:'
            && data_get($decodedMarkup, 'inline_keyboard.0.0.text') === '/start'
            && data_get($decodedMarkup, 'inline_keyboard.0.0.style') === 'primary'
            && data_get($decodedMarkup, 'inline_keyboard.2.1.text') === '/track <123>';
    });
});

test('telegram webhook handles inline callback command buttons', function () {
    Config::set('telegram.webhook_secret', null);
    Config::set('telegram.bot_token', 'test-bot-token');
    Config::set('app.url', 'https://example.test');

    Customer::query()->create([
        'name' => 'Callback Command User',
        'phone' => '251911000303',
        'telegram_id' => 77007700,
        'telegram_username' => 'callback_command_user',
    ]);

    Http::fake([
        'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
    ]);

    $payload = [
        'update_id' => 99002,
        'callback_query' => [
            'id' => 'callback-query-1',
            'from' => [
                'id' => 77007700,
                'is_bot' => false,
                'first_name' => 'Callback',
                'username' => 'callback_command_user',
            ],
            'message' => [
                'message_id' => 88,
                'chat' => [
                    'id' => 44556677,
                    'type' => 'private',
                ],
            ],
            'data' => 'cmd:history',
        ],
    ];

    $this->postJson(route('api.telegram.webhook'), $payload)
        ->assertOk()
        ->assertJson([
            'ok' => true,
        ]);

    Http::assertSent(function ($request): bool {
        $data = $request->data();

        return is_array($data)
            && str_contains($request->url(), '/answerCallbackQuery')
            && (string) ($data['callback_query_id'] ?? '') === 'callback-query-1';
    });

    Http::assertSent(function ($request): bool {
        $data = $request->data();
        $replyMarkup = is_array($data) ? ($data['reply_markup'] ?? null) : null;
        $decodedMarkup = is_string($replyMarkup) ? json_decode($replyMarkup, true) : null;

        return is_array($data)
            && str_contains($request->url(), '/sendMessage')
            && str_contains((string) ($data['text'] ?? ''), 'order history')
            && data_get($decodedMarkup, 'inline_keyboard.0.0.text') === 'Order History';
    });
});

test('telegram webhook logs masked payload when payload logging is enabled', function () {
    Config::set('telegram.webhook_secret', null);
    Config::set('telegram.bot_token', 'test-bot-token');
    Config::set('telegram.log_webhook_payload', true);
    Config::set('telegram.log_webhook_headers', true);

    Log::spy();

    Http::fake([
        'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
    ]);

    $payload = [
        'update_id' => 10020,
        'message' => [
            'message_id' => 20,
            'date' => now()->timestamp,
            'chat' => [
                'id' => 99887790,
                'type' => 'private',
            ],
            'from' => [
                'id' => 55660077,
                'is_bot' => false,
                'first_name' => 'Masked',
                'username' => 'masked_user',
            ],
            'contact' => [
                'phone_number' => '+251911222333',
                'first_name' => 'Masked',
                'user_id' => 55660077,
            ],
        ],
    ];

    $this->postJson(
        route('api.telegram.webhook'),
        $payload,
        [
            'X-Telegram-Bot-Api-Secret-Token' => 'super-secret-token',
        ],
    )
        ->assertOk()
        ->assertJson([
            'ok' => true,
        ]);

    Log::shouldHaveReceived('info')
        ->withArgs(function (string $message, array $context): bool {
            $loggedPhone = data_get($context, 'payload.message.contact.phone_number');
            $loggedSecretHeader = data_get($context, 'headers.x-telegram-bot-api-secret-token.0');

            return $message === 'telegram.webhook.received'
                && data_get($context, 'payload.update_id') === 10020
                && is_string($loggedPhone)
                && $loggedPhone !== '+251911222333'
                && str_contains($loggedPhone, '*')
                && is_string($loggedSecretHeader)
                && $loggedSecretHeader !== 'super-secret-token'
                && str_contains($loggedSecretHeader, '*');
        })
        ->once();
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

test('telegram webhook retries without style when telegram api rejects style field', function () {
    Config::set('telegram.webhook_secret', null);
    Config::set('telegram.bot_token', 'test-bot-token');

    Http::fake([
        'https://api.telegram.org/*' => Http::sequence()
            ->push([
                'ok' => false,
                'error_code' => 400,
                'description' => "Bad Request: can't parse reply keyboard button",
            ], 200)
            ->push(['ok' => true], 200),
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

    Http::assertSentCount(2);

    Http::assertSent(function ($request): bool {
        $data = $request->data();
        $replyMarkup = is_array($data) ? ($data['reply_markup'] ?? null) : null;
        $decodedMarkup = is_string($replyMarkup) ? json_decode($replyMarkup, true) : null;

        return is_array($data)
            && str_contains($request->url(), '/sendMessage')
            && data_get($decodedMarkup, 'keyboard.0.0.style') === 'primary'
            && data_get($decodedMarkup, 'keyboard.0.0.request_contact') === true;
    });

    Http::assertSent(function ($request): bool {
        $data = $request->data();
        $replyMarkup = is_array($data) ? ($data['reply_markup'] ?? null) : null;
        $decodedMarkup = is_string($replyMarkup) ? json_decode($replyMarkup, true) : null;

        return is_array($data)
            && str_contains($request->url(), '/sendMessage')
            && data_get($decodedMarkup, 'keyboard.0.0.style') === null
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

test('telegram webhook rewrites same-origin miniapp launch url to dedicated telegram menu route', function () {
    Config::set('telegram.webhook_secret', null);
    Config::set('telegram.bot_token', 'test-bot-token');
    Config::set('app.url', 'https://example.test');

    FeatureToggle::query()->updateOrCreate(
        ['feature_key' => 'telegram_bot_miniapp_launch'],
        [
            'name' => 'Telegram Miniapp Launch Button',
            'description' => 'Inline launch controls',
            'is_enabled' => true,
            'lock_message' => 'Order',
            'help_url' => 'https://example.test/',
        ],
    );

    Customer::query()->create([
        'name' => 'Same Origin Launch User',
        'phone' => '251911121212',
        'telegram_id' => 88991234,
        'telegram_username' => 'same_origin_launch',
    ]);

    Http::fake([
        'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
    ]);

    $payload = [
        'update_id' => 100051,
        'message' => [
            'message_id' => 51,
            'date' => now()->timestamp,
            'chat' => [
                'id' => 44001123,
                'type' => 'private',
            ],
            'from' => [
                'id' => 88991234,
                'is_bot' => false,
                'first_name' => 'Origin',
                'last_name' => 'User',
                'username' => 'same_origin_launch',
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
            && (string) ($data['chat_id'] ?? '') === '44001123'
            && is_array($decodedMarkup)
            && data_get($decodedMarkup, 'inline_keyboard.0.0.text') === 'Order'
            && data_get($decodedMarkup, 'inline_keyboard.0.0.web_app.url') === 'https://example.test/telegram/menu';
    });
});

test('telegram webhook replies with tracking details for customer order id', function () {
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
            'text' => '/track '.$order->id,
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

test('telegram webhook opens active orders miniapp on /track command', function () {
    Config::set('telegram.webhook_secret', null);
    Config::set('telegram.bot_token', 'test-bot-token');
    Config::set('app.url', 'https://example.test');

    Customer::query()->create([
        'name' => 'Track Command Customer',
        'phone' => '251911000101',
        'telegram_id' => 909001,
        'telegram_username' => 'track_command_user',
    ]);

    Http::fake([
        'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
    ]);

    $payload = [
        'update_id' => 10012,
        'message' => [
            'message_id' => 13,
            'date' => now()->timestamp,
            'chat' => [
                'id' => 70110023,
                'type' => 'private',
            ],
            'from' => [
                'id' => 909001,
                'is_bot' => false,
                'first_name' => 'Track',
                'username' => 'track_command_user',
            ],
            'text' => '/track',
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
            && str_contains((string) ($data['text'] ?? ''), 'active Telegram orders')
            && is_array($decodedMarkup)
            && data_get($decodedMarkup, 'inline_keyboard.0.0.text') === 'Track Active Orders'
            && data_get($decodedMarkup, 'inline_keyboard.0.0.web_app.url') === 'https://example.test/telegram/orders?scope=active';
    });
});

test('telegram webhook returns telegram user id on /id command', function () {
    Config::set('telegram.webhook_secret', null);
    Config::set('telegram.bot_token', 'test-bot-token');

    Customer::query()->create([
        'name' => 'Id Command Customer',
        'phone' => '251911000404',
        'telegram_id' => 909003,
        'telegram_username' => 'id_command_user',
    ]);

    Http::fake([
        'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
    ]);

    $payload = [
        'update_id' => 100121,
        'message' => [
            'message_id' => 130,
            'date' => now()->timestamp,
            'chat' => [
                'id' => 701100230,
                'type' => 'private',
            ],
            'from' => [
                'id' => 909003,
                'is_bot' => false,
                'first_name' => 'Id',
                'username' => 'id_command_user',
            ],
            'text' => '/id',
        ],
    ];

    $this->postJson(route('api.telegram.webhook'), $payload)
        ->assertOk()
        ->assertJson([
            'ok' => true,
        ]);

    Http::assertSent(function ($request): bool {
        $data = $request->data();

        return is_array($data)
            && str_contains($request->url(), '/sendMessage')
            && (string) ($data['chat_id'] ?? '') === '701100230'
            && (string) ($data['text'] ?? '') === 'Your Telegram user ID: 909003';
    });
});

test('telegram webhook opens history miniapp on /history command', function () {
    Config::set('telegram.webhook_secret', null);
    Config::set('telegram.bot_token', 'test-bot-token');
    Config::set('app.url', 'https://example.test');

    Customer::query()->create([
        'name' => 'History Command Customer',
        'phone' => '251911000202',
        'telegram_id' => 909002,
        'telegram_username' => 'history_command_user',
    ]);

    Http::fake([
        'https://api.telegram.org/*' => Http::response(['ok' => true], 200),
    ]);

    $payload = [
        'update_id' => 10013,
        'message' => [
            'message_id' => 14,
            'date' => now()->timestamp,
            'chat' => [
                'id' => 70110024,
                'type' => 'private',
            ],
            'from' => [
                'id' => 909002,
                'is_bot' => false,
                'first_name' => 'History',
                'username' => 'history_command_user',
            ],
            'text' => '/history',
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
            && str_contains((string) ($data['text'] ?? ''), 'order history')
            && is_array($decodedMarkup)
            && data_get($decodedMarkup, 'inline_keyboard.0.0.text') === 'Order History'
            && data_get($decodedMarkup, 'inline_keyboard.0.0.web_app.url') === 'https://example.test/telegram/orders?scope=history';
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

test('telegram miniapp orders endpoint returns scoped telegram history', function () {
    Config::set('telegram.bot_token', 'test-bot-token');

    $customer = Customer::query()->create([
        'name' => 'Orders Scope Customer',
        'phone' => '251933000111',
        'telegram_id' => 77889900,
        'telegram_username' => 'orders_scope_user',
    ]);

    $otherCustomer = Customer::query()->create([
        'name' => 'Other Telegram Customer',
        'phone' => '251933000222',
        'telegram_id' => 66778899,
        'telegram_username' => 'other_scope_user',
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'Orders Scope Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $activeOrder = $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $location->id,
        'source_channel' => Order::SOURCE_TELEGRAM,
        'order_status' => 'preparing',
        'receipt_status' => 'approved',
        'tracking_token' => str_repeat('a', 40),
        'total_amount' => 150,
    ]);

    $completedOrder = $customer->orders()->create([
        'pickup_date' => now()->subDay()->toDateString(),
        'pickup_location_id' => $location->id,
        'source_channel' => Order::SOURCE_TELEGRAM,
        'order_status' => 'completed',
        'receipt_status' => 'approved',
        'tracking_token' => str_repeat('b', 40),
        'total_amount' => 250,
    ]);

    $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $location->id,
        'source_channel' => Order::SOURCE_WEB,
        'order_status' => 'pending',
        'receipt_status' => 'pending',
        'tracking_token' => str_repeat('c', 40),
        'total_amount' => 300,
    ]);

    $otherCustomer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $location->id,
        'source_channel' => Order::SOURCE_TELEGRAM,
        'order_status' => 'pending',
        'receipt_status' => 'pending',
        'tracking_token' => str_repeat('d', 40),
        'total_amount' => 350,
    ]);

    $user = [
        'id' => 77889900,
        'first_name' => 'Orders',
        'last_name' => 'Scope',
        'username' => 'orders_scope_user',
    ];

    $signedFields = [
        'auth_date' => (string) now()->timestamp,
        'query_id' => 'AAEAAAF',
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

    $this->postJson(route('api.telegram.miniapp.orders'), [
        'init_data' => $initData,
        'scope' => 'active',
    ])
        ->assertOk()
        ->assertJson([
            'ok' => true,
            'scope' => 'active',
            'meta' => [
                'active_orders_count' => 1,
                'history_orders_count' => 2,
            ],
        ])
        ->assertJsonCount(1, 'orders')
        ->assertJsonPath('orders.0.id', $activeOrder->id);

    $this->postJson(route('api.telegram.miniapp.orders'), [
        'init_data' => $initData,
        'scope' => 'history',
    ])
        ->assertOk()
        ->assertJson([
            'ok' => true,
            'scope' => 'history',
        ])
        ->assertJsonCount(2, 'orders');

    expect(Order::query()->where('tracking_token', str_repeat('c', 40))->exists())->toBeTrue();
    expect($completedOrder->fresh())->not->toBeNull();
});
