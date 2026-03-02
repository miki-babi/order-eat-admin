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
        if (! Schema::hasTable('catering_service_request_items')) {
            Schema::create('catering_service_request_items', function (Blueprint $table): void {
                $table->id();
                $table->unsignedBigInteger('catering_service_request_id');
                $table->unsignedBigInteger('catering_package_id');
                $table->timestamps();
            });
        }

        Schema::table('catering_service_request_items', function (Blueprint $table): void {
            $table->foreign('catering_service_request_id', 'csri_req_fk')
                ->references('id')
                ->on('catering_service_requests')
                ->cascadeOnDelete();

            $table->foreign('catering_package_id', 'csri_pkg_fk')
                ->references('id')
                ->on('catering_packages')
                ->restrictOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catering_service_request_items');
    }
};
