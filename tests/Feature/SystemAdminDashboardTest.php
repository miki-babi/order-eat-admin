<?php

use App\Models\FeatureToggle;
use App\Models\FeatureToggleActivity;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();
});

test('locked customer web ordering renders contact-us lock page', function () {
    FeatureToggle::query()->create([
        'feature_key' => 'customer_menu_browsing',
        'name' => 'Menu Browsing',
        'description' => 'Customer menu page',
        'is_enabled' => false,
        'lock_message' => 'contact us to unlock',
        'help_url' => 'https://example.com/help/menu',
    ]);

    $this->get(route('home'))
        ->assertStatus(423)
        ->assertInertia(
            fn(Assert $page) => $page
                ->component('locked-feature')
                ->where('feature.feature_key', 'customer_menu_browsing')
                ->where('feature.message', 'contact us to unlock')
                ->where('feature.help_url', 'https://example.com/help/menu')
        );
});

test('non system-admin users can not access hidden system admin dashboard', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $this->actingAs($admin)
        ->get(route('system-admin.dashboard'))
        ->assertNotFound();
});

test('system-admin users can access dashboard and update feature toggle', function () {
    $systemAdmin = User::factory()->create([
        'role' => User::SYSTEM_ADMIN_ROLE_SLUG,
    ]);

    $feature = FeatureToggle::query()->create([
        'feature_key' => 'staff_reporting_dashboard',
        'name' => 'Reporting Dashboard',
        'description' => 'Reports dashboard',
        'is_enabled' => true,
        'lock_message' => 'This feature is locked. Contact us to unlock.',
    ]);

    $this->actingAs($systemAdmin)
        ->get(route('system-admin.dashboard'))
        ->assertOk()
        ->assertInertia(
            fn(Assert $page) => $page
                ->component('system-admin/dashboard')
                ->where('features', fn($features) => collect($features)->pluck('feature_key')->contains('staff_reporting_dashboard'))
                ->where('featureGroups', fn($groups) => collect($groups)->pluck('key')->contains('staff_reporting'))
        );

    $this->actingAs($systemAdmin)
        ->put(route('system-admin.features.update', $feature), [
            'is_enabled' => false,
            'lock_message' => 'contact us to unlock',
        ])
        ->assertRedirect();

    expect($feature->fresh()?->is_enabled)->toBeFalse();
    expect($feature->fresh()?->lock_message)->toBe('contact us to unlock');
    expect(FeatureToggleActivity::query()->where('feature_toggle_id', $feature->id)->exists())->toBeTrue();
});

test('system-admin role and users stay hidden from access control page', function () {
    $systemAdmin = User::factory()->create([
        'role' => User::SYSTEM_ADMIN_ROLE_SLUG,
    ]);

    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $this->actingAs($admin)
        ->get(route('staff.access-control.index'))
        ->assertOk()
        ->assertInertia(
            fn(Assert $page) => $page
                ->component('staff/access-control')
                ->where('users', fn($users) => collect($users)->pluck('email')->contains($systemAdmin->email) === false)
                ->where('roles', fn($roles) => collect($roles)->pluck('slug')->contains(User::SYSTEM_ADMIN_ROLE_SLUG) === false)
                ->where('permissions', fn($permissions) => collect($permissions)->pluck('slug')->contains('system_admin.manage_features') === false)
        );
});
