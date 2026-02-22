<?php

namespace App\Support;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;

class BranchAccess
{
    /**
     * Scope a query to branches assigned to the user.
     * If no branch assignment exists, query is left unrestricted for compatibility.
     *
     * @template TQuery of Builder|Relation
     * @param  TQuery  $query
     * @return TQuery
     */
    public static function scopeQuery(
        Builder|Relation $query,
        User $user,
        string $column = 'pickup_location_id',
    ): Builder|Relation
    {
        if ($user->isAdmin()) {
            return $query;
        }

        $assignedIds = $user->accessiblePickupLocationIds();

        if ($assignedIds === []) {
            return $query;
        }

        return $query->whereIn($column, $assignedIds);
    }

    /**
     * Assert the user can access a branch-bound resource.
     */
    public static function ensureUserCanAccessBranch(User $user, int $pickupLocationId): void
    {
        if (! $user->isAssignedToPickupLocation($pickupLocationId)) {
            abort(403);
        }
    }
}
