<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TelegramSetting extends Model
{
    public const WEBHOOK_STATUS_ACTIVE = 'active';

    public const WEBHOOK_STATUS_INACTIVE = 'inactive';

    public const WEBHOOK_STATUS_FAILED = 'failed';

    public const PARSE_MODE_HTML = 'HTML';

    public const PARSE_MODE_MARKDOWN = 'Markdown';

    public const PARSE_MODE_MARKDOWN_V2 = 'MarkdownV2';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'tenant_id',
        'bot_token',
        'bot_username',
        'bot_id',
        'display_name',
        'short_description',
        'long_description',
        'profile_photo_path',
        'welcome_message',
        'support_contact',
        'webhook_url',
        'webhook_secret_token',
        'webhook_status',
        'webhook_last_set_at',
        'webhook_last_checked_at',
        'webhook_last_error',
        'webhook_error_count',
        'is_active',
        'is_paused',
        'maintenance_message',
        'last_seen_at',
        'parse_mode',
        'default_language',
        'timezone',
        'commands_synced_at',
        'enable_inline_mode',
        'enable_payments',
        'enable_notifications',
        'enable_affiliate_module',
        'enable_merchant_dashboard',
        'enable_customer_support_chat',
        'allowed_updates',
        'admin_chat_ids',
        'allowed_admin_user_ids',
        'rate_limit_per_minute',
        'menu_button_text',
        'menu_button_url',
        'persistent_menu_enabled',
        'default_product_image',
        'default_banner_image',
        'last_webhook_event_at',
        'last_successful_update_id',
        'failed_update_count',
    ];

    /**
     * Sensitive values should only be read explicitly by trusted server code.
     *
     * @var list<string>
     */
    protected $hidden = [
        'bot_token',
        'webhook_secret_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'bot_token' => 'encrypted',
            'webhook_secret_token' => 'encrypted',
            'webhook_last_set_at' => 'datetime',
            'webhook_last_checked_at' => 'datetime',
            'webhook_error_count' => 'integer',
            'is_active' => 'boolean',
            'is_paused' => 'boolean',
            'last_seen_at' => 'datetime',
            'commands_synced_at' => 'datetime',
            'enable_inline_mode' => 'boolean',
            'enable_payments' => 'boolean',
            'enable_notifications' => 'boolean',
            'enable_affiliate_module' => 'boolean',
            'enable_merchant_dashboard' => 'boolean',
            'enable_customer_support_chat' => 'boolean',
            'allowed_updates' => 'array',
            'admin_chat_ids' => 'encrypted:array',
            'allowed_admin_user_ids' => 'array',
            'rate_limit_per_minute' => 'integer',
            'persistent_menu_enabled' => 'boolean',
            'last_webhook_event_at' => 'datetime',
            'last_successful_update_id' => 'integer',
            'failed_update_count' => 'integer',
        ];
    }

    /**
     * Scope settings that can actively process Telegram traffic.
     */
    public function scopeEnabled($query)
    {
        return $query
            ->where('is_active', true)
            ->where('is_paused', false);
    }
}
