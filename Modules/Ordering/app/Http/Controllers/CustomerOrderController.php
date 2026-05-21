<?php

namespace Modules\Ordering\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\CustomerOrder;
use App\Models\CustomerOrderItem;
use App\Models\MenuItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Ordering\Http\Requests\CustomerOrder\StoreCustomerOrderRequest;
use Modules\Ordering\Http\Requests\CustomerOrder\UploadOrderReceiptRequest;

class CustomerOrderController extends Controller
{
    public function store(StoreCustomerOrderRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $customer = $request->user();

        if (! $customer instanceof Customer) {
            abort(403);
        }

        $customerToken = $request->bearerToken();

        if (! is_string($customerToken) || $customerToken === '') {
            abort(403);
        }

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

    public function index(Request $request): Response
    {
        $query = CustomerOrder::with(['customer', 'items', 'pickupLocation'])
            ->orderByDesc('created_at');

        // Apply filters
        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->where(function ($q) use ($search) {
                $q->whereHas('customer', fn ($q) => $q->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%"))
                    ->orWhere('id', $search);
            });
        }

        if ($request->filled('status')) {
            $statuses = explode(',', $request->string('status'));
            $query->whereIn('status', $statuses);
        }

        if ($request->filled('receipt_status')) {
            $receiptStatus = $request->string('receipt_status');

            if ($receiptStatus === 'disapproved') {
                $receiptStatus = CustomerOrder::RECEIPT_STATUS_REJECTED;
            }

            $query->where('receipt_status', $receiptStatus);
        }

        if ($request->filled('order_type') && in_array($request->string('order_type'), ['pickup', 'delivery'], true)) {
            $query->where('type', $request->string('order_type'));
        }

        if ($request->filled('date')) {
            $query->whereDate('pickup_date', $request->date('date'));
        }

        if ($request->filled('source_channel') && $request->string('source_channel') !== 'all') {
            $query->where('source_channel', $request->string('source_channel'));
        }

        // Get summary stats
        $summary = [
            'total_orders' => CustomerOrder::query()->count(),
            'pending_orders' => CustomerOrder::query()->whereIn('status', ['pending', 'confirmed'])->count(),
            'pending_receipts' => CustomerOrder::query()->where('receipt_status', CustomerOrder::RECEIPT_STATUS_PENDING)->count(),
            'ready_orders' => CustomerOrder::query()->where('status', CustomerOrder::STATUS_READY)->count(),
            'complaints' => CustomerOrder::query()->where('receipt_status', CustomerOrder::RECEIPT_STATUS_REJECTED)->count(),
        ];

        // Get source summary
        $sourceSummary = [
            'all' => CustomerOrder::query()->count(),
            'web' => CustomerOrder::query()->where('source_channel', 'web')->count(),
            'telegram' => CustomerOrder::query()->where('source_channel', 'telegram')->count(),
            'table' => CustomerOrder::query()->where('source_channel', 'table')->count(),
        ];

        // Paginate
        $orders = $query->paginate(15);

        return Inertia::render('staff/customer-orders', [
            'orders' => [
                'data' => collect($orders->items())->map(fn (CustomerOrder $order) => [
                    'id' => $order->id,
                    'customer_name' => $order->customer?->name,
                    'customer_phone' => $order->customer?->phone,
                    'pickup_date' => optional($order->pickup_date)->toDateString(),
                    'pickup_location' => $order->pickupLocation?->name,
                    'source_channel' => $order->source_channel,
                    'table_name' => null,
                    'table_qr_code' => null,
                    'table_session_id' => null,
                    'table_session_token_short' => null,
                    'table_session_verified' => false,
                    'table_session_verified_by' => null,
                    'receipt_url' => $order->receipt_url,
                    'receipt_status' => $order->receipt_status === CustomerOrder::RECEIPT_STATUS_REJECTED ? 'disapproved' : $order->receipt_status,
                    'order_status' => $order->status,
                    'type' => $order->type,
                    'disapproval_reason' => $order->disapproval_reason,
                    'notify_when_ready' => $order->notify_when_ready,
                    'total_amount' => (float) $order->total_amount,
                    'tracking_url' => route('orders.track', $order->tracking_token),
                    'created_at' => optional($order->created_at)->toIso8601String(),
                    'items' => $order->items->map(fn (CustomerOrderItem $item) => [
                        'id' => $item->id,
                        'name' => $item->menu_item_name,
                        'image_url' => null,
                        'quantity' => $item->quantity,
                        'price' => (float) $item->price,
                        'line_total' => (float) $item->line_total,
                    ]),
                ]),
                'links' => $this->formatPaginationLinks($orders),
                'total' => $orders->total(),
                'from' => $orders->firstItem(),
                'to' => $orders->lastItem(),
            ],
            'filters' => [
                'search' => $request->string('search'),
                'status' => $request->string('status'),
                'receipt_status' => $request->string('receipt_status'),
                'order_type' => $request->string('order_type') ?: 'pickup',
                'pickup_location_id' => $request->string('pickup_location_id'),
                'date' => $request->string('date'),
                'time_bucket' => $request->string('time_bucket'),
                'source_channel' => $request->string('source_channel') ?: 'all',
            ],
            'statusOptions' => [
                CustomerOrder::STATUS_PENDING,
                CustomerOrder::STATUS_CONFIRMED,
                CustomerOrder::STATUS_PREPARING,
                CustomerOrder::STATUS_READY,
                CustomerOrder::STATUS_CANCELLED,
            ],
            'receiptStatusOptions' => [
                CustomerOrder::RECEIPT_STATUS_PENDING,
                CustomerOrder::RECEIPT_STATUS_APPROVED,
                'disapproved',
            ],
            'sourceSummary' => $sourceSummary,
            'summary' => $summary,
        ]);
    }

    private function formatPaginationLinks($paginator): array
    {
        $links = [];

        // Add Previous link
        if ($paginator->onFirstPage()) {
            $links[] = [
                'url' => null,
                'label' => 'Previous',
                'active' => false,
            ];
        } else {
            $links[] = [
                'url' => $paginator->previousPageUrl(),
                'label' => 'Previous',
                'active' => false,
            ];
        }

        // Add numbered links
        foreach ($paginator->getUrlRange(1, $paginator->lastPage()) as $page => $url) {
            $links[] = [
                'url' => $url,
                'label' => (string) $page,
                'active' => $page === $paginator->currentPage(),
            ];
        }

        // Add Next link
        if ($paginator->hasMorePages()) {
            $links[] = [
                'url' => $paginator->nextPageUrl(),
                'label' => 'Next',
                'active' => false,
            ];
        } else {
            $links[] = [
                'url' => null,
                'label' => 'Next',
                'active' => false,
            ];
        }

        return $links;
    }
}
