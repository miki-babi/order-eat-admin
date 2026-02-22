<?php

namespace App\Services;

use App\Models\FeatureToggle;
use App\Models\FeatureToggleActivity;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;

class FeatureToggleService
{
    /**
     * In-request cache for enabled state checks.
     *
     * @var array<string, bool>
     */
    protected array $enabledCache = [];

    /**
     * In-request guard to avoid repeated default sync runs.
     */
    protected bool $defaultsSynced = false;

    /**
     * Ensure configured features are present in the database.
     */
    public function syncDefaultSettings(): void
    {
        if ($this->defaultsSynced || ! Schema::hasTable('feature_toggles')) {
            $this->defaultsSynced = true;

            return;
        }

        foreach ($this->configuredFeatures() as $feature) {
            FeatureToggle::query()->firstOrCreate(
                ['feature_key' => $feature['feature_key']],
                [
                    'name' => $feature['name'],
                    'description' => $feature['description'],
                    'is_enabled' => $feature['is_enabled'],
                    'lock_message' => $feature['lock_message'],
                    'help_url' => $feature['help_url'],
                ],
            );
        }

        $this->defaultsSynced = true;
    }

    /**
     * Determine whether a feature is enabled.
     */
    public function isEnabled(string $featureKey): bool
    {
        $key = trim($featureKey);

        if ($key === '' || ! Schema::hasTable('feature_toggles')) {
            return true;
        }

        if (array_key_exists($key, $this->enabledCache)) {
            return $this->enabledCache[$key];
        }

        $feature = FeatureToggle::query()->where('feature_key', $key)->first();

        if (! $feature) {
            $configured = collect($this->configuredFeatures())->firstWhere('feature_key', $key);

            if (! is_array($configured)) {
                $this->enabledCache[$key] = true;

                return true;
            }

            $feature = FeatureToggle::query()->create([
                'feature_key' => $configured['feature_key'],
                'name' => $configured['name'],
                'description' => $configured['description'],
                'is_enabled' => $configured['is_enabled'],
                'lock_message' => $configured['lock_message'],
                'help_url' => $configured['help_url'],
            ]);
        }

        $enabled = (bool) $feature->is_enabled;
        $this->enabledCache[$key] = $enabled;

        return $enabled;
    }

    /**
     * Return lock-screen payload for a given feature key.
     *
     * @return array<string, string|null>
     */
    public function lockPayload(string $featureKey): array
    {
        $key = trim($featureKey);
        $defaultMessage = $this->defaultLockedMessage();
        $supportContact = $this->supportContact();

        if ($key === '' || ! Schema::hasTable('feature_toggles')) {
            return [
                'feature_key' => $key,
                'feature_name' => 'Feature',
                'message' => $defaultMessage,
                'help_url' => null,
                'support_contact' => $supportContact,
            ];
        }

        $feature = FeatureToggle::query()->where('feature_key', $key)->first();

        if ($feature) {
            return [
                'feature_key' => $key,
                'feature_name' => (string) $feature->name,
                'message' => $feature->lock_message ?: $defaultMessage,
                'help_url' => $this->normalizeHelpUrl($feature->help_url),
                'support_contact' => $supportContact,
            ];
        }

        $configured = collect($this->configuredFeatures())->firstWhere('feature_key', $key);
        $name = is_array($configured) ? (string) ($configured['name'] ?? 'Feature') : 'Feature';
        $helpUrl = is_array($configured) ? $this->normalizeHelpUrl($configured['help_url'] ?? null) : null;

        return [
            'feature_key' => $key,
            'feature_name' => $name,
            'message' => $defaultMessage,
            'help_url' => $helpUrl,
            'support_contact' => $supportContact,
        ];
    }

    /**
     * Return all feature rows for dashboard display.
     *
     * @return Collection<int, FeatureToggle>
     */
    public function allForDashboard(): Collection
    {
        $this->syncDefaultSettings();

        if (! Schema::hasTable('feature_toggles')) {
            return collect();
        }

        return FeatureToggle::query()
            ->with('lastToggledBy')
            ->orderBy('name')
            ->get();
    }

    /**
     * Return configured group metadata in declaration order.
     *
     * @return array<string, array{name: string, description: string}>
     */
    public function configuredGroups(): array
    {
        $groups = config('feature-locks.groups', []);

        if (! is_array($groups)) {
            return [];
        }

        $output = [];

        foreach ($groups as $groupKey => $group) {
            if (! is_string($groupKey) || ! is_array($group)) {
                continue;
            }

            $key = trim($groupKey);

            if ($key === '') {
                continue;
            }

            $output[$key] = [
                'name' => (string) ($group['name'] ?? $key),
                'description' => (string) ($group['description'] ?? ''),
            ];
        }

        return $output;
    }

    /**
     * Return recent toggle activity rows.
     *
     * @return Collection<int, FeatureToggleActivity>
     */
    public function recentActivities(int $limit = 40): Collection
    {
        if (! Schema::hasTable('feature_toggle_activities')) {
            return collect();
        }

        return FeatureToggleActivity::query()
            ->with(['featureToggle', 'actor'])
            ->latest()
            ->limit($limit)
            ->get();
    }

    /**
     * Update a feature toggle and record an audit entry.
     */
    public function update(
        FeatureToggle $featureToggle,
        bool $isEnabled,
        ?string $lockMessage,
        ?string $helpUrl,
        ?User $actor,
    ): FeatureToggle {
        $message = $this->normalizeMessage($lockMessage)
            ?? ($featureToggle->lock_message ?: $this->defaultLockedMessage());
        $normalizedHelpUrl = $this->normalizeHelpUrl($helpUrl);

        $previousEnabled = (bool) $featureToggle->is_enabled;
        $previousMessage = (string) ($featureToggle->lock_message ?? '');
        $previousHelpUrl = (string) ($featureToggle->help_url ?? '');
        $normalizedMessage = trim($message);

        $featureToggle->update([
            'is_enabled' => $isEnabled,
            'lock_message' => $normalizedMessage,
            'help_url' => $normalizedHelpUrl,
            'last_toggled_at' => now(),
            'last_toggled_by_user_id' => $actor?->id,
        ]);

        $action = match (true) {
            $previousEnabled !== $isEnabled && $isEnabled === false => 'locked',
            $previousEnabled !== $isEnabled && $isEnabled === true => 'unlocked',
            default => 'message_updated',
        };

        if (
            Schema::hasTable('feature_toggle_activities')
            && ($previousEnabled !== $isEnabled || $previousMessage !== $normalizedMessage || $previousHelpUrl !== (string) ($normalizedHelpUrl ?? ''))
        ) {
            FeatureToggleActivity::query()->create([
                'feature_toggle_id' => $featureToggle->id,
                'actor_user_id' => $actor?->id,
                'action' => $action,
                'previous_enabled' => $previousEnabled,
                'next_enabled' => $isEnabled,
                'message' => $this->buildActivityMessage($normalizedMessage, $normalizedHelpUrl),
            ]);
        }

        $this->enabledCache[$featureToggle->feature_key] = $isEnabled;

        return $featureToggle->fresh(['lastToggledBy']) ?? $featureToggle;
    }

    /**
     * Normalize feature definitions from config.
     *
     * @return array<int, array{
     *     feature_key: string,
     *     group_key: string,
     *     name: string,
     *     description: string,
     *     is_enabled: bool,
     *     lock_message: string,
     *     help_url: string|null
     * }>
     */
    public function configuredFeatures(): array
    {
        $configured = config('feature-locks.features', []);

        if (! is_array($configured)) {
            return [];
        }

        $output = [];

        foreach ($configured as $featureKey => $feature) {
            if (! is_string($featureKey) || ! is_array($feature)) {
                continue;
            }

            $key = trim($featureKey);

            if ($key === '') {
                continue;
            }

            $output[] = [
                'feature_key' => $key,
                'group_key' => (string) ($feature['group'] ?? 'ungrouped'),
                'name' => (string) ($feature['name'] ?? $key),
                'description' => (string) ($feature['description'] ?? ''),
                'is_enabled' => (bool) ($feature['enabled'] ?? true),
                'lock_message' => $this->normalizeMessage($feature['lock_message'] ?? null)
                    ?? $this->defaultLockedMessage(),
                'help_url' => $this->normalizeHelpUrl($feature['help_url'] ?? null),
            ];
        }

        return $output;
    }

    protected function normalizeMessage(mixed $value): ?string
    {
        if (! is_string($value)) {
            return null;
        }

        $message = trim($value);

        return $message === '' ? null : $message;
    }

    protected function normalizeHelpUrl(mixed $value): ?string
    {
        if (! is_string($value)) {
            return null;
        }

        $url = trim($value);

        if ($url === '' || filter_var($url, FILTER_VALIDATE_URL) === false) {
            return null;
        }

        return $url;
    }

    protected function buildActivityMessage(string $lockMessage, ?string $helpUrl): string
    {
        if ($helpUrl) {
            return sprintf('%s | help_url=%s', $lockMessage, $helpUrl);
        }

        return $lockMessage;
    }

    protected function defaultLockedMessage(): string
    {
        $value = config('feature-locks.default_locked_message');

        if (! is_string($value) || trim($value) === '') {
            return 'This feature is locked. Contact us to unlock.';
        }

        return trim($value);
    }

    protected function supportContact(): ?string
    {
        $value = config('feature-locks.support_contact');

        if (! is_string($value) || trim($value) === '') {
            return null;
        }

        return trim($value);
    }
}
