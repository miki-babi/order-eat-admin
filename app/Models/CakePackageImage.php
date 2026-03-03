<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CakePackageImage extends Model
{
    /** @use HasFactory<\Database\Factories\CakePackageImageFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'cake_package_id',
        'image_url',
        'caption',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
        ];
    }

    /**
     * Owning cake package.
     */
    public function package(): BelongsTo
    {
        return $this->belongsTo(CakePackage::class, 'cake_package_id');
    }
}
