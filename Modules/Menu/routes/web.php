<?php

use Illuminate\Support\Facades\Route;
use Modules\Menu\Http\Controllers\Staff\MenuItemController;

Route::middleware(['auth', 'verified', 'staff'])
    ->prefix('staff')
    ->name('staff.')
    ->group(function (): void {
        Route::get('menu-items', [MenuItemController::class, 'index'])
            ->middleware(['permission:menu_items.manage', 'feature:staff_menu_catalog'])
            ->name('menu-items.index');
        Route::post('menu-items', [MenuItemController::class, 'store'])
            ->middleware(['permission:menu_items.manage', 'feature:staff_menu_management'])
            ->name('menu-items.store');
        Route::put('menu-items/{menuItem}', [MenuItemController::class, 'update'])
            ->middleware(['permission:menu_items.manage', 'feature:staff_menu_management'])
            ->name('menu-items.update');
        Route::delete('menu-items/{menuItem}', [MenuItemController::class, 'destroy'])
            ->middleware(['permission:menu_items.manage', 'feature:staff_menu_management'])
            ->name('menu-items.destroy');
    });
