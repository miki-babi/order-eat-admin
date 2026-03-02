<?php

namespace Modules\Ordering\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BusinessSetting;
use App\Models\CakePackage;
use App\Models\CakePreorder;
use App\Models\Order;
use App\Services\CustomerIdentityService;
use App\Services\SmsEthiopiaService;
use App\Services\SmsTemplateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Ordering\Http\Requests\Cake\StoreCakePreorderRequest;

class CakePreorderController extends Controller
{
    /**
     * Show customer cake preorder page.
     */
    public function index(Request $request, CustomerIdentityService $customerIdentityService): Response
    {
        $packages = CakePackage::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(fn (CakePackage $package) => [
                'id' => $package->id,
                'name' => $package->name,
                'description' => $package->description,
                'image_url' => $this->toPublicAssetUrl($package->image_url),
                'price' => (float) $package->price,
            ])
            ->values();

        $customerToken = $customerIdentityService->resolveClientToken($request);
        $customerPrefill = $customerIdentityService->resolvePrefillFromToken($customerToken);
        $customerIdentityService->queueClientTokenCookie($customerToken);

        return Inertia::render('customer/cakes', [
            'packages' => $packages,
            'customerToken' => $customerToken,
            'customerPrefill' => $customerPrefill,
            'business' => $this->businessInfo(),
        ]);
    }

    /**
     * Store a customer cake preorder.
     *
     * @throws ValidationException
     */
    public function store(
        StoreCakePreorderRequest $request,
        CustomerIdentityService $customerIdentityService,
        SmsEthiopiaService $smsService,
        SmsTemplateService $smsTemplateService,
    ): RedirectResponse {
        $validated = $request->validated();
        $items = collect($validated['items']);
        $packageIds = $items->pluck('cake_package_id')->unique()->values();

        $packages = CakePackage::query()
            ->where('is_active', true)
            ->whereIn('id', $packageIds)
            ->get()
            ->keyBy('id');

        if ($packages->count() !== $packageIds->count()) {
            throw ValidationException::withMessages([
                'items' => 'One or more selected cake packages are unavailable.',
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

        $preorder = DB::transaction(function () use ($validated, $items, $packages, $customer): CakePreorder {
            $totalAmount = $this->totalAmount($items, $packages);

            $preorder = $customer->cakePreorders()->create([
                'needed_date' => $validated['needed_date'],
                'status' => 'pending',
                'special_instructions' => $validated['special_instructions'] ?? null,
                'total_amount' => $totalAmount,
            ]);

            $preorder->items()->createMany(
                $items->map(fn (array $item) => [
                    'cake_package_id' => $item['cake_package_id'],
                    'quantity' => $item['quantity'],
                    'size' => $item['size'],
                    'servings' => $item['servings'],
                    'unit_price' => $packages[$item['cake_package_id']]->price,
                    'specification' => $item['specification'] ?? null,
                ])->all(),
            );

            return $preorder;
        });

        $message = $smsTemplateService->renderNamed(
            'cake_preorder_created',
            [
                'name' => $customer->name,
                'requestid' => (string) $preorder->id,
                'eventdate' => (string) $preorder->needed_date?->toDateString(),
                'total' => number_format((float) $preorder->total_amount, 2, '.', ''),
            ],
            'Hi {name}, your cake preorder #{requestid} for {eventdate} has been received. Estimated total: {total} ETB.',
        );

        $smsService->send($customer->phone, $message, $customer);

        return back()->with('success', sprintf('Cake preorder #%d submitted successfully.', $preorder->id));
    }

    /**
     * @param  Collection<int, array{cake_package_id:int, quantity:int, size:string, servings:int, specification?:string|null}>  $items
     * @param  Collection<int, CakePackage>  $packages
     */
    protected function totalAmount(Collection $items, Collection $packages): float
    {
        return (float) $items->sum(
            fn (array $item): float => (float) $packages[$item['cake_package_id']]->price * (int) $item['quantity'],
        );
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
