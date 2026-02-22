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
        Schema::create('feature_toggles', function (Blueprint $table): void {
            $table->id();
            $table->string('feature_key')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->boolean('is_enabled')->default(true);
            $table->text('lock_message')->nullable();
            $table->timestamp('last_toggled_at')->nullable();
            $table->foreignId('last_toggled_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('feature_toggle_activities', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('feature_toggle_id')->constrained()->cascadeOnDelete();
            $table->foreignId('actor_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('action', 32);
            $table->boolean('previous_enabled')->nullable();
            $table->boolean('next_enabled')->nullable();
            $table->text('message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feature_toggle_activities');
        Schema::dropIfExists('feature_toggles');
    }
};
