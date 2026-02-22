<?php

namespace Database\Seeders;

use App\Models\BranchScreen;
use App\Models\Customer;
use App\Models\CustomerToken;
use App\Models\DiningTable;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderScreenStatus;
use App\Models\PickupLocation;
use App\Models\SmsLog;
use App\Models\SmsPhoneList;
use App\Models\TableSession;
use App\Models\User;
use App\Services\FeatureToggleService;
use App\Services\SmsNotificationService;
use App\Services\SmsTemplateService;
use Illuminate\Database\Seeder;

class MySqlBootstrapSeeder extends Seeder
{
    /**
     * Seed a richer operational dataset for MySQL bootstrapping.
     */
    public function run(): void
    {
        $this->call(DatabaseSeeder::class);
        $this->syncConfigBackedDefaults();

        $customers = $this->seedCustomersWithTokens();
        $this->seedOperationalOrders($customers);
        $this->seedMessagingFixtures($customers);
    }

    protected function syncConfigBackedDefaults(): void
    {
        app(SmsTemplateService::class)->syncDefaultTemplates();
        app(SmsNotificationService::class)->syncDefaultSettings();
        app(FeatureToggleService::class)->syncDefaultSettings();
    }

    /**
     * @return array<string, Customer>
     */
    protected function seedCustomersWithTokens(): array
    {
        $now = now();

        $definitions = [
            'aden_web' => [
                'name' => 'Aden Tesfaye',
                'phone' => '251911000111',
                'telegram_id' => null,
                'telegram_username' => null,
                'last_seen_channel' => Order::SOURCE_WEB,
            ],
            'selam_web' => [
                'name' => 'Selam Mekonnen',
                'phone' => '251911000222',
                'telegram_id' => null,
                'telegram_username' => null,
                'last_seen_channel' => Order::SOURCE_WEB,
            ],
            'liya_telegram' => [
                'name' => 'Liya Bekele',
                'phone' => '251911000333',
                'telegram_id' => 9101001,
                'telegram_username' => 'liya_order',
                'last_seen_channel' => Order::SOURCE_TELEGRAM,
            ],
            'yonas_telegram' => [
                'name' => 'Yonas Alemu',
                'phone' => '251911000444',
                'telegram_id' => 9101002,
                'telegram_username' => 'yonas_pickup',
                'last_seen_channel' => Order::SOURCE_TELEGRAM,
            ],
            'table_bole_guest' => [
                'name' => 'Table Bole Guest',
                'phone' => 'qaaaaaaaaaaaaaaaaaaa',
                'telegram_id' => null,
                'telegram_username' => null,
                'last_seen_channel' => Order::SOURCE_TABLE,
            ],
            'table_piassa_guest' => [
                'name' => 'Table Piassa Guest',
                'phone' => 'qbbbbbbbbbbbbbbbbbbb',
                'telegram_id' => null,
                'telegram_username' => null,
                'last_seen_channel' => Order::SOURCE_TABLE,
            ],
        ];

        $seededCustomers = [];

        foreach ($definitions as $key => $definition) {
            $customer = Customer::query()->updateOrCreate(
                ['phone' => $definition['phone']],
                [
                    'name' => $definition['name'],
                    'telegram_id' => $definition['telegram_id'],
                    'telegram_username' => $definition['telegram_username'],
                ],
            );

            $token = 'mysql_seed_customer_token_'.$key;

            CustomerToken::query()->updateOrCreate(
                ['token' => $token],
                [
                    'customer_id' => $customer->id,
                    'first_seen_at' => $now->copy()->subDays(14),
                    'last_seen_at' => $now,
                    'last_seen_channel' => $definition['last_seen_channel'],
                    'last_seen_user_agent' => 'mysql-bootstrap-seeder',
                    'last_seen_ip' => '127.0.0.1',
                ],
            );

            $seededCustomers[$key] = $customer;
        }

        return $seededCustomers;
    }

    /**
     * @param  array<string, Customer>  $customers
     */
    protected function seedOperationalOrders(array $customers): void
    {
        $pickupLocations = PickupLocation::query()
            ->whereIn('name', ['Bole Branch', 'Piassa Branch'])
            ->get()
            ->keyBy('name');

        if ($pickupLocations->isEmpty()) {
            return;
        }

        $menuItems = MenuItem::query()
            ->whereIn('name', [
                'Cappuccino',
                'Iced Latte',
                'Butter Croissant',
                'Blueberry Muffin',
                'Avocado Toast',
            ])
            ->get()
            ->keyBy('name');

        if ($menuItems->isEmpty()) {
            return;
        }

        $tables = DiningTable::query()
            ->whereIn('qr_code', ['bole-table-01', 'piassa-table-01'])
            ->get()
            ->keyBy('qr_code');

        $staffActor = User::query()
            ->whereIn('email', ['manager@example.com', 'admin@example.com'])
            ->orderByRaw("CASE WHEN email = 'manager@example.com' THEN 0 ELSE 1 END")
            ->first();

        $tableSessions = $this->seedTableSessions($tables, $staffActor?->id);

        $definitions = [
            [
                'key' => 'web_pending_bole',
                'customer_key' => 'aden_web',
                'pickup_location' => 'Bole Branch',
                'pickup_date' => now()->toDateString(),
                'source_channel' => Order::SOURCE_WEB,
                'waiter_status' => Order::WAITER_STATUS_PENDING_CONFIRMATION,
                'order_status' => 'pending',
                'receipt_status' => 'pending',
                'notify_when_ready' => false,
                'disapproval_reason' => null,
                'receipt_url' => null,
                'table_qr' => null,
                'table_session_key' => null,
                'kitchen_mode' => null,
                'items' => [
                    'Cappuccino' => 2,
                    'Butter Croissant' => 1,
                ],
            ],
            [
                'key' => 'web_disapproved_piassa',
                'customer_key' => 'selam_web',
                'pickup_location' => 'Piassa Branch',
                'pickup_date' => now()->addDay()->toDateString(),
                'source_channel' => Order::SOURCE_WEB,
                'waiter_status' => Order::WAITER_STATUS_PENDING_CONFIRMATION,
                'order_status' => 'pending',
                'receipt_status' => 'disapproved',
                'notify_when_ready' => false,
                'disapproval_reason' => 'Receipt image was blurred. Please re-upload.',
                'receipt_url' => 'receipts/mysql-seed-web-disapproved.jpg',
                'table_qr' => null,
                'table_session_key' => null,
                'kitchen_mode' => null,
                'items' => [
                    'Blueberry Muffin' => 2,
                ],
            ],
            [
                'key' => 'telegram_preparing_bole',
                'customer_key' => 'liya_telegram',
                'pickup_location' => 'Bole Branch',
                'pickup_date' => now()->toDateString(),
                'source_channel' => Order::SOURCE_TELEGRAM,
                'waiter_status' => Order::WAITER_STATUS_CONFIRMED,
                'order_status' => 'preparing',
                'receipt_status' => 'approved',
                'notify_when_ready' => true,
                'disapproval_reason' => null,
                'receipt_url' => 'receipts/mysql-seed-telegram-preparing.jpg',
                'table_qr' => null,
                'table_session_key' => null,
                'kitchen_mode' => 'mixed',
                'items' => [
                    'Iced Latte' => 1,
                    'Avocado Toast' => 1,
                ],
            ],
            [
                'key' => 'telegram_ready_bole',
                'customer_key' => 'yonas_telegram',
                'pickup_location' => 'Bole Branch',
                'pickup_date' => now()->addDay()->toDateString(),
                'source_channel' => Order::SOURCE_TELEGRAM,
                'waiter_status' => Order::WAITER_STATUS_CONFIRMED,
                'order_status' => 'ready',
                'receipt_status' => 'approved',
                'notify_when_ready' => true,
                'disapproval_reason' => null,
                'receipt_url' => 'receipts/mysql-seed-telegram-ready.jpg',
                'table_qr' => null,
                'table_session_key' => null,
                'kitchen_mode' => 'prepared',
                'items' => [
                    'Cappuccino' => 1,
                    'Avocado Toast' => 1,
                ],
            ],
            [
                'key' => 'table_preparing_bole',
                'customer_key' => 'table_bole_guest',
                'pickup_location' => 'Bole Branch',
                'pickup_date' => now()->toDateString(),
                'source_channel' => Order::SOURCE_TABLE,
                'waiter_status' => Order::WAITER_STATUS_CONFIRMED,
                'order_status' => 'preparing',
                'receipt_status' => 'pending',
                'notify_when_ready' => false,
                'disapproval_reason' => null,
                'receipt_url' => null,
                'table_qr' => 'bole-table-01',
                'table_session_key' => 'bole_live',
                'kitchen_mode' => 'pending',
                'items' => [
                    'Butter Croissant' => 1,
                    'Cappuccino' => 1,
                ],
            ],
            [
                'key' => 'table_served_piassa',
                'customer_key' => 'table_piassa_guest',
                'pickup_location' => 'Piassa Branch',
                'pickup_date' => now()->toDateString(),
                'source_channel' => Order::SOURCE_TABLE,
                'waiter_status' => Order::WAITER_STATUS_SERVED,
                'order_status' => 'completed',
                'receipt_status' => 'approved',
                'notify_when_ready' => false,
                'disapproval_reason' => null,
                'receipt_url' => 'receipts/mysql-seed-table-served.jpg',
                'table_qr' => 'piassa-table-01',
                'table_session_key' => 'piassa_live',
                'kitchen_mode' => 'prepared',
                'items' => [
                    'Iced Latte' => 1,
                    'Blueberry Muffin' => 1,
                ],
            ],
        ];

        foreach ($definitions as $definition) {
            $customer = $customers[$definition['customer_key']] ?? null;
            $pickupLocation = $pickupLocations->get($definition['pickup_location']);

            if (! $customer || ! $pickupLocation instanceof PickupLocation) {
                continue;
            }

            $table = is_string($definition['table_qr'] ?? null)
                ? $tables->get((string) $definition['table_qr'])
                : null;
            $tableSession = is_string($definition['table_session_key'] ?? null)
                ? ($tableSessions[(string) $definition['table_session_key']] ?? null)
                : null;

            $waiterStatus = (string) $definition['waiter_status'];
            $waiterConfirmedAt = in_array($waiterStatus, [
                Order::WAITER_STATUS_CONFIRMED,
                Order::WAITER_STATUS_SERVED,
            ], true) ? now()->subMinutes(25) : null;
            $servedAt = $waiterStatus === Order::WAITER_STATUS_SERVED ? now()->subMinutes(8) : null;

            $trackingToken = $this->trackingToken((string) $definition['key']);

            $order = Order::query()->updateOrCreate(
                ['tracking_token' => $trackingToken],
                [
                    'customer_id' => $customer->id,
                    'pickup_date' => (string) $definition['pickup_date'],
                    'pickup_location_id' => $pickupLocation->id,
                    'dining_table_id' => $table?->id,
                    'table_session_id' => $tableSession?->id,
                    'source_channel' => (string) $definition['source_channel'],
                    'waiter_status' => $waiterStatus,
                    'waiter_confirmed_at' => $waiterConfirmedAt,
                    'served_at' => $servedAt,
                    'receipt_url' => $definition['receipt_url'],
                    'receipt_status' => (string) $definition['receipt_status'],
                    'order_status' => (string) $definition['order_status'],
                    'disapproval_reason' => $definition['disapproval_reason'],
                    'notify_when_ready' => (bool) $definition['notify_when_ready'],
                    'total_amount' => 0,
                ],
            );

            $itemLines = $this->resolveOrderItemLines((array) $definition['items'], $menuItems);
            $totalAmount = $this->syncOrderItems($order, $itemLines);

            $order->update([
                'total_amount' => $totalAmount,
            ]);

            $this->syncKitchenStatuses(
                $order,
                $itemLines,
                is_string($definition['kitchen_mode']) ? $definition['kitchen_mode'] : null,
                $staffActor?->id,
            );
        }
    }

    /**
     * @param  \Illuminate\Support\Collection<int, DiningTable>  $tables
     * @return array<string, TableSession>
     */
    protected function seedTableSessions($tables, ?int $verifiedByUserId): array
    {
        $definitions = [
            'bole_live' => [
                'table_qr' => 'bole-table-01',
                'session_token' => 'mysql_seed_table_session_bole_live',
            ],
            'piassa_live' => [
                'table_qr' => 'piassa-table-01',
                'session_token' => 'mysql_seed_table_session_piassa_live',
            ],
        ];

        $sessions = [];

        foreach ($definitions as $key => $definition) {
            $table = $tables->get($definition['table_qr']);

            if (! $table instanceof DiningTable) {
                continue;
            }

            $session = TableSession::query()->updateOrCreate(
                ['session_token' => $definition['session_token']],
                [
                    'dining_table_id' => $table->id,
                    'started_at' => now()->subHours(6),
                    'last_seen_at' => now()->subMinutes(7),
                    'verified_at' => now()->subHours(5),
                    'verified_by_user_id' => $verifiedByUserId,
                    'initial_ip' => '127.0.0.1',
                    'initial_user_agent' => 'mysql-bootstrap-seeder',
                    'verified_note' => 'Seeded demo table session',
                ],
            );

            $sessions[$key] = $session;
        }

        return $sessions;
    }

    /**
     * @param  array<string, int>  $items
     * @param  \Illuminate\Support\Collection<int, MenuItem>  $menuItems
     * @return array<int, array{menu_item_id: int, quantity: int, price: float}>
     */
    protected function resolveOrderItemLines(array $items, $menuItems): array
    {
        $lines = [];

        foreach ($items as $menuItemName => $quantity) {
            $menuItem = $menuItems->get((string) $menuItemName);

            if (! $menuItem instanceof MenuItem) {
                continue;
            }

            $qty = max(1, (int) $quantity);

            $lines[] = [
                'menu_item_id' => $menuItem->id,
                'quantity' => $qty,
                'price' => (float) $menuItem->price,
            ];
        }

        return $lines;
    }

    /**
     * @param  array<int, array{menu_item_id: int, quantity: int, price: float}>  $lines
     */
    protected function syncOrderItems(Order $order, array $lines): float
    {
        if ($lines === []) {
            $order->items()->delete();

            return 0.0;
        }

        $menuItemIds = array_map(
            static fn (array $line): int => (int) $line['menu_item_id'],
            $lines,
        );

        $order->items()
            ->whereNotIn('menu_item_id', $menuItemIds)
            ->delete();

        $total = 0.0;

        foreach ($lines as $line) {
            $quantity = (int) $line['quantity'];
            $price = (float) $line['price'];

            $order->items()->updateOrCreate(
                ['menu_item_id' => $line['menu_item_id']],
                [
                    'quantity' => $quantity,
                    'price' => $price,
                ],
            );

            $total += $quantity * $price;
        }

        return round($total, 2);
    }

    /**
     * @param  array<int, array{menu_item_id: int, quantity: int, price: float}>  $itemLines
     */
    protected function syncKitchenStatuses(
        Order $order,
        array $itemLines,
        ?string $mode,
        ?int $updatedByUserId,
    ): void {
        if (! in_array($order->waiter_status, [
            Order::WAITER_STATUS_CONFIRMED,
            Order::WAITER_STATUS_SERVED,
        ], true)) {
            $order->screenStatuses()->delete();

            return;
        }

        if ($itemLines === []) {
            $order->screenStatuses()->delete();

            return;
        }

        $menuItemIds = array_values(array_unique(array_map(
            static fn (array $line): int => $line['menu_item_id'],
            $itemLines,
        )));

        $kitchenScreenIds = BranchScreen::query()
            ->where('pickup_location_id', $order->pickup_location_id)
            ->where('screen_type', BranchScreen::TYPE_KITCHEN)
            ->where('is_active', true)
            ->whereHas('menuItems', fn ($query) => $query->whereIn('menu_items.id', $menuItemIds))
            ->orderBy('id')
            ->pluck('id')
            ->map(fn ($id): int => (int) $id)
            ->values()
            ->all();

        if ($kitchenScreenIds === []) {
            $order->screenStatuses()->delete();

            return;
        }

        $order->screenStatuses()
            ->whereNotIn('branch_screen_id', $kitchenScreenIds)
            ->delete();

        foreach ($kitchenScreenIds as $index => $screenId) {
            $status = $this->kitchenStatusForMode($order->waiter_status, $mode, $index);
            $timestamps = $this->kitchenTimestamps($status);

            OrderScreenStatus::query()->updateOrCreate(
                [
                    'order_id' => $order->id,
                    'branch_screen_id' => $screenId,
                ],
                [
                    'status' => $status,
                    'preparing_started_at' => $timestamps['preparing_started_at'],
                    'prepared_at' => $timestamps['prepared_at'],
                    'updated_by_user_id' => $updatedByUserId,
                ],
            );
        }
    }

    protected function kitchenStatusForMode(string $waiterStatus, ?string $mode, int $index): string
    {
        if ($waiterStatus === Order::WAITER_STATUS_SERVED) {
            return OrderScreenStatus::STATUS_PREPARED;
        }

        return match ($mode) {
            'prepared' => OrderScreenStatus::STATUS_PREPARED,
            'preparing' => OrderScreenStatus::STATUS_PREPARING,
            'mixed' => $index === 0
                ? OrderScreenStatus::STATUS_PREPARED
                : OrderScreenStatus::STATUS_PREPARING,
            default => OrderScreenStatus::STATUS_PENDING,
        };
    }

    /**
     * @return array{preparing_started_at: \Illuminate\Support\Carbon|null, prepared_at: \Illuminate\Support\Carbon|null}
     */
    protected function kitchenTimestamps(string $status): array
    {
        if ($status === OrderScreenStatus::STATUS_PREPARED) {
            return [
                'preparing_started_at' => now()->subMinutes(16),
                'prepared_at' => now()->subMinutes(4),
            ];
        }

        if ($status === OrderScreenStatus::STATUS_PREPARING) {
            return [
                'preparing_started_at' => now()->subMinutes(11),
                'prepared_at' => null,
            ];
        }

        return [
            'preparing_started_at' => null,
            'prepared_at' => null,
        ];
    }

    /**
     * @param  array<string, Customer>  $customers
     */
    protected function seedMessagingFixtures(array $customers): void
    {
        SmsPhoneList::query()->updateOrCreate(
            [
                'normalized_phone' => '251911000333',
                'list_type' => 'whitelist',
            ],
            [
                'phone' => '251911000333',
                'note' => 'VIP repeat customer',
            ],
        );

        SmsPhoneList::query()->updateOrCreate(
            [
                'normalized_phone' => '251911999999',
                'list_type' => 'blacklist',
            ],
            [
                'phone' => '251911999999',
                'note' => 'Opted out from promotions',
            ],
        );

        $liya = $customers['liya_telegram'] ?? null;
        $selam = $customers['selam_web'] ?? null;

        if ($liya instanceof Customer) {
            SmsLog::query()->updateOrCreate(
                [
                    'phone' => $liya->phone,
                    'message' => 'MySQL seed: Your order is being prepared.',
                ],
                [
                    'customer_id' => $liya->id,
                    'status' => 'sent',
                    'provider_response' => 'Seeded demo success',
                    'sent_at' => now()->subHours(2),
                ],
            );
        }

        if ($selam instanceof Customer) {
            SmsLog::query()->updateOrCreate(
                [
                    'phone' => $selam->phone,
                    'message' => 'MySQL seed: Receipt disapproved. Please re-upload.',
                ],
                [
                    'customer_id' => $selam->id,
                    'status' => 'failed',
                    'provider_response' => 'Seeded demo failure',
                    'sent_at' => now()->subHour(),
                ],
            );
        }
    }

    protected function trackingToken(string $key): string
    {
        return substr(hash('sha256', 'mysql-bootstrap:'.$key), 0, 40);
    }
}
