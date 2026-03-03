<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CakePackage extends Model
{
    /** @use HasFactory<\Database\Factories\CakePackageFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'parent_id',
        'name',
        'description',
        'image_url',
        'price',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'parent_id' => 'integer',
            'price' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Parent package when this is a sub-package.
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /**
     * Child sub-packages under this package.
     */
    public function subPackages(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /**
     * Scope only top-level packages.
     */
    public function scopeTopLevel(Builder $query): Builder
    {
        return $query->whereNull('parent_id');
    }

    /**
     * Scope packages that customers are allowed to preorder directly.
     *
     * Customers can order:
     * - standalone top-level packages (no active sub-packages), or
     * - active sub-packages whose parent package is active.
     */
    public function scopeOrderableForCustomer(Builder $query): Builder
    {
        return $query
            ->where('is_active', true)
            ->where(function (Builder $builder): void {
                $builder
                    ->where(function (Builder $standalone): void {
                        $standalone
                            ->whereNull('parent_id')
                            ->whereDoesntHave(
                                'subPackages',
                                fn (Builder $subPackagesQuery) => $subPackagesQuery->where('is_active', true),
                            );
                    })
                    ->orWhere(function (Builder $subPackage): void {
                        $subPackage
                            ->whereNotNull('parent_id')
                            ->whereHas('parent', fn (Builder $parentQuery) => $parentQuery->where('is_active', true));
                    });
            });
    }

    /**
     * Cake preorder line items using this package.
     */
    public function preorderItems(): HasMany
    {
        return $this->hasMany(CakePreorderItem::class);
    }
}
