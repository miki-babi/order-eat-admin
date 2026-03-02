<?php

use App\Models\CakePackage;
use App\Models\CakePreorder;
use App\Models\CateringPackage;
use App\Models\Customer;
use App\Models\User;

test('customer can submit a cake preorder with selected packages', function () {
    config(['services.sms_ethiopia.enabled' => false]);

    $classic = CakePackage::query()->create([
        'name' => 'Classic Chocolate',
        'description' => 'Chocolate sponge with ganache.',
        'price' => 1500,
        'is_active' => true,
    ]);

    $vanilla = CakePackage::query()->create([
        'name' => 'Vanilla Celebration',
        'description' => 'Vanilla cream and fruit filling.',
        'price' => 1700,
        'is_active' => true,
    ]);

    $response = $this->post(route('cakes.preorders.store'), [
        'name' => 'Miki Customer',
        'phone' => '0911000222',
        'needed_date' => now()->addDays(3)->toDateString(),
        'special_instructions' => 'Please add gold ribbon style.',
        'items' => [
            [
                'cake_package_id' => $classic->id,
                'quantity' => 1,
                'size' => 'Medium',
                'servings' => 12,
                'specification' => 'Write Happy Birthday Miki',
            ],
            [
                'cake_package_id' => $vanilla->id,
                'quantity' => 2,
                'size' => 'Large',
                'servings' => 20,
                'specification' => 'No nuts',
            ],
        ],
    ]);

    $response
        ->assertRedirect()
        ->assertSessionHas('success');

    expect(Customer::query()->where('phone', '+251911000222')->exists())->toBeTrue();
    expect(CakePreorder::query()->count())->toBe(1);
    expect(CakePreorder::query()->first()?->items()->count())->toBe(2);
    $this->assertDatabaseHas('cake_preorder_items', [
        'cake_package_id' => $classic->id,
        'size' => 'Medium',
        'servings' => 12,
    ]);

    $this->assertDatabaseHas('sms_logs', [
        'phone' => '+251911000222',
        'status' => 'failed',
    ]);
});

test('customer can submit catering request and estimated total is saved', function () {
    config(['services.sms_ethiopia.enabled' => false]);

    $package = CateringPackage::query()->create([
        'name' => 'Corporate Buffet',
        'description' => 'Buffet service with setup crew.',
        'price_per_person' => 350,
        'min_guests' => 40,
        'is_active' => true,
    ]);

    $dessert = CateringPackage::query()->create([
        'name' => 'Dessert Station',
        'description' => 'Dessert add-on package.',
        'price_per_person' => 80,
        'min_guests' => 20,
        'is_active' => true,
    ]);

    $response = $this->post(route('catering.requests.store'), [
        'name' => 'Miki Organizer',
        'phone' => '0911555444',
        'package_ids' => [$package->id, $dessert->id],
        'event_date' => now()->addDays(7)->toDateString(),
        'guest_count' => 50,
        'venue' => 'Bole Event Hall',
        'special_instructions' => 'Need vegetarian section and coffee station.',
    ]);

    $response
        ->assertRedirect()
        ->assertSessionHas('success');

    $this->assertDatabaseHas('catering_service_requests', [
        'catering_package_id' => $package->id,
        'guest_count' => 50,
        'venue' => 'Bole Event Hall',
        'status' => 'pending',
        'total_estimate' => 0,
    ]);

    $this->assertDatabaseHas('catering_service_request_items', [
        'catering_package_id' => $package->id,
    ]);

    $this->assertDatabaseHas('catering_service_request_items', [
        'catering_package_id' => $dessert->id,
    ]);

    $this->assertDatabaseHas('sms_logs', [
        'phone' => '+251911555444',
        'status' => 'failed',
    ]);
});

test('staff can manage cake packages and update preorder status', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $customer = Customer::query()->create([
        'name' => 'Flow Tester',
        'phone' => '+251900000123',
    ]);

    $package = CakePackage::query()->create([
        'name' => 'History Package',
        'description' => 'Used package',
        'price' => 1200,
        'is_active' => true,
    ]);

    $preorder = CakePreorder::query()->create([
        'customer_id' => $customer->id,
        'needed_date' => now()->addDays(2)->toDateString(),
        'status' => 'pending',
        'special_instructions' => 'None',
        'total_amount' => 1200,
    ]);

    $preorder->items()->create([
        'cake_package_id' => $package->id,
        'quantity' => 1,
        'size' => 'Medium',
        'servings' => 10,
        'unit_price' => 1200,
        'specification' => 'Standard',
    ]);

    $this->actingAs($admin)
        ->post(route('staff.cake-packages.store'), [
            'name' => 'New Staff Package',
            'description' => 'Created by admin',
            'price' => 1800,
            'is_active' => true,
        ])
        ->assertRedirect();

    $this->actingAs($admin)
        ->patch(route('staff.cake-preorders.status', $preorder), [
            'status' => 'reviewed',
        ])
        ->assertRedirect();

    $this->actingAs($admin)
        ->delete(route('staff.cake-packages.destroy', $package))
        ->assertRedirect();

    expect($preorder->fresh()?->status)->toBe('reviewed');
    expect($package->fresh()?->is_active)->toBeFalse();
    expect(CakePackage::query()->where('name', 'New Staff Package')->exists())->toBeTrue();
});
