<?php

namespace App\Http\Controllers;

use App\Models\TelegramSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TelegramSettingController extends Controller
{
    /**
     * Show the singleton Telegram settings page.
     */
    public function index(Request $request): Response
    {
        $settings = $this->resolveSettings();

        return Inertia::render('staff/telegram-settings', [
            'settings' => $settings instanceof TelegramSetting
                ? $this->serializeSetting($settings)
                : $this->defaultSettingsPayload(),
            'canManageSettings' => $request->user()?->hasPermission('users.manage') ?? false,
        ]);
    }

    /**
     * Update or create the singleton Telegram settings record.
     */
    public function update(Request $request): RedirectResponse
    {
        $setting = $this->resolveSettings() ?? new TelegramSetting;
        $payload = $this->normalizeSettingsPayload(
            array_merge($this->hiddenFieldDefaults(), $this->validatedSettings($request)),
            $setting,
        );

        $setting->fill($payload);
        $setting->save();

        return back()->with('success', 'Telegram settings updated.');
    }

    /**
     * Validate all settings fields accepted by create/update endpoints.
     *
     * @return array<string, mixed>
     */
    protected function validatedSettings(Request $request): array
    {
        return $request->validate([
            'bot_token' => ['nullable', 'string', 'max:4096'],
            'bot_username' => ['nullable', 'string', 'max:255', 'regex:/^@?[A-Za-z][A-Za-z0-9_]{4,31}$/'],
            'bot_id' => ['nullable', 'string', 'max:255'],

            'webhook_url' => ['nullable', 'url', 'max:2048'],
            'webhook_secret_token' => ['nullable', 'string', 'max:1024'],
            'webhook_status' => [
                'nullable',
                Rule::in([
                    TelegramSetting::WEBHOOK_STATUS_ACTIVE,
                    TelegramSetting::WEBHOOK_STATUS_INACTIVE,
                    TelegramSetting::WEBHOOK_STATUS_FAILED,
                ]),
            ],
            'webhook_last_set_at' => ['nullable', 'date'],
            'webhook_last_checked_at' => ['nullable', 'date'],
            'webhook_last_error' => ['nullable', 'string', 'max:5000'],
            'webhook_error_count' => ['nullable', 'integer', 'min:0'],

            'is_active' => ['nullable', 'boolean'],
            'is_paused' => ['nullable', 'boolean'],
            'maintenance_message' => ['nullable', 'string', 'max:5000'],
            'last_seen_at' => ['nullable', 'date'],

            'last_webhook_event_at' => ['nullable', 'date'],
            'last_successful_update_id' => ['nullable', 'integer', 'min:0'],
            'failed_update_count' => ['nullable', 'integer', 'min:0'],
        ]);
    }

    /**
     * Normalize strings and array values before Eloquent encrypts/casts them.
     *
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    protected function normalizeSettingsPayload(array $payload, TelegramSetting $setting): array
    {
        $defaultedFields = [
            'webhook_status',
            'webhook_error_count',
            'is_active',
            'is_paused',
            'failed_update_count',
        ];

        foreach ($defaultedFields as $field) {
            if (array_key_exists($field, $payload) && $payload[$field] === null) {
                unset($payload[$field]);
            }
        }

        $nullableStrings = [
            'bot_token',
            'bot_username',
            'bot_id',
            'webhook_url',
            'webhook_secret_token',
            'webhook_last_error',
            'maintenance_message',
        ];

        foreach ($nullableStrings as $field) {
            if (! array_key_exists($field, $payload) || ! is_string($payload[$field])) {
                continue;
            }

            $payload[$field] = trim($payload[$field]);
            $payload[$field] = $payload[$field] === '' ? null : $payload[$field];
        }

        if (is_string($payload['bot_username'] ?? null)) {
            $payload['bot_username'] = '@'.ltrim($payload['bot_username'], '@');
        }

        foreach (['bot_token', 'webhook_secret_token'] as $secretField) {
            if (($payload[$secretField] ?? null) === null && $setting->exists) {
                unset($payload[$secretField]);
            }
        }

        foreach (['allowed_updates', 'admin_chat_ids', 'allowed_admin_user_ids'] as $field) {
            if (! array_key_exists($field, $payload) || ! is_array($payload[$field])) {
                continue;
            }

            $payload[$field] = collect($payload[$field])
                ->map(fn (mixed $value): string => trim((string) $value))
                ->filter(fn (string $value): bool => $value !== '')
                ->values()
                ->all();
        }

        return $payload;
    }

    /**
     * Hidden admin-page fields receive stable defaults on every save.
     *
     * @return array<string, mixed>
     */
    protected function hiddenFieldDefaults(): array
    {
        return [
            'tenant_id' => null,
            'display_name' => null,
            'short_description' => null,
            'long_description' => null,
            'profile_photo_path' => null,
            'welcome_message' => null,
            'support_contact' => null,
            'parse_mode' => TelegramSetting::PARSE_MODE_HTML,
            'default_language' => 'en',
            'timezone' => 'Africa/Addis_Ababa',
            'commands_synced_at' => null,
            'enable_inline_mode' => false,
            'enable_payments' => true,
            'enable_notifications' => true,
            'enable_affiliate_module' => false,
            'enable_merchant_dashboard' => true,
            'enable_customer_support_chat' => false,
            'allowed_updates' => [],
            'admin_chat_ids' => [],
            'allowed_admin_user_ids' => [],
            'rate_limit_per_minute' => 60,
            'menu_button_text' => null,
            'menu_button_url' => null,
            'persistent_menu_enabled' => false,
            'default_product_image' => null,
            'default_banner_image' => null,
        ];
    }

    /**
     * Return current settings without creating a row during page load.
     */
    protected function resolveSettings(): ?TelegramSetting
    {
        return TelegramSetting::query()->orderBy('id')->first();
    }

    /**
     * Build a dashboard-safe representation of Telegram settings.
     *
     * @return array<string, mixed>
     */
    protected function serializeSetting(TelegramSetting $setting): array
    {
        return [
            'id' => $setting->id,
            'has_bot_token' => filled($setting->bot_token),
            'bot_username' => $setting->bot_username,
            'bot_id' => $setting->bot_id,
            'webhook_url' => $setting->webhook_url,
            'has_webhook_secret_token' => filled($setting->webhook_secret_token),
            'webhook_status' => $setting->webhook_status,
            'webhook_last_set_at' => $setting->webhook_last_set_at?->toDateTimeString(),
            'webhook_last_checked_at' => $setting->webhook_last_checked_at?->toDateTimeString(),
            'webhook_last_error' => $setting->webhook_last_error,
            'webhook_error_count' => $setting->webhook_error_count,
            'is_active' => $setting->is_active,
            'is_paused' => $setting->is_paused,
            'maintenance_message' => $setting->maintenance_message,
            'last_seen_at' => $setting->last_seen_at?->toDateTimeString(),
            'last_webhook_event_at' => $setting->last_webhook_event_at?->toDateTimeString(),
            'last_successful_update_id' => $setting->last_successful_update_id,
            'failed_update_count' => $setting->failed_update_count,
            'created_at' => $setting->created_at?->toDateTimeString(),
            'updated_at' => $setting->updated_at?->toDateTimeString(),
        ];
    }

    /**
     * Defaults used when the settings record does not exist yet.
     *
     * @return array<string, mixed>
     */
    protected function defaultSettingsPayload(): array
    {
        return [
            'id' => null,
            'has_bot_token' => false,
            'bot_username' => null,
            'bot_id' => null,
            'webhook_url' => null,
            'has_webhook_secret_token' => false,
            'webhook_status' => TelegramSetting::WEBHOOK_STATUS_INACTIVE,
            'webhook_last_set_at' => null,
            'webhook_last_checked_at' => null,
            'webhook_last_error' => null,
            'webhook_error_count' => 0,
            'is_active' => true,
            'is_paused' => false,
            'maintenance_message' => null,
            'last_seen_at' => null,
            'last_webhook_event_at' => null,
            'last_successful_update_id' => null,
            'failed_update_count' => 0,
            'created_at' => null,
            'updated_at' => null,
        ];
    }
}
