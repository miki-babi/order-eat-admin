<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\SendCustomerSmsRequest;
use App\Models\Customer;
use App\Support\BranchAccess;
use App\Services\SmsEthiopiaService;
use App\Services\SmsTemplateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        $applyBranchScope = fn ($query) => BranchAccess::scopeQuery($query, $user);

        $customers = Customer::query()
            ->whereHas('orders', $applyBranchScope)
            ->withCount(['orders as orders_count' => $applyBranchScope])
            ->withSum(['orders as orders_sum_total_amount' => $applyBranchScope], 'total_amount')
            ->withMax(['orders as orders_max_created_at' => $applyBranchScope], 'created_at')
            ->when($search !== '', function ($query) use ($search): void {
                $query->where(function ($builder) use ($search): void {
                    $builder
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('orders_count')
            ->paginate(20)
            ->withQueryString()
            ->through(fn (Customer $customer) => [
                'id' => $customer->id,
                'name' => $customer->name,
                'phone' => $customer->phone,
                'telegram_username' => $customer->telegram_username,
                'orders_count' => $customer->orders_count,
                'total_spent' => (float) ($customer->orders_sum_total_amount ?? 0),
                'last_order_at' => $customer->orders_max_created_at,
            ]);

        $selectedCustomer = null;

        if ($request->filled('customer_id')) {
            $selected = Customer::query()
                ->whereHas('orders', $applyBranchScope)
                ->with([
                    'orders' => fn ($query) => BranchAccess::scopeQuery($query, $user)
                        ->with('pickupLocation')
                        ->latest()
                        ->limit(10),
                ])
                ->find($request->integer('customer_id'));

            if ($selected) {
                $selectedCustomer = [
                    'id' => $selected->id,
                    'name' => $selected->name,
                    'phone' => $selected->phone,
                    'orders' => $selected->orders->map(fn ($order) => [
                        'id' => $order->id,
                        'pickup_date' => $order->pickup_date?->toDateString(),
                        'pickup_location' => $order->pickupLocation?->name,
                        'order_status' => $order->order_status,
                        'receipt_status' => $order->receipt_status,
                        'total_amount' => (float) $order->total_amount,
                        'created_at' => $order->created_at?->toDateTimeString(),
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
}
