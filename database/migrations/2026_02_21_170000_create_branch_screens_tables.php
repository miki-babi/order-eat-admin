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
        Schema::create('branch_screens', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('pickup_location_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->enum('screen_type', ['waiter', 'kitchen', 'cashier']);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['pickup_location_id', 'screen_type']);
        });

        Schema::create('branch_screen_user', function (Blueprint $table): void {
            $table->foreignId('branch_screen_id')->constrained('branch_screens')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->primary(['branch_screen_id', 'user_id']);
        });

        Schema::create('branch_screen_menu_item', function (Blueprint $table): void {
            $table->foreignId('branch_screen_id')->constrained('branch_screens')->cascadeOnDelete();
            $table->foreignId('menu_item_id')->constrained()->cascadeOnDelete();

            $table->primary(['branch_screen_id', 'menu_item_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branch_screen_menu_item');
        Schema::dropIfExists('branch_screen_user');
        Schema::dropIfExists('branch_screens');
    }
};
