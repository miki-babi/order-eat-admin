<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class HandleAppearance
{
    /**
     * Admin areas should open in light mode unless the user has already chosen
     * a specific appearance preference.
     */
    private function defaultAppearance(Request $request): string
    {
        if ($request->is([
            'dashboard',
            'settings',
            'settings/*',
            'staff',
            'staff/*',
            '__system-admin',
            '__system-admin/*',
            'locked',
            'locked/*',
        ])) {
            return 'light';
        }

        return 'system';
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        View::share(
            'appearance',
            $request->cookie('appearance') ?? $this->defaultAppearance($request),
        );

        return $next($request);
    }
}
