<?php

namespace Modules\Reporting\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PickupLocation;
use App\Models\SmsLog;
use App\Support\BranchAccess;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    /**
     * Show reports and analytics page.
     */
    public function index(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $from = $this->safeDateInput($request, 'from') ?? now()->subDays(30)->toDateString();
        $to = $this->safeDateInput($request, 'to') ?? now()->toDateString();
        $pickupLocationId = $request->filled('pickup_location_id')
            ? $request->integer('pickup_location_id')
            : null;

        if ($pickupLocationId !== null) {
            BranchAccess::ensureUserCanAccessBranch($user, $pickupLocationId);
        }

        $orders = Order::query()
            ->whereDate('created_at', '>=', $from)
            ->whereDate('created_at', '<=', $to)
            ->when($pickupLocationId, fn ($query, $value) => $query->where('pickup_location_id', $value));
        BranchAccess::scopeQuery($orders, $user);

        $salesByPeriod = (clone $orders)
            ->selectRaw('DATE(created_at) as period, COUNT(*) as orders_count, SUM(total_amount) as total_sales')
            ->groupBy('period')
            ->orderBy('period')
            ->get()
            ->map(fn ($row) => [
                'period' => $row->period,
                'orders_count' => (int) $row->orders_count,
                'total_sales' => (float) $row->total_sales,
            ]);

        $popularItems = OrderItem::query()
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->join('menu_items', 'menu_items.id', '=', 'order_items.menu_item_id')
            ->whereDate('orders.created_at', '>=', $from)
            ->whereDate('orders.created_at', '<=', $to)
            ->when($pickupLocationId, fn ($query, $value) => $query->where('orders.pickup_location_id', $value))
            ->select([
                'menu_items.name as item_name',
                DB::raw('SUM(order_items.quantity) as quantity_sold'),
                DB::raw('SUM(order_items.quantity * order_items.price) as total_sales'),
            ])
            ->when(
                ! $user->isAdmin() && $user->accessiblePickupLocationIds() !== [],
                fn ($query) => $query->whereIn('orders.pickup_location_id', $user->accessiblePickupLocationIds()),
            )
            ->groupBy('menu_items.id', 'menu_items.name')
            ->orderByDesc('quantity_sold')
            ->limit(10)
            ->get()
            ->map(fn ($item) => [
                'item_name' => $item->item_name,
                'quantity_sold' => (int) $item->quantity_sold,
                'total_sales' => (float) $item->total_sales,
            ]);

        $locationPerformance = PickupLocation::query()
            ->leftJoin('orders', function ($join) use ($from, $to): void {
                $join
                    ->on('orders.pickup_location_id', '=', 'pickup_locations.id')
                    ->whereDate('orders.created_at', '>=', $from)
                    ->whereDate('orders.created_at', '<=', $to);
            })
            ->when($pickupLocationId, fn ($query, $value) => $query->where('pickup_locations.id', $value))
            ->when(
                ! $user->isAdmin() && $user->accessiblePickupLocationIds() !== [],
                fn ($query) => $query->whereIn('pickup_locations.id', $user->accessiblePickupLocationIds()),
            )
            ->select([
                'pickup_locations.id',
                'pickup_locations.name',
                DB::raw('COUNT(orders.id) as orders_count'),
                DB::raw('COALESCE(SUM(orders.total_amount), 0) as total_sales'),
            ])
            ->groupBy('pickup_locations.id', 'pickup_locations.name')
            ->orderByDesc('total_sales')
            ->get()
            ->map(fn ($location) => [
                'id' => $location->id,
                'name' => $location->name,
                'orders_count' => (int) $location->orders_count,
                'total_sales' => (float) $location->total_sales,
            ]);

        $smsStats = SmsLog::query()
            ->whereDate('created_at', '>=', $from)
            ->whereDate('created_at', '<=', $to)
            ->selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        return Inertia::render('staff/reports', [
            'filters' => [
                'from' => $from,
                'to' => $to,
                'pickup_location_id' => $pickupLocationId,
            ],
            'pickupLocations' => PickupLocation::query()
                ->when(
                    ! $user->isAdmin() && $user->accessiblePickupLocationIds() !== [],
                    fn ($query) => $query->whereIn('id', $user->accessiblePickupLocationIds()),
                )
                ->orderBy('name')
                ->get(['id', 'name']),
            'summary' => [
                'total_sales' => (float) (clone $orders)->sum('total_amount'),
                'total_orders' => (clone $orders)->count(),
                'pending_receipts' => (clone $orders)->where('receipt_status', 'pending')->count(),
                'completed_orders' => (clone $orders)->where('order_status', 'completed')->count(),
            ],
            'salesByPeriod' => $salesByPeriod,
            'popularItems' => $popularItems,
            'locationPerformance' => $locationPerformance,
            'smsStats' => [
                'sent' => (int) ($smsStats['sent'] ?? 0),
                'failed' => (int) ($smsStats['failed'] ?? 0),
                'pending' => (int) ($smsStats['pending'] ?? 0),
            ],
        ]);
    }

    /**
     * Parse a request date input safely.
     */
    protected function safeDateInput(Request $request, string $key): ?string
    {
        $raw = $request->input($key);

        if (! is_string($raw) || trim($raw) === '') {
            return null;
        }

        try {
            return Carbon::parse($raw)->toDateString();
        } catch (\Throwable) {
            return null;
        }
    }
}
