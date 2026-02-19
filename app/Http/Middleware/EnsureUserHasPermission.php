<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasPermission
{
    /**
     * Ensure the current user has at least one of the provided permission slugs.
     */
    public function handle(Request $request, Closure $next, string ...$permissions): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(403);
        }

        if ($permissions === []) {
            return $next($request);
        }

        if (! $user->hasAnyPermission($permissions)) {
            abort(403);
        }

        return $next($request);
    }
}

