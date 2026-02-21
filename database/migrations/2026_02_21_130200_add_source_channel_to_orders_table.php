<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table): void {
            $table->string('source_channel', 20)
                ->default('web')
                ->after('table_session_id');

            $table->index('source_channel');
        });

        DB::table('orders')
            ->chunkById(200, function ($orders): void {
                $customerIds = $orders
                    ->pluck('customer_id')
                    ->filter()
                    ->unique()
                    ->values()
                    ->all();

                $telegramCustomerIds = $customerIds === []
                    ? []
                    : DB::table('customers')
                        ->whereIn('id', $customerIds)
                        ->whereNotNull('telegram_id')
                        ->pluck('id')
                        ->all();

                $telegramLookup = array_fill_keys(
                    array_map(static fn ($id) => (int) $id, $telegramCustomerIds),
                    true,
                );

                foreach ($orders as $order) {
                    $sourceChannel = 'web';

                    if ($order->dining_table_id !== null) {
                        $sourceChannel = 'table';
                    } elseif (isset($telegramLookup[(int) $order->customer_id])) {
                        $sourceChannel = 'telegram';
                    }

                    DB::table('orders')
                        ->where('id', $order->id)
                        ->update(['source_channel' => $sourceChannel]);
                }
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table): void {
            $table->dropIndex(['source_channel']);
            $table->dropColumn('source_channel');
        });
    }
};
