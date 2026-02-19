<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Seed default permissions and system roles.
     */
    public function run(): void
    {
        foreach (User::PERMISSION_DEFINITIONS as $definition) {
            Permission::query()->updateOrCreate(
                ['slug' => $definition['slug']],
                [
                    'name' => $definition['name'],
                    'description' => $definition['description'],
                ],
            );
        }

        $allPermissionIds = Permission::query()->pluck('id')->all();

        foreach (User::SYSTEM_ROLE_DEFINITIONS as $definition) {
            $role = Role::query()->updateOrCreate(
                ['slug' => $definition['slug']],
                [
                    'name' => $definition['name'],
                    'description' => $definition['description'],
                    'is_system' => (bool) ($definition['is_system'] ?? false),
                ],
            );

            $permissionSlugs = $definition['permission_slugs'] ?? [];
            $permissionIds = $permissionSlugs === ['*']
                ? $allPermissionIds
                : Permission::query()
                    ->whereIn('slug', $permissionSlugs)
                    ->pluck('id')
                    ->all();

            $role->permissions()->sync($permissionIds);
        }
    }
}

