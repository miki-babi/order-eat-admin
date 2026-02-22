<?php

use Illuminate\Support\Facades\Route;
use Modules\Reporting\Http\Controllers\Staff\ReportController;

Route::middleware(['auth', 'verified', 'staff'])
    ->prefix('staff')
    ->name('staff.')
    ->group(function (): void {
        Route::get('reports', [ReportController::class, 'index'])
            ->middleware(['permission:reports.view', 'feature:staff_reporting_dashboard'])
            ->name('reports.index');
    });
