<?php

use App\Models\FeatureToggle;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;

test('access control user store requires branch assignment for branch roles', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    Role::query()->create([
        'name' => 'Branch Staff',
        'slug' => 'branch_staff',
        'description' => 'Branch staff role.',
        'is_system' => true,
    ]);

    $this->actingAs($admin)
        ->from(route('staff.access-control.index'))
        ->post(route('staff.access-control.users.store'), [
            'name' => 'No Branch User',
            'email' => 'no-branch@example.com',
            'password' => 'secure-password',
            'password_confirmation' => 'secure-password',
            'role_slugs' => ['branch_staff'],
            'pickup_location_ids' => [],
        ])
        ->assertRedirect(route('staff.access-control.index'))
        ->assertSessionHasErrors('pickup_location_ids');

    expect(User::query()->where('email', 'no-branch@example.com')->exists())->toBeFalse();
});

test('access control rejects reserved system admin permission slugs', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $this->actingAs($admin)
        ->from(route('staff.access-control.index'))
        ->post(route('staff.access-control.permissions.store'), [
            'name' => 'Reserved Permission',
            'slug' => 'system_admin_manage_features',
            'description' => 'Should be rejected.',
        ])
        ->assertRedirect(route('staff.access-control.index'))
        ->assertSessionHasErrors('slug');

    expect(Permission::query()->where('slug', 'system_admin_manage_features')->exists())->toBeFalse();
});

test('access control dashboard returns lock payload for json requests when feature is disabled', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    FeatureToggle::query()->updateOrCreate(
        ['feature_key' => 'staff_access_control_dashboard'],
        [
            'name' => 'Access Control Dashboard',
            'description' => 'Lock test for access control dashboard.',
            'is_enabled' => false,
            'lock_message' => 'Access control dashboard is locked.',
            'help_url' => 'https://example.com/help/access-control',
        ],
    );

    $this->actingAs($admin)
        ->getJson(route('staff.access-control.index'))
        ->assertStatus(423)
        ->assertJson([
            'message' => 'Access control dashboard is locked.',
            'feature_key' => 'staff_access_control_dashboard',
            'help_url' => 'https://example.com/help/access-control',
        ]);
});
