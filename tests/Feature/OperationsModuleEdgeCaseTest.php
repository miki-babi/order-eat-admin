<?php

use App\Models\BranchScreen;
use App\Models\DiningTable;
use App\Models\FeatureToggle;
use App\Models\MenuItem;
use App\Models\PickupLocation;
use App\Models\TableSession;
use App\Models\User;
use Illuminate\Support\Str;

test('table qr store rejects inactive pickup location ids', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $inactiveLocation = PickupLocation::query()->create([
        'name' => 'Inactive Branch',
        'address' => 'Addis Ababa',
        'is_active' => false,
    ]);

    $this->actingAs($staff)
        ->from(route('staff.table-qr.index'))
        ->post(route('staff.table-qr.store'), [
            'pickup_location_id' => $inactiveLocation->id,
            'name' => 'Table X',
            'qr_code' => 'inactive-branch-table-x',
            'is_active' => true,
        ])
        ->assertRedirect(route('staff.table-qr.index'))
        ->assertSessionHasErrors('pickup_location_id');

    expect(DiningTable::query()->count())->toBe(0);
});

test('table session verify is forbidden for staff outside assigned branch', function () {
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

    $hiddenTable = DiningTable::query()->create([
        'pickup_location_id' => $hiddenBranch->id,
        'name' => 'Hidden Table',
        'qr_code' => 'hidden-branch-table',
        'is_active' => true,
    ]);

    $tableSession = TableSession::query()->create([
        'dining_table_id' => $hiddenTable->id,
        'session_token' => Str::random(64),
        'started_at' => now()->subMinute(),
        'last_seen_at' => now(),
    ]);

    $this->actingAs($staff)
        ->patch(route('staff.table-sessions.verify', $tableSession), [
            'verified_note' => 'Should not be allowed.',
        ])
        ->assertForbidden();

    expect($tableSession->fresh()?->verified_at)->toBeNull();
    expect($tableSession->fresh()?->verified_by_user_id)->toBeNull();
});

test('screen assignment sync clears menu items for non-kitchen screens', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $location = PickupLocation::query()->create([
        'name' => 'Screen Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $screen = BranchScreen::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Waiter Screen A',
        'screen_type' => BranchScreen::TYPE_WAITER,
        'is_active' => true,
    ]);

    $menuA = MenuItem::query()->create([
        'name' => 'Item A',
        'description' => 'A',
        'price' => 100,
        'category' => 'Food',
        'is_active' => true,
    ]);

    $menuB = MenuItem::query()->create([
        'name' => 'Item B',
        'description' => 'B',
        'price' => 110,
        'category' => 'Food',
        'is_active' => true,
    ]);

    $screen->menuItems()->sync([$menuA->id, $menuB->id]);

    $this->actingAs($admin)
        ->patch(route('staff.screens.assignments', $screen), [
            'menu_item_ids' => [$menuA->id, $menuB->id],
            'user_ids' => [],
        ])
        ->assertRedirect();

    expect($screen->fresh()?->menuItems()->count())->toBe(0);
});

test('screen routing endpoint returns lock payload for json requests when feature is disabled', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    FeatureToggle::query()->updateOrCreate(
        ['feature_key' => 'staff_screen_routing'],
        [
            'name' => 'Screen Routing',
            'description' => 'Lock test for screen routing.',
            'is_enabled' => false,
            'lock_message' => 'Screen routing is locked.',
            'help_url' => 'https://example.com/help/screen-routing',
        ],
    );

    $this->actingAs($admin)
        ->getJson(route('staff.screens.index'))
        ->assertStatus(423)
        ->assertJson([
            'message' => 'Screen routing is locked.',
            'feature_key' => 'staff_screen_routing',
            'help_url' => 'https://example.com/help/screen-routing',
        ]);
});
