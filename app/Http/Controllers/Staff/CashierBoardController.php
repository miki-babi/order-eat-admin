<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\BranchScreen;
use App\Models\Order;
use App\Models\User;
use App\Support\BranchAccess;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class CashierBoardController extends Controller
{
    /**
     * Show cashier queue for a selected cashier screen.
     */
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        $screens = $this->availableScreensForUser($user);
        $selectedScreen = $this->resolveSelectedScreen($request, $screens);

        if (! $selectedScreen) {
            return Inertia::render('staff/cashier-board', [
                'screens' => [],
                'selectedScreenId' => null,
                'confirmedOrders' => [],
                'servedOrders' => [],
                'summary' => [
                    'confirmed' => 0,
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
            ])
            ->where('pickup_location_id', $selectedScreen->pickup_location_id)
            ->orderBy('created_at');

        $confirmedOrders = (clone $ordersBase)
            ->where('waiter_status', Order::WAITER_STATUS_CONFIRMED)
            ->get()
            ->map(fn (Order $order) => $this->transformOrder($order))
            ->values();

        $servedOrders = (clone $ordersBase)
            ->where('waiter_status', Order::WAITER_STATUS_SERVED)
            ->latest('served_at')
            ->limit(100)
            ->get()
            ->map(fn (Order $order) => $this->transformOrder($order))
            ->values();

        return Inertia::render('staff/cashier-board', [
            'screens' => $screens->map(fn (BranchScreen $screen) => [
                'id' => $screen->id,
                'name' => $screen->name,
                'pickup_location_id' => $screen->pickup_location_id,
                'pickup_location_name' => $screen->pickupLocation?->name,
            ])->values(),
            'selectedScreenId' => $selectedScreen->id,
            'confirmedOrders' => $confirmedOrders,
            'servedOrders' => $servedOrders,
            'summary' => [
                'confirmed' => $confirmedOrders->count(),
                'served' => $servedOrders->count(),
            ],
        ]);
    }

    /**
     * @return Collection<int, BranchScreen>
     */
    protected function availableScreensForUser(User $user): Collection
    {
        $screensQuery = BranchScreen::query()
            ->with('pickupLocation:id,name')
            ->where('screen_type', BranchScreen::TYPE_CASHIER)
            ->where('is_active', true)
            ->orderBy('pickup_location_id')
            ->orderBy('name');

        BranchAccess::scopeQuery($screensQuery, $user, 'pickup_location_id');

        if (! $user->isAdmin()) {
            $screensQuery->whereHas('users', fn ($query) => $query->where('users.id', $user->id));
        }

        return $screensQuery->get();
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
    protected function transformOrder(Order $order): array
    {
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
            'receipt_status' => $order->receipt_status,
            'total_amount' => (float) $order->total_amount,
            'created_at' => $order->created_at?->toDateTimeString(),
            'waiter_confirmed_at' => $order->waiter_confirmed_at?->toDateTimeString(),
            'served_at' => $order->served_at?->toDateTimeString(),
            'items' => $order->items->map(fn ($item) => [
                'id' => $item->id,
                'name' => $item->menuItem?->name,
                'quantity' => $item->quantity,
                'line_total' => (float) $item->price * $item->quantity,
            ])->values(),
        ];
    }
}
