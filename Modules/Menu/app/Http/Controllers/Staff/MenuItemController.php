<?php

namespace Modules\Menu\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Modules\Menu\Http\Requests\Staff\StoreMenuItemRequest;
use Modules\Menu\Http\Requests\Staff\UpdateMenuItemRequest;
use App\Models\MenuItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MenuItemController extends Controller
{
    /**
     * Show menu item management page for staff.
     */
    public function index(Request $request): Response
    {
        $search = trim((string) $request->input('search', ''));
        $category = $request->input('category');
        $status = $request->input('status', 'all');

        $items = MenuItem::query()
            ->withCount('orderItems')
            ->when($search !== '', function ($query) use ($search): void {
                $query->where(function ($builder) use ($search): void {
                    $builder
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%");
                });
            })
            ->when($category, fn ($query, $value) => $query->where('category', $value))
            ->when($status === 'active', fn ($query) => $query->where('is_active', true))
            ->when($status === 'inactive', fn ($query) => $query->where('is_active', false))
            ->orderByDesc('is_active')
            ->orderBy('name')
            ->get()
            ->map(fn (MenuItem $item) => [
                'id' => $item->id,
                'name' => $item->name,
                'description' => $item->description,
                'price' => (float) $item->price,
                'category' => $item->category,
                'is_active' => $item->is_active,
                'is_featured' => $item->is_featured,
                'visibility_channels' => $this->normalizeVisibilityChannels($item->visibility_channels),
                'image_url' => $this->toPublicAssetUrl($item->image_url),
                'order_items_count' => $item->order_items_count,
                'updated_at' => $item->updated_at?->toDateTimeString(),
            ]);

        $categories = MenuItem::query()
            ->whereNotNull('category')
            ->orderBy('category')
            ->distinct()
            ->pluck('category')
            ->values();

        return Inertia::render('staff/menu-items', [
            'items' => $items,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $category,
                'status' => $status,
            ],
            'visibilityChannels' => MenuItem::visibilityChannels(),
            'summary' => [
                'total_items' => MenuItem::query()->count(),
                'active_items' => MenuItem::query()->where('is_active', true)->count(),
            ],
        ]);
    }

    /**
     * Create a new menu item.
     */
    public function store(StoreMenuItemRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $visibilityChannels = $this->normalizeVisibilityChannels($validated['visibility_channels'] ?? []);

        $imagePath = $request->file('image')?->store('menu-items', 'public');

        MenuItem::query()->create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'category' => $validated['category'] ?? null,
            'image_url' => $imagePath,
            'is_active' => $request->boolean('is_active', true),
            'is_featured' => $request->boolean('is_featured', false),
            'visibility_channels' => $visibilityChannels,
        ]);

        return back()->with('success', 'Menu item created.');
    }

    /**
     * Update an existing menu item.
     */
    public function update(UpdateMenuItemRequest $request, MenuItem $menuItem): RedirectResponse
    {
        $validated = $request->validated();
        $visibilityChannels = $this->normalizeVisibilityChannels($validated['visibility_channels'] ?? []);

        $imagePath = $menuItem->image_url;

        if ($request->hasFile('image')) {
            if ($imagePath && ! str_starts_with($imagePath, 'http')) {
                Storage::disk('public')->delete($imagePath);
            }

            $imagePath = $request->file('image')->store('menu-items', 'public');
        }

        $menuItem->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'category' => $validated['category'] ?? null,
            'image_url' => $imagePath,
            'is_active' => $request->boolean('is_active', $menuItem->is_active),
            'is_featured' => $request->boolean('is_featured', $menuItem->is_featured),
            'visibility_channels' => $visibilityChannels,
        ]);

        return back()->with('success', 'Menu item updated.');
    }

    /**
     * Delete a menu item, or deactivate it when historical order items exist.
     */
    public function destroy(MenuItem $menuItem): RedirectResponse
    {
        if ($menuItem->orderItems()->exists()) {
            $menuItem->update(['is_active' => false]);

            return back()->with('success', 'Menu item has history and was deactivated instead of deleted.');
        }

        if ($menuItem->image_url && ! str_starts_with($menuItem->image_url, 'http')) {
            Storage::disk('public')->delete($menuItem->image_url);
        }

        $menuItem->delete();

        return back()->with('success', 'Menu item deleted.');
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
     * @param  array<array-key, mixed>|null  $channels
     * @return list<string>
     */
    protected function normalizeVisibilityChannels(?array $channels): array
    {
        return MenuItem::normalizeVisibilityChannels($channels ?? []);
    }
}
