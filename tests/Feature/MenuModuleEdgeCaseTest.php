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

test('updating menu item visibility hides it from telegram menu when telegram channel is unchecked', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $menuItem = MenuItem::query()->create([
        'name' => 'Visibility Toggle Item',
        'description' => 'Visibility update test.',
        'price' => 150,
        'category' => 'Drinks',
        'is_active' => true,
        'visibility_channels' => ['web', 'telegram'],
    ]);

    $this->actingAs($staff)
        ->put(route('staff.menu-items.update', $menuItem), [
            'name' => 'Visibility Toggle Item',
            'description' => 'Visibility update test.',
            'price' => 150,
            'category' => 'Drinks',
            'is_active' => true,
            'visibility_channels' => ['web'],
        ])
        ->assertRedirect();

    $menuItem->refresh();

    expect($menuItem->visibility_channels)->toBe(['web']);

    $this->get(route('telegram.menu'))
        ->assertOk()
        ->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page
            ->component('customer/telegram-menu')
            ->where('filters.channel', 'telegram')
            ->has('menuItems', 0)
        );
});

test('staff can mark menu items as featured and see that state in menu listing payload', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $menuItem = MenuItem::query()->create([
        'name' => 'Feature Toggle Item',
        'description' => 'Featured update test.',
        'price' => 160,
        'category' => 'Drinks',
        'is_active' => true,
        'is_featured' => false,
        'visibility_channels' => ['web'],
    ]);

    $this->actingAs($staff)
        ->put(route('staff.menu-items.update', $menuItem), [
            'name' => 'Feature Toggle Item',
            'description' => 'Featured update test.',
            'price' => 160,
            'category' => 'Drinks',
            'is_active' => true,
            'is_featured' => true,
            'visibility_channels' => ['web'],
        ])
        ->assertRedirect();

    $menuItem->refresh();

    expect($menuItem->is_featured)->toBeTrue();

    $this->actingAs($staff)
        ->get(route('staff.menu-items.index'))
        ->assertOk()
        ->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page
            ->component('staff/menu-items')
            ->where('items.0.id', $menuItem->id)
            ->where('items.0.is_featured', true)
        );
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
