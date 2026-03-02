<?php

namespace Modules\Ordering\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BusinessSetting;
use App\Models\CateringPackage;
use App\Models\CateringServiceRequest;
use App\Models\Order;
use App\Services\CustomerIdentityService;
use App\Services\SmsEthiopiaService;
use App\Services\SmsTemplateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Ordering\Http\Requests\Catering\StoreCateringServiceRequest;

class CateringServiceController extends Controller
{
    /**
     * Show customer catering request page.
     */
    public function index(Request $request, CustomerIdentityService $customerIdentityService): Response
    {
        $packages = CateringPackage::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(fn (CateringPackage $package) => [
                'id' => $package->id,
                'name' => $package->name,
                'description' => $package->description,
                'image_url' => $this->toPublicAssetUrl($package->image_url),
            ])
            ->values();

        $customerToken = $customerIdentityService->resolveClientToken($request);
        $customerPrefill = $customerIdentityService->resolvePrefillFromToken($customerToken);
        $customerIdentityService->queueClientTokenCookie($customerToken);

        return Inertia::render('customer/catering', [
            'packages' => $packages,
            'customerToken' => $customerToken,
            'customerPrefill' => $customerPrefill,
            'business' => $this->businessInfo(),
        ]);
    }

    /**
     * Store a customer catering service request.
     */
    public function store(
        StoreCateringServiceRequest $request,
        CustomerIdentityService $customerIdentityService,
        SmsEthiopiaService $smsService,
        SmsTemplateService $smsTemplateService,
    ): RedirectResponse {
        $validated = $request->validated();
        $packageIds = collect($validated['package_ids'])->map(static fn (mixed $id): int => (int) $id)->unique()->values();
        $packages = CateringPackage::query()
            ->where('is_active', true)
            ->whereIn('id', $packageIds)
            ->get()
            ->keyBy('id');

        if ($packages->count() !== $packageIds->count()) {
            throw ValidationException::withMessages([
                'package_ids' => 'One or more selected catering packages are unavailable.',
            ]);
        }

        $customerToken = $customerIdentityService->resolveClientToken($request);
        $customer = $customerIdentityService->resolveCustomer($customerToken, [
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'source_channel' => Order::SOURCE_WEB,
            'user_agent' => $request->userAgent(),
            'ip' => $request->ip(),
        ]);
        $customerIdentityService->queueClientTokenCookie($customerToken);

        $serviceRequest = DB::transaction(function () use ($validated, $packageIds, $customer): CateringServiceRequest {
            $guestCount = (int) $validated['guest_count'];
            $primaryPackageId = (int) $packageIds->first();

            $serviceRequest = $customer->cateringServiceRequests()->create([
                'catering_package_id' => $primaryPackageId,
                'event_date' => $validated['event_date'],
                'guest_count' => $guestCount,
                'venue' => $validated['venue'] ?? null,
                'special_instructions' => $validated['special_instructions'] ?? null,
                'status' => 'pending',
                'total_estimate' => 0,
            ]);

            $serviceRequest->items()->createMany(
                $packageIds->map(fn (int $packageId): array => [
                    'catering_package_id' => $packageId,
                ])->all(),
            );

            return $serviceRequest;
        });

        $message = $smsTemplateService->renderNamed(
            'catering_request_created',
            [
                'name' => $customer->name,
                'requestid' => (string) $serviceRequest->id,
                'eventdate' => (string) $serviceRequest->event_date?->toDateString(),
                'guestcount' => (string) $serviceRequest->guest_count,
            ],
            'Hi {name}, your catering request #{requestid} for {eventdate} ({guestcount} guests) is received.',
        );

        $smsService->send($customer->phone, $message, $customer);

        return back()->with('success', sprintf('Catering request #%d submitted successfully.', $serviceRequest->id));
    }

    /**
     * Build a public URL for either external URLs or local storage paths.
     */
    protected function toPublicAssetUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        /** @var \Illuminate\Filesystem\FilesystemAdapter $publicDisk */
        $publicDisk = Storage::disk('public');

        return str_starts_with($path, 'http://') || str_starts_with($path, 'https://')
            ? $path
            : $publicDisk->url($path);
    }

    /**
     * Resolve business details for customer-facing footer.
     *
     * @return array{
     *     business_name:string,
     *     description:?string,
     *     contact_phone:?string,
     *     contact_email:?string,
     *     contact_address:?string,
     *     socials:array{
     *         facebook:?string,
     *         instagram:?string,
     *         tiktok:?string,
     *         telegram:?string,
     *         x:?string
     *     }
     * }
     */
    protected function businessInfo(): array
    {
        $settings = BusinessSetting::query()->orderBy('id')->first();

        return [
            'business_name' => $settings?->business_name ?: (string) config('app.name'),
            'description' => $settings?->description,
            'contact_phone' => $settings?->contact_phone,
            'contact_email' => $settings?->contact_email,
            'contact_address' => $settings?->contact_address,
            'socials' => [
                'facebook' => $settings?->social_facebook,
                'instagram' => $settings?->social_instagram,
                'tiktok' => $settings?->social_tiktok,
                'telegram' => $settings?->social_telegram,
                'x' => $settings?->social_x,
            ],
        ];
    }
}
