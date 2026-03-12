<?php

namespace Modules\Customers\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Modules\Customers\Http\Requests\Staff\SendCustomerSmsRequest;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Support\BranchAccess;
use App\Services\CustomerDossierService;
use App\Services\SmsEthiopiaService;
use App\Services\SmsTemplateService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;
use Modules\TelegramBot\Services\TelegramBotApiService;

class CustomerController extends Controller
{
    /**
     * Show customer list, filters, and order history.
     */
    public function index(Request $request, SmsTemplateService $smsTemplateService, CustomerDossierService $dossierService): Response
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
            $selectedCustomer = $dossierService->getDossier($request->integer('customer_id'), $user);
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
     * Send SMS or Telegram outreach messages to selected customers.
     */
    public function sendSms(
        SendCustomerSmsRequest $request,
        SmsEthiopiaService $smsService,
        SmsTemplateService $smsTemplateService,
        TelegramBotApiService $telegramBotApiService,
    ): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $validated = $request->validated();
        $platform = is_string($validated['platform'] ?? null) && $validated['platform'] === 'telegram'
            ? 'telegram'
            : 'sms';
        $telegramButtonText = is_string($validated['telegram_button_text'] ?? null)
            ? trim($validated['telegram_button_text'])
            : '';
        $telegramButtonUrl = is_string($validated['telegram_button_url'] ?? null)
            ? trim($validated['telegram_button_url'])
            : '';

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

            if ($platform === 'telegram') {
                $chatTarget = $this->telegramChatTarget($customer);

                if ($chatTarget === null) {
                    $failed++;
                    continue;
                }

                $options = [];

                if ($telegramButtonText !== '' && $telegramButtonUrl !== '') {
                    $options['reply_markup'] = [
                        'inline_keyboard' => [
                            [
                                [
                                    'text' => $telegramButtonText,
                                    'url' => $telegramButtonUrl,
                                    'style' => 'primary',
                                ],
                            ],
                        ],
                    ];
                }

                $telegramBotApiService->sendMessage($chatTarget, $message, $options, [
                    'source' => 'staff.customers_outreach',
                    'customer_id' => $customer->id,
                    'customer_name' => $customer->name,
                    'customer_telegram_id' => is_scalar($customer->telegram_id)
                        ? (string) $customer->telegram_id
                        : null,
                ]);
                $sent++;
                continue;
            }

            $result = $smsService->send($customer->phone, $message, $customer);

            if ($result->status !== 'sent') {
                $failed++;
                continue;
            }

            $sent++;
        }

        $channelLabel = $platform === 'telegram' ? 'Telegram' : 'SMS';

        return back()->with('success', "{$channelLabel} completed. Sent: {$sent}, Failed: {$failed}.");
    }

    protected function telegramChatTarget(Customer $customer): ?string
    {
        return $this->normalizeTelegramId($customer->telegram_id);
    }

    protected function normalizeTelegramId(mixed $value): ?string
    {
        $normalized = match (true) {
            is_int($value) => (string) $value,
            is_string($value) => trim($value),
            is_numeric($value) => trim((string) $value),
            default => '',
        };

        if ($normalized === '') {
            return null;
        }

        if (preg_match('/^\d+$/', $normalized) !== 1) {
            return null;
        }

        return $normalized === '0' ? null : $normalized;
    }


}
