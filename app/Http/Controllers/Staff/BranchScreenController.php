<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\BranchScreen;
use App\Models\MenuItem;
use App\Models\PickupLocation;
use App\Models\User;
use App\Support\BranchAccess;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BranchScreenController extends Controller
{
    /**
     * Show branch screens and assignments.
     */
    public function index(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $screensQuery = BranchScreen::query()
            ->with([
                'pickupLocation:id,name',
                'users:id,name,email',
                'menuItems:id,name,category',
            ])
            ->orderBy('pickup_location_id')
            ->orderBy('screen_type')
            ->orderBy('name');

        BranchAccess::scopeQuery($screensQuery, $user, 'pickup_location_id');

        $screens = $screensQuery
            ->get()
            ->map(fn (BranchScreen $screen) => [
                'id' => $screen->id,
                'pickup_location_id' => $screen->pickup_location_id,
                'pickup_location_name' => $screen->pickupLocation?->name,
                'name' => $screen->name,
                'screen_type' => $screen->screen_type,
                'is_active' => (bool) $screen->is_active,
                'user_ids' => $screen->users
                    ->pluck('id')
                    ->map(fn ($id) => (int) $id)
                    ->values(),
                'users' => $screen->users
                    ->map(fn (User $assignedUser) => [
                        'id' => $assignedUser->id,
                        'name' => $assignedUser->name,
                        'email' => $assignedUser->email,
                    ])
                    ->values(),
                'menu_item_ids' => $screen->menuItems
                    ->pluck('id')
                    ->map(fn ($id) => (int) $id)
                    ->values(),
                'menu_items' => $screen->menuItems
                    ->map(fn (MenuItem $item) => [
                        'id' => $item->id,
                        'name' => $item->name,
                        'category' => $item->category,
                    ])
                    ->values(),
                'updated_at' => $screen->updated_at?->toDateTimeString(),
            ])
            ->values();

        $assignedBranchIds = $user->accessiblePickupLocationIds();

        $pickupLocationsQuery = PickupLocation::query()->orderBy('name');

        if (! $user->isAdmin() && $assignedBranchIds !== []) {
            $pickupLocationsQuery->whereIn('id', $assignedBranchIds);
        }

        $pickupLocations = $pickupLocationsQuery
            ->get(['id', 'name'])
            ->map(fn (PickupLocation $pickupLocation) => [
                'id' => $pickupLocation->id,
                'name' => $pickupLocation->name,
            ])
            ->values();

        $assignableUsers = User::query()
            ->with('pickupLocations:id')
            ->orderBy('name')
            ->get()
            ->filter(function (User $candidate) use ($user, $assignedBranchIds): bool {
                if (! $candidate->canAccessStaffPanel()) {
                    return false;
                }

                if ($user->isAdmin() || $assignedBranchIds === []) {
                    return true;
                }

                if ($candidate->isAdmin()) {
                    return true;
                }

                return collect($candidate->accessiblePickupLocationIds())
                    ->intersect($assignedBranchIds)
                    ->isNotEmpty();
            })
            ->map(fn (User $candidate) => [
                'id' => $candidate->id,
                'name' => $candidate->name,
                'email' => $candidate->email,
                'pickup_location_ids' => $candidate->accessiblePickupLocationIds(),
            ])
            ->values();

        $menuItems = MenuItem::query()
            ->where('is_active', true)
            ->orderBy('category')
            ->orderBy('name')
            ->get(['id', 'name', 'category'])
            ->map(fn (MenuItem $menuItem) => [
                'id' => $menuItem->id,
                'name' => $menuItem->name,
                'category' => $menuItem->category,
            ])
            ->values();

        return Inertia::render('staff/branch-screens', [
            'screens' => $screens,
            'pickupLocations' => $pickupLocations,
            'users' => $assignableUsers,
            'menuItems' => $menuItems,
            'screenTypes' => BranchScreen::types(),
            'summary' => [
                'total_screens' => $screens->count(),
                'waiter_screens' => $screens->where('screen_type', BranchScreen::TYPE_WAITER)->count(),
                'kitchen_screens' => $screens->where('screen_type', BranchScreen::TYPE_KITCHEN)->count(),
                'cashier_screens' => $screens->where('screen_type', BranchScreen::TYPE_CASHIER)->count(),
            ],
        ]);
    }

    /**
     * Create a new branch screen.
     */
    public function store(Request $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $validated = $request->validate([
            'pickup_location_id' => ['required', 'integer', Rule::exists('pickup_locations', 'id')],
            'name' => ['required', 'string', 'max:120'],
            'screen_type' => ['required', Rule::in(BranchScreen::types())],
            'is_active' => ['nullable', 'boolean'],
            'user_ids' => ['nullable', 'array'],
            'user_ids.*' => ['integer', Rule::exists('users', 'id')],
            'menu_item_ids' => ['nullable', 'array'],
            'menu_item_ids.*' => ['integer', Rule::exists('menu_items', 'id')],
        ]);

        BranchAccess::ensureUserCanAccessBranch($user, (int) $validated['pickup_location_id']);

        $screen = BranchScreen::query()->create([
            'pickup_location_id' => (int) $validated['pickup_location_id'],
            'name' => trim((string) $validated['name']),
            'screen_type' => (string) $validated['screen_type'],
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        $this->syncScreenAssignments($screen, $validated);

        return back()->with('success', 'Branch screen created.');
    }

    /**
     * Update branch screen metadata and assignments.
     */
    public function update(Request $request, BranchScreen $branchScreen): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        BranchAccess::ensureUserCanAccessBranch($user, $branchScreen->pickup_location_id);

        $validated = $request->validate([
            'pickup_location_id' => ['required', 'integer', Rule::exists('pickup_locations', 'id')],
            'name' => ['required', 'string', 'max:120'],
            'screen_type' => ['required', Rule::in(BranchScreen::types())],
            'is_active' => ['nullable', 'boolean'],
            'user_ids' => ['nullable', 'array'],
            'user_ids.*' => ['integer', Rule::exists('users', 'id')],
            'menu_item_ids' => ['nullable', 'array'],
            'menu_item_ids.*' => ['integer', Rule::exists('menu_items', 'id')],
        ]);

        BranchAccess::ensureUserCanAccessBranch($user, (int) $validated['pickup_location_id']);

        $branchScreen->update([
            'pickup_location_id' => (int) $validated['pickup_location_id'],
            'name' => trim((string) $validated['name']),
            'screen_type' => (string) $validated['screen_type'],
            'is_active' => (bool) ($validated['is_active'] ?? $branchScreen->is_active),
        ]);

        $this->syncScreenAssignments($branchScreen, $validated);

        return back()->with('success', 'Branch screen updated.');
    }

    /**
     * Sync only user/item assignments for an existing screen.
     */
    public function syncAssignments(Request $request, BranchScreen $branchScreen): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        BranchAccess::ensureUserCanAccessBranch($user, $branchScreen->pickup_location_id);

        $validated = $request->validate([
            'user_ids' => ['nullable', 'array'],
            'user_ids.*' => ['integer', Rule::exists('users', 'id')],
            'menu_item_ids' => ['nullable', 'array'],
            'menu_item_ids.*' => ['integer', Rule::exists('menu_items', 'id')],
        ]);

        $this->syncScreenAssignments($branchScreen, $validated);

        return back()->with('success', 'Screen assignments updated.');
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    protected function syncScreenAssignments(BranchScreen $branchScreen, array $payload): void
    {
        $userIds = collect($payload['user_ids'] ?? [])
            ->map(fn ($id) => (int) $id)
            ->unique()
            ->values()
            ->all();

        $branchScreen->users()->sync($userIds);

        if ($branchScreen->screen_type !== BranchScreen::TYPE_KITCHEN) {
            $branchScreen->menuItems()->sync([]);

            return;
        }

        $menuItemIds = collect($payload['menu_item_ids'] ?? [])
            ->map(fn ($id) => (int) $id)
            ->unique()
            ->values()
            ->all();

        $branchScreen->menuItems()->sync($menuItemIds);
    }
}
