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
        Schema::table('cake_packages', function (Blueprint $table): void {
            $table->foreignId('parent_id')
                ->nullable()
                ->after('id')
                ->constrained('cake_packages')
                ->nullOnDelete();

            $table->index(['parent_id', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cake_packages', function (Blueprint $table): void {
            $table->dropIndex('cake_packages_parent_id_is_active_index');
            $table->dropConstrainedForeignId('parent_id');
        });
    }
};
