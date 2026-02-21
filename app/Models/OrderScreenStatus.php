<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderScreenStatus extends Model
{
    /** @use HasFactory<\Database\Factories\OrderScreenStatusFactory> */
    use HasFactory;

    public const STATUS_PENDING = 'pending';

    public const STATUS_PREPARING = 'preparing';

    public const STATUS_PREPARED = 'prepared';

    /**
     * @return list<string>
     */
    public static function statuses(): array
    {
        return [
            self::STATUS_PENDING,
            self::STATUS_PREPARING,
            self::STATUS_PREPARED,
        ];
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'order_id',
        'branch_screen_id',
        'status',
        'preparing_started_at',
        'prepared_at',
        'updated_by_user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'preparing_started_at' => 'datetime',
            'prepared_at' => 'datetime',
        ];
    }

    /**
     * Owning order.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Screen for this status row.
     */
    public function branchScreen(): BelongsTo
    {
        return $this->belongsTo(BranchScreen::class);
    }

    /**
     * User who last updated this row.
     */
    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by_user_id');
    }
}
