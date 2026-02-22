<?php

namespace Modules\Customers\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Modules\Customers\Http\Requests\Staff\SendCustomerSmsRequest;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Support\BranchAccess;
use App\Services\SmsEthiopiaService;
use App\Services\SmsTemplateService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    /**
     * Show customer list, filters, and order history.
     */
    public function index(Request $request, SmsTemplateService $smsTemplateService): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $search = trim((string) $request->input('search', ''));
        $applyBranchScope = fn (Builder $query) => BranchAccess::scopeQuery($query, $user);

        $customers = Customer::query()
            ->whereHas('orders', $applyBranchScope)
            ->withCount(['orders as orders_count' => $applyBranchScope])
            ->withSum(['orders as orders_sum_total_amount' => $applyBranchScope], 'total_amount')
            ->withMax(['orders as orders_max_created_at' => $applyBranchScope], 'created_at')
            ->when($search !== '', function ($query) use ($search): void {
                $query->where(function ($builder) use ($search): void {
                    $builder
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('telegram_username', 'like', "%{$search}%")
                        ->orWhere('telegram_id', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('orders_count')
            ->paginate(20)
            ->withQueryString()
            ->through(fn (Customer $customer) => [
                'id' => $customer->id,
                'name' => $customer->name,
                'phone' => $customer->phone,
                'telegram_id' => is_string($customer->telegram_id) && trim($customer->telegram_id) !== ''
                    ? $customer->telegram_id
                    : null,
                'telegram_username' => $customer->telegram_username,
                'orders_count' => $customer->orders_count,
                'total_spent' => (float) ($customer->orders_sum_total_amount ?? 0),
                'last_order_at' => $customer->orders_max_created_at,
            ]);

        $selectedCustomer = null;

        if ($request->filled('customer_id')) {
            $selected = Customer::query()
                ->whereHas('orders', $applyBranchScope)
                ->find($request->integer('customer_id'));

            if ($selected) {
                $ordersBase = Order::query()
                    ->where('customer_id', $selected->id);
                BranchAccess::scopeQuery($ordersBase, $user);

                $recentOrders = (clone $ordersBase)
                    ->with([
                        'pickupLocation:id,name',
                        'diningTable:id,name',
                        'items.menuItem:id,name',
                    ])
                    ->latest()
                    ->limit(20)
                    ->get();

                $sourceCounts = (clone $ordersBase)
                    ->select('source_channel')
                    ->selectRaw('COUNT(*) as orders_count')
                    ->groupBy('source_channel')
                    ->pluck('orders_count', 'source_channel');

                $sourceSummary = [
                    'web' => (int) ($sourceCounts[Order::SOURCE_WEB] ?? 0),
                    'telegram' => (int) ($sourceCounts[Order::SOURCE_TELEGRAM] ?? 0),
                    'table' => (int) ($sourceCounts[Order::SOURCE_TABLE] ?? 0),
                ];
                $sourceSummary['total'] = $sourceSummary['web'] + $sourceSummary['telegram'] + $sourceSummary['table'];

                $branchSummaryQuery = Order::query()
                    ->leftJoin('pickup_locations', 'pickup_locations.id', '=', 'orders.pickup_location_id')
                    ->where('orders.customer_id', $selected->id)
                    ->select('pickup_locations.name as pickup_location')
                    ->selectRaw('COUNT(*) as orders_count');
                BranchAccess::scopeQuery($branchSummaryQuery, $user, 'orders.pickup_location_id');

                $branchSummary = $branchSummaryQuery
                    ->groupBy('pickup_locations.name')
                    ->orderByDesc('orders_count')
                    ->limit(5)
                    ->get()
                    ->map(fn ($row) => [
                        'pickup_location' => $row->pickup_location
                            ? (string) $row->pickup_location
                            : 'Unknown branch',
                        'orders_count' => (int) $row->orders_count,
                    ])
                    ->values();

                $topItemsQuery = OrderItem::query()
                    ->join('orders', 'orders.id', '=', 'order_items.order_id')
                    ->leftJoin('menu_items', 'menu_items.id', '=', 'order_items.menu_item_id')
                    ->where('orders.customer_id', $selected->id)
                    ->select('menu_items.name as item_name')
                    ->selectRaw('SUM(order_items.quantity) as total_quantity')
                    ->selectRaw('COUNT(DISTINCT orders.id) as orders_count');
                BranchAccess::scopeQuery($topItemsQuery, $user, 'orders.pickup_location_id');

                $topItems = $topItemsQuery
                    ->groupBy('menu_items.name')
                    ->orderByDesc('total_quantity')
                    ->limit(8)
                    ->get()
                    ->map(fn ($row) => [
                        'name' => $row->item_name
                            ? (string) $row->item_name
                            : 'Unknown item',
                        'quantity' => (int) $row->total_quantity,
                        'orders_count' => (int) $row->orders_count,
                    ])
                    ->values();

                $orderTimestamps = (clone $ordersBase)->pluck('created_at');

                $selectedCustomer = [
                    'id' => $selected->id,
                    'name' => $selected->name,
                    'phone' => $selected->phone,
                    'telegram_id' => is_string($selected->telegram_id) && trim($selected->telegram_id) !== ''
                        ? $selected->telegram_id
                        : null,
                    'telegram_username' => $selected->telegram_username,
                    'source_summary' => $sourceSummary,
                    'top_branch' => $branchSummary->first(),
                    'branch_summary' => $branchSummary,
                    'top_order_hours' => $this->topOrderHours($orderTimestamps),
                    'top_order_weekdays' => $this->topOrderWeekdays($orderTimestamps),
                    'top_items' => $topItems,
                    'orders' => $recentOrders->map(fn (Order $order) => [
                        'id' => $order->id,
                        'pickup_date' => $order->pickup_date?->toDateString(),
                        'pickup_location' => $order->pickupLocation?->name,
                        'source_channel' => $this->normalizeOrderSourceChannel($order->source_channel),
                        'table_name' => $order->diningTable?->name,
                        'order_status' => $order->order_status,
                        'receipt_status' => $order->receipt_status,
                        'total_amount' => (float) $order->total_amount,
                        'created_at' => $order->created_at?->toDateTimeString(),
                        'items' => $order->items->map(fn ($item) => [
                            'id' => $item->id,
                            'name' => $item->menuItem?->name,
                            'quantity' => $item->quantity,
                            'price' => (float) $item->price,
                            'line_total' => (float) $item->price * $item->quantity,
                        ])->values(),
                    ])->values(),
                ];
            }
        }

        $summaryBase = Customer::query()
            ->whereHas('orders', $applyBranchScope);

        return Inertia::render('staff/customers', [
            'customers' => $customers,
            'selectedCustomer' => $selectedCustomer,
            'filters' => [
                'search' => $search,
                'customer_id' => $request->input('customer_id'),
            ],
            'smsTemplates' => $smsTemplateService->templates(),
            'smsPlaceholders' => $smsTemplateService->placeholders(),
            'summary' => [
                'total_customers' => (clone $summaryBase)->count(),
                'active_customers' => (clone $summaryBase)->count(),
            ],
        ]);
    }

    /**
     * Send SMS messages to selected customers.
     */
    public function sendSms(
        SendCustomerSmsRequest $request,
        SmsEthiopiaService $smsService,
        SmsTemplateService $smsTemplateService,
    ): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $validated = $request->validated();

        $customers = Customer::query()
            ->whereHas('orders', fn ($query) => BranchAccess::scopeQuery($query, $user))
            ->whereIn('id', $validated['customer_ids'])
            ->get();

        $sent = 0;
        $failed = 0;

        foreach ($customers as $customer) {
            $latestOrderQuery = $customer->orders()->with(['pickupLocation', 'items.menuItem'])->latest();
            BranchAccess::scopeQuery($latestOrderQuery, $user);
            $latestOrder = $latestOrderQuery->first();

            $message = $smsTemplateService->render(
                $validated['message'],
                $smsTemplateService->variablesForCustomer($customer, $latestOrder),
            );
            $result = $smsService->send($customer->phone, $message, $customer);

            if ($result->status === 'sent') {
                $sent++;
            } else {
                $failed++;
            }
        }

        return back()->with('success', "SMS completed. Sent: {$sent}, Failed: {$failed}.");
    }

    /**
     * Resolve invalid or missing source channels to a safe default.
     */
    protected function normalizeOrderSourceChannel(?string $sourceChannel): string
    {
        return in_array($sourceChannel, Order::sourceChannels(), true)
            ? $sourceChannel
            : Order::SOURCE_WEB;
    }

    /**
     * Build a ranked list of top ordering hours from order timestamps.
     *
     * @param  Collection<int, mixed>  $orderTimestamps
     * @return array<int, array<string, int|string>>
     */
    protected function topOrderHours(Collection $orderTimestamps): array
    {
        $hourlyCounts = array_fill(0, 24, 0);

        foreach ($orderTimestamps as $timestamp) {
            if (! $timestamp) {
                continue;
            }

            $hour = Carbon::parse($timestamp)->hour;
            $hourlyCounts[$hour]++;
        }

        arsort($hourlyCounts);
        $topHours = [];

        foreach ($hourlyCounts as $hour => $count) {
            if ($count < 1) {
                continue;
            }

            $hourInt = (int) $hour;
            $nextHour = ($hourInt + 1) % 24;
            $topHours[] = [
                'hour' => $hourInt,
                'label' => sprintf('%02d:00-%02d:00', $hourInt, $nextHour),
                'orders_count' => (int) $count,
            ];

            if (count($topHours) === 3) {
                break;
            }
        }

        return $topHours;
    }

    /**
     * Build a ranked list of top ordering weekdays from order timestamps.
     *
     * @param  Collection<int, mixed>  $orderTimestamps
     * @return array<int, array<string, int|string>>
     */
    protected function topOrderWeekdays(Collection $orderTimestamps): array
    {
        $weekdayCounts = [
            'Monday' => 0,
            'Tuesday' => 0,
            'Wednesday' => 0,
            'Thursday' => 0,
            'Friday' => 0,
            'Saturday' => 0,
            'Sunday' => 0,
        ];

        foreach ($orderTimestamps as $timestamp) {
            if (! $timestamp) {
                continue;
            }

            $weekday = Carbon::parse($timestamp)->englishDayOfWeek;
            $weekdayCounts[$weekday] = ($weekdayCounts[$weekday] ?? 0) + 1;
        }

        arsort($weekdayCounts);
        $topDays = [];

        foreach ($weekdayCounts as $weekday => $count) {
            if ($count < 1) {
                continue;
            }

            $topDays[] = [
                'weekday' => $weekday,
                'orders_count' => (int) $count,
            ];

            if (count($topDays) === 3) {
                break;
            }
        }

        return $topDays;
    }
}
