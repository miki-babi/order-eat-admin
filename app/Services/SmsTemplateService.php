<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\SmsTemplate;
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
        return array_merge(
            $this->emptyOrderVariables(),
            [
                'name' => (string) ($customer->name ?? ''),
                'phone' => (string) ($customer->phone ?? ''),
            ],
            $order ? $this->variablesForOrder($order) : [],
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
