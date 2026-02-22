<?php

namespace Modules\Customers\Providers;

use Illuminate\Support\ServiceProvider;

class CustomersServiceProvider extends ServiceProvider
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
