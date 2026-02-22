<?php

use App\Http\Controllers\FeatureLockedController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('dashboard', function (Request $request) {
    $user = $request->user();

    if ($user?->isSystemAdmin() && Route::has('system-admin.dashboard')) {
        return to_route('system-admin.dashboard');
    }

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

Route::get('/locked/{featureKey}', FeatureLockedController::class)
    ->where('featureKey', '[A-Za-z0-9_-]+')
    ->name('feature.locked');

Route::get('/welcome', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('welcome');

require __DIR__.'/settings.php';
