<?php

namespace Modules\Ordering\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Ordering\Http\Requests\Orders\StoreOrderRequest;
use Modules\Ordering\Http\Requests\Orders\UploadOrderReceiptRequest;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\PickupLocation;
use App\Services\CustomerIdentityService;
use App\Services\SmsEthiopiaService;
use App\Services\SmsNotificationService;
use App\Services\SmsTemplateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class OrderController extends Controller
{
    /**
     * Show the customer ordering page.
     */
    public function index(Request $request, CustomerIdentityService $customerIdentityService): Response
    {
        $search = trim((string) $request->input('search', ''));
        $category = $request->input('category');
        $channel = MenuItem::normalizeVisibilityChannel(
            is_string($request->input('channel')) ? $request->input('channel') : null,
        );

        $menuItems = MenuItem::query()
            ->where('is_active', true)
            ->visibleIn($channel)
            ->when($search !== '', function ($query) use ($search): void {
                $query->where(function ($builder) use ($search): void {
                    $builder
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%");
                });
            })
            ->when($category, fn ($query, $value) => $query->where('category', $value))
            ->orderBy('category')
            ->orderBy('name')
            ->get()
            ->map(fn (MenuItem $item) => [
                'id' => $item->id,
                'name' => $item->name,
                'description' => $item->description,
                'price' => (float) $item->price,
                'category' => $item->category,
                'image_url' => $this->toPublicAssetUrl($item->image_url),
            ]);

        $categories = MenuItem::query()
            ->where('is_active', true)
            ->visibleIn($channel)
            ->whereNotNull('category')
            ->orderBy('category')
            ->distinct()
            ->pluck('category')
            ->values();

        $pickupLocations = PickupLocation::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'address', 'google_maps_url']);

        $customerToken = $customerIdentityService->resolveClientToken($request);
        $customerPrefill = $customerIdentityService->resolvePrefillFromToken($customerToken);
        $customerIdentityService->queueClientTokenCookie($customerToken);

        return Inertia::render('customer/menu', [
            'menuItems' => $menuItems,
            'categories' => $categories,
            'pickupLocations' => $pickupLocations,
            'customerToken' => $customerToken,
            'customerPrefill' => $customerPrefill,
            'filters' => [
                'search' => $search,
                'category' => $category,
                'channel' => $channel,
            ],
            'staffRoute' => $request->user()?->canAccessStaffPanel() ? route('staff.orders.index') : null,
        ]);
    }

    /**
     * Store a new customer order.
     *
     * @throws ValidationException
     */
    public function store(
        StoreOrderRequest $request,
        CustomerIdentityService $customerIdentityService,
        SmsEthiopiaService $smsService,
        SmsNotificationService $smsNotificationService,
        SmsTemplateService $smsTemplateService,
    ): RedirectResponse
    {
        $attemptId = (string) Str::uuid();

        try {
            $validated = $request->validated();
            $channel = MenuItem::normalizeVisibilityChannel(
                is_string($validated['channel'] ?? null) ? $validated['channel'] : null,
            );
            $items = collect($validated['items']);
            $menuItemIds = $items->pluck('menu_item_id')->unique()->values();

            Log::info('orders.store.received', [
                'attempt_id' => $attemptId,
                'channel' => $channel,
                'name' => $validated['name'],
                'phone' => $validated['phone'],
                'pickup_date' => $validated['pickup_date'],
                'pickup_location_id' => $validated['pickup_location_id'],
                'notify_when_ready' => (bool) ($validated['notify_when_ready'] ?? false),
                'item_count' => $items->count(),
                'item_ids' => $menuItemIds->all(),
                'has_receipt' => $request->hasFile('receipt'),
                'receipt_size' => $request->file('receipt')?->getSize(),
                'receipt_mime' => $request->file('receipt')?->getMimeType(),
                'ip' => $request->ip(),
            ]);

            $menuItems = MenuItem::query()
                ->where('is_active', true)
                ->visibleIn($channel)
                ->whereIn('id', $menuItemIds)
                ->get()
                ->keyBy('id');

            if ($menuItems->count() !== $menuItemIds->count()) {
                Log::warning('orders.store.unavailable_items', [
                    'attempt_id' => $attemptId,
                    'channel' => $channel,
                    'requested_item_ids' => $menuItemIds->all(),
                    'available_item_ids' => $menuItems->keys()->all(),
                ]);

                throw ValidationException::withMessages([
                    'items' => 'One or more selected menu items are unavailable.',
                ]);
            }

            $customerToken = $customerIdentityService->resolveClientToken($request);
            $customer = $customerIdentityService->resolveCustomer($customerToken, [
                'name' => $validated['name'],
                'phone' => $validated['phone'],
                'telegram_id' => $validated['telegram_id'] ?? null,
                'telegram_username' => $validated['telegram_username'] ?? null,
                'source_channel' => $channel === MenuItem::CHANNEL_TELEGRAM
                    ? Order::SOURCE_TELEGRAM
                    : Order::SOURCE_WEB,
                'user_agent' => $request->userAgent(),
                'ip' => $request->ip(),
            ]);
            $customerIdentityService->queueClientTokenCookie($customerToken);

            $receiptPath = $request->file('receipt')?->store('receipts', 'public');

            Log::info('orders.store.customer_and_receipt_ready', [
                'attempt_id' => $attemptId,
                'customer_id' => $customer->id,
                'customer_token' => $customerToken,
                'receipt_path' => $receiptPath,
            ]);

            $order = DB::transaction(function () use ($validated, $items, $menuItems, $customer, $receiptPath, $channel): Order {
                $order = $customer->orders()->create([
                    'pickup_date' => $validated['pickup_date'],
                    'pickup_location_id' => $validated['pickup_location_id'],
                    'source_channel' => $channel === MenuItem::CHANNEL_TELEGRAM
                        ? Order::SOURCE_TELEGRAM
                        : Order::SOURCE_WEB,
                    'receipt_url' => $receiptPath,
                    'receipt_status' => 'pending',
                    'order_status' => 'pending',
                    'tracking_token' => Str::random(40),
                    'total_amount' => $items->sum(
                        fn (array $item) => (float) $menuItems[$item['menu_item_id']]->price * (int) $item['quantity'],
                    ),
                    'notify_when_ready' => (bool) ($validated['notify_when_ready'] ?? false),
                ]);

                $order->items()->createMany(
                    $items->map(fn (array $item) => [
                        'menu_item_id' => $item['menu_item_id'],
                        'quantity' => $item['quantity'],
                        'price' => $menuItems[$item['menu_item_id']]->price,
                    ])->all(),
                );

                return $order;
            });

            Log::info('orders.store.created', [
                'attempt_id' => $attemptId,
                'order_id' => $order->id,
                'tracking_token' => $order->tracking_token,
                'total_amount' => (float) $order->total_amount,
            ]);

            if ($smsNotificationService->isEnabled('order_created')) {
                $order->loadMissing(['customer', 'pickupLocation', 'items.menuItem']);

                $smsMessage = $smsTemplateService->renderNamed(
                    'order_created',
                    $smsTemplateService->variablesForOrder($order),
                    'Hi {name}, your order #{orderid} is received at {branch}. Items: {itemlist}. Track: {trackinglink}',
                );
                $smsLog = $smsService->send($customer->phone, $smsMessage, $customer);

                Log::info('orders.store.sms_dispatched', [
                    'attempt_id' => $attemptId,
                    'order_id' => $order->id,
                    'sms_log_id' => $smsLog->id,
                    'sms_status' => $smsLog->status,
                ]);
            } else {
                Log::info('orders.store.sms_skipped', [
                    'attempt_id' => $attemptId,
                    'order_id' => $order->id,
                    'reason' => 'event_disabled',
                    'event_key' => 'order_created',
                ]);
            }

            return to_route('orders.confirmation', $order->tracking_token);
        } catch (ValidationException $exception) {
            Log::warning('orders.store.validation_exception', [
                'attempt_id' => $attemptId,
                'errors' => $exception->errors(),
            ]);

            throw $exception;
        } catch (Throwable $exception) {
            Log::error('orders.store.failed', [
                'attempt_id' => $attemptId,
                'message' => $exception->getMessage(),
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
            ]);

            throw $exception;
        }
    }

    /**
     * Show the customer order confirmation page.
     */
    public function confirmation(string $trackingToken): Response
    {
        $order = $this->findOrderByToken($trackingToken);

        return Inertia::render('customer/confirmation', [
            'order' => $this->transformOrder($order),
        ]);
    }

    /**
     * Show the tracking page for an order.
     */
    public function track(string $trackingToken): Response
    {
        $order = $this->findOrderByToken($trackingToken);

        return Inertia::render('customer/tracking', [
            'order' => $this->transformOrder($order),
        ]);
    }

    /**
     * Upload or replace a receipt for an order from the tracking page.
     */
    public function uploadReceipt(UploadOrderReceiptRequest $request, string $trackingToken): RedirectResponse
    {
        $order = Order::query()
            ->where('tracking_token', $trackingToken)
            ->firstOrFail();

        if ($order->receipt_url && ! str_starts_with($order->receipt_url, 'http')) {
            Storage::disk('public')->delete($order->receipt_url);
        }

        $receiptPath = $request->file('receipt')->store('receipts', 'public');

        $order->update([
            'receipt_url' => $receiptPath,
            'receipt_status' => 'pending',
            'disapproval_reason' => null,
        ]);

        return back()->with('success', 'Receipt uploaded successfully.');
    }

    /**
     * Find an order by its public tracking token.
     */
    protected function findOrderByToken(string $trackingToken): Order
    {
        return Order::query()
            ->with(['customer', 'pickupLocation', 'diningTable', 'items.menuItem'])
            ->where('tracking_token', $trackingToken)
            ->firstOrFail();
    }

    /**
     * Transform order details for customer-facing pages.
     *
     * @return array<string, mixed>
     */
    protected function transformOrder(Order $order): array
    {
        return [
            'id' => $order->id,
            'tracking_token' => $order->tracking_token,
            'pickup_date' => $order->pickup_date?->toDateString(),
            'pickup_location' => [
                'id' => $order->pickupLocation?->id,
                'name' => $order->pickupLocation?->name,
                'address' => $order->pickupLocation?->address,
                'google_maps_url' => $order->pickupLocation?->google_maps_url,
            ],
            'dining_table' => [
                'id' => $order->diningTable?->id,
                'name' => $order->diningTable?->name,
                'qr_code' => $order->diningTable?->qr_code,
            ],
            'customer' => [
                'name' => $order->customer?->name,
                'phone' => $order->customer?->phone,
            ],
            'receipt_url' => $this->toPublicAssetUrl($order->receipt_url),
            'receipt_status' => $order->receipt_status,
            'order_status' => $order->order_status,
            'disapproval_reason' => $order->disapproval_reason,
            'total_amount' => (float) $order->total_amount,
            'created_at' => $order->created_at?->toDateTimeString(),
            'notify_when_ready' => (bool) $order->notify_when_ready,
            'items' => $order->items->map(fn ($item) => [
                'id' => $item->id,
                'name' => $item->menuItem?->name,
                'image_url' => $this->toPublicAssetUrl($item->menuItem?->image_url),
                'quantity' => $item->quantity,
                'price' => (float) $item->price,
                'line_total' => (float) $item->price * $item->quantity,
            ])->values(),
        ];
    }

    /**
     * Build a public URL for either external URLs or local storage paths.
     */
    protected function toPublicAssetUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        /** @var \Illuminate\Filesystem\FilesystemAdapter $publicDisk */
        $publicDisk = Storage::disk('public');

        return str_starts_with($path, 'http://') || str_starts_with($path, 'https://')
            ? $path
            : $publicDisk->url($path);
    }
}
