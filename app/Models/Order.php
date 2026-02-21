<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    public const SOURCE_WEB = 'web';

    public const SOURCE_TELEGRAM = 'telegram';

    public const SOURCE_TABLE = 'table';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'customer_id',
        'pickup_date',
        'pickup_location_id',
        'dining_table_id',
        'table_session_id',
        'source_channel',
        'receipt_url',
        'receipt_status',
        'order_status',
        'tracking_token',
        'total_amount',
        'disapproval_reason',
        'notify_when_ready',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'pickup_date' => 'date',
            'total_amount' => 'decimal:2',
            'notify_when_ready' => 'boolean',
        ];
    }

    /**
     * @return list<string>
     */
    public static function sourceChannels(): array
    {
        return [
            self::SOURCE_WEB,
            self::SOURCE_TELEGRAM,
            self::SOURCE_TABLE,
        ];
    }

    /**
     * Get the customer that owns this order.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the pickup location for this order.
     */
    public function pickupLocation(): BelongsTo
    {
        return $this->belongsTo(PickupLocation::class);
    }

    /**
     * Get the dining table used to place this order, if any.
     */
    public function diningTable(): BelongsTo
    {
        return $this->belongsTo(DiningTable::class);
    }

    /**
     * Get the originating QR table session, if any.
     */
    public function tableSession(): BelongsTo
    {
        return $this->belongsTo(TableSession::class);
    }

    /**
     * Get all order line items for this order.
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
