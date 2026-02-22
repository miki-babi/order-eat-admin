<?php

use App\Models\Customer;
use App\Models\FeatureToggle;
use App\Models\Order;
use App\Models\PickupLocation;
use App\Models\User;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

test('staff order update requires disapproval reason when receipt is disapproved', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'Order Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $customer = Customer::query()->create([
        'name' => 'Order Customer',
        'phone' => '251911440001',
    ]);

    $order = $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $location->id,
        'tracking_token' => Str::random(40),
        'receipt_status' => 'pending',
        'order_status' => 'pending',
        'total_amount' => 100,
    ]);

    $this->actingAs($staff)
        ->from(route('staff.orders.index'))
        ->patch(route('staff.orders.update', $order), [
            'receipt_status' => 'disapproved',
        ])
        ->assertRedirect(route('staff.orders.index'))
        ->assertSessionHasErrors('disapproval_reason');

    expect($order->fresh()?->receipt_status)->toBe('pending');
});

test('staff order list forbids filtering by inaccessible branch id', function () {
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

    $this->actingAs($staff)
        ->get(route('staff.orders.index', ['pickup_location_id' => $hiddenBranch->id]))
        ->assertForbidden();
});

test('staff order updates endpoint returns lock payload for json requests when feature is disabled', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'Lock Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $customer = Customer::query()->create([
        'name' => 'Lock Customer',
        'phone' => '251911440002',
    ]);

    $order = $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $location->id,
        'tracking_token' => Str::random(40),
        'receipt_status' => 'pending',
        'order_status' => 'pending',
        'total_amount' => 120,
    ]);

    FeatureToggle::query()->updateOrCreate(
        ['feature_key' => 'staff_order_updates'],
        [
            'name' => 'Staff Order Updates',
            'description' => 'Lock test for order updates.',
            'is_enabled' => false,
            'lock_message' => 'Staff order updates are locked.',
            'help_url' => 'https://example.com/help/staff-order-updates',
        ],
    );

    $this->actingAs($staff)
        ->patchJson(route('staff.orders.update', $order), [
            'order_status' => 'ready',
        ])
        ->assertStatus(423)
        ->assertJson([
            'message' => 'Staff order updates are locked.',
            'feature_key' => 'staff_order_updates',
            'help_url' => 'https://example.com/help/staff-order-updates',
        ]);

    expect($order->fresh()?->order_status)->toBe('pending');
});

test('reports endpoint forbids branch filters outside staff scope', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $allowedBranch = PickupLocation::query()->create([
        'name' => 'Allowed Reporting Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $hiddenBranch = PickupLocation::query()->create([
        'name' => 'Hidden Reporting Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $staff->pickupLocations()->sync([$allowedBranch->id]);

    $this->actingAs($staff)
        ->get(route('staff.reports.index', ['pickup_location_id' => $hiddenBranch->id]))
        ->assertForbidden();
});

test('reports endpoint returns lock payload for json requests when feature is disabled', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    FeatureToggle::query()->updateOrCreate(
        ['feature_key' => 'staff_reporting_dashboard'],
        [
            'name' => 'Reporting Dashboard',
            'description' => 'Lock test for reporting dashboard.',
            'is_enabled' => false,
            'lock_message' => 'Reporting dashboard is locked.',
            'help_url' => 'https://example.com/help/reporting',
        ],
    );

    $this->actingAs($staff)
        ->getJson(route('staff.reports.index'))
        ->assertStatus(423)
        ->assertJson([
            'message' => 'Reporting dashboard is locked.',
            'feature_key' => 'staff_reporting_dashboard',
            'help_url' => 'https://example.com/help/reporting',
        ]);
});

test('reports endpoint ignores invalid date filter values', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($staff)
        ->get(route('staff.reports.index', [
            'from' => 'not-a-date',
            'to' => 'still-not-a-date',
        ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/reports')
            ->where('filters.from', fn (string $value): bool => $value !== 'not-a-date')
            ->where('filters.to', fn (string $value): bool => $value !== 'still-not-a-date')
        );
});

test('system admin feature update validates boolean and help url fields', function () {
    $systemAdmin = User::factory()->create([
        'role' => User::SYSTEM_ADMIN_ROLE_SLUG,
    ]);

    $featureToggle = FeatureToggle::query()->create([
        'feature_key' => 'custom_validation_feature',
        'name' => 'Validation Feature',
        'description' => 'System admin validation test.',
        'is_enabled' => true,
        'lock_message' => 'Locked message.',
    ]);

    $this->actingAs($systemAdmin)
        ->from(route('system-admin.dashboard'))
        ->put(route('system-admin.features.update', $featureToggle), [
            'is_enabled' => 'yes',
            'help_url' => 'not-a-url',
            'lock_message' => 'Still locked.',
        ])
        ->assertRedirect(route('system-admin.dashboard'))
        ->assertSessionHasErrors(['is_enabled', 'help_url']);

    expect($featureToggle->fresh()?->is_enabled)->toBeTrue();
});

test('non system admin users can not update feature toggles', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $featureToggle = FeatureToggle::query()->create([
        'feature_key' => 'custom_not_found_feature',
        'name' => 'Not Found Feature',
        'description' => 'System admin middleware test.',
        'is_enabled' => true,
        'lock_message' => 'Locked message.',
    ]);

    $this->actingAs($admin)
        ->put(route('system-admin.features.update', $featureToggle), [
            'is_enabled' => false,
        ])
        ->assertNotFound();

    expect($featureToggle->fresh()?->is_enabled)->toBeTrue();
});
