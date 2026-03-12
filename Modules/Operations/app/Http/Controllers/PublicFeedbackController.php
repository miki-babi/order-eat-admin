<?php

namespace Modules\Operations\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BusinessSetting;
use App\Models\Feedback;
use App\Services\CustomerIdentityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class PublicFeedbackController extends Controller
{
    /**
     * Store a newly created feedback in storage.
     */
    public function store(Request $request, CustomerIdentityService $customerIdentityService)
    {
        $validated = $request->validate([
            'rating' => 'required|string|in:satisfied,unsatisfied',
            'comment' => 'nullable|string|max:1000',
            'order_id' => 'nullable|exists:orders,id',
            'customer_id' => 'nullable|exists:customers,id',
            'customer_token' => 'nullable|string|max:120',
        ]);

        $customerId = $validated['customer_id'] ?? null;

        if (! $customerId && ! empty($validated['customer_token'])) {
            $customer = $customerIdentityService->resolveCustomer($validated['customer_token'], [
                'name' => 'Guest',
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);
            $customerId = $customer->id;
        }

        $feedback = Feedback::create([
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
            'order_id' => $validated['order_id'] ?? null,
            'customer_id' => $customerId,
        ]);

        if ($validated['rating'] === 'satisfied') {
            $settings = BusinessSetting::first();
            $googleUrl = $settings?->google_review_url;

            if ($googleUrl) {
                return response()->json([
                    'message' => 'Thank you for your feedback! Redirecting to Google Reviews...',
                    'redirect_url' => $googleUrl,
                ]);
            }
        }

        return response()->json([
            'message' => 'Thank you for your feedback! We appreciate your input.',
        ]);
    }
}
