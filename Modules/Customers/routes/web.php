<?php

use Illuminate\Support\Facades\Route;
use Modules\Customers\Http\Controllers\Staff\CustomerController;

Route::middleware(['auth', 'verified', 'staff'])
    ->prefix('staff')
    ->name('staff.')
    ->group(function (): void {
        Route::get('customers', [CustomerController::class, 'index'])
            ->middleware(['permission:customers.view', 'feature:staff_customers_list'])
            ->name('customers.index');
        Route::post('customers/sms', [CustomerController::class, 'sendSms'])
            ->middleware(['permission:customers.sms', 'feature:staff_customers_sms'])
            ->name('customers.sms');
    });
