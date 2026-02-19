<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * Default permission catalog used for seeding and legacy compatibility.
     */
    public const PERMISSION_DEFINITIONS = [
        [
            'name' => 'View Orders',
            'slug' => 'orders.view',
            'description' => 'View order queue and details.',
        ],
        [
            'name' => 'Update Orders',
            'slug' => 'orders.update',
            'description' => 'Update order and receipt statuses.',
        ],
        [
            'name' => 'View Customers',
            'slug' => 'customers.view',
            'description' => 'View customer list and history.',
        ],
        [
            'name' => 'Send Customer SMS',
            'slug' => 'customers.sms',
            'description' => 'Send promotional SMS to customers.',
        ],
        [
            'name' => 'Manage Pickup Locations',
            'slug' => 'pickup_locations.manage',
            'description' => 'Create, update, and remove pickup locations.',
        ],
        [
            'name' => 'Manage Menu Items',
            'slug' => 'menu_items.manage',
            'description' => 'Create, update, and remove menu items.',
        ],
        [
            'name' => 'View Reports',
            'slug' => 'reports.view',
            'description' => 'View sales and operations reports.',
        ],
        [
            'name' => 'Manage SMS Templates',
            'slug' => 'sms_templates.manage',
            'description' => 'Manage SMS templates and settings.',
        ],
        [
            'name' => 'Manage Users',
            'slug' => 'users.manage',
            'description' => 'Create and update users and passwords.',
        ],
        [
            'name' => 'Manage Roles',
            'slug' => 'roles.manage',
            'description' => 'Create and update roles.',
        ],
        [
            'name' => 'Manage Permissions',
            'slug' => 'permissions.manage',
            'description' => 'Create and update permissions.',
        ],
        [
            'name' => 'Assign Branches',
            'slug' => 'branches.assign',
            'description' => 'Assign managers and staff to branches.',
        ],
    ];

    /**
     * Default roles and permissions for bootstrap seeding.
     */
    public const SYSTEM_ROLE_DEFINITIONS = [
        [
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'Full access across all branches and features.',
            'is_system' => true,
            'permission_slugs' => ['*'],
        ],
        [
            'name' => 'Branch Manager',
            'slug' => 'branch_manager',
            'description' => 'Manage branch operations and customer communication.',
            'is_system' => true,
            'permission_slugs' => [
                'orders.view',
                'orders.update',
                'customers.view',
                'customers.sms',
                'reports.view',
                'menu_items.manage',
            ],
        ],
        [
            'name' => 'Branch Staff',
            'slug' => 'branch_staff',
            'description' => 'Handle day-to-day branch order operations.',
            'is_system' => true,
            'permission_slugs' => [
                'orders.view',
                'orders.update',
                'customers.view',
            ],
        ],
    ];

    /**
     * Legacy fallback permissions to preserve compatibility for users
     * that still only have the users.role string populated.
     */
    public const LEGACY_STAFF_PERMISSION_SLUGS = [
        'orders.view',
        'orders.update',
        'customers.view',
        'customers.sms',
        'pickup_locations.manage',
        'menu_items.manage',
        'reports.view',
        'sms_templates.manage',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Cached resolved role slugs.
     *
     * @var array<int, string>|null
     */
    protected ?array $resolvedRoleSlugs = null;

    /**
     * Cached resolved permission slugs.
     *
     * @var array<int, string>|null
     */
    protected ?array $resolvedPermissionSlugs = null;

    /**
     * Cached assigned branch ids.
     *
     * @var array<int, int>|null
     */
    protected ?array $resolvedPickupLocationIds = null;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Roles assigned to this user.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * Branches assigned to this user.
     */
    public function pickupLocations(): BelongsToMany
    {
        return $this->belongsToMany(PickupLocation::class);
    }

    /**
     * Determine if the user has admin access.
     */
    public function isAdmin(): bool
    {
        return $this->hasRole('admin');
    }

    /**
     * Determine if the user can access staff resources.
     */
    public function isStaff(): bool
    {
        return $this->canAccessStaffPanel();
    }

    /**
     * Determine if the user has manager access.
     */
    public function isManager(): bool
    {
        return $this->hasRole('branch_manager');
    }

    /**
     * Determine if the user should be allowed into the staff dashboard.
     */
    public function canAccessStaffPanel(): bool
    {
        return $this->isAdmin() || $this->permissionSlugs() !== [];
    }

    /**
     * Determine whether this user has the given role slug.
     */
    public function hasRole(string $roleSlug): bool
    {
        return in_array($roleSlug, $this->roleSlugs(), true);
    }

    /**
     * Determine whether this user has any of the given role slugs.
     *
     * @param  array<int, string>  $roleSlugs
     */
    public function hasAnyRole(array $roleSlugs): bool
    {
        $resolved = $this->roleSlugs();

        foreach ($roleSlugs as $roleSlug) {
            if (in_array($roleSlug, $resolved, true)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Determine whether this user has a specific permission slug.
     */
    public function hasPermission(string $permissionSlug): bool
    {
        if ($this->isAdmin()) {
            return true;
        }

        return in_array($permissionSlug, $this->permissionSlugs(), true);
    }

    /**
     * Determine whether this user has any of the given permission slugs.
     *
     * @param  array<int, string>  $permissionSlugs
     */
    public function hasAnyPermission(array $permissionSlugs): bool
    {
        if ($this->isAdmin()) {
            return true;
        }

        $resolved = $this->permissionSlugs();

        foreach ($permissionSlugs as $permissionSlug) {
            if (in_array($permissionSlug, $resolved, true)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Resolve all assigned role slugs.
     *
     * @return array<int, string>
     */
    public function roleSlugs(): array
    {
        if ($this->resolvedRoleSlugs !== null) {
            return $this->resolvedRoleSlugs;
        }

        $slugs = $this->roles()
            ->pluck('slug')
            ->map(fn ($slug) => (string) $slug)
            ->values()
            ->all();

        if ($slugs === []) {
            $legacyRole = static::normalizeLegacyRoleSlug($this->role);

            if ($legacyRole) {
                $slugs[] = $legacyRole;
            }
        }

        $this->resolvedRoleSlugs = array_values(array_unique($slugs));

        return $this->resolvedRoleSlugs;
    }

    /**
     * Resolve all assigned permission slugs.
     *
     * @return array<int, string>
     */
    public function permissionSlugs(): array
    {
        if ($this->resolvedPermissionSlugs !== null) {
            return $this->resolvedPermissionSlugs;
        }

        $slugs = Permission::query()
            ->select('permissions.slug')
            ->join('permission_role', 'permission_role.permission_id', '=', 'permissions.id')
            ->join('role_user', 'role_user.role_id', '=', 'permission_role.role_id')
            ->where('role_user.user_id', $this->id)
            ->distinct()
            ->orderBy('permissions.slug')
            ->pluck('permissions.slug')
            ->map(fn ($slug) => (string) $slug)
            ->values()
            ->all();

        if ($slugs === []) {
            $slugs = $this->legacyPermissionSlugs();
        }

        $this->resolvedPermissionSlugs = array_values(array_unique($slugs));

        return $this->resolvedPermissionSlugs;
    }

    /**
     * Resolve assigned branch ids.
     *
     * @return array<int, int>
     */
    public function accessiblePickupLocationIds(): array
    {
        if ($this->resolvedPickupLocationIds !== null) {
            return $this->resolvedPickupLocationIds;
        }

        $ids = $this->pickupLocations()
            ->pluck('pickup_locations.id')
            ->map(fn ($id) => (int) $id)
            ->values()
            ->all();

        $this->resolvedPickupLocationIds = array_values(array_unique($ids));

        return $this->resolvedPickupLocationIds;
    }

    /**
     * Determine whether user can access a specific branch.
     * If no branch is assigned yet, access is unrestricted for compatibility.
     */
    public function isAssignedToPickupLocation(int $pickupLocationId): bool
    {
        if ($this->isAdmin()) {
            return true;
        }

        $assignedIds = $this->accessiblePickupLocationIds();

        if ($assignedIds === []) {
            return true;
        }

        return in_array($pickupLocationId, $assignedIds, true);
    }

    /**
     * Sync role assignments by role slugs.
     *
     * @param  array<int, string>  $roleSlugs
     */
    public function syncRolesBySlugs(array $roleSlugs): void
    {
        $uniqueRoleSlugs = array_values(array_unique(array_filter($roleSlugs, fn ($value) => is_string($value) && $value !== '')));

        $roleIds = Role::query()
            ->whereIn('slug', $uniqueRoleSlugs)
            ->pluck('id')
            ->all();

        $this->roles()->sync($roleIds);
        $this->role = $uniqueRoleSlugs[0] ?? $this->role;
        $this->save();

        $this->resolvedRoleSlugs = null;
        $this->resolvedPermissionSlugs = null;
    }

    /**
     * Sync branch assignments.
     *
     * @param  array<int, int>  $pickupLocationIds
     */
    public function syncPickupLocationsByIds(array $pickupLocationIds): void
    {
        $uniqueIds = array_values(array_unique(array_map('intval', $pickupLocationIds)));
        $this->pickupLocations()->sync($uniqueIds);
        $this->resolvedPickupLocationIds = null;
    }

    /**
     * Role string shown as the user's primary role.
     */
    public function primaryRoleSlug(): string
    {
        $roleSlugs = $this->roleSlugs();

        if ($roleSlugs !== []) {
            return $roleSlugs[0];
        }

        $legacy = static::normalizeLegacyRoleSlug($this->role);

        return $legacy ?? 'customer';
    }

    /**
     * Normalize role strings used historically in this project.
     */
    public static function normalizeLegacyRoleSlug(?string $role): ?string
    {
        if (! is_string($role) || trim($role) === '') {
            return null;
        }

        return match (strtolower(trim($role))) {
            'admin' => 'admin',
            'manager', 'branch_manager', 'branch-manager', 'branch manager' => 'branch_manager',
            'staff', 'branch_staff', 'branch-staff', 'branch staff' => 'branch_staff',
            default => null,
        };
    }

    /**
     * All defined permission slugs.
     *
     * @return array<int, string>
     */
    public static function allDefinedPermissionSlugs(): array
    {
        return array_values(array_map(
            fn (array $definition) => (string) $definition['slug'],
            static::PERMISSION_DEFINITIONS,
        ));
    }

    /**
     * Fallback permissions derived from users.role when RBAC relations are missing.
     *
     * @return array<int, string>
     */
    protected function legacyPermissionSlugs(): array
    {
        $legacyRole = static::normalizeLegacyRoleSlug($this->role);

        if ($legacyRole === 'admin') {
            return static::allDefinedPermissionSlugs();
        }

        if (in_array($legacyRole, ['branch_manager', 'branch_staff'], true)) {
            return static::LEGACY_STAFF_PERMISSION_SLUGS;
        }

        return [];
    }
}
