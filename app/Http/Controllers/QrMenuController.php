<?php

namespace App\Http\Controllers;

use App\Http\Requests\Orders\StoreQrTableOrderRequest;
use App\Models\Customer;
use App\Models\DiningTable;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\TableSession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class QrMenuController extends Controller
{
    /**
     * Render the QR menu page and create/reuse a session token for this table.
     */
    public function show(Request $request, DiningTable $diningTable): Response|RedirectResponse
    {
        $diningTable->loadMissing('pickupLocation');

        if (! $diningTable->is_active || ! $diningTable->pickupLocation?->is_active) {
            abort(404);
        }

        $search = trim((string) $request->input('search', ''));
        $category = $request->input('category');
        $queryToken = $request->query('session');
        $sessionToken = is_string($queryToken) ? trim($queryToken) : '';

        $tableSession = $sessionToken !== ''
            ? TableSession::query()
                ->where('dining_table_id', $diningTable->id)
                ->where('session_token', $sessionToken)
                ->first()
            : null;

        if (! $tableSession) {
            $tableSession = TableSession::query()->create([
                'dining_table_id' => $diningTable->id,
                'session_token' => Str::random(64),
                'started_at' => now(),
                'last_seen_at' => now(),
                'initial_ip' => $request->ip(),
                'initial_user_agent' => substr((string) $request->userAgent(), 0, 65535),
            ]);
        } else {
            $tableSession->update([
                'last_seen_at' => now(),
            ]);
        }

        if ($sessionToken !== $tableSession->session_token) {
            return to_route('qr-menu.show', [
                'diningTable' => $diningTable->qr_code,
                'session' => $tableSession->session_token,
            ]);
        }

        $menuItems = MenuItem::query()
            ->where('is_active', true)
            ->visibleIn(MenuItem::CHANNEL_QR_MENU)
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
            ->visibleIn(MenuItem::CHANNEL_QR_MENU)
            ->whereNotNull('category')
            ->orderBy('category')
            ->distinct()
            ->pluck('category')
            ->values();

        return Inertia::render('customer/qr-menu', [
            'menuItems' => $menuItems,
            'categories' => $categories,
            'table' => [
                'id' => $diningTable->id,
                'name' => $diningTable->name,
                'qr_code' => $diningTable->qr_code,
                'pickup_location' => [
                    'id' => $diningTable->pickupLocation?->id,
                    'name' => $diningTable->pickupLocation?->name,
                    'address' => $diningTable->pickupLocation?->address,
                ],
            ],
            'tableSession' => [
                'token' => $tableSession->session_token,
                'started_at' => $tableSession->started_at?->toDateTimeString(),
                'last_seen_at' => $tableSession->last_seen_at?->toDateTimeString(),
                'verified_at' => $tableSession->verified_at?->toDateTimeString(),
                'is_verified' => $tableSession->verified_at !== null,
            ],
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
            'staffRoute' => $request->user()?->canAccessStaffPanel() ? route('staff.orders.index') : null,
        ]);
    }

    /**
     * Store a table-scoped QR order and bind it to a session.
     *
     * @throws ValidationException
     */
    public function store(
        StoreQrTableOrderRequest $request,
        DiningTable $diningTable,
    ): RedirectResponse {
        $diningTable->loadMissing('pickupLocation');

        if (! $diningTable->is_active || ! $diningTable->pickupLocation?->is_active) {
            abort(404);
        }

        $validated = $request->validated();

        $tableSession = TableSession::query()
            ->where('session_token', $validated['table_session_token'])
            ->firstOrFail();

        if ($tableSession->dining_table_id !== $diningTable->id) {
            throw ValidationException::withMessages([
                'table_session_token' => 'Session token is invalid for this table.',
            ]);
        }

        $items = collect($validated['items']);
        $menuItemIds = $items->pluck('menu_item_id')->unique()->values();

        $menuItems = MenuItem::query()
            ->where('is_active', true)
            ->visibleIn(MenuItem::CHANNEL_QR_MENU)
            ->whereIn('id', $menuItemIds)
            ->get()
            ->keyBy('id');

        if ($menuItems->count() !== $menuItemIds->count()) {
            throw ValidationException::withMessages([
                'items' => 'One or more selected menu items are unavailable for QR ordering.',
            ]);
        }

        $customer = $this->resolveQrSessionCustomer($diningTable, $tableSession);

        $order = DB::transaction(function () use ($items, $menuItems, $customer, $diningTable, $tableSession): Order {
            $order = $customer->orders()->create([
                'pickup_date' => now()->toDateString(),
                'pickup_location_id' => $diningTable->pickup_location_id,
                'dining_table_id' => $diningTable->id,
                'table_session_id' => $tableSession->id,
                'source_channel' => Order::SOURCE_TABLE,
                'receipt_status' => 'pending',
                'order_status' => 'pending',
                'tracking_token' => Str::random(40),
                'total_amount' => $items->sum(
                    fn (array $item) => (float) $menuItems[$item['menu_item_id']]->price * (int) $item['quantity'],
                ),
                'notify_when_ready' => false,
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

        $tableSession->update([
            'last_seen_at' => now(),
        ]);

        return to_route('orders.confirmation', $order->tracking_token);
    }

    /**
     * Resolve an internal customer profile for QR-session-origin orders.
     */
    protected function resolveQrSessionCustomer(DiningTable $diningTable, TableSession $tableSession): Customer
    {
        $syntheticPhone = 'q'.substr(sha1($tableSession->session_token), 0, 19);

        return Customer::query()->updateOrCreate(
            ['phone' => $syntheticPhone],
            ['name' => "Table {$diningTable->name} Guest"],
        );
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
