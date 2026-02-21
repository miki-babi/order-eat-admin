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
        Schema::create('dining_tables', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('pickup_location_id')->constrained()->restrictOnDelete();
            $table->string('name', 80);
            $table->string('qr_code', 120)->unique();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['pickup_location_id', 'name']);
        });

        Schema::create('table_sessions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('dining_table_id')->constrained()->cascadeOnDelete();
            $table->string('session_token', 80)->unique();
            $table->timestamp('started_at');
            $table->timestamp('last_seen_at')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('initial_ip', 45)->nullable();
            $table->text('initial_user_agent')->nullable();
            $table->text('verified_note')->nullable();
            $table->timestamps();

            $table->index(['dining_table_id', 'started_at']);
            $table->index(['verified_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_sessions');
        Schema::dropIfExists('dining_tables');
    }
};
