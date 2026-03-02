<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CakePreorder extends Model
{
    /** @use HasFactory<\Database\Factories\CakePreorderFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'customer_id',
        'needed_date',
        'status',
        'special_instructions',
        'total_amount',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'needed_date' => 'date',
            'total_amount' => 'decimal:2',
        ];
    }

    /**
     * @return list<string>
     */
    public static function statuses(): array
    {
        return ['pending', 'reviewed', 'confirmed', 'completed', 'cancelled'];
    }

    /**
     * Customer who placed this preorder.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Line items in this preorder.
     */
    public function items(): HasMany
    {
        return $this->hasMany(CakePreorderItem::class);
    }
}
