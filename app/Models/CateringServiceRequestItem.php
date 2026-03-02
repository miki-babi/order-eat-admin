<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CateringServiceRequestItem extends Model
{
    /** @use HasFactory<\Database\Factories\CateringServiceRequestItemFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'catering_service_request_id',
        'catering_package_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [];
    }

    /**
     * Parent catering request.
     */
    public function request(): BelongsTo
    {
        return $this->belongsTo(CateringServiceRequest::class, 'catering_service_request_id');
    }

    /**
     * Package selected on this line.
     */
    public function package(): BelongsTo
    {
        return $this->belongsTo(CateringPackage::class, 'catering_package_id');
    }
}
