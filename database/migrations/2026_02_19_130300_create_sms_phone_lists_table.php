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
        Schema::create('sms_phone_lists', function (Blueprint $table) {
            $table->id();
            $table->string('phone', 30);
            $table->string('normalized_phone', 20);
            $table->enum('list_type', ['whitelist', 'blacklist']);
            $table->string('note')->nullable();
            $table->timestamps();

            $table->unique(['normalized_phone', 'list_type']);
            $table->index('list_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sms_phone_lists');
    }
};
