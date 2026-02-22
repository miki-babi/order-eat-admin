<?php

namespace Modules\TelegramBot\Providers;

use Illuminate\Support\ServiceProvider;

class TelegramBotServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     */
    public function register(): void
    {
        $this->app->register(RouteServiceProvider::class);
    }

    /**
     * Boot the service provider.
     */
    public function boot(): void
    {
        //
    }
}
