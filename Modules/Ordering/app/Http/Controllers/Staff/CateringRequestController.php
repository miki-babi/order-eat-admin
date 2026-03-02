<?php

namespace Modules\Ordering\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\CateringPackage;
use App\Models\CateringServiceRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Ordering\Http\Requests\Staff\StoreCateringPackageRequest;
use Modules\Ordering\Http\Requests\Staff\UpdateCateringPackageRequest;
use Modules\Ordering\Http\Requests\Staff\UpdateCateringServiceRequestStatusRequest;

class CateringRequestController extends Controller
{
    /**
     * Show staff catering package management and service request list.
     */
    public function index(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $search = trim((string) $request->input('search', ''));
        $status = is_string($request->input('status')) ? $request->input('status') : null;

        $packages = CateringPackage::query()
            ->withCount(['serviceRequestItems as service_requests_count'])
            ->orderByDesc('is_active')
            ->orderBy('name')
            ->get()
            ->map(fn (CateringPackage $package) => [
                'id' => $package->id,
                'name' => $package->name,
                'description' => $package->description,
                'image_url' => $this->toPublicAssetUrl($package->image_url),
                'price_per_person' => (float) $package->price_per_person,
                'min_guests' => (int) $package->min_guests,
                'is_active' => (bool) $package->is_active,
                'service_requests_count' => (int) $package->service_requests_count,
                'updated_at' => $package->updated_at?->toDateTimeString(),
            ])
            ->values();

        $requests = CateringServiceRequest::query()
            ->with(['customer', 'package', 'items.package'])
            ->when($search !== '', function ($query) use ($search): void {
                $query->where(function ($builder) use ($search): void {
                    if (is_numeric($search)) {
                        $builder->orWhere('id', (int) $search);
                    }

                    $builder
                        ->orWhereHas('customer', function ($customerQuery) use ($search): void {
                            $customerQuery
                                ->where('name', 'like', "%{$search}%")
                                ->orWhere('phone', 'like', "%{$search}%");
                        })
                        ->orWhereHas('package', fn ($packageQuery) => $packageQuery->where('name', 'like', "%{$search}%"))
                        ->orWhereHas('items.package', fn ($packageQuery) => $packageQuery->where('name', 'like', "%{$search}%"))
                        ->orWhere('venue', 'like', "%{$search}%");
                });
            })
            ->when($status && in_array($status, CateringServiceRequest::statuses(), true), fn ($query) => $query->where('status', $status))
            ->orderBy('event_date')
            ->orderByDesc('created_at')
            ->paginate(20)
            ->withQueryString()
            ->through(function (CateringServiceRequest $serviceRequest): array {
                $packageNames = $serviceRequest->items
                    ->map(fn ($item) => $item->package?->name)
                    ->filter(fn ($name): bool => is_string($name) && trim($name) !== '')
                    ->unique()
                    ->values();

                if ($packageNames->isEmpty() && $serviceRequest->package?->name) {
                    $packageNames->push($serviceRequest->package->name);
                }

                return [
                    'id' => $serviceRequest->id,
                    'customer_name' => $serviceRequest->customer?->name,
                    'customer_phone' => $serviceRequest->customer?->phone,
                    'package_name' => $serviceRequest->package?->name,
                    'package_names' => $packageNames->all(),
                    'event_date' => $serviceRequest->event_date?->toDateString(),
                    'guest_count' => $serviceRequest->guest_count,
                    'venue' => $serviceRequest->venue,
                    'status' => $serviceRequest->status,
                    'special_instructions' => $serviceRequest->special_instructions,
                    'created_at' => $serviceRequest->created_at?->toDateTimeString(),
                ];
            });

        return Inertia::render('staff/catering-requests', [
            'packages' => $packages,
            'requests' => $requests,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
            'statusOptions' => CateringServiceRequest::statuses(),
            'canManagePackages' => $user->hasPermission('menu_items.manage'),
            'canUpdateRequests' => $user->hasPermission('orders.update'),
            'summary' => [
                'total_packages' => CateringPackage::query()->count(),
                'active_packages' => CateringPackage::query()->where('is_active', true)->count(),
                'total_requests' => CateringServiceRequest::query()->count(),
                'pending_requests' => CateringServiceRequest::query()->where('status', 'pending')->count(),
            ],
        ]);
    }

    /**
     * Create a new catering package.
     */
    public function storePackage(StoreCateringPackageRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $imagePath = $request->file('image')?->store('catering-packages', 'public');

        CateringPackage::query()->create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'image_url' => $imagePath,
            'price_per_person' => $validated['price_per_person'],
            'min_guests' => $validated['min_guests'],
            'is_active' => $request->boolean('is_active', true),
        ]);

        return back()->with('success', 'Catering package created.');
    }

    /**
     * Update an existing catering package.
     */
    public function updatePackage(UpdateCateringPackageRequest $request, CateringPackage $cateringPackage): RedirectResponse
    {
        $validated = $request->validated();
        $imagePath = $cateringPackage->image_url;

        if ($request->hasFile('image')) {
            if ($imagePath && ! str_starts_with($imagePath, 'http')) {
                Storage::disk('public')->delete($imagePath);
            }

            $imagePath = $request->file('image')->store('catering-packages', 'public');
        }

        $cateringPackage->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'image_url' => $imagePath,
            'price_per_person' => $validated['price_per_person'],
            'min_guests' => $validated['min_guests'],
            'is_active' => $request->boolean('is_active', $cateringPackage->is_active),
        ]);

        return back()->with('success', 'Catering package updated.');
    }

    /**
     * Delete a catering package, or deactivate when historical requests exist.
     */
    public function destroyPackage(CateringPackage $cateringPackage): RedirectResponse
    {
        if ($cateringPackage->serviceRequests()->exists() || $cateringPackage->serviceRequestItems()->exists()) {
            $cateringPackage->update(['is_active' => false]);

            return back()->with('success', 'Catering package has request history and was deactivated.');
        }

        if ($cateringPackage->image_url && ! str_starts_with($cateringPackage->image_url, 'http')) {
            Storage::disk('public')->delete($cateringPackage->image_url);
        }

        $cateringPackage->delete();

        return back()->with('success', 'Catering package deleted.');
    }

    /**
     * Update staff status for a catering service request.
     */
    public function updateRequestStatus(
        UpdateCateringServiceRequestStatusRequest $request,
        CateringServiceRequest $cateringServiceRequest,
    ): RedirectResponse {
        $cateringServiceRequest->update([
            'status' => $request->validated('status'),
        ]);

        return back()->with('success', sprintf('Catering request #%d status updated.', $cateringServiceRequest->id));
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
}
