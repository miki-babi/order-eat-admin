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
        Schema::create('cake_packages', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('cake_preorders', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->date('needed_date');
            $table->enum('status', ['pending', 'reviewed', 'confirmed', 'completed', 'cancelled'])
                ->default('pending');
            $table->text('special_instructions')->nullable();
            $table->decimal('total_amount', 10, 2)->default(0);
            $table->timestamps();

            $table->index(['status', 'needed_date']);
        });

        Schema::create('cake_preorder_items', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('cake_preorder_id')->constrained()->cascadeOnDelete();
            $table->foreignId('cake_package_id')->constrained()->restrictOnDelete();
            $table->unsignedInteger('quantity');
            $table->decimal('unit_price', 10, 2);
            $table->text('specification')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cake_preorder_items');
        Schema::dropIfExists('cake_preorders');
        Schema::dropIfExists('cake_packages');
    }
};
