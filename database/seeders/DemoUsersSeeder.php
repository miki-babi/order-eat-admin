<?php

namespace Database\Seeders;

use App\Models\BranchScreen;
use App\Models\MenuItem;
use App\Models\Permission;
use App\Models\PickupLocation;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class DemoUsersSeeder extends Seeder
{
    /**
     * Seed demo users with role, branch, and screen assignments.
     */
    public function run(): void
    {
        $this->ensureOperationalRoles();

        $pickupLocations = PickupLocation::query()
            ->orderBy('name')
            ->get(['id', 'name'])
            ->keyBy('name');

        $allBranchIds = $pickupLocations
            ->pluck('id')
            ->map(fn ($id) => (int) $id)
            ->values()
            ->all();

        $boleBranchId = $pickupLocations->get('Bole Branch')?->id;
        $piassaBranchId = $pickupLocations->get('Piassa Branch')?->id;

        $admin = $this->upsertUser(
            email: 'admin@example.com',
            name: 'Admin User',
            roleSlug: 'admin',
            branchIds: [],
        );

        $manager = $this->upsertUser(
            email: 'manager@example.com',
            name: 'Manager User',
            roleSlug: 'branch_manager',
            branchIds: $allBranchIds,
        );

        $staff = $this->upsertUser(
            email: 'staff@example.com',
            name: 'Staff User',
            roleSlug: 'branch_staff',
            branchIds: $allBranchIds,
        );

        $boleWaiter = $this->upsertUser(
            email: 'bole.waiter@example.com',
            name: 'Bole Waiter',
            roleSlug: 'waiter_operator',
            branchIds: $boleBranchId ? [$boleBranchId] : $allBranchIds,
        );

        $boleKitchen = $this->upsertUser(
            email: 'bole.kitchen@example.com',
            name: 'Bole Kitchen',
            roleSlug: 'kitchen_operator',
            branchIds: $boleBranchId ? [$boleBranchId] : $allBranchIds,
        );

        $boleBar = $this->upsertUser(
            email: 'bole.bar@example.com',
            name: 'Bole Bar',
            roleSlug: 'kitchen_operator',
            branchIds: $boleBranchId ? [$boleBranchId] : $allBranchIds,
        );

        $boleCashier = $this->upsertUser(
            email: 'bole.cashier@example.com',
            name: 'Bole Cashier',
            roleSlug: 'cashier_operator',
            branchIds: $boleBranchId ? [$boleBranchId] : $allBranchIds,
        );

        $piassaWaiter = $this->upsertUser(
            email: 'piassa.waiter@example.com',
            name: 'Piassa Waiter',
            roleSlug: 'waiter_operator',
            branchIds: $piassaBranchId ? [$piassaBranchId] : $allBranchIds,
        );

        $piassaKitchen = $this->upsertUser(
            email: 'piassa.kitchen@example.com',
            name: 'Piassa Kitchen',
            roleSlug: 'kitchen_operator',
            branchIds: $piassaBranchId ? [$piassaBranchId] : $allBranchIds,
        );

        $piassaCashier = $this->upsertUser(
            email: 'piassa.cashier@example.com',
            name: 'Piassa Cashier',
            roleSlug: 'cashier_operator',
            branchIds: $piassaBranchId ? [$piassaBranchId] : $allBranchIds,
        );

        $this->upsertCustomerUser();

        if (! Schema::hasTable('branch_screens')) {
            return;
        }

        $drinkItemIds = MenuItem::query()
            ->where('is_active', true)
            ->where('category', 'Drinks')
            ->pluck('id')
            ->map(fn ($id) => (int) $id)
            ->values()
            ->all();

        $foodItemIds = MenuItem::query()
            ->where('is_active', true)
            ->where(function ($query): void {
                $query
                    ->whereNull('category')
                    ->orWhere('category', '!=', 'Drinks');
            })
            ->pluck('id')
            ->map(fn ($id) => (int) $id)
            ->values()
            ->all();

        if ($boleBranchId) {
            $this->upsertScreen(
                pickupLocationId: $boleBranchId,
                name: 'Bole Waiter Screen',
                type: BranchScreen::TYPE_WAITER,
                userIds: [$boleWaiter->id, $staff->id, $manager->id, $admin->id],
            );

            $this->upsertScreen(
                pickupLocationId: $boleBranchId,
                name: 'Bole Kitchen Screen',
                type: BranchScreen::TYPE_KITCHEN,
                userIds: [$boleKitchen->id, $staff->id, $manager->id, $admin->id],
                menuItemIds: $foodItemIds,
            );

            $this->upsertScreen(
                pickupLocationId: $boleBranchId,
                name: 'Bole Bar Screen',
                type: BranchScreen::TYPE_KITCHEN,
                userIds: [$boleBar->id, $staff->id, $manager->id, $admin->id],
                menuItemIds: $drinkItemIds,
            );

            $this->upsertScreen(
                pickupLocationId: $boleBranchId,
                name: 'Bole Cashier Screen',
                type: BranchScreen::TYPE_CASHIER,
                userIds: [$boleCashier->id, $staff->id, $manager->id, $admin->id],
            );
        }

        if ($piassaBranchId) {
            $this->upsertScreen(
                pickupLocationId: $piassaBranchId,
                name: 'Piassa Waiter Screen',
                type: BranchScreen::TYPE_WAITER,
                userIds: [$piassaWaiter->id, $staff->id, $manager->id, $admin->id],
            );

            $this->upsertScreen(
                pickupLocationId: $piassaBranchId,
                name: 'Piassa Kitchen Screen',
                type: BranchScreen::TYPE_KITCHEN,
                userIds: [$piassaKitchen->id, $staff->id, $manager->id, $admin->id],
                menuItemIds: $foodItemIds,
            );

            $this->upsertScreen(
                pickupLocationId: $piassaBranchId,
                name: 'Piassa Cashier Screen',
                type: BranchScreen::TYPE_CASHIER,
                userIds: [$piassaCashier->id, $staff->id, $manager->id, $admin->id],
            );
        }
    }

    /**
     * Ensure custom operation roles exist and are mapped to permissions.
     */
    protected function ensureOperationalRoles(): void
    {
        $this->syncRolePermissions(
            name: 'Waiter Operator',
            slug: 'waiter_operator',
            description: 'Handle waiter screen order confirmation and serving.',
            permissionSlugs: ['orders.view', 'orders.update'],
        );

        $this->syncRolePermissions(
            name: 'Kitchen Operator',
            slug: 'kitchen_operator',
            description: 'Handle kitchen screen preparation workflow.',
            permissionSlugs: ['orders.view', 'orders.update'],
        );

        $this->syncRolePermissions(
            name: 'Cashier Operator',
            slug: 'cashier_operator',
            description: 'Handle cashier queue and payment-side processing visibility.',
            permissionSlugs: ['orders.view'],
        );
    }

    /**
     * @param  array<int, string>  $permissionSlugs
     */
    protected function syncRolePermissions(string $name, string $slug, string $description, array $permissionSlugs): void
    {
        $role = Role::query()->updateOrCreate(
            ['slug' => $slug],
            [
                'name' => $name,
                'description' => $description,
                'is_system' => false,
            ],
        );

        $permissionIds = Permission::query()
            ->whereIn('slug', $permissionSlugs)
            ->pluck('id')
            ->all();

        $role->permissions()->sync($permissionIds);
    }

    /**
     * @param  array<int, int>  $branchIds
     */
    protected function upsertUser(string $email, string $name, string $roleSlug, array $branchIds): User
    {
        $user = User::query()->updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make('password'),
                'role' => $roleSlug,
                'email_verified_at' => now(),
            ],
        );

        $user->syncRolesBySlugs([$roleSlug]);
        $user->syncPickupLocationsByIds($branchIds);

        return $user;
    }

    protected function upsertCustomerUser(): void
    {
        $customer = User::query()->updateOrCreate(
            ['email' => 'customer@example.com'],
            [
                'name' => 'Customer Demo',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'email_verified_at' => now(),
            ],
        );

        $customer->syncRolesBySlugs([]);
        $customer->syncPickupLocationsByIds([]);
    }

    /**
     * @param  array<int, int>  $userIds
     * @param  array<int, int>  $menuItemIds
     */
    protected function upsertScreen(
        int $pickupLocationId,
        string $name,
        string $type,
        array $userIds,
        array $menuItemIds = [],
    ): void {
        $screen = BranchScreen::query()->updateOrCreate(
            [
                'pickup_location_id' => $pickupLocationId,
                'name' => $name,
            ],
            [
                'screen_type' => $type,
                'is_active' => true,
            ],
        );

        $screen->users()->sync(array_values(array_unique($userIds)));

        if ($type === BranchScreen::TYPE_KITCHEN) {
            $screen->menuItems()->sync(array_values(array_unique($menuItemIds)));

            return;
        }

        $screen->menuItems()->sync([]);
    }
}
