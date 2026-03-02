<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CateringPackage extends Model
{
    /** @use HasFactory<\Database\Factories\CateringPackageFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'image_url',
        'price_per_person',
        'min_guests',
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
            'price_per_person' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Requests submitted for this package.
     */
    public function serviceRequests(): HasMany
    {
        return $this->hasMany(CateringServiceRequest::class);
    }

    /**
     * Request line items selecting this package.
     */
    public function serviceRequestItems(): HasMany
    {
        return $this->hasMany(CateringServiceRequestItem::class);
    }
}
