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
        if (! Schema::hasTable('catering_service_request_items')) {
            return;
        }

        if (! Schema::hasColumn('catering_service_request_items', 'price_per_person')) {
            return;
        }

        Schema::table('catering_service_request_items', function (Blueprint $table): void {
            $table->dropColumn('price_per_person');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasTable('catering_service_request_items')) {
            return;
        }

        if (Schema::hasColumn('catering_service_request_items', 'price_per_person')) {
            return;
        }

        Schema::table('catering_service_request_items', function (Blueprint $table): void {
            $table->decimal('price_per_person', 10, 2)->default(0)->after('catering_package_id');
        });
    }
};
