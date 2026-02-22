<?php

use Illuminate\Support\Facades\Route;
use Modules\AccessControl\Http\Controllers\Staff\AccessControlController;

Route::middleware(['auth', 'verified', 'staff'])
    ->prefix('staff')
    ->name('staff.')
    ->group(function (): void {
        Route::get('access-control', [AccessControlController::class, 'index'])
            ->middleware(['permission:users.manage,roles.manage,permissions.manage', 'feature:staff_access_control_dashboard'])
            ->name('access-control.index');
        Route::post('access-control/roles', [AccessControlController::class, 'storeRole'])
            ->middleware(['permission:roles.manage', 'feature:staff_access_control_roles'])
            ->name('access-control.roles.store');
        Route::put('access-control/roles/{role}', [AccessControlController::class, 'updateRole'])
            ->middleware(['permission:roles.manage', 'feature:staff_access_control_roles'])
            ->name('access-control.roles.update');
        Route::post('access-control/permissions', [AccessControlController::class, 'storePermission'])
            ->middleware(['permission:permissions.manage', 'feature:staff_access_control_permissions'])
            ->name('access-control.permissions.store');
        Route::post('access-control/users', [AccessControlController::class, 'storeUser'])
            ->middleware(['permission:users.manage', 'permission:branches.assign', 'feature:staff_access_control_users'])
            ->name('access-control.users.store');
        Route::put('access-control/users/{user}', [AccessControlController::class, 'updateUser'])
            ->middleware(['permission:users.manage', 'permission:branches.assign', 'feature:staff_access_control_users'])
            ->name('access-control.users.update');
    });
