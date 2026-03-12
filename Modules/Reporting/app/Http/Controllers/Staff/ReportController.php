<?php

namespace Modules\Reporting\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PickupLocation;
use App\Support\BranchAccess;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
        $fromDate = Carbon::parse($from)->startOfDay();
        $toDate = Carbon::parse($to)->endOfDay();
        $pickupLocationId = $request->filled('pickup_location_id')
            ? $request->integer('pickup_location_id')
            : null;

        if ($pickupLocationId !== null) {
            BranchAccess::ensureUserCanAccessBranch($user, $pickupLocationId);
        }

        $ordersInRange = Order::query()
            ->whereDate('created_at', '>=', $from)
            ->whereDate('created_at', '<=', $to)
            ->when($pickupLocationId, fn ($query, $value) => $query->where('pickup_location_id', $value));
        BranchAccess::scopeQuery($ordersInRange, $user);

        $ordersUntilEndDate = Order::query()
            ->whereDate('created_at', '<=', $to)
            ->when($pickupLocationId, fn ($query, $value) => $query->where('pickup_location_id', $value));
        BranchAccess::scopeQuery($ordersUntilEndDate, $user);

        $rangeOrderRows = (clone $ordersInRange)
            ->select([
                'id',
                'customer_id',
                'created_at',
                'total_amount',
            ])
            ->orderBy('created_at')
            ->orderBy('id')
            ->get();

        $lifetimeOrderRows = (clone $ordersUntilEndDate)
            ->select([
                'id',
                'customer_id',
                'created_at',
                'total_amount',
            ])
            ->orderBy('customer_id')
            ->orderBy('created_at')
            ->orderBy('id')
            ->get();

        /** @var array<int, int> $customerOrderCounts */
        $customerOrderCounts = [];
        /** @var array<int, Carbon> $firstOrderAtByCustomer */
        $firstOrderAtByCustomer = [];
        /** @var array<int, Carbon> $lastOrderAtByCustomer */
        $lastOrderAtByCustomer = [];
        /** @var array<int, int> $secondOrderGapDaysByCustomer */
        $secondOrderGapDaysByCustomer = [];

        /** @var array<string, array{orders:int,revenue:float,customers:array<int, bool>}> $growthBuckets */
        $growthBuckets = [];
        /** @var array<string, array{total_days:float,count:int}> $betweenOrdersByPeriod */
        $betweenOrdersByPeriod = [];
        /** @var array<string, array{total_days:float,count:int}> $visitAccelerationBuckets */
        $visitAccelerationBuckets = [];
        /** @var array<int, float> $customerRevenueInRange */
        $customerRevenueInRange = [];
        /** @var array<int, bool> $customersInRange */
        $customersInRange = [];

        $totalRevenue = 0.0;
        $totalOrders = 0;
        $totalDaysBetweenOrders = 0.0;
        $totalRepeatOrdersForGap = 0;
        $recoveredRevenue = 0.0;
        $activeRevenue = 0.0;

        foreach ($lifetimeOrderRows as $row) {
            $customerId = (int) $row->customer_id;
            $createdAt = $row->created_at instanceof Carbon
                ? $row->created_at
                : Carbon::parse((string) $row->created_at);
            $orderAmount = (float) $row->total_amount;

            $previousVisitCount = $customerOrderCounts[$customerId] ?? 0;
            $visitNumber = $previousVisitCount + 1;
            $customerOrderCounts[$customerId] = $visitNumber;

            if (! isset($firstOrderAtByCustomer[$customerId])) {
                $firstOrderAtByCustomer[$customerId] = $createdAt;
            }

            $previousOrderAt = $lastOrderAtByCustomer[$customerId] ?? null;

            if ($visitNumber === 2 && $previousOrderAt instanceof Carbon) {
                $secondOrderGapDaysByCustomer[$customerId] = max(0, $previousOrderAt->diffInDays($createdAt));
            }

            if ($createdAt->gte($fromDate) && $createdAt->lte($toDate)) {
                $period = $createdAt->toDateString();

                if (! isset($growthBuckets[$period])) {
                    $growthBuckets[$period] = [
                        'orders' => 0,
                        'revenue' => 0.0,
                        'customers' => [],
                    ];
                }

                $growthBuckets[$period]['orders']++;
                $growthBuckets[$period]['revenue'] += $orderAmount;
                $growthBuckets[$period]['customers'][$customerId] = true;

                $totalRevenue += $orderAmount;
                $totalOrders++;
                $customersInRange[$customerId] = true;
                $customerRevenueInRange[$customerId] = ($customerRevenueInRange[$customerId] ?? 0.0) + $orderAmount;

                if ($previousOrderAt instanceof Carbon) {
                    $gapDays = (float) max(0, $previousOrderAt->diffInDays($createdAt));
                    $totalDaysBetweenOrders += $gapDays;
                    $totalRepeatOrdersForGap++;

                    $periodKey = $createdAt->format('Y-m');

                    if (! isset($betweenOrdersByPeriod[$periodKey])) {
                        $betweenOrdersByPeriod[$periodKey] = [
                            'total_days' => 0.0,
                            'count' => 0,
                        ];
                    }

                    $betweenOrdersByPeriod[$periodKey]['total_days'] += $gapDays;
                    $betweenOrdersByPeriod[$periodKey]['count']++;

                    if ($visitNumber <= 6) {
                        $transition = ($visitNumber - 1).' -> '.$visitNumber;

                        if (! isset($visitAccelerationBuckets[$transition])) {
                            $visitAccelerationBuckets[$transition] = [
                                'total_days' => 0.0,
                                'count' => 0,
                            ];
                        }

                        $visitAccelerationBuckets[$transition]['total_days'] += $gapDays;
                        $visitAccelerationBuckets[$transition]['count']++;
                    }

                    if ($gapDays > 60) {
                        $recoveredRevenue += $orderAmount;
                    } else {
                        $activeRevenue += $orderAmount;
                    }
                } else {
                    $activeRevenue += $orderAmount;
                }
            }

            $lastOrderAtByCustomer[$customerId] = $createdAt;
        }

        $totalCustomers = count($customersInRange);
        $aov = $totalOrders > 0 ? $totalRevenue / $totalOrders : 0.0;

        $customerPhones = $customersInRange === []
            ? collect()
            : Customer::query()
                ->whereIn('id', array_map('intval', array_keys($customersInRange)))
                ->pluck('phone', 'id');

        $ordersWithPhone = 0;

        foreach ($rangeOrderRows as $row) {
            $customerId = (int) $row->customer_id;
            $phone = $customerPhones[$customerId] ?? null;

            if ($this->isRealPhone($phone)) {
                $ordersWithPhone++;
            }
        }

        $phoneCaptureRate = $totalOrders > 0 ? ($ordersWithPhone / $totalOrders) * 100 : 0.0;

        $growthTrends = collect($growthBuckets)
            ->sortKeys()
            ->map(fn (array $bucket, string $period) => [
                'period' => $period,
                'orders' => $bucket['orders'],
                'revenue' => round($bucket['revenue'], 2),
                'customers' => count($bucket['customers']),
            ])
            ->values();

        $visitFunnel = [];

        for ($visit = 1; $visit <= 5; $visit++) {
            $customersReached = 0;

            foreach ($customerOrderCounts as $orderCount) {
                if ($orderCount >= $visit) {
                    $customersReached++;
                }
            }

            $visitFunnel[] = [
                'visit' => $visit,
                'label' => $this->visitLabel($visit),
                'customers' => $customersReached,
            ];
        }

        $totalLifetimeCustomers = count($customerOrderCounts);
        $customersWithFiveOrders = (int) ($visitFunnel[4]['customers'] ?? 0);
        $fifthVisitRate = $totalLifetimeCustomers > 0
            ? ($customersWithFiveOrders / $totalLifetimeCustomers) * 100
            : 0.0;

        $secondOrderBuckets = [
            '1-3 days' => 0,
            '4-7 days' => 0,
            '8-30 days' => 0,
            '31+ days' => 0,
            'Never returned' => 0,
        ];
        $firstOrderCohortSize = 0;

        foreach ($firstOrderAtByCustomer as $customerId => $firstOrderAt) {
            if (! ($firstOrderAt->gte($fromDate) && $firstOrderAt->lte($toDate))) {
                continue;
            }

            $firstOrderCohortSize++;
            $gapDays = $secondOrderGapDaysByCustomer[$customerId] ?? null;

            if ($gapDays === null) {
                $secondOrderBuckets['Never returned']++;

                continue;
            }

            if ($gapDays <= 3) {
                $secondOrderBuckets['1-3 days']++;

                continue;
            }

            if ($gapDays <= 7) {
                $secondOrderBuckets['4-7 days']++;

                continue;
            }

            if ($gapDays <= 30) {
                $secondOrderBuckets['8-30 days']++;

                continue;
            }

            $secondOrderBuckets['31+ days']++;
        }

        $secondOrderDistribution = collect($secondOrderBuckets)
            ->map(fn (int $customers, string $label) => [
                'label' => $label,
                'customers' => $customers,
            ])
            ->values();

        $averageDaysBetweenOrders = $totalRepeatOrdersForGap > 0
            ? round($totalDaysBetweenOrders / $totalRepeatOrdersForGap, 2)
            : null;

        $averageDaysBetweenOrdersByPeriod = collect($betweenOrdersByPeriod)
            ->sortKeys()
            ->map(fn (array $bucket, string $period) => [
                'period' => $period,
                'average_days' => $bucket['count'] > 0
                    ? round($bucket['total_days'] / $bucket['count'], 2)
                    : 0.0,
                'repeat_orders' => $bucket['count'],
            ])
            ->values();

        $visitAcceleration = collect($visitAccelerationBuckets)
            ->sortKeys()
            ->map(fn (array $bucket, string $transition) => [
                'transition' => $transition,
                'average_days' => $bucket['count'] > 0
                    ? round($bucket['total_days'] / $bucket['count'], 2)
                    : 0.0,
                'samples' => $bucket['count'],
            ])
            ->values();

        $momentum = [
            'hot' => 0,
            'warm' => 0,
            'cooling' => 0,
            'lost' => 0,
        ];

        $lifecycleOverview = [
            'new' => 0,
            'active' => 0,
            'cooling' => 0,
            'lost' => 0,
        ];

        foreach ($lastOrderAtByCustomer as $customerId => $lastOrderAt) {
            $daysSinceLastOrder = (int) max(0, $lastOrderAt->diffInDays($toDate));

            if ($daysSinceLastOrder <= 7) {
                $momentum['hot']++;
            } elseif ($daysSinceLastOrder <= 14) {
                $momentum['warm']++;
            } elseif ($daysSinceLastOrder <= 60) {
                $momentum['cooling']++;
            } else {
                $momentum['lost']++;
            }

            $firstOrderAt = $firstOrderAtByCustomer[$customerId] ?? null;

            if ($firstOrderAt instanceof Carbon && $firstOrderAt->gte($fromDate) && $firstOrderAt->lte($toDate)) {
                $lifecycleOverview['new']++;
            } elseif ($daysSinceLastOrder <= 30) {
                $lifecycleOverview['active']++;
            } elseif ($daysSinceLastOrder <= 60) {
                $lifecycleOverview['cooling']++;
            } else {
                $lifecycleOverview['lost']++;
            }
        }

        $itemRows = OrderItem::query()
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->join('menu_items', 'menu_items.id', '=', 'order_items.menu_item_id')
            ->whereDate('orders.created_at', '>=', $from)
            ->whereDate('orders.created_at', '<=', $to)
            ->when($pickupLocationId, fn ($query, $value) => $query->where('orders.pickup_location_id', $value))
            ->when(
                ! $user->isAdmin() && $user->accessiblePickupLocationIds() !== [],
                fn ($query) => $query->whereIn('orders.pickup_location_id', $user->accessiblePickupLocationIds()),
            )
            ->select([
                'orders.customer_id',
                'menu_items.name as item_name',
                'order_items.quantity',
                'order_items.price',
            ])
            ->get();

        /** @var array<string, array{item_name:string,quantity:float,revenue:float,customers:array<int,bool>,repeat_customers:array<int,bool>}> $itemBuckets */
        $itemBuckets = [];

        foreach ($itemRows as $itemRow) {
            $itemName = (string) $itemRow->item_name;
            $customerId = (int) $itemRow->customer_id;
            $quantity = (float) $itemRow->quantity;
            $lineRevenue = (float) $itemRow->price * $quantity;

            if (! isset($itemBuckets[$itemName])) {
                $itemBuckets[$itemName] = [
                    'item_name' => $itemName,
                    'quantity' => 0.0,
                    'revenue' => 0.0,
                    'customers' => [],
                    'repeat_customers' => [],
                ];
            }

            $itemBuckets[$itemName]['quantity'] += $quantity;
            $itemBuckets[$itemName]['revenue'] += $lineRevenue;
            $itemBuckets[$itemName]['customers'][$customerId] = true;

            if (($customerOrderCounts[$customerId] ?? 0) >= 2) {
                $itemBuckets[$itemName]['repeat_customers'][$customerId] = true;
            }
        }

        $topSellingItems = collect(array_values($itemBuckets))
            ->map(fn (array $bucket) => [
                'item_name' => $bucket['item_name'],
                'quantity' => (int) round($bucket['quantity']),
            ])
            ->sortByDesc('quantity')
            ->values()
            ->take(10);

        $topRevenueItems = collect(array_values($itemBuckets))
            ->map(fn (array $bucket) => [
                'item_name' => $bucket['item_name'],
                'revenue' => round($bucket['revenue'], 2),
            ])
            ->sortByDesc('revenue')
            ->values()
            ->take(10);

        $repeatDrivingItems = collect(array_values($itemBuckets))
            ->map(function (array $bucket): array {
                $totalItemCustomers = count($bucket['customers']);
                $repeatItemCustomers = count($bucket['repeat_customers']);

                return [
                    'item_name' => $bucket['item_name'],
                    'repeat_rate' => $totalItemCustomers > 0
                        ? round(($repeatItemCustomers / $totalItemCustomers) * 100, 2)
                        : 0.0,
                    'repeat_customers' => $repeatItemCustomers,
                    'total_customers' => $totalItemCustomers,
                ];
            })
            ->sortByDesc('repeat_rate')
            ->values()
            ->take(10);

        $revenueByCustomer = array_values($customerRevenueInRange);
        rsort($revenueByCustomer, SORT_NUMERIC);

        $customerCountForConcentration = count($revenueByCustomer);
        $top10CustomerCount = $customerCountForConcentration > 0
            ? max(1, (int) ceil($customerCountForConcentration * 0.10))
            : 0;
        $top25CustomerCount = $customerCountForConcentration > 0
            ? max(1, (int) ceil($customerCountForConcentration * 0.25))
            : 0;

        $top10Revenue = $top10CustomerCount > 0
            ? array_sum(array_slice($revenueByCustomer, 0, $top10CustomerCount))
            : 0.0;
        $top25Revenue = $top25CustomerCount > 0
            ? array_sum(array_slice($revenueByCustomer, 0, $top25CustomerCount))
            : 0.0;

        $top10Share = $totalRevenue > 0 ? round(($top10Revenue / $totalRevenue) * 100, 2) : 0.0;
        $top25Share = $totalRevenue > 0 ? round(($top25Revenue / $totalRevenue) * 100, 2) : 0.0;
        $bottom75Share = max(0.0, round(100 - $top25Share, 2));

        $avgOrdersPerCustomer = $totalCustomers > 0 ? $totalOrders / $totalCustomers : 0.0;
        $clv = $avgOrdersPerCustomer * $aov;

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
            'overview' => [
                'revenue' => round($totalRevenue, 2),
                'orders' => $totalOrders,
                'customers' => $totalCustomers,
                'average_order_value' => round($aov, 2),
                'orders_with_phone' => $ordersWithPhone,
                'phone_capture_rate' => round($phoneCaptureRate, 2),
            ],
            'growthTrends' => $growthTrends,
            'retention' => [
                'visit_funnel' => $visitFunnel,
                'customers_with_5_orders' => $customersWithFiveOrders,
                'fifth_visit_rate' => round($fifthVisitRate, 2),
                'first_order_cohort_size' => $firstOrderCohortSize,
                'time_to_second_order' => $secondOrderDistribution,
                'average_days_between_orders' => $averageDaysBetweenOrders,
                'average_days_between_orders_by_period' => $averageDaysBetweenOrdersByPeriod,
                'visit_acceleration' => $visitAcceleration,
            ],
            'lifecycle' => [
                'momentum' => $momentum,
                'overview' => $lifecycleOverview,
                'active_revenue' => round($activeRevenue, 2),
                'recovered_revenue' => round($recoveredRevenue, 2),
            ],
            'menuIntelligence' => [
                'top_selling_items' => $topSellingItems,
                'top_revenue_items' => $topRevenueItems,
                'repeat_driving_items' => $repeatDrivingItems,
            ],
            'revenueIntelligence' => [
                'concentration' => [
                    'top_10_customers' => $top10CustomerCount,
                    'top_25_customers' => $top25CustomerCount,
                    'top_10_share' => $top10Share,
                    'top_25_share' => $top25Share,
                    'bottom_75_share' => $bottom75Share,
                ],
                'clv' => [
                    'avg_orders_per_customer' => round($avgOrdersPerCustomer, 2),
                    'aov' => round($aov, 2),
                    'clv' => round($clv, 2),
                ],
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

    protected function visitLabel(int $visit): string
    {
        return match ($visit) {
            1 => '1st',
            2 => '2nd',
            3 => '3rd',
            default => $visit.'th',
        };
    }

    protected function isRealPhone(mixed $value): bool
    {
        if (! is_string($value)) {
            return false;
        }

        $phone = trim($value);

        if ($phone === '') {
            return false;
        }

        return preg_match('/^q[a-f0-9]{19}$/i', $phone) !== 1;
    }
}
