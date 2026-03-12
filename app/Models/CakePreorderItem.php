<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CakePreorderItem extends Model
{
    /** @use HasFactory<\Database\Factories\CakePreorderItemFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'cake_preorder_id',
        'cake_package_id',
        'quantity',
        'size',
        'servings',
        'unit_price',
        'specification',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'servings' => 'integer',
            'unit_price' => 'decimal:2',
        ];
    }

    /**
     * Parent cake preorder.
     */
    public function preorder(): BelongsTo
    {
        return $this->belongsTo(CakePreorder::class, 'cake_preorder_id');
    }

    /**
     * Cake package chosen for this line.
     */
    public function package(): BelongsTo
    {
        return $this->belongsTo(CakePackage::class, 'cake_package_id');
    }
}
