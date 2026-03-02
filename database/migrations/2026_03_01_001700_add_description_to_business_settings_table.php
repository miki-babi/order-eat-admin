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

        if (Schema::hasColumn('business_settings', 'description')) {
            return;
        }

        Schema::table('business_settings', function (Blueprint $table): void {
            $table->text('description')->nullable()->after('business_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasTable('business_settings')) {
            return;
        }

        if (! Schema::hasColumn('business_settings', 'description')) {
            return;
        }

        Schema::table('business_settings', function (Blueprint $table): void {
            $table->dropColumn('description');
        });
    }
};
