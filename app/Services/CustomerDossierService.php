<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Support\BranchAccess;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class CustomerDossierService
{
    /**
     * Get a comprehensive dossier for a given customer ID, optionally scoped by a user's branch access.
     *
     * @param  int  $customerId
     * @param  \App\Models\User|null  $scopingUser
     * @return array<string, mixed>|null
     */
    public function getDossier(int $customerId, $scopingUser = null): ?array
    {
        $applyBranchScope = fn ($query) => $scopingUser ? BranchAccess::scopeQuery($query, $scopingUser) : $query;
        
        $customerQuery = Customer::query()->where('id', $customerId);
        if ($scopingUser) {
            $customerQuery->whereHas('orders', clone $applyBranchScope);
        }

        $selected = $customerQuery->first();

        if (!$selected) {
            return null;
        }

        $ordersBase = Order::query()->where('customer_id', $selected->id);
        if ($scopingUser) {
            BranchAccess::scopeQuery($ordersBase, $scopingUser);
        }

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
        if ($scopingUser) {
            BranchAccess::scopeQuery($branchSummaryQuery, $scopingUser, 'orders.pickup_location_id');
        }

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
        if ($scopingUser) {
            BranchAccess::scopeQuery($topItemsQuery, $scopingUser, 'orders.pickup_location_id');
        }

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

        return [
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

    protected function normalizeOrderSourceChannel(?string $sourceChannel): string
    {
        return in_array($sourceChannel, Order::sourceChannels(), true)
            ? $sourceChannel
            : Order::SOURCE_WEB;
    }

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
