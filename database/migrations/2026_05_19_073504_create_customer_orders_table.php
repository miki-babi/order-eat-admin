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
        Schema::create('customer_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->nullable()->constrained('customers')->nullOnDelete();
            $table->string('customer_token', 120)->nullable();
            $table->string('tracking_token', 64)->unique();
            $table->enum('type', ['pickup', 'delivery']);
            $table->enum('status', ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'])->default('pending');
            $table->date('pickup_date')->nullable();
            $table->time('pickup_time')->nullable();
            $table->foreignId('pickup_location_id')->nullable()->constrained('pickup_locations')->nullOnDelete();
            $table->string('delivery_phone', 32)->nullable();
            $table->text('delivery_address')->nullable();
            $table->decimal('total_amount', 10, 2)->default(0);
            $table->string('receipt_url')->nullable();
            $table->enum('receipt_status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->boolean('notify_when_ready')->default(false);
            $table->string('source_channel')->nullable();
            $table->string('disapproval_reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_orders');
    }
};
