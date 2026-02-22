<?php

namespace Modules\Ordering\Providers;

use Illuminate\Support\ServiceProvider;

class OrderingServiceProvider extends ServiceProvider
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
