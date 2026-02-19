<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\StorePermissionRequest;
use App\Http\Requests\Staff\StoreRoleRequest;
use App\Http\Requests\Staff\StoreUserRequest;
use App\Http\Requests\Staff\UpdateRoleRequest;
use App\Http\Requests\Staff\UpdateUserRequest;
use App\Models\Permission;
use App\Models\PickupLocation;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AccessControlController extends Controller
{
    /**
     * Show role/permission and user access management.
     */
    public function index(): Response
    {
        $permissions = Permission::query()
            ->orderBy('name')
            ->get()
            ->map(fn (Permission $permission) => [
                'id' => $permission->id,
                'name' => $permission->name,
                'slug' => $permission->slug,
                'description' => $permission->description,
            ])
            ->values();

        $roles = Role::query()
            ->with('permissions')
            ->orderBy('name')
            ->get()
            ->map(fn (Role $role) => [
                'id' => $role->id,
                'name' => $role->name,
                'slug' => $role->slug,
                'description' => $role->description,
                'is_system' => (bool) $role->is_system,
                'permission_slugs' => $role->permissions
                    ->pluck('slug')
                    ->sort()
                    ->values(),
            ])
            ->values();

        $users = User::query()
            ->with(['roles', 'pickupLocations'])
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->primaryRoleSlug(),
                'role_slugs' => $user->roleSlugs(),
                'permission_slugs' => $user->permissionSlugs(),
                'pickup_location_ids' => $user->pickupLocations
                    ->pluck('id')
                    ->map(fn ($id) => (int) $id)
                    ->values(),
                'pickup_locations' => $user->pickupLocations
                    ->pluck('name')
                    ->values(),
                'created_at' => $user->created_at?->toDateTimeString(),
                'updated_at' => $user->updated_at?->toDateTimeString(),
            ])
            ->values();

        $pickupLocations = PickupLocation::query()
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('staff/access-control', [
            'permissions' => $permissions,
            'roles' => $roles,
            'users' => $users,
            'pickupLocations' => $pickupLocations,
            'summary' => [
                'total_users' => User::query()->count(),
                'total_roles' => Role::query()->count(),
                'total_permissions' => Permission::query()->count(),
            ],
        ]);
    }

    /**
     * Store a new role and assign selected permissions.
     */
    public function storeRole(StoreRoleRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $slug = $this->uniqueSlug(Role::query(), (string) $validated['name']);

        $role = Role::query()->create([
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'is_system' => false,
        ]);

        $permissionIds = Permission::query()
            ->whereIn('slug', $validated['permission_slugs'] ?? [])
            ->pluck('id')
            ->all();

        $role->permissions()->sync($permissionIds);

        return back()->with('success', 'Role created.');
    }

    /**
     * Update an existing role permissions and metadata.
     */
    public function updateRole(UpdateRoleRequest $request, Role $role): RedirectResponse
    {
        $validated = $request->validated();

        $role->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        $permissionIds = Permission::query()
            ->whereIn('slug', $validated['permission_slugs'] ?? [])
            ->pluck('id')
            ->all();

        $role->permissions()->sync($permissionIds);

        return back()->with('success', 'Role updated.');
    }

    /**
     * Store a new permission.
     */
    public function storePermission(StorePermissionRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $slugSource = (string) ($validated['slug'] ?? $validated['name']);
        $slug = $this->uniqueSlug(Permission::query(), $slugSource);

        Permission::query()->create([
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
        ]);

        return back()->with('success', 'Permission created.');
    }

    /**
     * Create a user and assign roles and branches.
     */
    public function storeUser(StoreUserRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $roleSlugs = array_values(array_unique($validated['role_slugs']));
        $branchIds = $validated['pickup_location_ids'] ?? [];

        $user = User::query()->create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $roleSlugs[0] ?? 'customer',
            'email_verified_at' => now(),
        ]);

        $user->syncRolesBySlugs($roleSlugs);
        $user->syncPickupLocationsByIds($branchIds);

        return back()->with('success', 'User created.');
    }

    /**
     * Update user details, password, roles, and branch assignment.
     */
    public function updateUser(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $validated = $request->validated();
        $roleSlugs = array_values(array_unique($validated['role_slugs']));
        $branchIds = $validated['pickup_location_ids'] ?? [];

        $updates = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $roleSlugs[0] ?? $user->role,
        ];

        if (! empty($validated['password'])) {
            $updates['password'] = Hash::make($validated['password']);
        }

        $user->update($updates);
        $user->syncRolesBySlugs($roleSlugs);
        $user->syncPickupLocationsByIds($branchIds);

        return back()->with('success', 'User updated.');
    }

    /**
     * Build a unique slug from a label within a target table query.
     */
    protected function uniqueSlug(Builder $query, string $value): string
    {
        $base = str_replace('-', '_', Str::slug($value, '_'));
        $base = $base !== '' ? $base : 'custom_value';
        $slug = $base;
        $suffix = 1;

        while ((clone $query)->where('slug', $slug)->exists()) {
            $suffix++;
            $slug = "{$base}_{$suffix}";
        }

        return $slug;
    }
}
