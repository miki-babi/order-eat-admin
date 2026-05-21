<?php

namespace App\Models;

use Database\Factories\CustomerFactory;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Sanctum\HasApiTokens;

class Customer extends Model implements AuthenticatableContract
{
    /** @use HasFactory<CustomerFactory> */
    use Authenticatable , HasApiTokens , HasFactory;

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
        'tags',
        'password',
    ];

    /*
         * The attributes that should be hidden for serialization.
         *
         * @var list<string>
         */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'password' => 'hashed',
        ];
    }

    /**
     * Get all orders for the customer.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get all customer orders for this customer.
     */
    public function customerOrders(): HasMany
    {
        return $this->hasMany(CustomerOrder::class);
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
    public function trackingtokens(): HasMany
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
