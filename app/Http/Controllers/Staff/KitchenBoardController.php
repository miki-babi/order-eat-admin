<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\BranchScreen;
use App\Models\Order;
use App\Models\OrderScreenStatus;
use App\Models\User;
use App\Support\BranchAccess;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class KitchenBoardController extends Controller
{
    /**
     * Show kitchen queue for selected kitchen screen.
     */
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        $screens = $this->availableScreensForUser($user);
        $selectedScreen = $this->resolveSelectedScreen($request, $screens);

        if (! $selectedScreen) {
            return Inertia::render('staff/kitchen-board', [
                'screens' => [],
                'selectedScreenId' => null,
                'statusFilter' => 'all',
                'orderStatuses' => [],
                'summary' => [
                    'pending' => 0,
                    'preparing' => 0,
                    'prepared' => 0,
                ],
            ]);
        }

        $statusFilter = $this->normalizeStatusFilter($request->input('status'));

        $statusesBase = OrderScreenStatus::query()
            ->with([
                'updatedBy:id,name',
                'order.customer:id,name,phone',
                'order.pickupLocation:id,name',
                'order.diningTable:id,name',
                'order.items.menuItem:id,name',
            ])
            ->where('branch_screen_id', $selectedScreen->id)
            ->whereHas('order', fn ($query) => $query->where('waiter_status', Order::WAITER_STATUS_CONFIRMED));

        if ($statusFilter !== 'all') {
            $statusesBase->where('status', $statusFilter);
        }

        $orderStatuses = (clone $statusesBase)
            ->orderByRaw("CASE status WHEN 'pending' THEN 1 WHEN 'preparing' THEN 2 WHEN 'prepared' THEN 3 ELSE 4 END")
            ->orderBy('created_at')
            ->get()
            ->map(fn (OrderScreenStatus $orderStatus) => [
                'id' => $orderStatus->id,
                'status' => $orderStatus->status,
                'preparing_started_at' => $orderStatus->preparing_started_at?->toDateTimeString(),
                'prepared_at' => $orderStatus->prepared_at?->toDateTimeString(),
                'updated_by' => $orderStatus->updatedBy?->name,
                'updated_at' => $orderStatus->updated_at?->toDateTimeString(),
                'order' => [
                    'id' => $orderStatus->order?->id,
                    'source_channel' => $this->sourceChannelForOrder($orderStatus->order),
                    'table_name' => $orderStatus->order?->diningTable?->name,
                    'customer_name' => $orderStatus->order?->customer?->name,
                    'customer_phone' => $orderStatus->order?->customer?->phone,
                    'waiter_confirmed_at' => $orderStatus->order?->waiter_confirmed_at?->toDateTimeString(),
                    'total_amount' => (float) ($orderStatus->order?->total_amount ?? 0),
                    'created_at' => $orderStatus->order?->created_at?->toDateTimeString(),
                    'items' => $orderStatus->order?->items
                        ? $orderStatus->order->items->map(fn ($item) => [
                            'id' => $item->id,
                            'name' => $item->menuItem?->name,
                            'quantity' => $item->quantity,
                        ])->values()
                        : [],
                ],
            ])
            ->values();

        $summaryBase = OrderScreenStatus::query()
            ->where('branch_screen_id', $selectedScreen->id)
            ->whereHas('order', fn ($query) => $query->where('waiter_status', Order::WAITER_STATUS_CONFIRMED));

        return Inertia::render('staff/kitchen-board', [
            'screens' => $screens->map(fn (BranchScreen $screen) => [
                'id' => $screen->id,
                'name' => $screen->name,
                'pickup_location_id' => $screen->pickup_location_id,
                'pickup_location_name' => $screen->pickupLocation?->name,
            ])->values(),
            'selectedScreenId' => $selectedScreen->id,
            'statusFilter' => $statusFilter,
            'orderStatuses' => $orderStatuses,
            'summary' => [
                'pending' => (clone $summaryBase)->where('status', OrderScreenStatus::STATUS_PENDING)->count(),
                'preparing' => (clone $summaryBase)->where('status', OrderScreenStatus::STATUS_PREPARING)->count(),
                'prepared' => (clone $summaryBase)->where('status', OrderScreenStatus::STATUS_PREPARED)->count(),
            ],
        ]);
    }

    /**
     * Update a kitchen status row.
     */
    public function update(Request $request, OrderScreenStatus $orderScreenStatus): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $validated = $request->validate([
            'status' => ['required', Rule::in(OrderScreenStatus::statuses())],
        ]);

        $orderScreenStatus->loadMissing(['branchScreen', 'order']);

        $screen = $orderScreenStatus->branchScreen;

        if (! $screen) {
            abort(404);
        }

        BranchAccess::ensureUserCanAccessBranch($user, $screen->pickup_location_id);
        $this->ensureUserAssignedToScreen($user, $screen);

        $nextStatus = (string) $validated['status'];
        $updates = [
            'status' => $nextStatus,
            'updated_by_user_id' => $user->id,
        ];

        if ($nextStatus === OrderScreenStatus::STATUS_PENDING) {
            $updates['preparing_started_at'] = null;
            $updates['prepared_at'] = null;
        }

        if ($nextStatus === OrderScreenStatus::STATUS_PREPARING) {
            $updates['preparing_started_at'] = $orderScreenStatus->preparing_started_at ?? now();
            $updates['prepared_at'] = null;
        }

        if ($nextStatus === OrderScreenStatus::STATUS_PREPARED) {
            $updates['preparing_started_at'] = $orderScreenStatus->preparing_started_at ?? now();
            $updates['prepared_at'] = now();
        }

        $orderScreenStatus->update($updates);

        if ($orderScreenStatus->order) {
            $this->syncParentOrderStatus($orderScreenStatus->order);
        }

        return back()->with('success', 'Kitchen status updated.');
    }

    /**
     * @return Collection<int, BranchScreen>
     */
    protected function availableScreensForUser(User $user): Collection
    {
        $screensQuery = BranchScreen::query()
            ->with('pickupLocation:id,name')
            ->where('screen_type', BranchScreen::TYPE_KITCHEN)
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

    protected function normalizeStatusFilter(mixed $status): string
    {
        if (! is_string($status)) {
            return 'all';
        }

        $normalized = strtolower(trim($status));

        return in_array($normalized, ['all', ...OrderScreenStatus::statuses()], true)
            ? $normalized
            : 'all';
    }

    protected function ensureUserAssignedToScreen(User $user, BranchScreen $screen): void
    {
        if ($user->isAdmin()) {
            return;
        }

        $assigned = $screen->users()
            ->where('users.id', $user->id)
            ->exists();

        if (! $assigned) {
            abort(403);
        }
    }

    protected function syncParentOrderStatus(Order $order): void
    {
        if ($order->waiter_status === Order::WAITER_STATUS_SERVED) {
            if ($order->order_status !== 'completed') {
                $order->update(['order_status' => 'completed']);
            }

            return;
        }

        $order->loadMissing('screenStatuses');

        if ($order->screenStatuses->isEmpty()) {
            if ($order->waiter_status === Order::WAITER_STATUS_CONFIRMED && $order->order_status !== 'ready') {
                $order->update(['order_status' => 'ready']);
            }

            return;
        }

        $allPrepared = $order->screenStatuses->every(
            fn (OrderScreenStatus $status) => $status->status === OrderScreenStatus::STATUS_PREPARED,
        );

        $nextOrderStatus = $allPrepared ? 'ready' : 'preparing';

        if ($order->order_status !== $nextOrderStatus) {
            $order->update(['order_status' => $nextOrderStatus]);
        }
    }

    protected function sourceChannelForOrder(?Order $order): string
    {
        if (! $order) {
            return Order::SOURCE_WEB;
        }

        return in_array($order->source_channel, Order::sourceChannels(), true)
            ? $order->source_channel
            : Order::SOURCE_WEB;
    }
}
