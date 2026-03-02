<?php

namespace Modules\Ordering\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\BusinessSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Ordering\Http\Requests\Staff\UpdateBusinessSettingsRequest;

class BusinessSettingsController extends Controller
{
    /**
     * Show business settings form for staff admins.
     */
    public function index(Request $request): Response
    {
        $settings = $this->resolveSettings();

        return Inertia::render('staff/business-settings', [
            'settings' => [
                'business_name' => $settings->business_name,
                'description' => $settings->description,
                'contact_phone' => $settings->contact_phone,
                'contact_email' => $settings->contact_email,
                'contact_address' => $settings->contact_address,
                'social_facebook' => $settings->social_facebook,
                'social_instagram' => $settings->social_instagram,
                'social_tiktok' => $settings->social_tiktok,
                'social_telegram' => $settings->social_telegram,
                'social_x' => $settings->social_x,
            ],
            'canManageSettings' => $request->user()?->hasPermission('menu_items.manage') ?? false,
        ]);
    }

    /**
     * Persist business settings.
     */
    public function update(UpdateBusinessSettingsRequest $request): RedirectResponse
    {
        $settings = $this->resolveSettings();
        $validated = $request->validated();

        $settings->update([
            'business_name' => $validated['business_name'],
            'description' => $this->sanitizeRichText($validated['description'] ?? null),
            'contact_phone' => $validated['contact_phone'] ?? null,
            'contact_email' => $validated['contact_email'] ?? null,
            'contact_address' => $validated['contact_address'] ?? null,
            'social_facebook' => $validated['social_facebook'] ?? null,
            'social_instagram' => $validated['social_instagram'] ?? null,
            'social_tiktok' => $validated['social_tiktok'] ?? null,
            'social_telegram' => $validated['social_telegram'] ?? null,
            'social_x' => $validated['social_x'] ?? null,
        ]);

        return back()->with('success', 'Business settings updated.');
    }

    /**
     * Return current settings or create default settings once.
     */
    protected function resolveSettings(): BusinessSetting
    {
        /** @var BusinessSetting|null $existing */
        $existing = BusinessSetting::query()->orderBy('id')->first();

        if ($existing) {
            return $existing;
        }

        return BusinessSetting::query()->create([
            'business_name' => (string) config('app.name'),
        ]);
    }

    /**
     * Sanitize rich-text HTML content before persisting.
     */
    protected function sanitizeRichText(?string $value): ?string
    {
        if (! is_string($value)) {
            return null;
        }

        $raw = trim($value);

        if ($raw === '') {
            return null;
        }

        $clean = preg_replace('/<(script|style)\b[^>]*>.*?<\/\1>/is', '', $raw) ?? $raw;
        $clean = strip_tags($clean, '<p><br><strong><b><em><i><u><ul><ol><li><a>');
        $clean = preg_replace('/\s+on\w+\s*=\s*("|\').*?\1/i', '', $clean) ?? $clean;
        $clean = preg_replace('/href\s*=\s*("|\')\s*javascript:[^"\']*\1/i', 'href="#"', $clean) ?? $clean;
        $clean = trim($clean);

        return $clean === '' ? null : $clean;
    }
}
