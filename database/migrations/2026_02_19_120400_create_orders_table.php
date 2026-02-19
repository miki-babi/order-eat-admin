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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->date('pickup_date');
            $table->foreignId('pickup_location_id')->constrained()->restrictOnDelete();
            $table->string('receipt_url')->nullable();
            $table->enum('receipt_status', ['pending', 'approved', 'disapproved'])->default('pending');
            $table->enum('order_status', ['pending', 'preparing', 'ready', 'completed'])->default('pending');
            $table->string('tracking_token')->unique();
            $table->decimal('total_amount', 10, 2)->default(0);
            $table->text('disapproval_reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
