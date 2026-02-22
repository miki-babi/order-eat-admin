<?php

use Illuminate\Support\Facades\Route;
use Modules\Ordering\Http\Controllers\OrderController;
use Modules\Ordering\Http\Controllers\QrMenuController;
use Modules\Ordering\Http\Controllers\Staff\CashierBoardController;
use Modules\Ordering\Http\Controllers\Staff\KitchenBoardController;
use Modules\Ordering\Http\Controllers\Staff\OrderController as StaffOrderController;
use Modules\Ordering\Http\Controllers\Staff\WaiterBoardController;

Route::get('/', [OrderController::class, 'index'])
    ->middleware('feature:customer_menu_browsing')
    ->name('home');
Route::get('/telegram/menu', [OrderController::class, 'telegramMenu'])
    ->middleware('feature:customer_menu_browsing')
    ->name('telegram.menu');
Route::get('/qr-menu/{diningTable:qr_code}', [QrMenuController::class, 'show'])
    ->middleware('feature:customer_qr_menu')
    ->name('qr-menu.show');
Route::post('/qr-menu/{diningTable:qr_code}/orders', [QrMenuController::class, 'store'])
    ->middleware('feature:customer_qr_checkout')
    ->name('qr-menu.orders.store');

Route::post('/orders', [OrderController::class, 'store'])
    ->middleware('feature:customer_web_checkout')
    ->name('orders.store');
Route::get('/orders/{trackingToken}/confirmation', [OrderController::class, 'confirmation'])
    ->middleware('feature:customer_order_confirmation')
    ->name('orders.confirmation');
Route::get('/orders/{trackingToken}/track', [OrderController::class, 'track'])
    ->middleware('feature:customer_order_tracking')
    ->name('orders.track');
Route::post('/orders/{trackingToken}/receipt', [OrderController::class, 'uploadReceipt'])
    ->middleware('feature:customer_receipt_upload')
    ->name('orders.receipt.upload');

Route::middleware(['auth', 'verified', 'staff'])
    ->prefix('staff')
    ->name('staff.')
    ->group(function (): void {
        Route::get('orders', [StaffOrderController::class, 'index'])
            ->middleware(['permission:orders.view', 'feature:staff_order_queue'])
            ->name('orders.index');
        Route::patch('orders/{order}', [StaffOrderController::class, 'update'])
            ->middleware(['permission:orders.update', 'feature:staff_order_updates'])
            ->name('orders.update');

        Route::get('waiter-board', [WaiterBoardController::class, 'index'])
            ->middleware(['permission:orders.view', 'feature:staff_waiter_board'])
            ->name('waiter.index');
        Route::patch('waiter-board/orders/{order}/confirm', [WaiterBoardController::class, 'confirm'])
            ->middleware(['permission:orders.update', 'feature:staff_waiter_board'])
            ->name('waiter.confirm');
        Route::patch('waiter-board/orders/{order}/serve', [WaiterBoardController::class, 'serve'])
            ->middleware(['permission:orders.update', 'feature:staff_waiter_board'])
            ->name('waiter.serve');

        Route::get('kitchen-board', [KitchenBoardController::class, 'index'])
            ->middleware(['permission:orders.view', 'feature:staff_kitchen_board'])
            ->name('kitchen.index');
        Route::patch('kitchen-board/statuses/{orderScreenStatus}', [KitchenBoardController::class, 'update'])
            ->middleware(['permission:orders.update', 'feature:staff_kitchen_board'])
            ->name('kitchen.update');

        Route::get('cashier-board', [CashierBoardController::class, 'index'])
            ->middleware(['permission:orders.view', 'feature:staff_cashier_board'])
            ->name('cashier.index');
    });
