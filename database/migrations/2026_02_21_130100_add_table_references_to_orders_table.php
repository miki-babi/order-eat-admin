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
        Schema::table('orders', function (Blueprint $table): void {
            $table->foreignId('dining_table_id')
                ->nullable()
                ->after('pickup_location_id')
                ->constrained('dining_tables')
                ->nullOnDelete();

            $table->foreignId('table_session_id')
                ->nullable()
                ->after('dining_table_id')
                ->constrained('table_sessions')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table): void {
            $table->dropConstrainedForeignId('table_session_id');
            $table->dropConstrainedForeignId('dining_table_id');
        });
    }
};
