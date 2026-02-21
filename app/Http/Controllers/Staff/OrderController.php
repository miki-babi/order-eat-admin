<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\UpdateOrderRequest;
use App\Models\Order;
use App\Models\PickupLocation;
use App\Support\BranchAccess;
use App\Services\SmsEthiopiaService;
use App\Services\SmsNotificationService;
use App\Services\SmsTemplateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Show and filter staff order management list.
     */
    public function index(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $today = Carbon::today();
        $tomorrow = $today->copy()->addDay();

        $query = Order::query()
            ->with(['customer', 'pickupLocation', 'items.menuItem'])
            ->orderBy('pickup_date')
            ->orderBy('created_at');

        BranchAccess::scopeQuery($query, $user);

        if ($request->filled('search')) {
            $search = trim((string) $request->input('search'));
            $query->where(function ($builder) use ($search): void {
                if (is_numeric($search)) {
                    $builder->orWhere('id', (int) $search);
                }

                $builder->orWhereHas('customer', function ($customerQuery) use ($search): void {
                    $customerQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%");
                });
            });
        }

        if ($request->filled('status')) {
            $query->where('order_status', $request->input('status'));
        }

        if ($request->filled('receipt_status')) {
            $query->where('receipt_status', $request->input('receipt_status'));
        }

        if ($request->filled('pickup_location_id')) {
            $pickupLocationId = $request->integer('pickup_location_id');
            BranchAccess::ensureUserCanAccessBranch($user, $pickupLocationId);
            $query->where('pickup_location_id', $pickupLocationId);
        }

        if ($request->filled('date')) {
            $query->whereDate('pickup_date', $request->input('date'));
        }

        $timeBucket = $request->input('time_bucket');

        if ($timeBucket === 'today') {
            $query->whereDate('pickup_date', $today);
        }

        if ($timeBucket === 'tomorrow') {
            $query->whereDate('pickup_date', $tomorrow);
        }

        if ($timeBucket === 'upcoming') {
            $query->whereDate('pickup_date', '>', $tomorrow);
        }

        $orders = $query
            ->paginate(20)
            ->withQueryString()
            ->through(fn (Order $order) => [
                'id' => $order->id,
                'customer_name' => $order->customer?->name,
                'customer_phone' => $order->customer?->phone,
                'pickup_date' => $order->pickup_date?->toDateString(),
                'pickup_location' => $order->pickupLocation?->name,
                'receipt_url' => $this->toPublicAssetUrl($order->receipt_url),
                'receipt_status' => $order->receipt_status,
                'order_status' => $order->order_status,
                'disapproval_reason' => $order->disapproval_reason,
                'notify_when_ready' => (bool) $order->notify_when_ready,
                'total_amount' => (float) $order->total_amount,
                'tracking_url' => route('orders.track', $order->tracking_token),
                'created_at' => $order->created_at?->toDateTimeString(),
                'items' => $order->items->map(fn ($item) => [
                    'id' => $item->id,
                    'name' => $item->menuItem?->name,
                    'image_url' => $this->toPublicAssetUrl($item->menuItem?->image_url),
                    'quantity' => $item->quantity,
                    'price' => (float) $item->price,
                    'line_total' => (float) $item->price * $item->quantity,
                ])->values(),
            ]);

        $statsBase = Order::query();
        BranchAccess::scopeQuery($statsBase, $user);

        $pickupLocations = PickupLocation::query()
            ->orderBy('name');

        $assignedBranchIds = $user->accessiblePickupLocationIds();

        if (! $user->isAdmin() && $assignedBranchIds !== []) {
            $pickupLocations->whereIn('id', $assignedBranchIds);
        }

        return Inertia::render('staff/orders', [
            'orders' => $orders,
            'pickupLocations' => $pickupLocations->get(['id', 'name']),
            'filters' => [
                'search' => $request->input('search'),
                'status' => $request->input('status'),
                'receipt_status' => $request->input('receipt_status'),
                'pickup_location_id' => $request->input('pickup_location_id'),
                'date' => $request->input('date'),
                'time_bucket' => $timeBucket,
            ],
            'statusOptions' => ['pending', 'preparing', 'ready', 'completed'],
            'receiptStatusOptions' => ['pending', 'approved', 'disapproved'],
            'summary' => [
                'total_orders' => (clone $statsBase)->count(),
                'pending_orders' => (clone $statsBase)->where('order_status', 'pending')->count(),
                'pending_receipts' => (clone $statsBase)->where('receipt_status', 'pending')->count(),
                'ready_orders' => (clone $statsBase)->where('order_status', 'ready')->count(),
            ],
        ]);
    }

    /**
     * Update order and receipt status from staff dashboard.
     */
    public function update(
        UpdateOrderRequest $request,
        Order $order,
        SmsEthiopiaService $smsService,
        SmsNotificationService $smsNotificationService,
        SmsTemplateService $smsTemplateService,
    ): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        BranchAccess::ensureUserCanAccessBranch($user, $order->pickup_location_id);

        $validated = $request->validated();
        $notifyCustomer = $request->boolean('notify_customer');
        $updates = [];
        $previousOrderStatus = $order->order_status;
        $previousReceiptStatus = $order->receipt_status;

        if (array_key_exists('order_status', $validated) && $validated['order_status']) {
            $updates['order_status'] = $validated['order_status'];
        }

        if (array_key_exists('receipt_status', $validated) && $validated['receipt_status']) {
            $updates['receipt_status'] = $validated['receipt_status'];

            if ($validated['receipt_status'] === 'approved') {
                $updates['disapproval_reason'] = null;

                if (! array_key_exists('order_status', $updates) && $order->order_status === 'pending') {
                    $updates['order_status'] = 'preparing';
                }
            }

            if ($validated['receipt_status'] === 'disapproved') {
                $updates['disapproval_reason'] = $validated['disapproval_reason'];
            }

            if ($validated['receipt_status'] === 'pending') {
                $updates['disapproval_reason'] = null;
            }
        }

        if (! empty($updates)) {
            $order->update($updates);
            $order->refresh();
        }

        $orderStatusChanged = $previousOrderStatus !== $order->order_status;
        $receiptStatusChanged = $previousReceiptStatus !== $order->receipt_status;

        $shouldSendReceiptApproved =
            $notifyCustomer &&
            $receiptStatusChanged &&
            $order->receipt_status === 'approved' &&
            $smsNotificationService->isEnabled('receipt_approved');

        $shouldSendReceiptDisapproved =
            $notifyCustomer &&
            $receiptStatusChanged &&
            $order->receipt_status === 'disapproved' &&
            $smsNotificationService->isEnabled('receipt_disapproved');

        $shouldSendOrderReady =
            $orderStatusChanged &&
            $order->order_status === 'ready' &&
            $order->notify_when_ready &&
            $smsNotificationService->isEnabled('order_ready');

        if (
            $order->customer &&
            ($shouldSendReceiptApproved || $shouldSendReceiptDisapproved || $shouldSendOrderReady)
        ) {
            $order->loadMissing(['customer', 'pickupLocation', 'items.menuItem']);

            if ($shouldSendReceiptApproved) {
                $message = $smsTemplateService->renderNamed(
                    'receipt_approved',
                    $smsTemplateService->variablesForOrder($order),
                    'Hi {name}, your receipt for order #{orderid} has been approved. We are preparing your order at {branch}.',
                );
                $smsService->send($order->customer->phone, $message, $order->customer);
            }

            if ($shouldSendReceiptDisapproved) {
                $message = $smsTemplateService->renderNamed(
                    'receipt_disapproved',
                    $smsTemplateService->variablesForOrder($order),
                    'Hi {name}, receipt for order #{orderid} was disapproved. Reason: {disapprovalreason}. Re-upload: {trackinglink}',
                );
                $smsService->send($order->customer->phone, $message, $order->customer);
            }

            if ($shouldSendOrderReady) {
                $message = $smsTemplateService->renderNamed(
                    'order_ready',
                    $smsTemplateService->variablesForOrder($order),
                    'Hi {name}, your order #{orderid} is ready for pickup at {branch}.',
                );
                $smsService->send($order->customer->phone, $message, $order->customer);
            }
        }

        return back()->with('success', 'Order updated successfully.');
    }

    /**
     * Build a public URL for either external URLs or local storage paths.
     */
    protected function toPublicAssetUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        return str_starts_with($path, 'http://') || str_starts_with($path, 'https://')
            ? $path
            : Storage::disk('public')->url($path);
    }
}
