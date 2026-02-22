<?php

use Illuminate\Support\Facades\Route;
use Modules\Operations\Http\Controllers\Staff\BranchScreenController;
use Modules\Operations\Http\Controllers\Staff\PickupLocationController;
use Modules\Operations\Http\Controllers\Staff\TableQrController;

Route::middleware(['auth', 'verified', 'staff'])
    ->prefix('staff')
    ->name('staff.')
    ->group(function (): void {
        Route::get('pickup-locations', [PickupLocationController::class, 'index'])
            ->middleware(['permission:pickup_locations.manage', 'feature:staff_pickup_locations'])
            ->name('pickup-locations.index');
        Route::post('pickup-locations', [PickupLocationController::class, 'store'])
            ->middleware(['permission:pickup_locations.manage', 'feature:staff_pickup_locations'])
            ->name('pickup-locations.store');
        Route::put('pickup-locations/{pickupLocation}', [PickupLocationController::class, 'update'])
            ->middleware(['permission:pickup_locations.manage', 'feature:staff_pickup_locations'])
            ->name('pickup-locations.update');
        Route::delete('pickup-locations/{pickupLocation}', [PickupLocationController::class, 'destroy'])
            ->middleware(['permission:pickup_locations.manage', 'feature:staff_pickup_locations'])
            ->name('pickup-locations.destroy');

        Route::get('table-qr', [TableQrController::class, 'index'])
            ->middleware(['permission:pickup_locations.manage', 'feature:staff_table_qr'])
            ->name('table-qr.index');
        Route::post('table-qr', [TableQrController::class, 'store'])
            ->middleware(['permission:pickup_locations.manage', 'feature:staff_table_qr'])
            ->name('table-qr.store');
        Route::put('table-qr/{diningTable:id}', [TableQrController::class, 'update'])
            ->middleware(['permission:pickup_locations.manage', 'feature:staff_table_qr'])
            ->name('table-qr.update');
        Route::patch('table-sessions/{tableSession}/verify', [TableQrController::class, 'verifySession'])
            ->middleware(['permission:pickup_locations.manage', 'feature:staff_table_qr'])
            ->name('table-sessions.verify');

        Route::get('screens', [BranchScreenController::class, 'index'])
            ->middleware(['permission:branches.assign', 'feature:staff_screen_routing'])
            ->name('screens.index');
        Route::post('screens', [BranchScreenController::class, 'store'])
            ->middleware(['permission:branches.assign', 'feature:staff_screen_routing'])
            ->name('screens.store');
        Route::put('screens/{branchScreen}', [BranchScreenController::class, 'update'])
            ->middleware(['permission:branches.assign', 'feature:staff_screen_routing'])
            ->name('screens.update');
        Route::patch('screens/{branchScreen}/assignments', [BranchScreenController::class, 'syncAssignments'])
            ->middleware(['permission:branches.assign', 'feature:staff_screen_routing'])
            ->name('screens.assignments');
    });
