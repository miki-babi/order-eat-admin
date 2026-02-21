<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\SmsTemplate;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SmsTemplateService
{
    /**
     * Render a free-form template string with {placeholder} tokens.
     *
     * @param  array<string, mixed>  $variables
     */
    public function render(string $template, array $variables = []): string
    {
        $normalized = [];

        foreach ($variables as $key => $value) {
            $normalized[strtolower((string) $key)] = $this->stringify($value);
        }

        $rendered = preg_replace_callback('/\{([a-z0-9_]+)\}/i', function (array $matches) use ($normalized): string {
            $token = strtolower($matches[1]);

            return array_key_exists($token, $normalized) ? $normalized[$token] : $matches[0];
        }, $template);

        return is_string($rendered) ? $rendered : $template;
    }

    /**
     * Render a configured template by key.
     *
     * @param  array<string, mixed>  $variables
     */
    public function renderNamed(string $templateKey, array $variables = [], ?string $fallback = null): string
    {
        $template = $this->templateBody($templateKey);

        if ($template === '') {
            $template = $fallback ?? '';
        }

        return $this->render($template, $variables);
    }

    /**
     * Build placeholder context using customer and optional order data.
     *
     * @return array<string, string>
     */
    public function variablesForCustomer(Customer $customer, ?Order $order = null): array
    {
        $recentOrder = $this->resolveRecentOrder($customer, $order);

        return array_merge(
            $this->emptyOrderVariables(),
            [
                'name' => (string) ($customer->name ?? ''),
                'phone' => (string) ($customer->phone ?? ''),
                'recent_item' => $this->resolveRecentItem($recentOrder),
                'recent_branch' => (string) ($recentOrder?->pickupLocation?->name ?? ''),
                'freq_item' => $this->resolveFrequentItem($customer),
                'freq_branch' => $this->resolveFrequentBranch($customer),
            ],
            $recentOrder ? $this->variablesForOrder($recentOrder) : [],
        );
    }

    /**
     * Build placeholder context from an order.
     *
     * @return array<string, string>
     */
    public function variablesForOrder(Order $order): array
    {
        $order->loadMissing(['customer', 'pickupLocation', 'items.menuItem']);

        $itemIds = $order->items
            ->pluck('menu_item_id')
            ->filter()
            ->map(fn ($id) => (string) $id)
            ->values();

        return [
            'name' => (string) ($order->customer?->name ?? ''),
            'phone' => (string) ($order->customer?->phone ?? ''),
            'orderid' => (string) $order->id,
            'orderstatus' => (string) $order->order_status,
            'receiptstatus' => (string) $order->receipt_status,
            'branch' => (string) ($order->pickupLocation?->name ?? ''),
            'branchaddress' => (string) ($order->pickupLocation?->address ?? ''),
            'pickupdate' => (string) ($order->pickup_date?->toDateString() ?? ''),
            'trackinglink' => (string) route('orders.track', $order->tracking_token),
            'total' => number_format((float) $order->total_amount, 2, '.', ''),
            'itemid' => (string) ($itemIds->first() ?? ''),
            'itemids' => $itemIds->implode(','),
            'itemlist' => $this->buildItemList($order),
            'itemcount' => (string) $order->items->sum('quantity'),
            'disapprovalreason' => (string) ($order->disapproval_reason ?? ''),
        ];
    }

    /**
     * List available templates for UI usage.
     *
     * @return array<int, array{id?: int, key: string, label: string, body: string, is_active: bool}>
     */
    public function templates(bool $includeInactive = false): array
    {
        $configured = $this->configuredTemplates();

        if (! Schema::hasTable('sms_templates')) {
            return array_values(array_filter(array_map(function (array $template) use ($includeInactive): ?array {
                if (! $includeInactive && ! $template['is_active']) {
                    return null;
                }

                return [
                    'key' => $template['key'],
                    'label' => $template['label'],
                    'body' => $template['body'],
                    'is_active' => $template['is_active'],
                ];
            }, $configured)));
        }

        $this->syncDefaultTemplates();

        $query = SmsTemplate::query()->orderBy('key');

        if (! $includeInactive) {
            $query->where('is_active', true);
        }

        return $query
            ->get()
            ->map(fn (SmsTemplate $template) => [
                'id' => $template->id,
                'key' => $template->key,
                'label' => $template->label,
                'body' => $template->body,
                'is_active' => (bool) $template->is_active,
            ])->all();
    }

    /**
     * Sync configured defaults into DB if missing.
     */
    public function syncDefaultTemplates(): void
    {
        if (! Schema::hasTable('sms_templates')) {
            return;
        }

        foreach ($this->configuredTemplates() as $template) {
            SmsTemplate::query()->firstOrCreate(
                ['key' => $template['key']],
                [
                    'label' => $template['label'],
                    'body' => $template['body'],
                    'is_active' => $template['is_active'],
                ],
            );
        }
    }

    /**
     * List available placeholders for UI hints.
     *
     * @return array<int, array{token: string, description: string}>
     */
    public function placeholders(): array
    {
        $placeholders = config('sms.placeholders', []);

        if (! is_array($placeholders)) {
            return [];
        }

        $output = [];

        foreach ($placeholders as $token => $description) {
            $output[] = [
                'token' => (string) $token,
                'description' => (string) $description,
            ];
        }

        return $output;
    }

    /**
     * Convert values to safe SMS strings.
     */
    protected function stringify(mixed $value): string
    {
        if ($value === null) {
            return '';
        }

        if (is_bool($value)) {
            return $value ? 'true' : 'false';
        }

        if (is_scalar($value)) {
            return trim((string) $value);
        }

        return '';
    }

    /**
     * Resolve a configured template body by key.
     */
    protected function templateBody(string $templateKey): string
    {
        if (Schema::hasTable('sms_templates')) {
            $this->syncDefaultTemplates();

            $template = SmsTemplate::query()
                ->where('key', $templateKey)
                ->where('is_active', true)
                ->first();

            if ($template && trim((string) $template->body) !== '') {
                return (string) $template->body;
            }
        }

        $template = config("sms.templates.{$templateKey}.body");

        return is_string($template) ? $template : '';
    }

    /**
     * Normalize configured templates from config file.
     *
     * @return array<int, array{key: string, label: string, body: string, is_active: bool}>
     */
    protected function configuredTemplates(): array
    {
        $templates = config('sms.templates', []);

        if (! is_array($templates)) {
            return [];
        }

        $output = [];

        foreach ($templates as $key => $template) {
            if (! is_array($template)) {
                continue;
            }

            $body = trim((string) ($template['body'] ?? ''));

            if ($body === '') {
                continue;
            }

            $output[] = [
                'key' => (string) $key,
                'label' => (string) ($template['label'] ?? $key),
                'body' => $body,
                'is_active' => true,
            ];
        }

        return $output;
    }

    /**
     * Fallback order placeholders when no order is available.
     *
     * @return array<string, string>
     */
    protected function emptyOrderVariables(): array
    {
        return [
            'orderid' => '',
            'orderstatus' => '',
            'receiptstatus' => '',
            'branch' => '',
            'branchaddress' => '',
            'pickupdate' => '',
            'trackinglink' => '',
            'total' => '',
            'itemid' => '',
            'itemids' => '',
            'itemlist' => '',
            'itemcount' => '',
            'disapprovalreason' => '',
        ];
    }

    /**
     * Resolve latest known order for this customer.
     */
    protected function resolveRecentOrder(Customer $customer, ?Order $order = null): ?Order
    {
        if ($order) {
            $order->loadMissing(['pickupLocation', 'items.menuItem']);

            return $order;
        }

        $latestOrder = $customer->orders()
            ->with(['pickupLocation', 'items.menuItem'])
            ->latest()
            ->first();

        return $latestOrder instanceof Order ? $latestOrder : null;
    }

    /**
     * Determine the most recent item name from the latest order.
     */
    protected function resolveRecentItem(?Order $order): string
    {
        if (! $order) {
            return '';
        }

        $topItem = $order->items
            ->sort(function (OrderItem $left, OrderItem $right): int {
                $quantityComparison = (int) $right->quantity <=> (int) $left->quantity;

                if ($quantityComparison !== 0) {
                    return $quantityComparison;
                }

                return (int) $right->id <=> (int) $left->id;
            })
            ->first();

        if (! $topItem) {
            return '';
        }

        return (string) ($topItem->menuItem?->name ?? ('Item #'.$topItem->menu_item_id));
    }

    /**
     * Determine most frequently purchased item name for the customer.
     */
    protected function resolveFrequentItem(Customer $customer): string
    {
        $row = OrderItem::query()
            ->selectRaw(
                'menu_items.name as item_name, order_items.menu_item_id as menu_item_id, SUM(order_items.quantity) as total_quantity, MAX(orders.created_at) as latest_purchase_at',
            )
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->leftJoin('menu_items', 'menu_items.id', '=', 'order_items.menu_item_id')
            ->where('orders.customer_id', $customer->id)
            ->groupBy('order_items.menu_item_id', 'menu_items.name')
            ->orderByDesc('total_quantity')
            ->orderByDesc('latest_purchase_at')
            ->limit(1)
            ->first();

        if (! $row) {
            return '';
        }

        if ($row->item_name) {
            return (string) $row->item_name;
        }

        return (string) ('Item #'.$row->menu_item_id);
    }

    /**
     * Determine branch most frequently used by the customer.
     */
    protected function resolveFrequentBranch(Customer $customer): string
    {
        $row = DB::table('orders')
            ->selectRaw('pickup_locations.name as branch_name, COUNT(orders.id) as total_orders, MAX(orders.created_at) as latest_order_at')
            ->leftJoin('pickup_locations', 'pickup_locations.id', '=', 'orders.pickup_location_id')
            ->where('orders.customer_id', $customer->id)
            ->groupBy('orders.pickup_location_id', 'pickup_locations.name')
            ->orderByDesc('total_orders')
            ->orderByDesc('latest_order_at')
            ->limit(1)
            ->first();

        return $row ? (string) ($row->branch_name ?? '') : '';
    }

    /**
     * Build concise item summary text for SMS.
     */
    protected function buildItemList(Order $order): string
    {
        return $order->items
            ->map(fn (OrderItem $item) => trim(sprintf(
                '%s x%s',
                $item->menuItem?->name ?? ('Item #'.$item->menu_item_id),
                (string) $item->quantity,
            )))
            ->implode(', ');
    }
}
