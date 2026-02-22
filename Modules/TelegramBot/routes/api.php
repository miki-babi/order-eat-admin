<?php

use Illuminate\Support\Facades\Route;
use Modules\TelegramBot\Http\Controllers\MiniAppIdentityController;
use Modules\TelegramBot\Http\Controllers\MiniAppOrdersController;
use Modules\TelegramBot\Http\Controllers\WebhookController;

Route::post('/telegram/webhook', WebhookController::class)
    ->middleware('feature:telegram_bot_webhook')
    ->name('telegram.webhook');

Route::post('/telegram/miniapp/identity', MiniAppIdentityController::class)
    ->middleware('feature:telegram_bot_webhook')
    ->name('telegram.miniapp.identity');

Route::post('/telegram/miniapp/orders', MiniAppOrdersController::class)
    ->middleware('feature:telegram_bot_webhook')
    ->name('telegram.miniapp.orders');
