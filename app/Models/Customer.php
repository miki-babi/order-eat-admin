<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Customer extends Model
{
    /** @use HasFactory<\Database\Factories\CustomerFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'phone',
        'telegram_id',
        'telegram_username',
    ];

    /**
     * Get all orders for the customer.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get all cake preorders for the customer.
     */
    public function cakePreorders(): HasMany
    {
        return $this->hasMany(CakePreorder::class);
    }

    /**
     * Get all catering service requests for the customer.
     */
    public function cateringServiceRequests(): HasMany
    {
        return $this->hasMany(CateringServiceRequest::class);
    }

    /**
     * Device/browser tokens associated with this customer.
     */
    public function tokens(): HasMany
    {
        return $this->hasMany(CustomerToken::class);
    }

    /**
     * Get the most recent order for this customer.
     */
    public function latestOrder(): HasOne
    {
        return $this->hasOne(Order::class)->latestOfMany();
    }

    /**
     * Get all SMS logs for the customer.
     */
    public function smsLogs(): HasMany
    {
        return $this->hasMany(SmsLog::class);
    }
}
