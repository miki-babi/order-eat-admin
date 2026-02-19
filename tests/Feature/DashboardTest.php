<?php

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('staff.orders.index', absolute: false));
});

test('dashboard redirects to first authorized page by permission priority', function () {
    $permission = Permission::query()->create([
        'name' => 'Only Menu Items',
        'slug' => 'menu_items.manage',
        'description' => 'Can manage menu items.',
    ]);

    $role = Role::query()->create([
        'name' => 'Menu Manager',
        'slug' => 'menu_manager',
        'description' => 'Custom role for menu management.',
        'is_system' => false,
    ]);
    $role->permissions()->sync([$permission->id]);

    $user = User::factory()->create([
        'role' => 'customer',
    ]);
    $user->roles()->sync([$role->id]);

    $response = $this->actingAs($user)->get(route('dashboard'));

    $response->assertRedirect(route('staff.menu-items.index', absolute: false));
});
