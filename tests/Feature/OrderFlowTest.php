<?php

use App\Models\Customer;
use App\Models\DiningTable;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\PickupLocation;
use App\Models\SmsLog;
use App\Models\SmsNotificationSetting;
use App\Models\TableSession;
use App\Models\CustomerToken;
use App\Models\User;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

test('public menu only returns items visible in requested channel', function () {
    $webItem = MenuItem::query()->create([
        'name' => 'Web Latte',
        'description' => 'Shown on web',
        'price' => 120,
        'category' => 'Drinks',
        'is_active' => true,
        'visibility_channels' => ['web'],
    ]);

    MenuItem::query()->create([
        'name' => 'Telegram Latte',
        'description' => 'Shown on telegram',
        'price' => 125,
        'category' => 'Drinks',
        'is_active' => true,
        'visibility_channels' => ['telegram'],
    ]);

    $this->get(route('home', ['channel' => 'web']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('customer/menu')
            ->where('filters.channel', 'web')
            ->has('menuItems', 1)
            ->where('menuItems.0.id', $webItem->id)
        );
});

test('public menu pre-fills customer details from an existing token profile', function () {
    $customer = Customer::query()->create([
        'name' => 'Returning Customer',
        'phone' => '251911234567',
    ]);

    $token = CustomerToken::generateToken();

    CustomerToken::query()->create([
        'customer_id' => $customer->id,
        'token' => $token,
        'first_seen_at' => now(),
        'last_seen_at' => now(),
    ]);

    $this->get(route('home', ['customer_token' => $token]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('customer/menu')
            ->where('customerToken', $token)
            ->where('customerPrefill.name', 'Returning Customer')
            ->where('customerPrefill.phone', '251911234567')
        );
});

test('public menu does not pre-fill placeholder token profile values', function () {
    $customer = Customer::query()->create([
        'name' => 'Guest',
        'phone' => 'q1234567890abcdef123',
    ]);

    $token = CustomerToken::generateToken();

    CustomerToken::query()->create([
        'customer_id' => $customer->id,
        'token' => $token,
        'first_seen_at' => now(),
        'last_seen_at' => now(),
    ]);

    $this->get(route('home', ['customer_token' => $token]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('customer/menu')
            ->where('customerToken', $token)
            ->where('customerPrefill.name', null)
            ->where('customerPrefill.phone', null)
        );
});

test('customers can not order items hidden from the selected channel', function () {
    $hiddenFromWeb = MenuItem::query()->create([
        'name' => 'Telegram Exclusive',
        'description' => 'Only for telegram',
        'price' => 140,
        'category' => 'Drinks',
        'is_active' => true,
        'visibility_channels' => ['telegram'],
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'Test Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $this->from(route('home'))
        ->post(route('orders.store'), [
            'name' => 'Customer One',
            'phone' => '251911000000',
            'pickup_date' => now()->addDay()->toDateString(),
            'pickup_location_id' => $location->id,
            'channel' => 'web',
            'items' => [
                [
                    'menu_item_id' => $hiddenFromWeb->id,
                    'quantity' => 1,
                ],
            ],
        ])
        ->assertRedirect(route('home'))
        ->assertSessionHasErrors('items.0.menu_item_id');

    expect(Order::query()->count())->toBe(0);
});

test('customers can place an order from the public menu flow', function () {
    $menuItem = MenuItem::query()->create([
        'name' => 'Test Latte',
        'description' => 'Test drink',
        'price' => 120,
        'category' => 'Drinks',
        'is_active' => true,
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'Test Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $response = $this->post(route('orders.store'), [
        'name' => 'Customer One',
        'phone' => '251911000000',
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $location->id,
        'items' => [
            [
                'menu_item_id' => $menuItem->id,
                'quantity' => 2,
            ],
        ],
    ]);

    $order = Order::query()->first();

    expect($order)->not->toBeNull();
    expect($order->total_amount)->toEqual('240.00');
    expect($order->source_channel)->toBe('web');
    expect(Customer::query()->where('phone', '251911000000')->exists())->toBeTrue();
    expect($order->items()->count())->toBe(1);

    $response->assertRedirect(route('orders.confirmation', $order->tracking_token, false));
});

test('non-staff users can not access staff dashboard routes', function () {
    $user = User::factory()->create([
        'role' => 'customer',
    ]);

    $this->actingAs($user)
        ->get(route('staff.orders.index'))
        ->assertForbidden();
});

test('staff can filter orders by today, tomorrow, and upcoming pickup windows', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'Window Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $customer = Customer::query()->create([
        'name' => 'Window Customer',
        'phone' => '251955555555',
    ]);

    $todayOrder = $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $location->id,
        'tracking_token' => Str::random(40),
        'total_amount' => 10,
    ]);

    $tomorrowOrder = $customer->orders()->create([
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $location->id,
        'tracking_token' => Str::random(40),
        'total_amount' => 20,
    ]);

    $upcomingOrder = $customer->orders()->create([
        'pickup_date' => now()->addDays(3)->toDateString(),
        'pickup_location_id' => $location->id,
        'tracking_token' => Str::random(40),
        'total_amount' => 30,
    ]);

    $this->actingAs($staff)
        ->get(route('staff.orders.index', ['time_bucket' => 'today']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/orders')
            ->where('filters.time_bucket', 'today')
            ->has('orders.data', 1)
            ->where('orders.data.0.id', $todayOrder->id)
        );

    $this->actingAs($staff)
        ->get(route('staff.orders.index', ['time_bucket' => 'tomorrow']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/orders')
            ->where('filters.time_bucket', 'tomorrow')
            ->has('orders.data', 1)
            ->where('orders.data.0.id', $tomorrowOrder->id)
        );

    $this->actingAs($staff)
        ->get(route('staff.orders.index', ['time_bucket' => 'upcoming']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/orders')
            ->where('filters.time_bucket', 'upcoming')
            ->has('orders.data', 1)
            ->where('orders.data.0.id', $upcomingOrder->id)
        );
});

test('staff can filter orders by source channel tabs', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'Source Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $staff->pickupLocations()->sync([$location->id]);

    $webCustomer = Customer::query()->create([
        'name' => 'Web Customer',
        'phone' => '251966111111',
    ]);

    $telegramCustomer = Customer::query()->create([
        'name' => 'Telegram Customer',
        'phone' => '251966222222',
        'telegram_id' => 999001,
    ]);

    $tableCustomer = Customer::query()->create([
        'name' => 'Table Customer',
        'phone' => 'q-source-table-01',
        'telegram_id' => 999002,
    ]);

    $table = DiningTable::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Table 1',
        'qr_code' => 'source-branch-table-01',
        'is_active' => true,
    ]);

    $tableSession = TableSession::query()->create([
        'dining_table_id' => $table->id,
        'session_token' => Str::random(64),
        'started_at' => now()->subMinute(),
        'last_seen_at' => now(),
    ]);

    $webOrder = $webCustomer->orders()->create([
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $location->id,
        'source_channel' => 'web',
        'tracking_token' => Str::random(40),
        'total_amount' => 10,
    ]);

    $telegramOrder = $telegramCustomer->orders()->create([
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $location->id,
        'source_channel' => 'telegram',
        'tracking_token' => Str::random(40),
        'total_amount' => 20,
    ]);

    $tableOrder = $tableCustomer->orders()->create([
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $location->id,
        'dining_table_id' => $table->id,
        'table_session_id' => $tableSession->id,
        'source_channel' => 'table',
        'tracking_token' => Str::random(40),
        'total_amount' => 30,
    ]);

    $this->actingAs($staff)
        ->get(route('staff.orders.index', ['source_channel' => 'web']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/orders')
            ->where('filters.source_channel', 'web')
            ->has('orders.data', 1)
            ->where('orders.data.0.id', $webOrder->id)
        );

    $this->actingAs($staff)
        ->get(route('staff.orders.index', ['source_channel' => 'telegram']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/orders')
            ->where('filters.source_channel', 'telegram')
            ->has('orders.data', 1)
            ->where('orders.data.0.id', $telegramOrder->id)
        );

    $this->actingAs($staff)
        ->get(route('staff.orders.index', ['source_channel' => 'table']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/orders')
            ->where('filters.source_channel', 'table')
            ->has('orders.data', 1)
            ->where('orders.data.0.id', $tableOrder->id)
        );
});

test('staff sends ready SMS only when customer opted in for ready notification', function () {
    $customer = Customer::query()->create([
        'name' => 'Ready Customer',
        'phone' => '251911111111',
    ]);

    $menuItem = MenuItem::query()->create([
        'name' => 'Ready Coffee',
        'description' => 'Drink',
        'price' => 100,
        'category' => 'Drinks',
        'is_active' => true,
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'Ready Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $order = $customer->orders()->create([
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $location->id,
        'receipt_status' => 'approved',
        'order_status' => 'preparing',
        'tracking_token' => Str::random(40),
        'total_amount' => 100,
        'notify_when_ready' => true,
    ]);

    $order->items()->create([
        'menu_item_id' => $menuItem->id,
        'quantity' => 1,
        'price' => 100,
    ]);

    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($staff)
        ->patch(route('staff.orders.update', $order), [
            'order_status' => 'ready',
        ])
        ->assertRedirect();

    expect(SmsLog::query()->count())->toBe(1);
    expect(SmsLog::query()->first()?->message)->toContain('ready');
});

test('receipt approval and disapproval SMS requires notify_customer flag', function () {
    $customer = Customer::query()->create([
        'name' => 'Approval Customer',
        'phone' => '251922222222',
    ]);

    $menuItem = MenuItem::query()->create([
        'name' => 'Approval Coffee',
        'description' => 'Drink',
        'price' => 90,
        'category' => 'Drinks',
        'is_active' => true,
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'Approval Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $order = $customer->orders()->create([
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $location->id,
        'receipt_status' => 'pending',
        'order_status' => 'pending',
        'tracking_token' => Str::random(40),
        'total_amount' => 90,
        'notify_when_ready' => false,
    ]);

    $order->items()->create([
        'menu_item_id' => $menuItem->id,
        'quantity' => 1,
        'price' => 90,
    ]);

    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($staff)
        ->patch(route('staff.orders.update', $order), [
            'receipt_status' => 'approved',
            'notify_customer' => false,
        ])
        ->assertRedirect();

    expect(SmsLog::query()->count())->toBe(0);

    $this->actingAs($staff)
        ->patch(route('staff.orders.update', $order), [
            'receipt_status' => 'disapproved',
            'disapproval_reason' => 'Blurry image',
            'notify_customer' => true,
        ])
        ->assertRedirect();

    expect(SmsLog::query()->count())->toBe(1);
    expect(SmsLog::query()->first()?->message)->toContain('disapproved');
});

test('order created sms is skipped when event is disabled in manager settings', function () {
    SmsNotificationSetting::query()->create([
        'event_key' => 'order_created',
        'label' => 'Order Created',
        'description' => 'Send SMS after customer places a new order.',
        'is_enabled' => false,
    ]);

    $menuItem = MenuItem::query()->create([
        'name' => 'Silent Latte',
        'description' => 'No notification test',
        'price' => 120,
        'category' => 'Drinks',
        'is_active' => true,
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'Silent Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $this->post(route('orders.store'), [
        'name' => 'Muted Customer',
        'phone' => '251933333333',
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $location->id,
        'items' => [
            [
                'menu_item_id' => $menuItem->id,
                'quantity' => 1,
            ],
        ],
    ])->assertRedirect();

    expect(SmsLog::query()->count())->toBe(0);
});

test('order ready sms is skipped when ready event is disabled in manager settings', function () {
    SmsNotificationSetting::query()->create([
        'event_key' => 'order_ready',
        'label' => 'Order Ready',
        'description' => 'Send SMS when order is ready.',
        'is_enabled' => false,
    ]);

    $customer = Customer::query()->create([
        'name' => 'Ready Disabled',
        'phone' => '251944444444',
    ]);

    $menuItem = MenuItem::query()->create([
        'name' => 'Ready Silent Coffee',
        'description' => 'Drink',
        'price' => 100,
        'category' => 'Drinks',
        'is_active' => true,
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'Ready Silent Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $order = $customer->orders()->create([
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $location->id,
        'receipt_status' => 'approved',
        'order_status' => 'preparing',
        'tracking_token' => Str::random(40),
        'total_amount' => 100,
        'notify_when_ready' => true,
    ]);

    $order->items()->create([
        'menu_item_id' => $menuItem->id,
        'quantity' => 1,
        'price' => 100,
    ]);

    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($staff)
        ->patch(route('staff.orders.update', $order), [
            'order_status' => 'ready',
        ])
        ->assertRedirect();

    expect(SmsLog::query()->count())->toBe(0);
});
