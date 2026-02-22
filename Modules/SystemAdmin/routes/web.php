<?php

use Illuminate\Support\Facades\Route;
use Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController;

Route::middleware(['auth', 'verified', 'system_admin'])
    ->prefix('__system-admin')
    ->name('system-admin.')
    ->group(function (): void {
        Route::get('dashboard', [SystemAdminDashboardController::class, 'index'])
            ->name('dashboard');

        Route::put('features/{featureToggle}', [SystemAdminDashboardController::class, 'updateFeature'])
            ->name('features.update');
    });
