<?php

use Illuminate\Support\Facades\Route;
use Modules\Ordering\Http\Controllers\CakePreorderController;
use Modules\Ordering\Http\Controllers\CateringServiceController;
use Modules\Ordering\Http\Controllers\OrderController;
use Modules\Ordering\Http\Controllers\QrMenuController;
use Modules\Ordering\Http\Controllers\Staff\CakePreorderController as StaffCakePreorderController;
use Modules\Ordering\Http\Controllers\Staff\BusinessSettingsController;
use Modules\Ordering\Http\Controllers\Staff\CashierBoardController;
use Modules\Ordering\Http\Controllers\Staff\CateringRequestController as StaffCateringRequestController;
use Modules\Ordering\Http\Controllers\Staff\KitchenBoardController;
use Modules\Ordering\Http\Controllers\Staff\OrderController as StaffOrderController;
use Modules\Ordering\Http\Controllers\Staff\WaiterBoardController;

Route::get('/', [OrderController::class, 'index'])
    ->middleware('feature:customer_menu_browsing')
    ->name('home');
Route::get('/telegram/menu', [OrderController::class, 'telegramMenu'])
    ->middleware('feature:customer_menu_browsing')
    ->name('telegram.menu');
Route::get('/telegram/orders', [OrderController::class, 'telegramOrders'])
    ->middleware('feature:customer_order_tracking')
    ->name('telegram.orders');
Route::get('/cakes', [CakePreorderController::class, 'index'])
    ->middleware('feature:customer_cake_preordering')
    ->name('cakes.index');
Route::post('/cakes/preorders', [CakePreorderController::class, 'store'])
    ->middleware('feature:customer_cake_preordering')
    ->name('cakes.preorders.store');
Route::get('/catering', [CateringServiceController::class, 'index'])
    ->middleware('feature:customer_catering_requests')
    ->name('catering.index');
Route::post('/catering/requests', [CateringServiceController::class, 'store'])
    ->middleware('feature:customer_catering_requests')
    ->name('catering.requests.store');
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
Route::post('/orders/{trackingToken}/phone', [OrderController::class, 'storeTableOrderPhone'])
    ->middleware('feature:customer_order_tracking')
    ->name('orders.phone.store');
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

        Route::get('cake-preorders', [StaffCakePreorderController::class, 'index'])
            ->middleware(['permission:orders.view', 'feature:staff_cake_preorders'])
            ->name('cake-preorders.index');
        Route::post('cake-packages', [StaffCakePreorderController::class, 'storePackage'])
            ->middleware(['permission:menu_items.manage', 'feature:staff_cake_preorders'])
            ->name('cake-packages.store');
        Route::put('cake-packages/{cakePackage}', [StaffCakePreorderController::class, 'updatePackage'])
            ->middleware(['permission:menu_items.manage', 'feature:staff_cake_preorders'])
            ->name('cake-packages.update');
        Route::delete('cake-packages/{cakePackage}', [StaffCakePreorderController::class, 'destroyPackage'])
            ->middleware(['permission:menu_items.manage', 'feature:staff_cake_preorders'])
            ->name('cake-packages.destroy');
        Route::patch('cake-preorders/{cakePreorder}/status', [StaffCakePreorderController::class, 'updatePreorderStatus'])
            ->middleware(['permission:orders.update', 'feature:staff_cake_preorders'])
            ->name('cake-preorders.status');

        Route::get('catering-requests', [StaffCateringRequestController::class, 'index'])
            ->middleware(['permission:orders.view', 'feature:staff_catering_requests'])
            ->name('catering-requests.index');
        Route::post('catering-packages', [StaffCateringRequestController::class, 'storePackage'])
            ->middleware(['permission:menu_items.manage', 'feature:staff_catering_requests'])
            ->name('catering-packages.store');
        Route::put('catering-packages/{cateringPackage}', [StaffCateringRequestController::class, 'updatePackage'])
            ->middleware(['permission:menu_items.manage', 'feature:staff_catering_requests'])
            ->name('catering-packages.update');
        Route::delete('catering-packages/{cateringPackage}', [StaffCateringRequestController::class, 'destroyPackage'])
            ->middleware(['permission:menu_items.manage', 'feature:staff_catering_requests'])
            ->name('catering-packages.destroy');
        Route::patch('catering-requests/{cateringServiceRequest}/status', [StaffCateringRequestController::class, 'updateRequestStatus'])
            ->middleware(['permission:orders.update', 'feature:staff_catering_requests'])
            ->name('catering-requests.status');

        Route::get('business-settings', [BusinessSettingsController::class, 'index'])
            ->middleware(['permission:menu_items.manage'])
            ->name('business-settings.index');
        Route::patch('business-settings', [BusinessSettingsController::class, 'update'])
            ->middleware(['permission:menu_items.manage'])
            ->name('business-settings.update');
    });
