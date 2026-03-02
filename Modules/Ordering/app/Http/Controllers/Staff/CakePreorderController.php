<?php

namespace Modules\Ordering\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\CakePackage;
use App\Models\CakePreorder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Ordering\Http\Requests\Staff\StoreCakePackageRequest;
use Modules\Ordering\Http\Requests\Staff\UpdateCakePackageRequest;
use Modules\Ordering\Http\Requests\Staff\UpdateCakePreorderStatusRequest;

class CakePreorderController extends Controller
{
    /**
     * Show staff cake package management and preorder list.
     */
    public function index(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $search = trim((string) $request->input('search', ''));
        $status = is_string($request->input('status')) ? $request->input('status') : null;

        $packages = CakePackage::query()
            ->withCount('preorderItems')
            ->orderByDesc('is_active')
            ->orderBy('name')
            ->get()
            ->map(fn (CakePackage $package) => [
                'id' => $package->id,
                'name' => $package->name,
                'description' => $package->description,
                'image_url' => $this->toPublicAssetUrl($package->image_url),
                'price' => (float) $package->price,
                'is_active' => (bool) $package->is_active,
                'preorder_items_count' => (int) $package->preorder_items_count,
                'updated_at' => $package->updated_at?->toDateTimeString(),
            ])
            ->values();

        $preorders = CakePreorder::query()
            ->with(['customer', 'items.package'])
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
                        ->orWhereHas('items.package', fn ($packageQuery) => $packageQuery->where('name', 'like', "%{$search}%"));
                });
            })
            ->when($status && in_array($status, CakePreorder::statuses(), true), fn ($query) => $query->where('status', $status))
            ->orderBy('needed_date')
            ->orderByDesc('created_at')
            ->paginate(20)
            ->withQueryString()
            ->through(fn (CakePreorder $preorder) => [
                'id' => $preorder->id,
                'customer_name' => $preorder->customer?->name,
                'customer_phone' => $preorder->customer?->phone,
                'needed_date' => $preorder->needed_date?->toDateString(),
                'status' => $preorder->status,
                'special_instructions' => $preorder->special_instructions,
                'total_amount' => (float) $preorder->total_amount,
                'created_at' => $preorder->created_at?->toDateTimeString(),
                'items' => $preorder->items->map(fn ($item) => [
                    'id' => $item->id,
                    'package_name' => $item->package?->name,
                    'quantity' => $item->quantity,
                    'size' => $item->size,
                    'servings' => $item->servings,
                    'unit_price' => (float) $item->unit_price,
                    'line_total' => (float) $item->unit_price * $item->quantity,
                    'specification' => $item->specification,
                ])->values(),
            ]);

        return Inertia::render('staff/cake-preorders', [
            'packages' => $packages,
            'preorders' => $preorders,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
            'statusOptions' => CakePreorder::statuses(),
            'canManagePackages' => $user->hasPermission('menu_items.manage'),
            'canUpdateRequests' => $user->hasPermission('orders.update'),
            'summary' => [
                'total_packages' => CakePackage::query()->count(),
                'active_packages' => CakePackage::query()->where('is_active', true)->count(),
                'total_preorders' => CakePreorder::query()->count(),
                'pending_preorders' => CakePreorder::query()->where('status', 'pending')->count(),
            ],
        ]);
    }

    /**
     * Create a new cake package.
     */
    public function storePackage(StoreCakePackageRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $imagePath = $request->file('image')?->store('cake-packages', 'public');

        CakePackage::query()->create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'image_url' => $imagePath,
            'price' => $validated['price'],
            'is_active' => $request->boolean('is_active', true),
        ]);

        return back()->with('success', 'Cake package created.');
    }

    /**
     * Update an existing cake package.
     */
    public function updatePackage(UpdateCakePackageRequest $request, CakePackage $cakePackage): RedirectResponse
    {
        $validated = $request->validated();
        $imagePath = $cakePackage->image_url;

        if ($request->hasFile('image')) {
            if ($imagePath && ! str_starts_with($imagePath, 'http')) {
                Storage::disk('public')->delete($imagePath);
            }

            $imagePath = $request->file('image')->store('cake-packages', 'public');
        }

        $cakePackage->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'image_url' => $imagePath,
            'price' => $validated['price'],
            'is_active' => $request->boolean('is_active', $cakePackage->is_active),
        ]);

        return back()->with('success', 'Cake package updated.');
    }

    /**
     * Delete a cake package, or deactivate when historical preorders exist.
     */
    public function destroyPackage(CakePackage $cakePackage): RedirectResponse
    {
        if ($cakePackage->preorderItems()->exists()) {
            $cakePackage->update(['is_active' => false]);

            return back()->with('success', 'Cake package has request history and was deactivated.');
        }

        if ($cakePackage->image_url && ! str_starts_with($cakePackage->image_url, 'http')) {
            Storage::disk('public')->delete($cakePackage->image_url);
        }

        $cakePackage->delete();

        return back()->with('success', 'Cake package deleted.');
    }

    /**
     * Update staff status for a cake preorder.
     */
    public function updatePreorderStatus(
        UpdateCakePreorderStatusRequest $request,
        CakePreorder $cakePreorder,
    ): RedirectResponse {
        $cakePreorder->update([
            'status' => $request->validated('status'),
        ]);

        return back()->with('success', sprintf('Cake preorder #%d status updated.', $cakePreorder->id));
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
