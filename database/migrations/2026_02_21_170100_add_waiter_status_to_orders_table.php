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
            $table->enum('waiter_status', ['pending_confirmation', 'confirmed', 'served'])
                ->default('pending_confirmation')
                ->after('source_channel');
            $table->timestamp('waiter_confirmed_at')->nullable()->after('waiter_status');
            $table->timestamp('served_at')->nullable()->after('waiter_confirmed_at');

            $table->index('waiter_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table): void {
            $table->dropIndex(['waiter_status']);
            $table->dropColumn(['served_at', 'waiter_confirmed_at', 'waiter_status']);
        });
    }
};
