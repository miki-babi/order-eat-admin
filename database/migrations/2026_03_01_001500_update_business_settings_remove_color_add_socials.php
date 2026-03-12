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
        if (! Schema::hasTable('business_settings')) {
            return;
        }

        $hasBrandColor = Schema::hasColumn('business_settings', 'brand_color');
        $hasSocialFacebook = Schema::hasColumn('business_settings', 'social_facebook');
        $hasSocialInstagram = Schema::hasColumn('business_settings', 'social_instagram');
        $hasSocialTiktok = Schema::hasColumn('business_settings', 'social_tiktok');
        $hasSocialTelegram = Schema::hasColumn('business_settings', 'social_telegram');
        $hasSocialX = Schema::hasColumn('business_settings', 'social_x');

        Schema::table('business_settings', function (Blueprint $table) use (
            $hasBrandColor,
            $hasSocialFacebook,
            $hasSocialInstagram,
            $hasSocialTiktok,
            $hasSocialTelegram,
            $hasSocialX
        ): void {
            if ($hasBrandColor) {
                $table->dropColumn('brand_color');
            }

            if (! $hasSocialFacebook) {
                $table->string('social_facebook')->nullable()->after('contact_address');
            }

            if (! $hasSocialInstagram) {
                $table->string('social_instagram')->nullable()->after('social_facebook');
            }

            if (! $hasSocialTiktok) {
                $table->string('social_tiktok')->nullable()->after('social_instagram');
            }

            if (! $hasSocialTelegram) {
                $table->string('social_telegram')->nullable()->after('social_tiktok');
            }

            if (! $hasSocialX) {
                $table->string('social_x')->nullable()->after('social_telegram');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Keep rollback safe and non-destructive since base table schema now excludes brand_color.
    }
};
