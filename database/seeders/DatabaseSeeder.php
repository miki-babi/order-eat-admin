<?php

namespace Database\Seeders;

use App\Models\DiningTable;
use App\Models\MenuItem;
use App\Models\PickupLocation;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolePermissionSeeder::class);

        $menuItems = [
            [
                'name' => 'Cappuccino',
                'description' => 'Espresso with steamed milk foam.',
                'price' => 180,
                'category' => 'Drinks',
                'image_url' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Iced Latte',
                'description' => 'Cold espresso latte served over ice.',
                'price' => 170,
                'category' => 'Drinks',
                'image_url' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Butter Croissant',
                'description' => 'Freshly baked flaky croissant.',
                'price' => 90,
                'category' => 'Pastries',
                'image_url' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Blueberry Muffin',
                'description' => 'Soft muffin with blueberry filling.',
                'price' => 95,
                'category' => 'Pastries',
                'image_url' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Avocado Toast',
                'description' => 'Sourdough toast with avocado mash.',
                'price' => 220,
                'category' => 'Specials',
                'image_url' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($menuItems as $item) {
            MenuItem::query()->updateOrCreate(
                ['name' => $item['name']],
                $item,
            );
        }

        $pickupLocations = [
            [
                'name' => 'Bole Branch',
                'address' => 'Bole Road, Addis Ababa',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Bole+Road,+Addis+Ababa',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Piassa Branch',
                'address' => 'Churchill Avenue, Addis Ababa',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Churchill+Avenue,+Addis+Ababa',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($pickupLocations as $location) {
            PickupLocation::query()->updateOrCreate(
                ['name' => $location['name']],
                $location,
            );
        }

        $boleBranch = PickupLocation::query()->where('name', 'Bole Branch')->first();
        $piassaBranch = PickupLocation::query()->where('name', 'Piassa Branch')->first();

        $diningTables = [
            [
                'pickup_location_id' => $boleBranch?->id,
                'name' => 'Table 1',
                'qr_code' => 'bole-table-01',
                'is_active' => true,
            ],
            [
                'pickup_location_id' => $boleBranch?->id,
                'name' => 'Table 2',
                'qr_code' => 'bole-table-02',
                'is_active' => true,
            ],
            [
                'pickup_location_id' => $piassaBranch?->id,
                'name' => 'Table 1',
                'qr_code' => 'piassa-table-01',
                'is_active' => true,
            ],
        ];

        foreach ($diningTables as $table) {
            if (! $table['pickup_location_id']) {
                continue;
            }

            DiningTable::query()->updateOrCreate(
                ['qr_code' => $table['qr_code']],
                [
                    'pickup_location_id' => $table['pickup_location_id'],
                    'name' => $table['name'],
                    'is_active' => $table['is_active'],
                ],
            );
        }

        $this->call(DemoUsersSeeder::class);
    }
}
