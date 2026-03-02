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
        Schema::create('catering_packages', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price_per_person', 10, 2);
            $table->unsignedInteger('min_guests')->default(20);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('catering_service_requests', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('catering_package_id')->constrained()->restrictOnDelete();
            $table->date('event_date');
            $table->unsignedInteger('guest_count');
            $table->string('venue')->nullable();
            $table->text('special_instructions')->nullable();
            $table->enum('status', ['pending', 'reviewed', 'quoted', 'confirmed', 'completed', 'cancelled'])
                ->default('pending');
            $table->decimal('total_estimate', 10, 2)->default(0);
            $table->timestamps();

            $table->index(['status', 'event_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catering_service_requests');
        Schema::dropIfExists('catering_packages');
    }
};
