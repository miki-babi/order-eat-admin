<?php

namespace Modules\Operations\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use App\Services\CustomerDossierService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the feedback.
     */
    public function index(Request $request, CustomerDossierService $dossierService)
    {
        $feedbacks = Feedback::with(['customer', 'order'])
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->withQueryString();

        $selectedCustomer = null;

        if ($request->filled('customer_id')) {
            /** @var \App\Models\User $user */
            $user = $request->user();
            $selectedCustomer = $dossierService->getDossier($request->integer('customer_id'), $user);
        }

        return Inertia::render('staff/feedbacks', [
            'feedbacks' => $feedbacks,
            'selectedCustomer' => $selectedCustomer,
            'filters' => $request->only(['search', 'rating', 'customer_id']),
        ]);
    }
}
