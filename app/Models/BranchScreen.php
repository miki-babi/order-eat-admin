<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BranchScreen extends Model
{
    /** @use HasFactory<\Database\Factories\BranchScreenFactory> */
    use HasFactory;

    public const TYPE_WAITER = 'waiter';

    public const TYPE_KITCHEN = 'kitchen';

    public const TYPE_CASHIER = 'cashier';

    /**
     * @return list<string>
     */
    public static function types(): array
    {
        return [
            self::TYPE_WAITER,
            self::TYPE_KITCHEN,
            self::TYPE_CASHIER,
        ];
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'pickup_location_id',
        'name',
        'screen_type',
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
            'is_active' => 'boolean',
        ];
    }

    /**
     * Branch this screen belongs to.
     */
    public function pickupLocation(): BelongsTo
    {
        return $this->belongsTo(PickupLocation::class);
    }

    /**
     * Users assigned to this screen.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Menu items assigned to this kitchen screen.
     */
    public function menuItems(): BelongsToMany
    {
        return $this->belongsToMany(MenuItem::class, 'branch_screen_menu_item');
    }

    /**
     * Per-order workflow statuses for this screen.
     */
    public function orderStatuses(): HasMany
    {
        return $this->hasMany(OrderScreenStatus::class);
    }
}
