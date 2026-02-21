<?php

use App\Models\Customer;
use App\Models\DiningTable;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\PickupLocation;
use App\Models\TableSession;
use App\Models\User;
use App\Http\Middleware\HandleInertiaRequests;
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
