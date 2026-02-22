<?php

namespace App\Http\Middleware;

use App\Services\FeatureToggleService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureFeatureEnabled
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $featureKey): Response
    {
        $featureToggleService = app(FeatureToggleService::class);

        if ($featureToggleService->isEnabled($featureKey)) {
            return $next($request);
        }

        if ($request->expectsJson()) {
            $payload = $featureToggleService->lockPayload($featureKey);

            return response()->json([
                'message' => $payload['message'],
                'feature_key' => $payload['feature_key'],
                'help_url' => $payload['help_url'],
            ], 423);
        }

        if (! $request->isMethod('GET') && ! $request->isMethod('HEAD')) {
            return redirect()->route('feature.locked', ['featureKey' => $featureKey]);
        }

        $response = inertia('locked-feature', [
            'feature' => $featureToggleService->lockPayload($featureKey),
        ])->toResponse($request);

        $response->setStatusCode(423);

        return $response;
    }
}
