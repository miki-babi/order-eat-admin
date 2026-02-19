<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\StorePickupLocationRequest;
use App\Http\Requests\Staff\UpdatePickupLocationRequest;
use App\Models\PickupLocation;
use App\Support\BranchAccess;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PickupLocationController extends Controller
{
    /**
     * Show pickup location management page for staff.
     */
    public function index(): Response
    {
        $user = request()->user();

        $locationsQuery = PickupLocation::query()
            ->withCount('orders')
            ->orderBy('name');

        $assignedBranchIds = $user?->accessiblePickupLocationIds() ?? [];

        if ($user && ! $user->isAdmin() && $assignedBranchIds !== []) {
            $locationsQuery->whereIn('id', $assignedBranchIds);
        }

        $locations = $locationsQuery
            ->get()
            ->map(fn (PickupLocation $location) => [
                'id' => $location->id,
                'name' => $location->name,
                'address' => $location->address,
                'is_active' => $location->is_active,
                'orders_count' => $location->orders_count,
                'updated_at' => $location->updated_at?->toDateTimeString(),
            ]);

        return Inertia::render('staff/pickup-locations', [
            'locations' => $locations,
            'summary' => [
                'total_locations' => (clone $locationsQuery)->count(),
                'active_locations' => (clone $locationsQuery)->where('is_active', true)->count(),
            ],
        ]);
    }

    /**
     * Store a new pickup location.
     */
    public function store(StorePickupLocationRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        PickupLocation::query()->create([
            'name' => $validated['name'],
            'address' => $validated['address'],
            'is_active' => $request->boolean('is_active', true),
        ]);

        return back()->with('success', 'Pickup location created.');
    }

    /**
     * Update an existing pickup location.
     */
    public function update(UpdatePickupLocationRequest $request, PickupLocation $pickupLocation): RedirectResponse
    {
        BranchAccess::ensureUserCanAccessBranch($request->user(), $pickupLocation->id);

        $validated = $request->validated();

        $pickupLocation->update([
            'name' => $validated['name'],
            'address' => $validated['address'],
            'is_active' => $request->boolean('is_active', $pickupLocation->is_active),
        ]);

        return back()->with('success', 'Pickup location updated.');
    }

    /**
     * Delete a pickup location, or deactivate if order history exists.
     */
    public function destroy(PickupLocation $pickupLocation): RedirectResponse
    {
        BranchAccess::ensureUserCanAccessBranch(request()->user(), $pickupLocation->id);

        if ($pickupLocation->orders()->exists()) {
            $pickupLocation->update(['is_active' => false]);

            return back()->with('success', 'Pickup location has history and was deactivated instead of deleted.');
        }

        $pickupLocation->delete();

        return back()->with('success', 'Pickup location deleted.');
    }
}
