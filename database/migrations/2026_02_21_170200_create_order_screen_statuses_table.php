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
        Schema::create('order_screen_statuses', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('branch_screen_id')->constrained('branch_screens')->cascadeOnDelete();
            $table->enum('status', ['pending', 'preparing', 'prepared'])->default('pending');
            $table->timestamp('preparing_started_at')->nullable();
            $table->timestamp('prepared_at')->nullable();
            $table->foreignId('updated_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->unique(['order_id', 'branch_screen_id']);
            $table->index(['branch_screen_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_screen_statuses');
    }
};
