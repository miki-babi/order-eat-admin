<?php

namespace Modules\SystemAdmin\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\FeatureToggle;
use App\Models\Order;
use App\Models\SmsLog;
use App\Models\TableSession;
use App\Services\FeatureToggleService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class SystemAdminDashboardController extends Controller
{
    /**
     * Hidden dashboard for system-level feature and activity controls.
     */
    public function index(FeatureToggleService $featureToggleService): Response
    {
        $configuredFeatures = collect($featureToggleService->configuredFeatures())->keyBy('feature_key');
        $configuredGroups = $featureToggleService->configuredGroups();

        $allFeatures = $featureToggleService->allForDashboard()
            ->map(function (FeatureToggle $featureToggle) use ($configuredFeatures): array {
                $configured = $configuredFeatures->get($featureToggle->feature_key, []);
                $configuredName = is_array($configured) ? (string) ($configured['name'] ?? '') : '';
                $configuredDescription = is_array($configured) ? (string) ($configured['description'] ?? '') : '';
                $configuredGroup = is_array($configured) ? (string) ($configured['group_key'] ?? 'ungrouped') : 'ungrouped';
                $configuredHelpUrl = is_array($configured) ? (string) ($configured['help_url'] ?? '') : '';

                return [
                    'id' => $featureToggle->id,
                    'feature_key' => $featureToggle->feature_key,
                    'name' => $featureToggle->name ?: ($configuredName !== '' ? $configuredName : $featureToggle->feature_key),
                    'description' => $featureToggle->description ?: $configuredDescription,
                    'is_enabled' => (bool) $featureToggle->is_enabled,
                    'lock_message' => $featureToggle->lock_message,
                    'help_url' => $featureToggle->help_url ?: ($configuredHelpUrl !== '' ? $configuredHelpUrl : null),
                    'group_key' => $configuredGroup !== '' ? $configuredGroup : 'ungrouped',
                    'last_toggled_at' => $featureToggle->last_toggled_at?->toDateTimeString(),
                    'last_toggled_by' => $featureToggle->lastToggledBy
                        ? [
                            'id' => $featureToggle->lastToggledBy->id,
                            'name' => $featureToggle->lastToggledBy->name,
                            'email' => $featureToggle->lastToggledBy->email,
                        ]
                        : null,
                ];
            })
            ->values();

        $groupedFeatures = collect($configuredGroups)
            ->map(function (array $group, string $groupKey) use ($allFeatures): array {
                return [
                    'key' => $groupKey,
                    'name' => $group['name'],
                    'description' => $group['description'],
                    'features' => $allFeatures
                        ->filter(fn (array $feature) => $feature['group_key'] === $groupKey)
                        ->values()
                        ->all(),
                ];
            })
            ->filter(fn (array $group) => count($group['features']) > 0)
            ->values();

        $ungroupedFeatures = $allFeatures
            ->filter(fn (array $feature) => ! array_key_exists($feature['group_key'], $configuredGroups))
            ->values();

        if ($ungroupedFeatures->isNotEmpty()) {
            $groupedFeatures->push([
                'key' => 'ungrouped',
                'name' => 'Ungrouped',
                'description' => 'Features not mapped to an explicit group.',
                'features' => $ungroupedFeatures->all(),
            ]);
        }

        $cutoff = now()->subDay();

        return Inertia::render('system-admin/dashboard', [
            'features' => $allFeatures,
            'featureGroups' => $groupedFeatures->all(),
            'summary' => [
                'orders_last_24h' => Order::query()->where('created_at', '>=', $cutoff)->count(),
                'customers_last_24h' => Customer::query()->where('created_at', '>=', $cutoff)->count(),
                'sms_last_24h' => SmsLog::query()->where('created_at', '>=', $cutoff)->count(),
                'table_sessions_last_24h' => TableSession::query()->where('last_seen_at', '>=', $cutoff)->count(),
            ],
            'activity' => $this->recentActivityFeed($featureToggleService),
            'logLines' => $this->recentLogLines(storage_path('logs/laravel.log'), 180),
        ]);
    }

    /**
     * Update a feature lock state.
     */
    public function updateFeature(
        Request $request,
        FeatureToggle $featureToggle,
        FeatureToggleService $featureToggleService,
    ): RedirectResponse {
        $validated = $request->validate([
            'is_enabled' => ['required', 'boolean'],
            'lock_message' => ['nullable', 'string', 'max:500'],
            'help_url' => ['nullable', 'url', 'max:2048'],
        ]);

        $featureToggleService->update(
            featureToggle: $featureToggle,
            isEnabled: (bool) $validated['is_enabled'],
            lockMessage: is_string($validated['lock_message'] ?? null) ? $validated['lock_message'] : null,
            helpUrl: is_string($validated['help_url'] ?? null) ? $validated['help_url'] : null,
            actor: $request->user(),
        );

        return back()->with('success', 'Feature toggle updated.');
    }

    /**
     * Build a mixed activity feed from feature audits and operational records.
     *
     * @return array<int, array<string, string|null>>
     */
    protected function recentActivityFeed(FeatureToggleService $featureToggleService): array
    {
        $featureEvents = $featureToggleService->recentActivities(30)
            ->map(fn ($activity) => [
                'type' => 'feature_toggle',
                'title' => 'Feature '.str_replace('_', ' ', $activity->action),
                'description' => sprintf(
                    '%s by %s',
                    $activity->featureToggle?->name ?? 'Unknown feature',
                    $activity->actor?->name ?? 'System',
                ),
                'occurred_at' => $activity->created_at?->toDateTimeString(),
            ]);

        $orderEvents = Order::query()
            ->latest()
            ->limit(20)
            ->get(['id', 'source_channel', 'order_status', 'receipt_status', 'created_at'])
            ->map(fn (Order $order) => [
                'type' => 'order',
                'title' => "Order #{$order->id} created",
                'description' => sprintf(
                    'Source: %s | Order status: %s | Receipt: %s',
                    $order->source_channel ?: 'web',
                    $order->order_status ?: 'pending',
                    $order->receipt_status ?: 'pending',
                ),
                'occurred_at' => $order->created_at?->toDateTimeString(),
            ]);

        $smsEvents = SmsLog::query()
            ->latest()
            ->limit(20)
            ->get(['id', 'phone', 'status', 'created_at'])
            ->map(fn (SmsLog $smsLog) => [
                'type' => 'sms',
                'title' => "SMS #{$smsLog->id}",
                'description' => sprintf(
                    'Phone: %s | Status: %s',
                    $smsLog->phone,
                    $smsLog->status,
                ),
                'occurred_at' => $smsLog->created_at?->toDateTimeString(),
            ]);

        $sessionEvents = TableSession::query()
            ->latest('last_seen_at')
            ->limit(20)
            ->get(['id', 'dining_table_id', 'verified_at', 'last_seen_at'])
            ->map(fn (TableSession $tableSession) => [
                'type' => 'table_session',
                'title' => "Table session #{$tableSession->id}",
                'description' => sprintf(
                    'Table id: %s | Verified: %s',
                    (string) $tableSession->dining_table_id,
                    $tableSession->verified_at ? 'yes' : 'no',
                ),
                'occurred_at' => $tableSession->last_seen_at?->toDateTimeString(),
            ]);

        return collect()
            ->concat($featureEvents)
            ->concat($orderEvents)
            ->concat($smsEvents)
            ->concat($sessionEvents)
            ->filter(fn (array $event) => is_string($event['occurred_at']) && $event['occurred_at'] !== '')
            ->sortByDesc('occurred_at')
            ->take(80)
            ->values()
            ->all();
    }

    /**
     * Read the last log lines without loading the whole file into memory.
     *
     * @return array<int, string>
     */
    protected function recentLogLines(string $path, int $lineCount = 180): array
    {
        if (! is_readable($path)) {
            return [];
        }

        $size = @filesize($path);

        if (! is_int($size) || $size <= 0) {
            return [];
        }

        $readBytes = min($size, 1024 * 512);

        $handle = @fopen($path, 'rb');

        if (! is_resource($handle)) {
            return [];
        }

        if ($readBytes < $size) {
            fseek($handle, -$readBytes, SEEK_END);
        }

        $buffer = stream_get_contents($handle);
        fclose($handle);

        if (! is_string($buffer) || $buffer === '') {
            return [];
        }

        $lines = preg_split('/\r\n|\r|\n/', trim($buffer));

        if (! is_array($lines)) {
            return [];
        }

        return Collection::make($lines)
            ->filter(fn ($line) => is_string($line) && trim($line) !== '')
            ->take(-$lineCount)
            ->values()
            ->all();
    }
}
