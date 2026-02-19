<?php

use App\Models\Customer;
use App\Models\Permission;
use App\Models\PickupLocation;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can create permissions roles and users from access control', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $this->actingAs($admin)
        ->post(route('staff.access-control.permissions.store'), [
            'name' => 'Promo Sender',
            'slug' => 'promo_sender',
            'description' => 'Can send marketing promo messages.',
        ])
        ->assertRedirect();

    expect(Permission::query()->where('slug', 'promo_sender')->exists())->toBeTrue();

    $this->actingAs($admin)
        ->post(route('staff.access-control.roles.store'), [
            'name' => 'Promo Staff',
            'description' => 'Staff focused on SMS promotions.',
            'permission_slugs' => ['promo_sender'],
        ])
        ->assertRedirect();

    $role = Role::query()->where('slug', 'promo_staff')->first();

    expect($role)->not->toBeNull();
    expect($role?->permissions()->where('slug', 'promo_sender')->exists())->toBeTrue();

    $this->actingAs($admin)
        ->post(route('staff.access-control.users.store'), [
            'name' => 'Promo User',
            'email' => 'promo.user@example.com',
            'password' => 'secure-password',
            'password_confirmation' => 'secure-password',
            'role_slugs' => ['promo_staff'],
            'pickup_location_ids' => [],
        ])
        ->assertRedirect();

    $createdUser = User::query()->where('email', 'promo.user@example.com')->first();

    expect($createdUser)->not->toBeNull();
    expect($createdUser?->roles()->where('slug', 'promo_staff')->exists())->toBeTrue();
});

test('non admin users can not access access control page', function () {
    $branchStaff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($branchStaff)
        ->get(route('staff.access-control.index'))
        ->assertForbidden();
});

test('staff assigned to a branch only sees orders for assigned branches', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $branchA = PickupLocation::query()->create([
        'name' => 'Branch A',
        'address' => 'Addis Ababa A',
        'is_active' => true,
    ]);

    $branchB = PickupLocation::query()->create([
        'name' => 'Branch B',
        'address' => 'Addis Ababa B',
        'is_active' => true,
    ]);

    $staff->pickupLocations()->sync([$branchA->id]);

    $customer = Customer::query()->create([
        'name' => 'Scoped Customer',
        'phone' => '251966666666',
    ]);

    $visibleOrder = $customer->orders()->create([
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $branchA->id,
        'tracking_token' => Str::random(40),
        'total_amount' => 50,
    ]);

    $customer->orders()->create([
        'pickup_date' => now()->addDay()->toDateString(),
        'pickup_location_id' => $branchB->id,
        'tracking_token' => Str::random(40),
        'total_amount' => 75,
    ]);

    $this->actingAs($staff)
        ->get(route('staff.orders.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/orders')
            ->has('orders.data', 1)
            ->where('orders.data.0.id', $visibleOrder->id)
        );
});

test('admin can reset a user password from access control', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $target = User::factory()->create([
        'role' => 'staff',
        'email' => 'reset.me@example.com',
    ]);

    $role = Role::query()->create([
        'name' => 'Resettable Staff',
        'slug' => 'resettable_staff',
        'description' => 'Role for password reset test.',
        'is_system' => false,
    ]);

    $this->actingAs($admin)
        ->put(route('staff.access-control.users.update', $target), [
            'name' => 'Reset Target',
            'email' => 'reset.me@example.com',
            'password' => 'new-secure-password',
            'password_confirmation' => 'new-secure-password',
            'role_slugs' => [$role->slug],
            'pickup_location_ids' => [],
        ])
        ->assertRedirect();

    $target->refresh();

    expect(Hash::check('new-secure-password', $target->password))->toBeTrue();
    expect($target->roles()->where('slug', 'resettable_staff')->exists())->toBeTrue();
});
