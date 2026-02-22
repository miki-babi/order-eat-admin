<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SystemAdminSeeder extends Seeder
{
    /**
     * Seed a hidden system-admin account when env credentials are provided.
     */
    public function run(): void
    {
        $email = trim((string) env('SYSTEM_ADMIN_EMAIL', ''));
        $password = (string) env('SYSTEM_ADMIN_PASSWORD', '');
        $name = trim((string) env('SYSTEM_ADMIN_NAME', 'System Admin'));

        if ($email === '' || $password === '') {
            return;
        }

        $name = $name !== '' ? $name : 'System Admin';

        $role = Role::query()->firstOrCreate(
            ['slug' => User::SYSTEM_ADMIN_ROLE_SLUG],
            [
                'name' => 'System Admin',
                'description' => 'Hidden role for system feature lock controls and logs.',
                'is_system' => true,
            ],
        );

        $permissionIds = Permission::query()
            ->whereIn('slug', User::SYSTEM_ADMIN_PERMISSION_SLUGS)
            ->pluck('id')
            ->all();

        $role->permissions()->sync($permissionIds);

        $user = User::query()->updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'role' => User::SYSTEM_ADMIN_ROLE_SLUG,
                'email_verified_at' => now(),
            ],
        );

        $user->syncRolesBySlugs([User::SYSTEM_ADMIN_ROLE_SLUG]);
        $user->syncPickupLocationsByIds([]);
    }
}
