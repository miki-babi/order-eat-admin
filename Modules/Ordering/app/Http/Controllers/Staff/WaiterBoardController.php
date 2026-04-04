<?php

namespace Modules\Ordering\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\BranchScreen;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
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
                'customerInsights' => [],
                'behaviorTagCatalog' => $this->behaviorTagCatalog(),
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

        $pendingConfirmationOrderRows = (clone $ordersBase)
            ->where('waiter_status', Order::WAITER_STATUS_PENDING_CONFIRMATION)
            ->get();

        $confirmedOrderRows = (clone $ordersBase)
            ->where('waiter_status', Order::WAITER_STATUS_CONFIRMED)
            ->get();

        $servedOrderRows = (clone $ordersBase)
            ->where('waiter_status', Order::WAITER_STATUS_SERVED)
            ->latest('served_at')
            ->limit(50)
            ->get();

        $customerInsights = $this->buildCustomerInsights(
            $pendingConfirmationOrderRows
                ->concat($confirmedOrderRows)
                ->concat($servedOrderRows),
            $selectedScreen->pickup_location_id,
        );

        $pendingConfirmationOrders = $pendingConfirmationOrderRows
            ->map(fn (Order $order) => $this->transformOrder($order, false))
            ->values();

        $confirmedOrders = $confirmedOrderRows
            ->map(fn (Order $order) => $this->transformOrder($order, true))
            ->values();

        [$readyToServeOrders, $awaitingKitchenOrders] = $confirmedOrders
            ->partition(fn (array $order) => (bool) $order['is_ready_to_serve']);

        $servedOrders = $servedOrderRows
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
            'customerInsights' => $customerInsights,
            'behaviorTagCatalog' => $this->behaviorTagCatalog(),
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
     * Update customer behavior tags from waiter board modal.
     */
    public function updateCustomerTags(Request $request, Order $order): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $this->ensureUserCanOperateWaiterFlow($user, $order->pickup_location_id);

        if (! $order->customer_id) {
            return back()->with('error', 'This order does not have a customer profile to tag.');
        }

        $validated = $request->validate([
            'tags' => ['required', 'array'],
            'tags.*' => ['array'],
            'tags.*.*' => ['string', 'max:120'],
        ]);

        $sanitizedTags = $this->sanitizeBehaviorTags($validated['tags'] ?? []);

        $order->loadMissing('customer:id,tags');

        if (! $order->customer) {
            return back()->with('error', 'Unable to find customer profile for this order.');
        }

        $order->customer->update([
            'tags' => $sanitizedTags === [] ? null : $sanitizedTags,
        ]);

        return back()->with('success', 'Customer behavior tags updated.');
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
            'customer_id' => $order->customer_id ? (int) $order->customer_id : null,
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

    /**
     * Build customer-level insights used in the waiter board order detail modal.
     *
     * @param  Collection<int, Order>  $orders
     * @return array<int, array{
     *     behavior_tags: array<string, mixed>|list<mixed>|null,
     *     recent_orders: array<int, array{
     *         id: int,
     *         source_channel: string,
     *         waiter_status: string,
     *         order_status: string,
     *         table_name: string|null,
     *         total_amount: float,
     *         created_at: string|null,
     *         items: array<int, array{name: string, quantity: int}>
     *     }>,
     *     frequent_items: array<int, array{name: string, quantity: int, orders_count: int}>
     * }>
     */
    protected function buildCustomerInsights(Collection $orders, int $pickupLocationId): array
    {
        $customerIds = $orders
            ->pluck('customer_id')
            ->filter(fn ($id) => is_numeric($id))
            ->map(fn ($id) => (int) $id)
            ->unique()
            ->values();

        if ($customerIds->isEmpty()) {
            return [];
        }

        $behaviorTagsByCustomer = Customer::query()
            ->whereIn('id', $customerIds)
            ->get(['id', 'tags'])
            ->mapWithKeys(fn (Customer $customer) => [
                (int) $customer->id => $customer->tags,
            ]);

        $recentOrdersByCustomer = Order::query()
            ->with([
                'diningTable:id,name',
                'items.menuItem:id,name',
            ])
            ->whereIn('customer_id', $customerIds)
            ->where('pickup_location_id', $pickupLocationId)
            ->latest('created_at')
            ->get()
            ->groupBy(fn (Order $order) => (int) $order->customer_id)
            ->map(function (Collection $customerOrders): array {
                return $customerOrders
                    ->take(20)
                    ->map(fn (Order $order) => [
                        'id' => $order->id,
                        'source_channel' => in_array($order->source_channel, Order::sourceChannels(), true)
                            ? $order->source_channel
                            : Order::SOURCE_WEB,
                        'waiter_status' => $order->waiter_status,
                        'order_status' => $order->order_status,
                        'table_name' => $order->diningTable?->name,
                        'total_amount' => (float) $order->total_amount,
                        'created_at' => $order->created_at?->toDateTimeString(),
                        'items' => $order->items
                            ->map(fn ($item) => [
                                'name' => $item->menuItem?->name ?? 'Item',
                                'quantity' => (int) $item->quantity,
                            ])
                            ->values()
                            ->all(),
                    ])
                    ->values()
                    ->all();
            });

        $frequentItemsByCustomer = OrderItem::query()
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->leftJoin('menu_items', 'menu_items.id', '=', 'order_items.menu_item_id')
            ->whereIn('orders.customer_id', $customerIds)
            ->where('orders.pickup_location_id', $pickupLocationId)
            ->select('orders.customer_id')
            ->selectRaw('menu_items.name as item_name')
            ->selectRaw('SUM(order_items.quantity) as total_quantity')
            ->selectRaw('COUNT(DISTINCT orders.id) as orders_count')
            ->groupBy('orders.customer_id', 'menu_items.name')
            ->orderByDesc('total_quantity')
            ->get()
            ->groupBy(fn ($row) => (int) $row->customer_id)
            ->map(function (Collection $rows): array {
                return $rows
                    ->take(8)
                    ->map(fn ($row) => [
                        'name' => is_string($row->item_name) && trim($row->item_name) !== ''
                            ? trim($row->item_name)
                            : 'Item',
                        'quantity' => (int) $row->total_quantity,
                        'orders_count' => (int) $row->orders_count,
                    ])
                    ->values()
                    ->all();
            });

        $insights = [];

        foreach ($customerIds as $customerId) {
            $customerIdInt = (int) $customerId;

            $insights[$customerIdInt] = [
                'behavior_tags' => $behaviorTagsByCustomer[$customerIdInt] ?? null,
                'recent_orders' => $recentOrdersByCustomer[$customerIdInt] ?? [],
                'frequent_items' => $frequentItemsByCustomer[$customerIdInt] ?? [],
            ];
        }

        return $insights;
    }

    /**
     * @param  mixed  $rawTags
     * @return array<string, list<string>>
     */
    protected function sanitizeBehaviorTags($rawTags): array
    {
        if (! is_array($rawTags)) {
            return [];
        }

        /** @var array<string, list<string>> $allowedTagsByGroup */
        $allowedTagsByGroup = collect($this->behaviorTagCatalog())
            ->mapWithKeys(fn (array $group): array => [
                (string) $group['key'] => collect($group['tags'])
                    ->filter(fn ($tag): bool => is_string($tag) && trim($tag) !== '')
                    ->map(fn ($tag): string => trim((string) $tag))
                    ->values()
                    ->all(),
            ])
            ->all();

        $sanitized = [];

        foreach ($allowedTagsByGroup as $groupKey => $allowedTags) {
            $candidateTags = $rawTags[$groupKey] ?? null;

            if (! is_array($candidateTags)) {
                continue;
            }

            $normalizedCandidates = collect($candidateTags)
                ->filter(fn ($tag): bool => is_string($tag) && trim($tag) !== '')
                ->map(fn ($tag): string => trim((string) $tag))
                ->unique()
                ->values()
                ->all();

            $validTags = array_values(array_intersect($allowedTags, $normalizedCandidates));

            if ($validTags === []) {
                continue;
            }

            $sanitized[$groupKey] = $validTags;
        }

        return $sanitized;
    }

    /**
     * @return list<array{
     *     key: string,
     *     title: string,
     *     note: string|null,
     *     description: list<string>,
     *     tags: list<string>
     * }>
     */
    protected function behaviorTagCatalog(): array
    {
        return [
            [
                'key' => 'visit_behavior',
                'title' => 'Visit Behavior',
                'note' => 'VERY important',
                'description' => [
                    'Visit frequency (daily, weekly, rare)',
                    'Time of visit (morning / afternoon / night)',
                    'Day pattern (weekend vs weekday)',
                    'Stay duration (quick vs long stay)',
                ],
                'tags' => [
                    'Morning regular',
                    'Weekend visitor',
                    'Quick buyer',
                ],
            ],
            [
                'key' => 'ordering_behavior',
                'title' => 'Ordering Behavior',
                'note' => null,
                'description' => [
                    'Average spending',
                    'Favorite items / categories',
                    'Order size (1 item vs many)',
                    'Reorder rate (same thing again?)',
                ],
                'tags' => [
                    'High spender',
                    'Coffee lover',
                    'Bulk orderer',
                    'Repeater',
                ],
            ],
            [
                'key' => 'decision_style',
                'title' => 'Decision Style',
                'note' => null,
                'description' => [
                    'Time to order (fast vs slow)',
                    'Changes order often?',
                    'Needs waiter help?',
                ],
                'tags' => [
                    'Decisive',
                    'Indecisive',
                    'Needs assistance',
                ],
            ],
            [
                'key' => 'social_behavior',
                'title' => 'Social Behavior',
                'note' => null,
                'description' => [
                    'Comes alone or in group',
                    'Group size',
                    'Role in group (leader vs follower)',
                ],
                'tags' => [
                    'Group leader',
                    'Solo customer',
                    'Family type',
                ],
            ],
            [
                'key' => 'engagement_level',
                'title' => 'Engagement Level',
                'note' => null,
                'description' => [
                    'Calls waiter often?',
                    'Uses digital menu actively?',
                    'Responds to recommendations?',
                ],
                'tags' => [
                    'Highly engaged',
                    'Low interaction',
                ],
            ],
            [
                'key' => 'sensitivity_preferences',
                'title' => 'Sensitivity / Preferences',
                'note' => null,
                'description' => [
                    'Price sensitivity (cheap vs premium)',
                    'Likes discounts?',
                    'Tries new items or sticks to same?',
                ],
                'tags' => [
                    'Price sensitive',
                    'Explorer',
                    'Loyal to same item',
                ],
            ],
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
