<?php

use App\Models\Customer;
use App\Models\FeatureToggle;
use App\Models\MenuItem;
use App\Models\PickupLocation;
use App\Models\User;
use Illuminate\Support\Str;

test('menu item store rejects invalid visibility channels', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($staff)
        ->from(route('staff.menu-items.index'))
        ->post(route('staff.menu-items.store'), [
            'name' => 'Invalid Visibility Item',
            'description' => 'Should fail validation.',
            'price' => 120,
            'category' => 'Drinks',
            'visibility_channels' => ['invalid_channel'],
        ])
        ->assertRedirect(route('staff.menu-items.index'))
        ->assertSessionHasErrors('visibility_channels.0');

    expect(MenuItem::query()->where('name', 'Invalid Visibility Item')->exists())->toBeFalse();
});

test('menu item with order history is deactivated instead of deleted', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'History Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $customer = Customer::query()->create([
        'name' => 'History Customer',
        'phone' => '251911330001',
    ]);

    $menuItem = MenuItem::query()->create([
        'name' => 'History Item',
        'description' => 'Has order history.',
        'price' => 150,
        'category' => 'Food',
        'is_active' => true,
        'visibility_channels' => ['web', 'telegram', 'qr_menu'],
    ]);

    $order = $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $location->id,
        'tracking_token' => Str::random(40),
        'total_amount' => 150,
    ]);

    $order->items()->create([
        'menu_item_id' => $menuItem->id,
        'quantity' => 1,
        'price' => 150,
    ]);

    $this->actingAs($staff)
        ->delete(route('staff.menu-items.destroy', $menuItem))
        ->assertRedirect();

    $menuItem->refresh();

    expect($menuItem->exists)->toBeTrue();
    expect($menuItem->is_active)->toBeFalse();
});

test('menu management feature lock redirects non-get requests', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    FeatureToggle::query()->updateOrCreate(
        ['feature_key' => 'staff_menu_management'],
        [
            'name' => 'Menu Management',
            'description' => 'Lock test for menu management.',
            'is_enabled' => false,
            'lock_message' => 'Menu management is locked.',
            'help_url' => 'https://example.com/help/menu-management',
        ],
    );

    $this->actingAs($staff)
        ->post(route('staff.menu-items.store'), [
            'name' => 'Locked Item',
            'description' => 'Should not be created while locked.',
            'price' => 100,
            'category' => 'Drinks',
            'visibility_channels' => ['web'],
        ])
        ->assertRedirect(route('feature.locked', ['featureKey' => 'staff_menu_management']));

    expect(MenuItem::query()->where('name', 'Locked Item')->exists())->toBeFalse();
});
