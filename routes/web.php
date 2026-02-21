<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\QrMenuController;
use App\Http\Controllers\Staff\AccessControlController;
use App\Http\Controllers\Staff\BranchScreenController;
use App\Http\Controllers\Staff\CashierBoardController;
use App\Http\Controllers\Staff\CustomerController;
use App\Http\Controllers\Staff\KitchenBoardController;
use App\Http\Controllers\Staff\MenuItemController;
use App\Http\Controllers\Staff\OrderController as StaffOrderController;
use App\Http\Controllers\Staff\PickupLocationController;
use App\Http\Controllers\Staff\ReportController;
use App\Http\Controllers\Staff\SmsTemplateController;
use App\Http\Controllers\Staff\TableQrController;
use App\Http\Controllers\Staff\WaiterBoardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [OrderController::class, 'index'])->name('home');
Route::get('/qr-menu/{diningTable:qr_code}', [QrMenuController::class, 'show'])->name('qr-menu.show');
Route::post('/qr-menu/{diningTable:qr_code}/orders', [QrMenuController::class, 'store'])->name('qr-menu.orders.store');

Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::get('/orders/{trackingToken}/confirmation', [OrderController::class, 'confirmation'])->name('orders.confirmation');
Route::get('/orders/{trackingToken}/track', [OrderController::class, 'track'])->name('orders.track');
Route::post('/orders/{trackingToken}/receipt', [OrderController::class, 'uploadReceipt'])->name('orders.receipt.upload');

Route::get('dashboard', function (Request $request) {
    $user = $request->user();

    $priorityMap = [
        'orders.view' => 'staff.orders.index',
        'customers.view' => 'staff.customers.index',
        'pickup_locations.manage' => 'staff.pickup-locations.index',
        'menu_items.manage' => 'staff.menu-items.index',
        'reports.view' => 'staff.reports.index',
        'sms_templates.manage' => 'staff.sms-templates.index',
    ];

    foreach ($priorityMap as $permission => $routeName) {
        if ($user?->hasPermission($permission)) {
            return to_route($routeName);
        }
    }

    if ($user?->hasAnyPermission(['users.manage', 'roles.manage', 'permissions.manage'])) {
        return to_route('staff.access-control.index');
    }

    return to_route('home');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified', 'staff'])
    ->prefix('staff')
    ->name('staff.')
    ->group(function (): void {
        Route::get('orders', [StaffOrderController::class, 'index'])
            ->middleware('permission:orders.view')
            ->name('orders.index');
        Route::patch('orders/{order}', [StaffOrderController::class, 'update'])
            ->middleware('permission:orders.update')
            ->name('orders.update');

        Route::get('waiter-board', [WaiterBoardController::class, 'index'])
            ->middleware('permission:orders.view')
            ->name('waiter.index');
        Route::patch('waiter-board/orders/{order}/confirm', [WaiterBoardController::class, 'confirm'])
            ->middleware('permission:orders.update')
            ->name('waiter.confirm');
        Route::patch('waiter-board/orders/{order}/serve', [WaiterBoardController::class, 'serve'])
            ->middleware('permission:orders.update')
            ->name('waiter.serve');

        Route::get('kitchen-board', [KitchenBoardController::class, 'index'])
            ->middleware('permission:orders.view')
            ->name('kitchen.index');
        Route::patch('kitchen-board/statuses/{orderScreenStatus}', [KitchenBoardController::class, 'update'])
            ->middleware('permission:orders.update')
            ->name('kitchen.update');

        Route::get('cashier-board', [CashierBoardController::class, 'index'])
            ->middleware('permission:orders.view')
            ->name('cashier.index');

        Route::get('customers', [CustomerController::class, 'index'])
            ->middleware('permission:customers.view')
            ->name('customers.index');
        Route::post('customers/sms', [CustomerController::class, 'sendSms'])
            ->middleware('permission:customers.sms')
            ->name('customers.sms');

        Route::get('pickup-locations', [PickupLocationController::class, 'index'])
            ->middleware('permission:pickup_locations.manage')
            ->name('pickup-locations.index');
        Route::post('pickup-locations', [PickupLocationController::class, 'store'])
            ->middleware('permission:pickup_locations.manage')
            ->name('pickup-locations.store');
        Route::put('pickup-locations/{pickupLocation}', [PickupLocationController::class, 'update'])
            ->middleware('permission:pickup_locations.manage')
            ->name('pickup-locations.update');
        Route::delete('pickup-locations/{pickupLocation}', [PickupLocationController::class, 'destroy'])
            ->middleware('permission:pickup_locations.manage')
            ->name('pickup-locations.destroy');

        Route::get('table-qr', [TableQrController::class, 'index'])
            ->middleware('permission:pickup_locations.manage')
            ->name('table-qr.index');
        Route::post('table-qr', [TableQrController::class, 'store'])
            ->middleware('permission:pickup_locations.manage')
            ->name('table-qr.store');
        Route::put('table-qr/{diningTable:id}', [TableQrController::class, 'update'])
            ->middleware('permission:pickup_locations.manage')
            ->name('table-qr.update');
        Route::patch('table-sessions/{tableSession}/verify', [TableQrController::class, 'verifySession'])
            ->middleware('permission:pickup_locations.manage')
            ->name('table-sessions.verify');

        Route::get('screens', [BranchScreenController::class, 'index'])
            ->middleware('permission:branches.assign')
            ->name('screens.index');
        Route::post('screens', [BranchScreenController::class, 'store'])
            ->middleware('permission:branches.assign')
            ->name('screens.store');
        Route::put('screens/{branchScreen}', [BranchScreenController::class, 'update'])
            ->middleware('permission:branches.assign')
            ->name('screens.update');
        Route::patch('screens/{branchScreen}/assignments', [BranchScreenController::class, 'syncAssignments'])
            ->middleware('permission:branches.assign')
            ->name('screens.assignments');

        Route::get('menu-items', [MenuItemController::class, 'index'])
            ->middleware('permission:menu_items.manage')
            ->name('menu-items.index');
        Route::post('menu-items', [MenuItemController::class, 'store'])
            ->middleware('permission:menu_items.manage')
            ->name('menu-items.store');
        Route::put('menu-items/{menuItem}', [MenuItemController::class, 'update'])
            ->middleware('permission:menu_items.manage')
            ->name('menu-items.update');
        Route::delete('menu-items/{menuItem}', [MenuItemController::class, 'destroy'])
            ->middleware('permission:menu_items.manage')
            ->name('menu-items.destroy');

        Route::get('reports', [ReportController::class, 'index'])
            ->middleware('permission:reports.view')
            ->name('reports.index');

        Route::get('sms-templates', [SmsTemplateController::class, 'index'])
            ->middleware('permission:sms_templates.manage')
            ->name('sms-templates.index');
        Route::put('sms-templates/{smsTemplate}', [SmsTemplateController::class, 'update'])
            ->middleware('permission:sms_templates.manage')
            ->name('sms-templates.update');
        Route::put('sms-notification-settings/{smsNotificationSetting}', [SmsTemplateController::class, 'updateNotificationSetting'])
            ->middleware('permission:sms_templates.manage')
            ->name('sms-notification-settings.update');
        Route::post('sms-phone-lists', [SmsTemplateController::class, 'storePhoneList'])
            ->middleware('permission:sms_templates.manage')
            ->name('sms-phone-lists.store');
        Route::delete('sms-phone-lists/{smsPhoneList}', [SmsTemplateController::class, 'destroyPhoneList'])
            ->middleware('permission:sms_templates.manage')
            ->name('sms-phone-lists.destroy');
        Route::post('sms-contacts/import', [SmsTemplateController::class, 'importContacts'])
            ->middleware('permission:sms_templates.manage')
            ->name('sms-contacts.import');
        Route::get('sms-campaigns/preview-audience', [SmsTemplateController::class, 'previewAudience'])
            ->middleware('permission:sms_templates.manage')
            ->name('sms-campaigns.preview-audience');

        Route::get('access-control', [AccessControlController::class, 'index'])
            ->middleware('permission:users.manage,roles.manage,permissions.manage')
            ->name('access-control.index');
        Route::post('access-control/roles', [AccessControlController::class, 'storeRole'])
            ->middleware('permission:roles.manage')
            ->name('access-control.roles.store');
        Route::put('access-control/roles/{role}', [AccessControlController::class, 'updateRole'])
            ->middleware('permission:roles.manage')
            ->name('access-control.roles.update');
        Route::post('access-control/permissions', [AccessControlController::class, 'storePermission'])
            ->middleware('permission:permissions.manage')
            ->name('access-control.permissions.store');
        Route::post('access-control/users', [AccessControlController::class, 'storeUser'])
            ->middleware(['permission:users.manage', 'permission:branches.assign'])
            ->name('access-control.users.store');
        Route::put('access-control/users/{user}', [AccessControlController::class, 'updateUser'])
            ->middleware(['permission:users.manage', 'permission:branches.assign'])
            ->name('access-control.users.update');
    });

Route::get('/welcome', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('welcome');

require __DIR__.'/settings.php';
