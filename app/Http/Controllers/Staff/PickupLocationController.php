<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Http\Requests\Staff\StorePickupLocationRequest;
use App\Http\Requests\Staff\UpdatePickupLocationRequest;
use App\Models\PickupLocation;
use App\Support\BranchAccess;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class PickupLocationController extends Controller
{
    /**
     * Show pickup location management page for staff.
     */
    public function index(): Response
    {
        /** @var \App\Models\User|null $user */
        $user = request()->user();

        $locationsQuery = PickupLocation::query()
            ->withCount('orders')
            ->orderBy('name');

        $assignedBranchIds = $user?->accessiblePickupLocationIds() ?? [];

        if ($user && ! $user->isAdmin() && $assignedBranchIds !== []) {
            $locationsQuery->whereIn('id', $assignedBranchIds);
        }

        $locations = $locationsQuery->get();
        $locationIds = $locations->pluck('id')->all();

        $sourceCountsByLocation = [];
        $topItemsByLocation = [];
        $peakHoursByLocation = [];
        $peakWeekdaysByLocation = [];
        $hourlyProfileByLocation = [];
        $trafficTrendByLocation = [];
        $trendDates = [];

        if ($locationIds !== []) {
            $trendEndRaw = Order::query()
                ->whereIn('pickup_location_id', $locationIds)
                ->max('created_at');
            $trendEndDate = $trendEndRaw
                ? Carbon::parse($trendEndRaw)->startOfDay()
                : now()->startOfDay();
            $trendStartDate = $trendEndDate->copy()->subDays(13);

            for ($index = 0; $index < 14; $index++) {
                $trendDates[] = $trendStartDate->copy()->addDays($index)->toDateString();
            }

            foreach ($locationIds as $locationId) {
                foreach ($trendDates as $date) {
                    $trafficTrendByLocation[(int) $locationId][$date] = [
                        'date' => $date,
                        'total' => 0,
                        'web' => 0,
                        'telegram' => 0,
                        'table' => 0,
                    ];
                }
            }

            $sourceRows = Order::query()
                ->whereIn('pickup_location_id', $locationIds)
                ->select('pickup_location_id', 'source_channel')
                ->selectRaw('COUNT(*) as orders_count')
                ->groupBy('pickup_location_id', 'source_channel')
                ->get();

            foreach ($sourceRows as $row) {
                $pickupLocationId = (int) $row->pickup_location_id;
                $sourceChannel = is_string($row->source_channel) ? $row->source_channel : Order::SOURCE_WEB;
                $sourceCountsByLocation[$pickupLocationId][$sourceChannel] = (int) $row->orders_count;
            }

            $topItemRows = OrderItem::query()
                ->join('orders', 'orders.id', '=', 'order_items.order_id')
                ->leftJoin('menu_items', 'menu_items.id', '=', 'order_items.menu_item_id')
                ->whereIn('orders.pickup_location_id', $locationIds)
                ->select('orders.pickup_location_id')
                ->selectRaw("COALESCE(menu_items.name, 'Unknown item') as item_name")
                ->selectRaw('SUM(order_items.quantity) as quantity_sold')
                ->groupBy('orders.pickup_location_id', 'menu_items.id', 'menu_items.name')
                ->orderBy('orders.pickup_location_id')
                ->orderByDesc('quantity_sold')
                ->get()
                ->groupBy('pickup_location_id');

            foreach ($topItemRows as $pickupLocationId => $rows) {
                $topItemsByLocation[(int) $pickupLocationId] = $rows
                    ->take(5)
                    ->map(fn ($row) => [
                        'name' => is_string($row->item_name) ? $row->item_name : 'Unknown item',
                        'quantity_sold' => (int) $row->quantity_sold,
                    ])
                    ->values()
                    ->all();
            }

            $trendRows = Order::query()
                ->whereIn('pickup_location_id', $locationIds)
                ->whereDate('created_at', '>=', $trendStartDate->toDateString())
                ->whereDate('created_at', '<=', $trendEndDate->toDateString())
                ->get(['pickup_location_id', 'source_channel', 'created_at']);

            foreach ($trendRows as $row) {
                $locationId = (int) $row->pickup_location_id;
                $date = Carbon::parse($row->created_at)->toDateString();

                if (! isset($trafficTrendByLocation[$locationId][$date])) {
                    continue;
                }

                $sourceChannel = is_string($row->source_channel) ? $row->source_channel : Order::SOURCE_WEB;
                $normalizedSource = in_array($sourceChannel, Order::sourceChannels(), true)
                    ? $sourceChannel
                    : Order::SOURCE_WEB;

                $trafficTrendByLocation[$locationId][$date]['total']++;
                $trafficTrendByLocation[$locationId][$date][$normalizedSource]++;
            }

            foreach ($trafficTrendByLocation as $locationId => $trendRowsByDate) {
                $trafficTrendByLocation[$locationId] = array_values($trendRowsByDate);
            }

            $timelineRows = Order::query()
                ->whereIn('pickup_location_id', $locationIds)
                ->get(['pickup_location_id', 'created_at'])
                ->groupBy('pickup_location_id');

            foreach ($timelineRows as $pickupLocationId => $rows) {
                $timestamps = $rows->pluck('created_at');
                $key = (int) $pickupLocationId;
                $hourlyProfileByLocation[$key] = $this->hourlyProfile($timestamps);
                $peakHoursByLocation[$key] = $this->topOrderHours($timestamps);
                $peakWeekdaysByLocation[$key] = $this->topOrderWeekdays($timestamps);
            }
        }

        $locations = $locations
            ->map(fn (PickupLocation $location) => [
                'id' => $location->id,
                'name' => $location->name,
                'address' => $location->address,
                'google_maps_url' => $location->google_maps_url,
                'is_active' => $location->is_active,
                'orders_count' => $location->orders_count,
                'source_traffic' => $this->buildSourceTrafficSummary(
                    $sourceCountsByLocation[$location->id] ?? [],
                ),
                'top_items' => $topItemsByLocation[$location->id] ?? [],
                'traffic_trend' => $trafficTrendByLocation[$location->id] ?? $this->emptyTrafficTrend($trendDates),
                'hourly_profile' => $hourlyProfileByLocation[$location->id] ?? $this->hourlyProfile(collect()),
                'peak_hours' => $peakHoursByLocation[$location->id] ?? [],
                'peak_weekdays' => $peakWeekdaysByLocation[$location->id] ?? [],
                'updated_at' => $location->updated_at?->toDateTimeString(),
            ])
            ->values();

        return Inertia::render('staff/pickup-locations', [
            'locations' => $locations,
            'summary' => [
                'total_locations' => (clone $locationsQuery)->count(),
                'active_locations' => (clone $locationsQuery)->where('is_active', true)->count(),
            ],
        ]);
    }

    /**
     * Store a new pickup location.
     */
    public function store(StorePickupLocationRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        PickupLocation::query()->create([
            'name' => $validated['name'],
            'address' => $validated['address'],
            'google_maps_url' => $validated['google_maps_url'] ?? null,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return back()->with('success', 'Pickup location created.');
    }

    /**
     * Update an existing pickup location.
     */
    public function update(UpdatePickupLocationRequest $request, PickupLocation $pickupLocation): RedirectResponse
    {
        BranchAccess::ensureUserCanAccessBranch($request->user(), $pickupLocation->id);

        $validated = $request->validated();

        $pickupLocation->update([
            'name' => $validated['name'],
            'address' => $validated['address'],
            'google_maps_url' => $validated['google_maps_url'] ?? null,
            'is_active' => $request->boolean('is_active', $pickupLocation->is_active),
        ]);

        return back()->with('success', 'Pickup location updated.');
    }

    /**
     * Delete a pickup location, or deactivate if order history exists.
     */
    public function destroy(PickupLocation $pickupLocation): RedirectResponse
    {
        BranchAccess::ensureUserCanAccessBranch(request()->user(), $pickupLocation->id);

        if ($pickupLocation->orders()->exists()) {
            $pickupLocation->update(['is_active' => false]);

            return back()->with('success', 'Pickup location has history and was deactivated instead of deleted.');
        }

        $pickupLocation->delete();

        return back()->with('success', 'Pickup location deleted.');
    }

    /**
     * Build source-traffic counters and shares for a branch.
     *
     * @param  array<string, int>  $sourceCounts
     * @return array<string, int|float>
     */
    protected function buildSourceTrafficSummary(array $sourceCounts): array
    {
        $web = (int) ($sourceCounts[Order::SOURCE_WEB] ?? 0);
        $telegram = (int) ($sourceCounts[Order::SOURCE_TELEGRAM] ?? 0);
        $table = (int) ($sourceCounts[Order::SOURCE_TABLE] ?? 0);
        $total = $web + $telegram + $table;

        return [
            'total' => $total,
            'web' => $web,
            'telegram' => $telegram,
            'table' => $table,
            'web_share' => $total > 0 ? round(($web / $total) * 100, 1) : 0.0,
            'telegram_share' => $total > 0 ? round(($telegram / $total) * 100, 1) : 0.0,
            'table_share' => $total > 0 ? round(($table / $total) * 100, 1) : 0.0,
        ];
    }

    /**
     * Build top ordering-hour windows from timestamps.
     *
     * @param  Collection<int, mixed>  $timestamps
     * @return array<int, array<string, int|string>>
     */
    protected function topOrderHours(Collection $timestamps): array
    {
        $hourlyProfile = $this->hourlyProfile($timestamps);
        usort(
            $hourlyProfile,
            fn (array $left, array $right): int => ($right['orders_count'] <=> $left['orders_count'])
                ?: ($left['hour'] <=> $right['hour']),
        );

        return array_values(
            array_slice(
                array_filter(
                    $hourlyProfile,
                    fn (array $row): bool => (int) $row['orders_count'] > 0,
                ),
                0,
                3,
            ),
        );
    }

    /**
     * Build top ordering weekdays from timestamps.
     *
     * @param  Collection<int, mixed>  $timestamps
     * @return array<int, array<string, int|string>>
     */
    protected function topOrderWeekdays(Collection $timestamps): array
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

        foreach ($timestamps as $timestamp) {
            if (! $timestamp) {
                continue;
            }

            $date = $timestamp instanceof \DateTimeInterface
                ? $timestamp
                : Carbon::parse($timestamp);
            $weekday = $date->format('l');
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

    /**
     * Build hourly profile with all 24 windows from timestamps.
     *
     * @param  Collection<int, mixed>  $timestamps
     * @return array<int, array<string, int|string>>
     */
    protected function hourlyProfile(Collection $timestamps): array
    {
        $hourlyCounts = array_fill(0, 24, 0);

        foreach ($timestamps as $timestamp) {
            if (! $timestamp) {
                continue;
            }

            $date = $timestamp instanceof \DateTimeInterface
                ? $timestamp
                : Carbon::parse($timestamp);
            $hour = (int) $date->format('G');
            $hourlyCounts[$hour]++;
        }

        $profile = [];

        for ($hour = 0; $hour < 24; $hour++) {
            $nextHour = ($hour + 1) % 24;
            $profile[] = [
                'hour' => $hour,
                'label' => sprintf('%02d:00-%02d:00', $hour, $nextHour),
                'orders_count' => (int) $hourlyCounts[$hour],
            ];
        }

        return $profile;
    }

    /**
     * Build empty trend buckets when branch has no orders.
     *
     * @param  array<int, string>  $trendDates
     * @return array<int, array<string, int|string>>
     */
    protected function emptyTrafficTrend(array $trendDates): array
    {
        return array_values(
            array_map(
                fn (string $date) => [
                    'date' => $date,
                    'total' => 0,
                    'web' => 0,
                    'telegram' => 0,
                    'table' => 0,
                ],
                $trendDates,
            ),
        );
    }
}
