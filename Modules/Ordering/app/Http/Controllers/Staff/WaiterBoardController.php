<?php

namespace Modules\Ordering\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\BranchScreen;
use App\Models\Order;
use App\Models\OrderScreenStatus;
use App\Models\User;
use App\Support\BranchAccess;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class WaiterBoardController extends Controller
{
    /**
     * Show waiter queue for assigned branch screens.
     */
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        $screensQuery = BranchScreen::query()
            ->with('pickupLocation:id,name')
            ->where('screen_type', BranchScreen::TYPE_WAITER)
            ->where('is_active', true)
            ->orderBy('pickup_location_id')
            ->orderBy('name');

        BranchAccess::scopeQuery($screensQuery, $user, 'pickup_location_id');

        if (! $user->isAdmin()) {
            $screensQuery->whereHas('users', fn ($query) => $query->where('users.id', $user->id));
        }

        /** @var Collection<int, BranchScreen> $screens */
        $screens = $screensQuery->get();

        $selectedScreen = $this->resolveSelectedScreen($request, $screens);

        if (! $selectedScreen) {
            return Inertia::render('staff/waiter-board', [
                'screens' => [],
                'selectedScreenId' => null,
                'pendingConfirmationOrders' => [],
                'awaitingKitchenOrders' => [],
                'readyToServeOrders' => [],
                'servedOrders' => [],
                'summary' => [
                    'pending_confirmation' => 0,
                    'awaiting_kitchen' => 0,
                    'ready_to_serve' => 0,
                    'served' => 0,
                ],
            ]);
        }

        $ordersBase = Order::query()
            ->with([
                'customer:id,name,phone',
                'pickupLocation:id,name',
                'diningTable:id,name',
                'items.menuItem:id,name',
                'screenStatuses.branchScreen:id,name',
            ])
            ->where('pickup_location_id', $selectedScreen->pickup_location_id)
            ->orderBy('created_at');

        $pendingConfirmationOrders = (clone $ordersBase)
            ->where('waiter_status', Order::WAITER_STATUS_PENDING_CONFIRMATION)
            ->get()
            ->map(fn (Order $order) => $this->transformOrder($order, false))
            ->values();

        $confirmedOrders = (clone $ordersBase)
            ->where('waiter_status', Order::WAITER_STATUS_CONFIRMED)
            ->get()
            ->map(fn (Order $order) => $this->transformOrder($order, true))
            ->values();

        [$readyToServeOrders, $awaitingKitchenOrders] = $confirmedOrders
            ->partition(fn (array $order) => (bool) $order['is_ready_to_serve']);

        $servedOrders = (clone $ordersBase)
            ->where('waiter_status', Order::WAITER_STATUS_SERVED)
            ->latest('served_at')
            ->limit(50)
            ->get()
            ->map(fn (Order $order) => $this->transformOrder($order, false))
            ->values();

        return Inertia::render('staff/waiter-board', [
            'screens' => $screens->map(fn (BranchScreen $screen) => [
                'id' => $screen->id,
                'name' => $screen->name,
                'pickup_location_id' => $screen->pickup_location_id,
                'pickup_location_name' => $screen->pickupLocation?->name,
            ])->values(),
            'selectedScreenId' => $selectedScreen->id,
            'pendingConfirmationOrders' => $pendingConfirmationOrders,
            'awaitingKitchenOrders' => $awaitingKitchenOrders->values(),
            'readyToServeOrders' => $readyToServeOrders->values(),
            'servedOrders' => $servedOrders,
            'summary' => [
                'pending_confirmation' => $pendingConfirmationOrders->count(),
                'awaiting_kitchen' => $awaitingKitchenOrders->count(),
                'ready_to_serve' => $readyToServeOrders->count(),
                'served' => $servedOrders->count(),
            ],
        ]);
    }

    /**
     * Confirm waiter acceptance and route order to matching kitchen screens.
     */
    public function confirm(Request $request, Order $order): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $this->ensureUserCanOperateWaiterFlow($user, $order->pickup_location_id);

        DB::transaction(function () use ($order, $user): void {
            $lockedOrder = Order::query()
                ->with('items:id,order_id,menu_item_id')
                ->whereKey($order->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($lockedOrder->waiter_status === Order::WAITER_STATUS_SERVED) {
                return;
            }

            if ($lockedOrder->waiter_status === Order::WAITER_STATUS_PENDING_CONFIRMATION) {
                $updates = [
                    'waiter_status' => Order::WAITER_STATUS_CONFIRMED,
                    'waiter_confirmed_at' => now(),
                    'served_at' => null,
                ];

                if ($lockedOrder->order_status === 'pending') {
                    $updates['order_status'] = 'preparing';
                }

                $lockedOrder->update($updates);
            }

            $menuItemIds = $lockedOrder->items
                ->pluck('menu_item_id')
                ->map(fn ($id) => (int) $id)
                ->unique()
                ->values()
                ->all();

            $kitchenScreenIds = $menuItemIds === []
                ? []
                : BranchScreen::query()
                    ->where('pickup_location_id', $lockedOrder->pickup_location_id)
                    ->where('screen_type', BranchScreen::TYPE_KITCHEN)
                    ->where('is_active', true)
                    ->whereHas('menuItems', fn ($query) => $query->whereIn('menu_items.id', $menuItemIds))
                    ->pluck('id')
                    ->map(fn ($id) => (int) $id)
                    ->values()
                    ->all();

            $existingKitchenStatuses = OrderScreenStatus::query()
                ->where('order_id', $lockedOrder->id)
                ->whereHas('branchScreen', function ($query) use ($lockedOrder): void {
                    $query
                        ->where('pickup_location_id', $lockedOrder->pickup_location_id)
                        ->where('screen_type', BranchScreen::TYPE_KITCHEN);
                });

            if ($kitchenScreenIds === []) {
                $existingKitchenStatuses->delete();

                if ($lockedOrder->waiter_status === Order::WAITER_STATUS_CONFIRMED) {
                    $lockedOrder->update([
                        'order_status' => 'ready',
                    ]);
                }

                return;
            }

            (clone $existingKitchenStatuses)
                ->whereNotIn('branch_screen_id', $kitchenScreenIds)
                ->delete();

            foreach ($kitchenScreenIds as $screenId) {
                OrderScreenStatus::query()->firstOrCreate(
                    [
                        'order_id' => $lockedOrder->id,
                        'branch_screen_id' => $screenId,
                    ],
                    [
                        'status' => OrderScreenStatus::STATUS_PENDING,
                        'updated_by_user_id' => $user->id,
                    ],
                );
            }

            if ($lockedOrder->order_status === 'pending') {
                $lockedOrder->update([
                    'order_status' => 'preparing',
                ]);
            }
        });

        return back()->with('success', 'Order confirmed and sent to kitchen/cashier screens.');
    }

    /**
     * Mark a waiter-confirmed order as served.
     */
    public function serve(Request $request, Order $order): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $this->ensureUserCanOperateWaiterFlow($user, $order->pickup_location_id);

        $order->loadMissing('screenStatuses');

        if ($order->waiter_status !== Order::WAITER_STATUS_CONFIRMED) {
            return back()->with('error', 'Only confirmed orders can be marked as served.');
        }

        $allPrepared = $order->screenStatuses->every(
            fn (OrderScreenStatus $screenStatus) => $screenStatus->status === OrderScreenStatus::STATUS_PREPARED,
        );

        if (! $allPrepared) {
            return back()->with('error', 'Kitchen items must be prepared before serving.');
        }

        $order->update([
            'waiter_status' => Order::WAITER_STATUS_SERVED,
            'served_at' => now(),
            'order_status' => 'completed',
        ]);

        return back()->with('success', 'Order marked as served.');
    }

    /**
     * @param  Collection<int, BranchScreen>  $screens
     */
    protected function resolveSelectedScreen(Request $request, Collection $screens): ?BranchScreen
    {
        if ($screens->isEmpty()) {
            return null;
        }

        $requestedScreenId = $request->integer('screen_id');

        if ($requestedScreenId > 0) {
            $matched = $screens->first(fn (BranchScreen $screen) => $screen->id === $requestedScreenId);

            if ($matched) {
                return $matched;
            }
        }

        return $screens->first();
    }

    /**
     * @return array<string, mixed>
     */
    protected function transformOrder(Order $order, bool $includeKitchenProgress): array
    {
        $kitchenStatuses = $order->screenStatuses;
        $kitchenTotal = $kitchenStatuses->count();
        $kitchenPrepared = $kitchenStatuses
            ->filter(fn (OrderScreenStatus $status) => $status->status === OrderScreenStatus::STATUS_PREPARED)
            ->count();

        return [
            'id' => $order->id,
            'source_channel' => in_array($order->source_channel, Order::sourceChannels(), true)
                ? $order->source_channel
                : Order::SOURCE_WEB,
            'pickup_location' => $order->pickupLocation?->name,
            'table_name' => $order->diningTable?->name,
            'customer_name' => $order->customer?->name,
            'customer_phone' => $order->customer?->phone,
            'waiter_status' => $order->waiter_status,
            'order_status' => $order->order_status,
            'total_amount' => (float) $order->total_amount,
            'created_at' => $order->created_at?->toDateTimeString(),
            'waiter_confirmed_at' => $order->waiter_confirmed_at?->toDateTimeString(),
            'served_at' => $order->served_at?->toDateTimeString(),
            'items' => $order->items->map(fn ($item) => [
                'id' => $item->id,
                'name' => $item->menuItem?->name,
                'quantity' => $item->quantity,
            ])->values(),
            'kitchen_progress' => [
                'total' => $kitchenTotal,
                'prepared' => $kitchenPrepared,
            ],
            'kitchen_screens' => $includeKitchenProgress
                ? $kitchenStatuses->map(fn (OrderScreenStatus $status) => [
                    'id' => $status->id,
                    'name' => $status->branchScreen?->name,
                    'status' => $status->status,
                ])->values()
                : [],
            'is_ready_to_serve' => $kitchenTotal === 0 || $kitchenPrepared === $kitchenTotal,
        ];
    }

    protected function ensureUserCanOperateWaiterFlow(User $user, int $pickupLocationId): void
    {
        BranchAccess::ensureUserCanAccessBranch($user, $pickupLocationId);

        if ($user->isAdmin()) {
            return;
        }

        $assigned = BranchScreen::query()
            ->where('pickup_location_id', $pickupLocationId)
            ->where('screen_type', BranchScreen::TYPE_WAITER)
            ->where('is_active', true)
            ->whereHas('users', fn ($query) => $query->where('users.id', $user->id))
            ->exists();

        if (! $assigned) {
            abort(403);
        }
    }
}
