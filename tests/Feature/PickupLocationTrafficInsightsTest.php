<?php

use App\Models\Customer;
use App\Models\MenuItem;
use App\Models\PickupLocation;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

test('pickup location page includes source traffic top items and peak times per branch', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $branchA = PickupLocation::query()->create([
        'name' => 'A Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $branchB = PickupLocation::query()->create([
        'name' => 'B Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $staff->pickupLocations()->sync([$branchA->id, $branchB->id]);

    $customer = Customer::query()->create([
        'name' => 'Traffic Customer',
        'phone' => '251977700001',
    ]);

    $latte = MenuItem::query()->create([
        'name' => 'Latte',
        'description' => 'Drink',
        'price' => 120,
        'category' => 'Drinks',
        'is_active' => true,
    ]);

    $cake = MenuItem::query()->create([
        'name' => 'Cake',
        'description' => 'Dessert',
        'price' => 90,
        'category' => 'Dessert',
        'is_active' => true,
    ]);

    $aWeb = $customer->orders()->create([
        'pickup_date' => '2026-01-01',
        'pickup_location_id' => $branchA->id,
        'source_channel' => 'web',
        'tracking_token' => Str::random(40),
        'total_amount' => 240,
    ]);
    $aWeb->items()->create([
        'menu_item_id' => $latte->id,
        'quantity' => 2,
        'price' => 120,
    ]);

    $aTelegram = $customer->orders()->create([
        'pickup_date' => '2026-01-02',
        'pickup_location_id' => $branchA->id,
        'source_channel' => 'telegram',
        'tracking_token' => Str::random(40),
        'total_amount' => 360,
    ]);
    $aTelegram->items()->create([
        'menu_item_id' => $latte->id,
        'quantity' => 3,
        'price' => 120,
    ]);

    $aTable = $customer->orders()->create([
        'pickup_date' => '2026-01-03',
        'pickup_location_id' => $branchA->id,
        'source_channel' => 'table',
        'tracking_token' => Str::random(40),
        'total_amount' => 90,
    ]);
    $aTable->items()->create([
        'menu_item_id' => $cake->id,
        'quantity' => 1,
        'price' => 90,
    ]);

    $bWeb = $customer->orders()->create([
        'pickup_date' => '2026-01-04',
        'pickup_location_id' => $branchB->id,
        'source_channel' => 'web',
        'tracking_token' => Str::random(40),
        'total_amount' => 180,
    ]);
    $bWeb->items()->create([
        'menu_item_id' => $cake->id,
        'quantity' => 2,
        'price' => 90,
    ]);

    DB::table('orders')->where('id', $aWeb->id)->update([
        'created_at' => '2026-01-01 09:10:00',
        'updated_at' => '2026-01-01 09:10:00',
    ]);
    DB::table('orders')->where('id', $aTelegram->id)->update([
        'created_at' => '2026-01-02 09:40:00',
        'updated_at' => '2026-01-02 09:40:00',
    ]);
    DB::table('orders')->where('id', $aTable->id)->update([
        'created_at' => '2026-01-03 20:05:00',
        'updated_at' => '2026-01-03 20:05:00',
    ]);
    DB::table('orders')->where('id', $bWeb->id)->update([
        'created_at' => '2026-01-04 14:15:00',
        'updated_at' => '2026-01-04 14:15:00',
    ]);

    $this->actingAs($staff)
        ->get(route('staff.pickup-locations.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/pickup-locations')
            ->where('summary.total_locations', 2)
            ->where('locations.0.name', 'A Branch')
            ->where('locations.0.source_traffic.total', 3)
            ->where('locations.0.source_traffic.web', 1)
            ->where('locations.0.source_traffic.telegram', 1)
            ->where('locations.0.source_traffic.table', 1)
            ->where('locations.0.traffic_trend', fn ($rows): bool => collect($rows)->contains(
                fn (array $row): bool => $row['date'] === '2026-01-01'
                    && $row['total'] === 1
                    && $row['web'] === 1
                    && $row['telegram'] === 0
                    && $row['table'] === 0,
            ))
            ->where('locations.0.hourly_profile.9.orders_count', 2)
            ->where('locations.0.hourly_profile.20.orders_count', 1)
            ->where('locations.0.top_items.0.name', 'Latte')
            ->where('locations.0.top_items.0.quantity_sold', 5)
            ->where('locations.0.peak_hours.0.label', '09:00-10:00')
            ->where('locations.0.peak_hours.0.orders_count', 2)
            ->where('locations.1.name', 'B Branch')
            ->where('locations.1.source_traffic.total', 1)
            ->where('locations.1.hourly_profile.14.orders_count', 1)
        );
});

test('pickup location traffic analytics respect branch access scope', function () {
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
        'name' => 'Scoped Branch Customer',
        'phone' => '251977700002',
    ]);

    $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $allowedBranch->id,
        'source_channel' => 'table',
        'tracking_token' => Str::random(40),
        'total_amount' => 200,
    ]);

    $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $hiddenBranch->id,
        'source_channel' => 'telegram',
        'tracking_token' => Str::random(40),
        'total_amount' => 300,
    ]);

    $this->actingAs($staff)
        ->get(route('staff.pickup-locations.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/pickup-locations')
            ->has('locations', 1)
            ->where('locations.0.name', 'Allowed Branch')
            ->where('locations.0.source_traffic.total', 1)
            ->where('locations.0.source_traffic.table', 1)
            ->where('locations.0.source_traffic.telegram', 0)
            ->where('locations.0.hourly_profile.0.orders_count', 0)
        );
});
