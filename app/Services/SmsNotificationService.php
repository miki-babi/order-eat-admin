<?php

namespace App\Services;

use App\Models\SmsNotificationSetting;
use Illuminate\Support\Facades\Schema;

class SmsNotificationService
{
    /**
     * Determine if an automatic notification event is enabled.
     */
    public function isEnabled(string $eventKey): bool
    {
        $events = $this->events();
        $event = collect($events)->firstWhere('event_key', $eventKey);

        if (! $event) {
            return true;
        }

        return (bool) ($event['is_enabled'] ?? true);
    }

    /**
     * Return all event settings for UI and runtime.
     *
     * @return array<int, array{event_key: string, label: string, description: string, is_enabled: bool}>
     */
    public function events(): array
    {
        $configured = $this->configuredEvents();

        if (! Schema::hasTable('sms_notification_settings')) {
            return $configured;
        }

        $this->syncDefaultSettings();

        return SmsNotificationSetting::query()
            ->orderBy('event_key')
            ->get()
            ->map(fn (SmsNotificationSetting $setting) => [
                'event_key' => $setting->event_key,
                'label' => $setting->label,
                'description' => (string) ($setting->description ?? ''),
                'is_enabled' => (bool) $setting->is_enabled,
            ])->all();
    }

    /**
     * Sync config defaults into the DB if not already present.
     */
    public function syncDefaultSettings(): void
    {
        if (! Schema::hasTable('sms_notification_settings')) {
            return;
        }

        foreach ($this->configuredEvents() as $event) {
            SmsNotificationSetting::query()->firstOrCreate(
                ['event_key' => $event['event_key']],
                [
                    'label' => $event['label'],
                    'description' => $event['description'],
                    'is_enabled' => $event['is_enabled'],
                ],
            );
        }
    }

    /**
     * Normalize default events from config.
     *
     * @return array<int, array{event_key: string, label: string, description: string, is_enabled: bool}>
     */
    protected function configuredEvents(): array
    {
        $events = config('sms.notification_events', []);

        if (! is_array($events)) {
            return [];
        }

        $output = [];

        foreach ($events as $key => $event) {
            if (! is_array($event)) {
                continue;
            }

            $output[] = [
                'event_key' => (string) $key,
                'label' => (string) ($event['label'] ?? $key),
                'description' => (string) ($event['description'] ?? ''),
                'is_enabled' => (bool) ($event['enabled'] ?? true),
            ];
        }

        return $output;
    }
}
