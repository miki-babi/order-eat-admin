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
        Schema::table('feature_toggles', function (Blueprint $table): void {
            $table->string('help_url', 2048)->nullable()->after('lock_message');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('feature_toggles', function (Blueprint $table): void {
            $table->dropColumn('help_url');
        });
    }
};
