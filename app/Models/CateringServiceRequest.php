<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CateringServiceRequest extends Model
{
    /** @use HasFactory<\Database\Factories\CateringServiceRequestFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'customer_id',
        'catering_package_id',
        'event_date',
        'guest_count',
        'venue',
        'special_instructions',
        'status',
        'total_estimate',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'event_date' => 'date',
            'total_estimate' => 'decimal:2',
        ];
    }

    /**
     * @return list<string>
     */
    public static function statuses(): array
    {
        return ['pending', 'reviewed', 'quoted', 'confirmed', 'completed', 'cancelled'];
    }

    /**
     * Customer who submitted this request.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Package chosen for this catering request.
     */
    public function package(): BelongsTo
    {
        return $this->belongsTo(CateringPackage::class, 'catering_package_id');
    }

    /**
     * All selected packages attached to this request.
     */
    public function items(): HasMany
    {
        return $this->hasMany(CateringServiceRequestItem::class);
    }
}
