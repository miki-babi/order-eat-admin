<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Str;

class CustomerOrder extends Model
{
    /** @use HasFactory<\Database\Factories\CustomerOrderFactory> */
    use HasFactory;

    public const TYPE_PICKUP = 'pickup';
    public const TYPE_DELIVERY = 'delivery';

    public const STATUS_PENDING = 'pending';
    public const STATUS_CONFIRMED = 'confirmed';
    public const STATUS_PREPARING = 'preparing';
    public const STATUS_READY = 'ready';
    public const STATUS_OUT_FOR_DELIVERY = 'out_for_delivery';
    public const STATUS_DELIVERED = 'delivered';
    public const STATUS_CANCELLED = 'cancelled';

    public const RECEIPT_STATUS_PENDING = 'pending';
    public const RECEIPT_STATUS_APPROVED = 'approved';
    public const RECEIPT_STATUS_REJECTED = 'rejected';

    protected $fillable = [
        'customer_id',
        'customer_token',
        'tracking_token',
        'type',
        'status',
        'pickup_date',
        'pickup_time',
        'pickup_location_id',
        'delivery_phone',
        'delivery_address',
        'total_amount',
        'receipt_url',
        'receipt_status',
        'notify_when_ready',
        'source_channel',
        'disapproval_reason',
    ];

    protected function casts(): array
    {
        return [
            'pickup_date' => 'date',
            'notify_when_ready' => 'boolean',
            'total_amount' => 'decimal:2',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (self $order): void {
            if (! isset($order->tracking_token) || $order->tracking_token === '') {
                $order->tracking_token = (string) Str::uuid();
            }
        });
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(CustomerOrderItem::class);
    }

    public function pickupLocation(): BelongsTo
    {
        return $this->belongsTo(PickupLocation::class);
    }

    public function isPickup(): bool
    {
        return $this->type === self::TYPE_PICKUP;
    }

    public function isDelivery(): bool
    {
        return $this->type === self::TYPE_DELIVERY;
    }
}
