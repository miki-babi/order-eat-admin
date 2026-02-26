<?php

use App\Models\Customer;
use App\Models\DiningTable;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\PickupLocation;
use App\Models\CustomerToken;
use App\Models\TableSession;
use App\Services\CustomerIdentityService;
use App\Models\User;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;
test('scanning a table qr creates a table session and shows qr menu items only', function () {
    $location = PickupLocation::query()->create([
        'name' => 'QR Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $table = DiningTable::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Table 9',
        'qr_code' => 'qr-branch-table-09',
        'is_active' => true,
    ]);

    MenuItem::query()->create([
        'name' => 'QR Flat White',
        'description' => 'Visible in QR',
        'price' => 150,
        'category' => 'Drinks',
        'is_active' => true,
        'visibility_channels' => ['qr_menu'],
    ]);

    MenuItem::query()->create([
        'name' => 'Web Only Espresso',
        'description' => 'Visible in web only',
        'price' => 120,
        'category' => 'Drinks',
        'is_active' => true,
        'visibility_channels' => ['web'],
    ]);

    $headers = [
        'X-Inertia' => 'true',
        'X-Requested-With' => 'XMLHttpRequest',
        'X-Inertia-Version' => (string) app(HandleInertiaRequests::class)->version(request()),
    ];

    $redirect = $this->withHeaders($headers)
        ->get(route('qr-menu.show', ['diningTable' => $table->qr_code]));

    expect(in_array($redirect->getStatusCode(), [302, 303, 409], true))->toBeTrue();
    $location = $redirect->headers->get('Location') ?? $redirect->headers->get('X-Inertia-Location');
    expect($location)->not->toBeNull();

    expect(TableSession::query()->count())->toBe(1);
    expect(TableSession::query()->first()?->dining_table_id)->toBe($table->id);
    expect((string) $location)->toContain($table->qr_code);
    expect((string) $location)->toContain('session=');
});

test('customers can place qr table orders linked to table and session', function () {
    $location = PickupLocation::query()->create([
        'name' => 'QR Order Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $table = DiningTable::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Table 3',
        'qr_code' => 'qr-order-table-03',
        'is_active' => true,
    ]);

    $item = MenuItem::query()->create([
        'name' => 'QR Cappuccino',
        'description' => 'QR drink',
        'price' => 200,
        'category' => 'Drinks',
        'is_active' => true,
        'visibility_channels' => ['qr_menu'],
    ]);

    $this->get(route('qr-menu.show', ['diningTable' => $table->qr_code]));

    $session = TableSession::query()->first();

    expect($session)->not->toBeNull();

    $this->post(route('qr-menu.orders.store', ['diningTable' => $table->qr_code]), [
        'table_session_token' => $session?->session_token,
        'items' => [
            [
                'menu_item_id' => $item->id,
                'quantity' => 2,
            ],
        ],
    ])->assertRedirect();

    $order = Order::query()->first();

    expect($order)->not->toBeNull();
    expect($order?->dining_table_id)->toBe($table->id);
    expect($order?->table_session_id)->toBe($session?->id);
    expect($order?->pickup_location_id)->toBe($location->id);
    expect($order?->total_amount)->toEqual('400.00');
    expect($order?->source_channel)->toBe('table');
    expect($order?->customer)->not->toBeNull();
    expect((string) $order?->customer?->phone)->toStartWith('q');
});

test('staff order queue includes table and session verification data', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'QR Queue Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $table = DiningTable::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Table 6',
        'qr_code' => 'qr-queue-table-06',
        'is_active' => true,
    ]);

    $session = TableSession::query()->create([
        'dining_table_id' => $table->id,
        'session_token' => str_repeat('a', 64),
        'started_at' => now()->subMinutes(5),
        'last_seen_at' => now(),
    ]);

    $customer = Customer::query()->create([
        'name' => 'Queue Customer',
        'phone' => '251988888888',
    ]);

    $order = $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $location->id,
        'dining_table_id' => $table->id,
        'table_session_id' => $session->id,
        'source_channel' => 'table',
        'tracking_token' => str_repeat('b', 40),
        'total_amount' => 50,
    ]);

    $this->actingAs($staff)
        ->get(route('staff.orders.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/orders')
            ->where('orders.data.0.id', $order->id)
            ->where('orders.data.0.table_name', 'Table 6')
            ->where('orders.data.0.table_session_verified', false)
        );
});

test('admin can verify a qr table session', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'QR Verify Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $table = DiningTable::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Table 1',
        'qr_code' => 'qr-verify-table-01',
        'is_active' => true,
    ]);

    $session = TableSession::query()->create([
        'dining_table_id' => $table->id,
        'session_token' => str_repeat('c', 64),
        'started_at' => now()->subMinute(),
    ]);

    $this->actingAs($admin)
        ->patch(route('staff.table-sessions.verify', $session), [
            'verified_note' => 'Confirmed on-site with staff.',
        ])
        ->assertRedirect();

    $session->refresh();

    expect($session->verified_by_user_id)->toBe($admin->id);
    expect($session->verified_at)->not->toBeNull();
    expect($session->verified_note)->toBe('Confirmed on-site with staff.');
});

test('customer token keeps order history between qr and web flows', function () {
    $location = PickupLocation::query()->create([
        'name' => 'Identity Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $table = DiningTable::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Table 2',
        'qr_code' => 'identity-table-02',
        'is_active' => true,
    ]);

    $item = MenuItem::query()->create([
        'name' => 'Identity Latte',
        'description' => 'Token continuity item',
        'price' => 180,
        'category' => 'Drinks',
        'is_active' => true,
        'visibility_channels' => ['web', 'qr_menu'],
    ]);

    $customerToken = CustomerToken::generateToken();

    $qrSession = TableSession::query()->create([
        'dining_table_id' => $table->id,
        'session_token' => Str::random(64),
        'started_at' => now()->subMinute(),
        'last_seen_at' => now(),
    ]);

    $this->post(route('qr-menu.orders.store', ['diningTable' => $table->qr_code]), [
        'customer_token' => $customerToken,
        'table_session_token' => $qrSession->session_token,
        'items' => [
            [
                'menu_item_id' => $item->id,
                'quantity' => 1,
            ],
        ],
    ])->assertRedirect();

    $this->post(route('orders.store'), [
        'customer_token' => $customerToken,
        'name' => 'Token Guest',
        'phone' => '251977000001',
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $location->id,
        'items' => [
            [
                'menu_item_id' => $item->id,
                'quantity' => 2,
            ],
        ],
    ])->assertRedirect();

    $tokenRecord = CustomerToken::query()
        ->with('customer')
        ->where('token', $customerToken)
        ->first();
    $customer = $tokenRecord?->customer;

    expect($tokenRecord)->not->toBeNull();
    expect($customer)->not->toBeNull();
    expect($customer?->phone)->toBe('+251977000001');
    expect($customer?->orders()->count())->toBe(2);
    expect(
        $customer?->orders()
            ->where('source_channel', Order::SOURCE_TABLE)
            ->exists(),
    )->toBeTrue();
    expect(
        $customer?->orders()
            ->where('source_channel', Order::SOURCE_WEB)
            ->exists(),
    )->toBeTrue();
});

test('customer token merges existing phone history into token profile', function () {
    $location = PickupLocation::query()->create([
        'name' => 'Merge Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $table = DiningTable::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Table 4',
        'qr_code' => 'merge-table-04',
        'is_active' => true,
    ]);

    $item = MenuItem::query()->create([
        'name' => 'Merge Cappuccino',
        'description' => 'Merge flow item',
        'price' => 210,
        'category' => 'Drinks',
        'is_active' => true,
        'visibility_channels' => ['web', 'qr_menu'],
    ]);

    $legacyCustomer = Customer::query()->create([
        'name' => 'Legacy Profile',
        'phone' => '251977000009',
    ]);
    $canonicalToken = CustomerToken::generateToken();

    CustomerToken::query()->create([
        'customer_id' => $legacyCustomer->id,
        'token' => $canonicalToken,
        'first_seen_at' => now(),
        'last_seen_at' => now(),
    ]);

    $legacyCustomer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $location->id,
        'source_channel' => Order::SOURCE_WEB,
        'tracking_token' => Str::random(40),
        'total_amount' => 99,
    ]);

    $customerToken = CustomerToken::generateToken();

    $qrSession = TableSession::query()->create([
        'dining_table_id' => $table->id,
        'session_token' => Str::random(64),
        'started_at' => now()->subMinute(),
        'last_seen_at' => now(),
    ]);

    $this->post(route('qr-menu.orders.store', ['diningTable' => $table->qr_code]), [
        'customer_token' => $customerToken,
        'table_session_token' => $qrSession->session_token,
        'items' => [
            [
                'menu_item_id' => $item->id,
                'quantity' => 1,
            ],
        ],
    ])->assertRedirect();

    $response = $this->post(route('orders.store'), [
        'customer_token' => $customerToken,
        'name' => 'Unified Profile',
        'phone' => '251977000009',
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $location->id,
        'items' => [
            [
                'menu_item_id' => $item->id,
                'quantity' => 2,
            ],
        ],
    ]);

    $response->assertCookie(CustomerIdentityService::COOKIE_NAME);

    $customer = $legacyCustomer->fresh();

    expect($customer)->not->toBeNull();
    expect($customer?->name)->toBe('Unified Profile');
    expect($customer?->phone)->toBe('+251977000009');
    expect(Customer::query()->count())->toBe(1);
    expect(
        CustomerToken::query()
            ->where('token', $canonicalToken)
            ->where('customer_id', $customer?->id)
            ->exists(),
    )->toBeTrue();
    expect(
        CustomerToken::query()
            ->where('token', $customerToken)
            ->where('customer_id', $customer?->id)
            ->exists(),
    )->toBeTrue();
    expect($customer?->orders()->count())->toBe(3);
});
