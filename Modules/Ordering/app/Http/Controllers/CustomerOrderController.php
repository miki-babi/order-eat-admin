<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerOrderRequest;
use App\Http\Requests\UploadOrderReceiptRequest;
use App\Models\CustomerOrder;
use App\Models\CustomerOrderItem;
use App\Models\MenuItem;
use App\Services\CustomerIdentityService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CustomerOrderController extends Controller
{
    public function store(StoreCustomerOrderRequest $request, CustomerIdentityService $customerIdentityService): JsonResponse
    {
        $validated = $request->validated();
        $customerToken = $customerIdentityService->resolveClientToken($request);
        $customer = $customerIdentityService->resolveCustomer($customerToken, [
            'name' => $validated['name'] ?? null,
            'phone' => $validated['delivery_phone'] ?? null,
            'source_channel' => 'web',
            'user_agent' => $request->userAgent(),
            'ip' => $request->ip(),
        ]);
        $customerIdentityService->queueClientTokenCookie($customerToken);

        $items = collect($validated['items']);
        $menuItems = MenuItem::query()
            ->whereIn('id', $items->pluck('menu_item_id')->unique()->values())
            ->get()
            ->keyBy('id');

        if ($menuItems->count() !== $items->pluck('menu_item_id')->unique()->count()) {
            return response()->json(['message' => 'One or more selected menu items are unavailable.'], 422);
        }

        $order = DB::transaction(function () use ($validated, $customer, $customerToken, $items, $menuItems): CustomerOrder {
            $order = CustomerOrder::create([
                'customer_id' => $customer->id,
                'customer_token' => $customerToken,
                'type' => $validated['type'],
                'status' => CustomerOrder::STATUS_PENDING,
                'pickup_date' => $validated['pickup_date'] ?? null,
                'pickup_time' => $validated['pickup_time'] ?? null,
                'pickup_location_id' => $validated['pickup_location_id'] ?? null,
                'delivery_phone' => $validated['delivery_phone'] ?? null,
                'delivery_address' => $validated['delivery_address'] ?? null,
                'total_amount' => 0,
                'receipt_status' => CustomerOrder::RECEIPT_STATUS_PENDING,
                'notify_when_ready' => (bool) ($validated['notify_when_ready'] ?? false),
                'source_channel' => $validated['source_channel'] ?? 'web',
            ]);

            $orderItems = $items->map(function (array $item) use ($menuItems): array {
                $menuItem = $menuItems[$item['menu_item_id']];

                return [
                    'menu_item_id' => $menuItem->id,
                    'menu_item_name' => $menuItem->name,
                    'quantity' => $item['quantity'],
                    'price' => $menuItem->price,
                    'line_total' => $menuItem->price * $item['quantity'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            })->all();

            $order->items()->createMany($orderItems);
            $order->update(['total_amount' => collect($orderItems)->sum('line_total')]);

            Log::info('customer_orders.created', [
                'customer_order_id' => $order->id,
                'tracking_token' => $order->tracking_token,
                'customer_id' => $customer->id,
                'type' => $order->type,
                'status' => $order->status,
            ]);

            return $order;
        });

        return response()->json([
            'tracking_token' => $order->tracking_token,
            'status' => $order->status,
            'type' => $order->type,
        ], 201);
    }

    public function show(string $trackingToken): JsonResponse
    {
        $order = CustomerOrder::with(['items', 'customer', 'pickupLocation'])
            ->where('tracking_token', $trackingToken)
            ->firstOrFail();

        return response()->json([
            'id' => $order->id,
            'tracking_token' => $order->tracking_token,
            'type' => $order->type,
            'status' => $order->status,
            'pickup_date' => optional($order->pickup_date)->toDateString(),
            'pickup_time' => $order->pickup_time,
            'pickup_location' => $order->pickupLocation?->only(['id', 'name', 'address', 'google_maps_url']),
            'delivery_phone' => $order->delivery_phone,
            'delivery_address' => $order->delivery_address,
            'total_amount' => (float) $order->total_amount,
            'receipt_status' => $order->receipt_status,
            'notify_when_ready' => $order->notify_when_ready,
            'items' => $order->items->map(fn (CustomerOrderItem $item) => [
                'id' => $item->id,
                'menu_item_name' => $item->menu_item_name,
                'quantity' => $item->quantity,
                'price' => (float) $item->price,
                'line_total' => (float) $item->line_total,
            ]),
            'customer' => $order->customer?->only(['id', 'name', 'phone']),
        ]);
    }

    public function uploadReceipt(UploadOrderReceiptRequest $request, string $trackingToken): JsonResponse
    {
        $order = CustomerOrder::where('tracking_token', $trackingToken)->firstOrFail();

        if ($order->receipt_url && ! str_starts_with($order->receipt_url, 'http')) {
            Storage::disk('public')->delete($order->receipt_url);
        }

        $path = $request->file('receipt')->store('order-receipts', 'public');

        $order->update([
            'receipt_url' => $path,
            'receipt_status' => CustomerOrder::RECEIPT_STATUS_PENDING,
        ]);

        return response()->json([
            'receipt_url' => $order->receipt_url,
            'receipt_status' => $order->receipt_status,
        ]);
    }
}
