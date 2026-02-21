<?php

use App\Models\BranchScreen;
use App\Models\Customer;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderScreenStatus;
use App\Models\PickupLocation;
use App\Models\User;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

function createWorkflowOrder(PickupLocation $location, array $orderItems, string $source = Order::SOURCE_WEB): Order
{
    $customer = Customer::query()->create([
        'name' => 'Workflow Customer '.Str::random(4),
        'phone' => '2519'.str_pad((string) random_int(10000000, 99999999), 8, '0', STR_PAD_LEFT),
    ]);

    $order = $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $location->id,
        'source_channel' => $source,
        'receipt_status' => 'pending',
        'order_status' => 'pending',
        'tracking_token' => Str::random(40),
        'total_amount' => collect($orderItems)->sum(fn ($item) => (float) $item['price'] * (int) $item['quantity']),
    ]);

    foreach ($orderItems as $item) {
        $order->items()->create([
            'menu_item_id' => $item['menu_item_id'],
            'quantity' => $item['quantity'],
            'price' => $item['price'],
        ]);
    }

    return $order;
}

test('waiter confirmation routes order items to matching kitchen screens and keeps source channel intact', function () {
    $location = PickupLocation::query()->create([
        'name' => 'Workflow Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $food = MenuItem::query()->create([
        'name' => 'Burger',
        'description' => 'Food',
        'price' => 200,
        'category' => 'Food',
        'is_active' => true,
    ]);

    $drink = MenuItem::query()->create([
        'name' => 'Lemonade',
        'description' => 'Drink',
        'price' => 80,
        'category' => 'Drinks',
        'is_active' => true,
    ]);

    $waiter = User::factory()->create([
        'role' => 'staff',
    ]);

    $waiterScreen = BranchScreen::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Waiter 1',
        'screen_type' => BranchScreen::TYPE_WAITER,
        'is_active' => true,
    ]);
    $waiterScreen->users()->sync([$waiter->id]);

    $kitchenScreen = BranchScreen::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Main Kitchen',
        'screen_type' => BranchScreen::TYPE_KITCHEN,
        'is_active' => true,
    ]);
    $kitchenScreen->menuItems()->sync([$food->id]);

    $barScreen = BranchScreen::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Bar',
        'screen_type' => BranchScreen::TYPE_KITCHEN,
        'is_active' => true,
    ]);
    $barScreen->menuItems()->sync([$drink->id]);

    $order = createWorkflowOrder($location, [
        [
            'menu_item_id' => $food->id,
            'quantity' => 1,
            'price' => 200,
        ],
        [
            'menu_item_id' => $drink->id,
            'quantity' => 2,
            'price' => 80,
        ],
    ], Order::SOURCE_TELEGRAM);

    $this->actingAs($waiter)
        ->patch(route('staff.waiter.confirm', $order))
        ->assertRedirect();

    $order->refresh();

    expect($order->waiter_status)->toBe(Order::WAITER_STATUS_CONFIRMED)
        ->and($order->waiter_confirmed_at)->not->toBeNull()
        ->and($order->source_channel)->toBe(Order::SOURCE_TELEGRAM);

    expect(OrderScreenStatus::query()->where('order_id', $order->id)->count())->toBe(2)
        ->and(OrderScreenStatus::query()->where('order_id', $order->id)->where('branch_screen_id', $kitchenScreen->id)->exists())->toBeTrue()
        ->and(OrderScreenStatus::query()->where('order_id', $order->id)->where('branch_screen_id', $barScreen->id)->exists())->toBeTrue();
});

test('kitchen prepared status moves order to ready and waiter can then serve', function () {
    $location = PickupLocation::query()->create([
        'name' => 'Kitchen Flow Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $menuItem = MenuItem::query()->create([
        'name' => 'Pasta',
        'description' => 'Food',
        'price' => 250,
        'category' => 'Food',
        'is_active' => true,
    ]);

    $waiter = User::factory()->create(['role' => 'staff']);
    $kitchenUser = User::factory()->create(['role' => 'staff']);

    $waiterScreen = BranchScreen::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Waiter Main',
        'screen_type' => BranchScreen::TYPE_WAITER,
        'is_active' => true,
    ]);
    $waiterScreen->users()->sync([$waiter->id]);

    $kitchenScreen = BranchScreen::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Kitchen Main',
        'screen_type' => BranchScreen::TYPE_KITCHEN,
        'is_active' => true,
    ]);
    $kitchenScreen->users()->sync([$kitchenUser->id]);
    $kitchenScreen->menuItems()->sync([$menuItem->id]);

    $order = createWorkflowOrder($location, [
        [
            'menu_item_id' => $menuItem->id,
            'quantity' => 1,
            'price' => 250,
        ],
    ], Order::SOURCE_TABLE);

    $this->actingAs($waiter)
        ->patch(route('staff.waiter.confirm', $order))
        ->assertRedirect();

    $screenStatus = OrderScreenStatus::query()
        ->where('order_id', $order->id)
        ->first();

    expect($screenStatus)->not->toBeNull();

    $this->actingAs($waiter)
        ->patch(route('staff.waiter.serve', $order))
        ->assertRedirect()
        ->assertSessionHas('error');

    $this->actingAs($kitchenUser)
        ->patch(route('staff.kitchen.update', $screenStatus), [
            'status' => OrderScreenStatus::STATUS_PREPARED,
        ])
        ->assertRedirect();

    $order->refresh();

    expect($order->order_status)->toBe('ready');

    $this->actingAs($waiter)
        ->patch(route('staff.waiter.serve', $order))
        ->assertRedirect();

    $order->refresh();

    expect($order->waiter_status)->toBe(Order::WAITER_STATUS_SERVED)
        ->and($order->served_at)->not->toBeNull()
        ->and($order->order_status)->toBe('completed');
});

test('cashier board lists only waiter confirmed orders', function () {
    $location = PickupLocation::query()->create([
        'name' => 'Cashier Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $cashier = User::factory()->create(['role' => 'staff']);

    $cashierScreen = BranchScreen::query()->create([
        'pickup_location_id' => $location->id,
        'name' => 'Cashier Desk A',
        'screen_type' => BranchScreen::TYPE_CASHIER,
        'is_active' => true,
    ]);
    $cashierScreen->users()->sync([$cashier->id]);

    $pendingOrder = createWorkflowOrder($location, [], Order::SOURCE_WEB);
    $confirmedOrder = createWorkflowOrder($location, [], Order::SOURCE_TABLE);

    $pendingOrder->update([
        'waiter_status' => Order::WAITER_STATUS_PENDING_CONFIRMATION,
    ]);

    $confirmedOrder->update([
        'waiter_status' => Order::WAITER_STATUS_CONFIRMED,
        'waiter_confirmed_at' => now(),
    ]);

    $this->withoutVite();

    $this->actingAs($cashier)
        ->get(route('staff.cashier.index', ['screen_id' => $cashierScreen->id]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('staff/cashier-board')
            ->where('summary.confirmed', 1)
            ->where('confirmedOrders.0.id', $confirmedOrder->id)
            ->where('confirmedOrders.0.source_channel', Order::SOURCE_TABLE)
            ->where('screens.0.id', $cashierScreen->id)
        );
});
