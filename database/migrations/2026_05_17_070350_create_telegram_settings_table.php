<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('telegram_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->nullable()->index();

            // Telegram bot credentials.
            $table->text('bot_token')->nullable();
            $table->string('bot_username')->nullable()->index();
            $table->string('bot_id')->nullable()->index();

            // Bot identity settings.
            $table->string('display_name')->nullable();
            $table->string('short_description')->nullable();
            $table->text('long_description')->nullable();
            $table->string('profile_photo_path')->nullable();
            $table->text('welcome_message')->nullable();
            $table->string('support_contact')->nullable();

            // Webhook settings.
            $table->string('webhook_url')->nullable();
            $table->text('webhook_secret_token')->nullable();
            $table->enum('webhook_status', ['active', 'inactive', 'failed'])->default('inactive');
            $table->timestamp('webhook_last_set_at')->nullable();
            $table->timestamp('webhook_last_checked_at')->nullable();
            $table->text('webhook_last_error')->nullable();
            $table->unsignedInteger('webhook_error_count')->default(0);

            // Bot status.
            $table->boolean('is_active')->default(true);
            $table->boolean('is_paused')->default(false);
            $table->text('maintenance_message')->nullable();
            $table->timestamp('last_seen_at')->nullable();

            // Telegram bot configuration.
            $table->string('parse_mode')->default('HTML');
            $table->string('default_language', 12)->default('en');
            $table->string('timezone')->default('Africa/Addis_Ababa');
            $table->timestamp('commands_synced_at')->nullable();

            // Feature toggles.
            $table->boolean('enable_inline_mode')->default(false);
            $table->boolean('enable_payments')->default(true);
            $table->boolean('enable_notifications')->default(true);
            $table->boolean('enable_affiliate_module')->default(false);
            $table->boolean('enable_merchant_dashboard')->default(true);
            $table->boolean('enable_customer_support_chat')->default(false);

            // Security settings.
            $table->json('allowed_updates')->nullable();
            $table->text('admin_chat_ids')->nullable();
            $table->json('allowed_admin_user_ids')->nullable();
            $table->unsignedSmallInteger('rate_limit_per_minute')->default(60);

            // Menu/UI settings.
            $table->string('menu_button_text')->nullable();
            $table->string('menu_button_url')->nullable();
            $table->boolean('persistent_menu_enabled')->default(false);

            // Media defaults.
            $table->string('default_product_image')->nullable();
            $table->string('default_banner_image')->nullable();

            // Logging and monitoring.
            $table->timestamp('last_webhook_event_at')->nullable();
            $table->unsignedBigInteger('last_successful_update_id')->nullable();
            $table->unsignedInteger('failed_update_count')->default(0);

            $table->timestamps();

            $table->index(['tenant_id', 'is_active']);
            $table->index(['webhook_status', 'webhook_last_checked_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('telegram_settings');
    }
};
