<?php

namespace Modules\Messaging\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Modules\Messaging\Http\Requests\Staff\ImportCustomerContactsRequest;
use Modules\Messaging\Http\Requests\Staff\PreviewPromoAudienceRequest;
use Modules\Messaging\Http\Requests\Staff\SendPromoCampaignRequest;
use Modules\Messaging\Http\Requests\Staff\StoreSmsPhoneListRequest;
use Modules\Messaging\Http\Requests\Staff\UpdateSmsNotificationSettingRequest;
use App\Models\Customer;
use App\Models\MenuItem;
use App\Models\PickupLocation;
use App\Models\SmsNotificationSetting;
use App\Models\SmsPhoneList;
use App\Models\SmsTemplate;
use App\Models\User;
use App\Support\BranchAccess;
use App\Services\SmsEthiopiaService;
use App\Services\SmsNotificationService;
use App\Services\SmsTemplateService;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Modules\TelegramBot\Services\TelegramBotApiService;



class SmsTemplateController extends Controller
{
    /**
     * Show SMS template management page.
     */
    public function index(
        Request $request,
        SmsTemplateService $smsTemplateService,
        SmsNotificationService $smsNotificationService,
    ): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $smsTemplateService->syncDefaultTemplates();
        $smsNotificationService->syncDefaultSettings();

        $hasTemplatesTable = Schema::hasTable('sms_templates');
        $hasNotificationSettingsTable = Schema::hasTable('sms_notification_settings');
        $hasPhoneListsTable = Schema::hasTable('sms_phone_lists');
        $hasCustomersTable = Schema::hasTable('customers');
        $hasPickupLocationsTable = Schema::hasTable('pickup_locations');
        $hasMenuItemsTable = Schema::hasTable('menu_items');

        $branchIds = $user->accessiblePickupLocationIds();

        $templates = $hasTemplatesTable
            ? SmsTemplate::query()
                ->orderBy('key')
                ->get()
                ->map(fn (SmsTemplate $template) => [
                    'id' => $template->id,
                    'key' => $template->key,
                    'label' => $template->label,
                    'body' => $template->body,
                    'is_active' => $template->is_active,
                    'updated_at' => $template->updated_at?->toDateTimeString(),
                ])
            : collect();

        $branches = $hasPickupLocationsTable
            ? PickupLocation::query()
                ->select(['id', 'name'])
                ->when(
                    ! $user->isAdmin() && $branchIds !== [],
                    fn ($query) => $query->whereIn('id', $branchIds),
                )
                ->orderBy('name')
                ->get()
                ->map(fn (PickupLocation $pickupLocation) => [
                    'id' => $pickupLocation->id,
                    'name' => $pickupLocation->name,
                ])
                ->values()
            : collect();

        $menuItems = $hasMenuItemsTable
            ? MenuItem::query()
                ->select(['id', 'name', 'category'])
                ->where('is_active', true)
                ->orderBy('category')
                ->orderBy('name')
                ->get()
                ->map(fn (MenuItem $menuItem) => [
                    'id' => $menuItem->id,
                    'name' => $menuItem->name,
                    'category' => $menuItem->category,
                ])
                ->values()
            : collect();

        return Inertia::render('staff/sms-templates', [
            'templates' => $templates,
            'notificationSettings' => $hasNotificationSettingsTable
                ? SmsNotificationSetting::query()
                    ->orderBy('event_key')
                    ->get()
                    ->map(fn (SmsNotificationSetting $setting) => [
                        'id' => $setting->id,
                        'event_key' => $setting->event_key,
                        'label' => $setting->label,
                        'description' => (string) ($setting->description ?? ''),
                        'is_enabled' => (bool) $setting->is_enabled,
                    ])
                    ->values()
                : [],
            'phoneLists' => $hasPhoneListsTable
                ? SmsPhoneList::query()
                    ->orderByDesc('created_at')
                    ->get()
                    ->map(fn (SmsPhoneList $phoneList) => [
                        'id' => $phoneList->id,
                        'phone' => $phoneList->phone,
                        'normalized_phone' => $phoneList->normalized_phone,
                        'list_type' => $phoneList->list_type,
                        'note' => $phoneList->note,
                        'created_at' => $phoneList->created_at?->toDateTimeString(),
                    ])
                    ->values()
                : [],
            'placeholders' => $smsTemplateService->placeholders(),
            'branches' => $branches,
            'menuItems' => $menuItems,
            'summary' => [
                'total_templates' => $hasTemplatesTable ? SmsTemplate::query()->count() : 0,
                'active_templates' => $hasTemplatesTable ? SmsTemplate::query()->where('is_active', true)->count() : 0,
                'notification_events' => $hasNotificationSettingsTable
                    ? SmsNotificationSetting::query()->count()
                    : 0,
                'enabled_events' => $hasNotificationSettingsTable
                    ? SmsNotificationSetting::query()->where('is_enabled', true)->count()
                    : 0,
                'whitelist_count' => $hasPhoneListsTable
                    ? SmsPhoneList::query()->where('list_type', 'whitelist')->count()
                    : 0,
                'blacklist_count' => $hasPhoneListsTable
                    ? SmsPhoneList::query()->where('list_type', 'blacklist')->count()
                    : 0,
                'customers_count' => $hasCustomersTable ? Customer::query()->count() : 0,
            ],
        ]);
    }

    /**
     * Preview customers that match promo targeting filters.
     */
    public function previewAudience(
        PreviewPromoAudienceRequest $request,
        SmsTemplateService $smsTemplateService,
    ): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $validated = $request->validated();
        $rangeError = $this->promoRangeValidationMessage($validated);

        if ($rangeError !== null) {
            return response()->json([
                'message' => $rangeError,
            ], 422);
        }

        $audienceQuery = $this->promoAudienceQuery($user, $validated);

        $now = now();
        $totalMatching = (clone $audienceQuery)->count();
        $highValueCount = (clone $audienceQuery)->where('total_spent', '>=', 2000)->count();
        $dormantCount = (clone $audienceQuery)
            ->whereNotNull('last_order_at')
            ->where('last_order_at', '<', now()->subDays(90))
            ->count();

        $sampleAudienceRows = (clone $audienceQuery)
            ->orderByDesc('orders_count')
            ->orderByDesc('total_spent')
            ->limit(20)
            ->get();

        $sampleCustomerIds = $sampleAudienceRows
            ->pluck('id')
            ->map(fn ($id) => (int) $id)
            ->filter(fn (int $id) => $id > 0)
            ->values()
            ->all();

        /** @var \Illuminate\Support\Collection<int, \App\Models\Customer> $sampleCustomers */
        $sampleCustomers = Customer::query()
            ->whereIn('id', $sampleCustomerIds)
            ->get()
            ->keyBy('id');

        $sampleRows = $sampleAudienceRows
            ->map(function ($row) use ($now, $sampleCustomers, $smsTemplateService, $user): array {
                $lastOrderAt = $row->last_order_at ? Carbon::parse((string) $row->last_order_at) : null;
                $customer = $sampleCustomers->get((int) $row->id);
                $previewVariables = [];

                if ($customer instanceof Customer) {
                    $latestOrderQuery = $customer->orders()->with(['pickupLocation', 'items.menuItem'])->latest();
                    BranchAccess::scopeQuery($latestOrderQuery, $user);
                    $latestOrder = $latestOrderQuery->first();

                    $previewVariables = collect(
                        $smsTemplateService->variablesForCustomer($customer, $latestOrder),
                    )
                        ->mapWithKeys(fn ($value, $key) => [(string) $key => (string) $value])
                        ->all();
                }

                return [
                    'id' => (int) $row->id,
                    'name' => (string) $row->name,
                    'phone' => (string) $row->phone,
                    'telegram_username' => $row->telegram_username ? (string) $row->telegram_username : null,
                    'orders_count' => (int) $row->orders_count,
                    'total_spent' => (float) ($row->total_spent ?? 0),
                    'average_order_value' => (float) ($row->average_order_value ?? 0),
                    'last_order_at' => $lastOrderAt?->toDateTimeString(),
                    'recency_days' => $lastOrderAt?->diffInDays($now),
                    'preview_variables' => $previewVariables,
                ];
            })
            ->values();

        return response()->json([
            'summary' => [
                'matched_customers' => $totalMatching,
                'high_value_customers' => $highValueCount,
                'dormant_customers' => $dormantCount,
                'average_orders_per_customer' => round((float) ((clone $audienceQuery)->avg('orders_count') ?? 0), 2),
                'average_total_spent' => round((float) ((clone $audienceQuery)->avg('total_spent') ?? 0), 2),
            ],
            'sample' => $sampleRows,
        ]);
    }

    /**
     * Send a promo campaign to the currently targeted audience.
     */
    public function sendCampaign(
        SendPromoCampaignRequest $request,
        SmsTemplateService $smsTemplateService,
        SmsEthiopiaService $smsService,
        TelegramBotApiService $telegramBotApiService,
    ): RedirectResponse {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $validated = $request->validated();

        $rangeError = $this->promoRangeValidationMessage($validated);

        if ($rangeError !== null) {
            return back()->withErrors([
                'message' => $rangeError,
            ]);
        }

        $audienceRows = (clone $this->promoAudienceQuery($user, $validated))
            ->orderByDesc('orders_count')
            ->orderByDesc('total_spent')
            ->get();

        if ($audienceRows->isEmpty()) {
            return back()->with('error', 'No customers matched the selected promo filters.');
        }

        $customerIds = $audienceRows
            ->pluck('id')
            ->map(fn ($id) => (int) $id)
            ->filter(fn (int $id) => $id > 0)
            ->unique()
            ->values()
            ->all();

        /** @var \Illuminate\Support\Collection<int, \App\Models\Customer> $customers */
        $customers = Customer::query()
            ->whereIn('id', $customerIds)
            ->get()
            ->keyBy('id');

        $platform = (string) $validated['platform'];
        $buttonText = is_string($validated['telegram_button_text'] ?? null)
            ? trim($validated['telegram_button_text'])
            : '';
        $buttonUrl = is_string($validated['telegram_button_url'] ?? null)
            ? trim($validated['telegram_button_url'])
            : '';

        $sent = 0;
        $failed = 0;

        foreach ($audienceRows as $row) {
            $customer = $customers->get((int) $row->id);

            if (! $customer instanceof Customer) {
                $failed++;
                continue;
            }

            $latestOrderQuery = $customer->orders()->with(['pickupLocation', 'items.menuItem'])->latest();
            BranchAccess::scopeQuery($latestOrderQuery, $user);
            $latestOrder = $latestOrderQuery->first();

            $renderedMessage = $smsTemplateService->render(
                (string) $validated['message'],
                $smsTemplateService->variablesForCustomer($customer, $latestOrder),
            );

            if ($platform === 'telegram') {
                $chatTarget = $this->telegramChatTarget($customer);

                if ($chatTarget === null) {
                    $failed++;
                    continue;
                }

                $options = [];

                if ($buttonText !== '' && $buttonUrl !== '') {
                    $options['reply_markup'] = [
                        'inline_keyboard' => [
                            [
                                [
                                    'text' => $buttonText,
                                    'url' => $buttonUrl,
                                    'style' => 'primary',
                                ],
                            ],
                        ],
                    ];
                }

                $telegramBotApiService->sendMessage($chatTarget, $renderedMessage, $options, [
                    'source' => 'staff.sms_campaign',
                    'customer_id' => $customer->id,
                    'customer_name' => $customer->name,
                    'customer_telegram_id' => is_scalar($customer->telegram_id)
                        ? (string) $customer->telegram_id
                        : null,
                ]);
                $sent++;
                continue;
            }

            $phone = is_string($customer->phone) ? trim($customer->phone) : '';

            if ($phone === '') {
                $failed++;
                continue;
            }

            $result = $smsService->send($phone, $renderedMessage, $customer);

            if ($result->status === 'sent') {
                $sent++;
            } else {
                $failed++;
            }
        }

        $savedTemplateLabel = null;

        if ($request->boolean('save_template')) {
            $templateLabel = is_string($validated['template_label'] ?? null)
                ? trim($validated['template_label'])
                : '';

            if ($templateLabel === '') {
                $templateLabel = 'Promo Campaign '.now()->format('Y-m-d H:i');
            }

            $template = SmsTemplate::query()->create([
                'key' => $this->nextPromoTemplateKey(),
                'label' => $templateLabel,
                'body' => (string) $validated['message'],
                'is_active' => true,
            ]);

            $savedTemplateLabel = $template->label;
        }

        $channelLabel = $platform === 'telegram' ? 'Telegram' : 'SMS';
        $message = "{$channelLabel} promo sent. Sent: {$sent}, Failed: {$failed}, Audience: ".count($customerIds).'.';

        if ($savedTemplateLabel !== null) {
            $message .= " Template saved as \"{$savedTemplateLabel}\".";
        }

        return back()->with('success', $message);
    }

    /**
     * Validate promo range filters.
     *
     * @param  array<string, mixed>  $validated
     */
    protected function promoRangeValidationMessage(array $validated): ?string
    {
        $ordersMin = isset($validated['orders_min']) ? (int) $validated['orders_min'] : null;
        $ordersMax = isset($validated['orders_max']) ? (int) $validated['orders_max'] : null;
        $recencyMinDays = isset($validated['recency_min_days']) ? (int) $validated['recency_min_days'] : null;
        $recencyMaxDays = isset($validated['recency_max_days']) ? (int) $validated['recency_max_days'] : null;
        $totalSpentMin = isset($validated['total_spent_min']) ? (float) $validated['total_spent_min'] : null;
        $totalSpentMax = isset($validated['total_spent_max']) ? (float) $validated['total_spent_max'] : null;
        $avgOrderValueMin = isset($validated['avg_order_value_min']) ? (float) $validated['avg_order_value_min'] : null;
        $avgOrderValueMax = isset($validated['avg_order_value_max']) ? (float) $validated['avg_order_value_max'] : null;

        if ($ordersMin !== null && $ordersMax !== null && $ordersMin > $ordersMax) {
            return 'Order range is invalid. Min orders cannot be greater than max orders.';
        }

        if ($recencyMinDays !== null && $recencyMaxDays !== null && $recencyMinDays > $recencyMaxDays) {
            return 'Recency window is invalid. Min days cannot be greater than max days.';
        }

        if ($totalSpentMin !== null && $totalSpentMax !== null && $totalSpentMin > $totalSpentMax) {
            return 'Total spend range is invalid. Min spend cannot be greater than max spend.';
        }

        if ($avgOrderValueMin !== null && $avgOrderValueMax !== null && $avgOrderValueMin > $avgOrderValueMax) {
            return 'Average order value range is invalid. Min AOV cannot be greater than max AOV.';
        }

        return null;
    }

    /**
     * Build promo audience query using targeting filters.
     *
     * @param  array<string, mixed>  $validated
     */
    protected function promoAudienceQuery(User $user, array $validated): QueryBuilder
    {
        $ordersMin = isset($validated['orders_min']) ? (int) $validated['orders_min'] : null;
        $ordersMax = isset($validated['orders_max']) ? (int) $validated['orders_max'] : null;
        $recencyMinDays = isset($validated['recency_min_days']) ? (int) $validated['recency_min_days'] : null;
        $recencyMaxDays = isset($validated['recency_max_days']) ? (int) $validated['recency_max_days'] : null;
        $totalSpentMin = isset($validated['total_spent_min']) ? (float) $validated['total_spent_min'] : null;
        $totalSpentMax = isset($validated['total_spent_max']) ? (float) $validated['total_spent_max'] : null;
        $avgOrderValueMin = isset($validated['avg_order_value_min']) ? (float) $validated['avg_order_value_min'] : null;
        $avgOrderValueMax = isset($validated['avg_order_value_max']) ? (float) $validated['avg_order_value_max'] : null;
        $platform = (string) $validated['platform'];
        $search = trim((string) ($validated['search'] ?? ''));

        $requestedBranchIds = collect($validated['branch_ids'] ?? [])
            ->map(fn ($id) => (int) $id)
            ->unique()
            ->values()
            ->all();

        $branchIds = $requestedBranchIds;

        if (! $user->isAdmin() && $branchIds !== []) {
            $allowedIds = $user->accessiblePickupLocationIds();
            $branchIds = array_values(
                array_map(
                    fn ($id) => (int) $id,
                    array_intersect($branchIds, $allowedIds),
                ),
            );
        }

        $hasBranchFilter = $requestedBranchIds !== [];

        $includeMenuItemIds = collect($validated['include_menu_item_ids'] ?? [])
            ->map(fn ($id) => (int) $id)
            ->unique()
            ->values()
            ->all();

        $excludeMenuItemIds = collect($validated['exclude_menu_item_ids'] ?? [])
            ->map(fn ($id) => (int) $id)
            ->unique()
            ->values()
            ->all();

        $scopedOrders = fn ($query) => BranchAccess::scopeQuery($query, $user);

        $baseAudienceQuery = Customer::query()
            ->select([
                'customers.id',
                'customers.name',
                'customers.phone',
                'customers.telegram_username',
                'customers.telegram_id',
            ])
            ->whereHas('orders', $scopedOrders)
            ->withCount(['orders as orders_count' => $scopedOrders])
            ->withSum(['orders as total_spent' => $scopedOrders], 'total_amount')
            ->withAvg(['orders as average_order_value' => $scopedOrders], 'total_amount')
            ->withMax(['orders as last_order_at' => $scopedOrders], 'created_at')
            ->when($platform === 'telegram', function ($query): void {
                $query
                    ->whereNotNull('customers.telegram_id')
                    ->where('customers.telegram_id', '!=', '');
            })
            ->when($search !== '', function ($query) use ($search): void {
                $query->where(function ($builder) use ($search): void {
                    $builder
                        ->where('customers.name', 'like', "%{$search}%")
                        ->orWhere('customers.phone', 'like', "%{$search}%")
                        ->orWhere('customers.telegram_username', 'like', "%{$search}%");
                });
            })
            ->when($hasBranchFilter && $branchIds === [], function ($query): void {
                $query->whereRaw('1 = 0');
            })
            ->when($branchIds !== [], function ($query) use ($user, $branchIds): void {
                $query->whereHas('orders', function ($orderQuery) use ($user, $branchIds): void {
                    BranchAccess::scopeQuery($orderQuery, $user);
                    $orderQuery->whereIn('pickup_location_id', $branchIds);
                });
            })
            ->when($includeMenuItemIds !== [], function ($query) use ($user, $includeMenuItemIds): void {
                $query->whereHas('orders', function ($orderQuery) use ($user, $includeMenuItemIds): void {
                    BranchAccess::scopeQuery($orderQuery, $user);
                    $orderQuery->whereHas('items', function ($itemQuery) use ($includeMenuItemIds): void {
                        $itemQuery->whereIn('menu_item_id', $includeMenuItemIds);
                    });
                });
            })
            ->when($excludeMenuItemIds !== [], function ($query) use ($user, $excludeMenuItemIds): void {
                $query->whereDoesntHave('orders', function ($orderQuery) use ($user, $excludeMenuItemIds): void {
                    BranchAccess::scopeQuery($orderQuery, $user);
                    $orderQuery->whereHas('items', function ($itemQuery) use ($excludeMenuItemIds): void {
                        $itemQuery->whereIn('menu_item_id', $excludeMenuItemIds);
                    });
                });
            })
            ->when($recencyMaxDays !== null, function ($query) use ($user, $recencyMaxDays): void {
                $maxCutoff = now()->subDays($recencyMaxDays)->startOfDay();

                $query->whereHas('orders', function ($orderQuery) use ($user, $maxCutoff): void {
                    BranchAccess::scopeQuery($orderQuery, $user);
                    $orderQuery->where('created_at', '>=', $maxCutoff);
                });
            })
            ->when($recencyMinDays !== null && $recencyMinDays > 0, function ($query) use ($user, $recencyMinDays): void {
                $minCutoff = now()->subDays($recencyMinDays)->endOfDay();

                $query->whereDoesntHave('orders', function ($orderQuery) use ($user, $minCutoff): void {
                    BranchAccess::scopeQuery($orderQuery, $user);
                    $orderQuery->where('created_at', '>', $minCutoff);
                });
            });

        return DB::query()
            ->fromSub($baseAudienceQuery, 'audience')
            ->when($ordersMin !== null, fn ($query) => $query->where('orders_count', '>=', $ordersMin))
            ->when($ordersMax !== null, fn ($query) => $query->where('orders_count', '<=', $ordersMax))
            ->when($totalSpentMin !== null, fn ($query) => $query->where('total_spent', '>=', $totalSpentMin))
            ->when($totalSpentMax !== null, fn ($query) => $query->where('total_spent', '<=', $totalSpentMax))
            ->when($avgOrderValueMin !== null, fn ($query) => $query->where('average_order_value', '>=', $avgOrderValueMin))
            ->when($avgOrderValueMax !== null, fn ($query) => $query->where('average_order_value', '<=', $avgOrderValueMax));
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

    protected function nextPromoTemplateKey(): string
    {
        $baseKey = 'promo_'.now()->format('Ymd_His');
        $candidate = $baseKey;
        $suffix = 1;

        while (SmsTemplate::query()->where('key', $candidate)->exists()) {
            $candidate = "{$baseKey}_{$suffix}";
            $suffix++;
        }

        return $candidate;
    }

    /**
     * Update an SMS template.
     */
    public function update(Request $request, SmsTemplate $smsTemplate): RedirectResponse
    {
        $validated = $request->validate([
            'label' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'max:2000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $smsTemplate->update([
            'label' => $validated['label'],
            'body' => $validated['body'],
            'is_active' => $request->boolean('is_active', $smsTemplate->is_active),
        ]);

        return back()->with('success', 'SMS template updated.');
    }

    /**
     * Update an SMS notification event toggle.
     */
    public function updateNotificationSetting(
        UpdateSmsNotificationSettingRequest $request,
        SmsNotificationSetting $smsNotificationSetting,
    ): RedirectResponse {
        $smsNotificationSetting->update([
            'is_enabled' => $request->boolean('is_enabled'),
        ]);

        return back()->with('success', 'Notification setting updated.');
    }

    /**
     * Add a number to whitelist or blacklist.
     *
     * @throws ValidationException
     */
    public function storePhoneList(
        StoreSmsPhoneListRequest $request,
        SmsEthiopiaService $smsService,
    ): RedirectResponse {
        $validated = $request->validated();
        $normalizedPhone = $smsService->normalizePhone($validated['phone']);

        if (! $normalizedPhone) {
            throw ValidationException::withMessages([
                'phone' => 'Invalid Ethiopian phone format.',
            ]);
        }

        $phoneList = SmsPhoneList::query()->firstOrNew([
            'normalized_phone' => $normalizedPhone,
            'list_type' => $validated['list_type'],
        ]);

        $phoneList->phone = $validated['phone'];
        $phoneList->note = $validated['note'] ?? null;
        $phoneList->save();

        return back()->with('success', 'Phone list updated.');
    }

    /**
     * Remove phone list entry.
     */
    public function destroyPhoneList(SmsPhoneList $smsPhoneList): RedirectResponse
    {
        $smsPhoneList->delete();

        return back()->with('success', 'Phone list entry removed.');
    }

    /**
     * Import customer contacts from a CSV file.
     */
    public function importContacts(
        ImportCustomerContactsRequest $request,
        SmsEthiopiaService $smsService,
    ): RedirectResponse {
        $file = $request->file('contacts_file');

        if (! $file) {
            return back()->with('error', 'No file uploaded.');
        }

        $handle = fopen($file->getRealPath(), 'r');

        if (! $handle) {
            return back()->with('error', 'Unable to read uploaded file.');
        }

        $created = 0;
        $updated = 0;
        $skipped = 0;
        $line = 0;

        while (($row = fgetcsv($handle)) !== false) {
            $line++;

            if (! is_array($row) || count($row) < 2) {
                $skipped++;
                continue;
            }

            $name = trim((string) ($row[0] ?? ''));
            $phone = trim((string) ($row[1] ?? ''));

            if (
                $line === 1 &&
                strcasecmp($name, 'name') === 0 &&
                strcasecmp($phone, 'phone') === 0
            ) {
                continue;
            }

            $normalizedPhone = $smsService->normalizePhone($phone);

            if (! $normalizedPhone) {
                $skipped++;
                continue;
            }

            $canonicalPhone = $smsService->withPlusCountryCode($normalizedPhone);

            if (! $canonicalPhone) {
                $skipped++;
                continue;
            }

            $finalName = $name !== '' ? $name : 'Customer '.Str::substr($normalizedPhone, -4);

            $customer = Customer::query()
                ->where('phone', $canonicalPhone)
                ->first();

            if (! $customer) {
                $customer = Customer::query()
                    ->whereIn('phone', [
                        '251'.$normalizedPhone,
                        '0'.$normalizedPhone,
                        $normalizedPhone,
                    ])
                    ->first();
            }

            if (! $customer) {
                $customer = new Customer([
                    'phone' => $canonicalPhone,
                ]);
            }

            $wasExisting = $customer->exists;

            $customer->phone = $canonicalPhone;
            $customer->name = $finalName;
            $customer->save();

            if ($wasExisting) {
                $updated++;
            } else {
                $created++;
            }
        }

        fclose($handle);

        return back()->with(
            'success',
            "Contact import complete. Created: {$created}, Updated: {$updated}, Skipped: {$skipped}.",
        );
    }
}
