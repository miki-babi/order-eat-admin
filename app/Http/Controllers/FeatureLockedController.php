<?php

namespace App\Http\Controllers;

use App\Services\FeatureToggleService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FeatureLockedController extends Controller
{
    /**
     * Show a generic lock page for a disabled feature.
     */
    public function __invoke(string $featureKey, FeatureToggleService $featureToggleService): Response|RedirectResponse
    {
        if ($featureToggleService->isEnabled($featureKey)) {
            return to_route('home');
        }

        return Inertia::render('locked-feature', [
            'feature' => $featureToggleService->lockPayload($featureKey),
        ]);
    }
}
