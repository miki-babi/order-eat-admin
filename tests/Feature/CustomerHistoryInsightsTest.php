<?php

use App\Models\Customer;
use App\Models\MenuItem;
use App\Models\PickupLocation;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

test('staff customer history includes source mix, top branch, frequent times, and ordered items', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $branchA = PickupLocation::query()->create([
        'name' => 'Bole',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $branchB = PickupLocation::query()->create([
        'name' => 'Piassa',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $staff->pickupLocations()->sync([$branchA->id, $branchB->id]);

    $customer = Customer::query()->create([
        'name' => 'History Customer',
        'phone' => '251977777777',
        'telegram_username' => 'history_guest',
    ]);

    $latte = MenuItem::query()->create([
        'name' => 'Latte',
        'description' => 'Drink',
        'price' => 120,
        'category' => 'Drinks',
        'is_active' => true,
    ]);

    $muffin = MenuItem::query()->create([
        'name' => 'Muffin',
        'description' => 'Pastry',
        'price' => 80,
        'category' => 'Pastries',
        'is_active' => true,
    ]);

    $webOrder = $customer->orders()->create([
        'pickup_date' => '2026-01-05',
        'pickup_location_id' => $branchA->id,
        'source_channel' => 'web',
        'tracking_token' => Str::random(40),
        'total_amount' => 240,
    ]);

    $telegramOrder = $customer->orders()->create([
        'pickup_date' => '2026-01-06',
        'pickup_location_id' => $branchA->id,
        'source_channel' => 'telegram',
        'tracking_token' => Str::random(40),
        'total_amount' => 240,
    ]);

    $tableOrder = $customer->orders()->create([
        'pickup_date' => '2026-01-07',
        'pickup_location_id' => $branchB->id,
        'source_channel' => 'table',
        'tracking_token' => Str::random(40),
        'total_amount' => 80,
    ]);

    $webOrder->items()->create([
        'menu_item_id' => $latte->id,
        'quantity' => 2,
        'price' => 120,
    ]);

    $telegramOrder->items()->create([
        'menu_item_id' => $latte->id,
        'quantity' => 2,
        'price' => 120,
    ]);

    $tableOrder->items()->create([
        'menu_item_id' => $muffin->id,
        'quantity' => 1,
        'price' => 80,
    ]);

    DB::table('orders')
        ->where('id', $webOrder->id)
        ->update([
            'created_at' => '2026-01-05 09:15:00',
            'updated_at' => '2026-01-05 09:15:00',
        ]);

    DB::table('orders')
        ->where('id', $telegramOrder->id)
        ->update([
            'created_at' => '2026-01-06 09:45:00',
            'updated_at' => '2026-01-06 09:45:00',
        ]);

    DB::table('orders')
        ->where('id', $tableOrder->id)
        ->update([
            'created_at' => '2026-01-07 19:05:00',
            'updated_at' => '2026-01-07 19:05:00',
        ]);

    $this->actingAs($staff)
        ->get(route('staff.customers.index', ['customer_id' => $customer->id]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/customers')
            ->where('selectedCustomer.id', $customer->id)
            ->where('selectedCustomer.source_summary.total', 3)
            ->where('selectedCustomer.source_summary.web', 1)
            ->where('selectedCustomer.source_summary.telegram', 1)
            ->where('selectedCustomer.source_summary.table', 1)
            ->where('selectedCustomer.top_branch.pickup_location', 'Bole')
            ->where('selectedCustomer.top_branch.orders_count', 2)
            ->where('selectedCustomer.top_order_hours.0.label', '09:00-10:00')
            ->where('selectedCustomer.top_order_hours.0.orders_count', 2)
            ->where('selectedCustomer.top_items.0.name', 'Latte')
            ->where('selectedCustomer.top_items.0.quantity', 4)
            ->has('selectedCustomer.orders.0.items')
        );
});

test('staff customer insights respect branch access scope', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $allowedBranch = PickupLocation::query()->create([
        'name' => 'Allowed Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $hiddenBranch = PickupLocation::query()->create([
        'name' => 'Hidden Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $staff->pickupLocations()->sync([$allowedBranch->id]);

    $customer = Customer::query()->create([
        'name' => 'Scoped History',
        'phone' => '251966666665',
    ]);

    $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $allowedBranch->id,
        'source_channel' => 'web',
        'tracking_token' => Str::random(40),
        'total_amount' => 120,
    ]);

    $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $hiddenBranch->id,
        'source_channel' => 'telegram',
        'tracking_token' => Str::random(40),
        'total_amount' => 220,
    ]);

    $this->actingAs($staff)
        ->get(route('staff.customers.index', ['customer_id' => $customer->id]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/customers')
            ->where('selectedCustomer.source_summary.total', 1)
            ->where('selectedCustomer.source_summary.web', 1)
            ->where('selectedCustomer.source_summary.telegram', 0)
            ->where('selectedCustomer.top_branch.pickup_location', 'Allowed Branch')
            ->has('selectedCustomer.orders', 1)
        );
});
