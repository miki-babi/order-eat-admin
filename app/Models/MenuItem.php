<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MenuItem extends Model
{
    /** @use HasFactory<\Database\Factories\MenuItemFactory> */
    use HasFactory;

    public const CHANNEL_TELEGRAM = 'telegram';

    public const CHANNEL_WEB = 'web';

    public const CHANNEL_QR_MENU = 'qr_menu';

    /**
     * @var list<string>
     */
    private const VISIBILITY_CHANNELS = [
        self::CHANNEL_TELEGRAM,
        self::CHANNEL_WEB,
        self::CHANNEL_QR_MENU,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'category',
        'image_url',
        'is_active',
        'is_featured',
        'visibility_channels',
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'visibility_channels' => '["telegram","web","qr_menu"]',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'visibility_channels' => 'array',
        ];
    }

    /**
     * @return list<string>
     */
    public static function visibilityChannels(): array
    {
        return self::VISIBILITY_CHANNELS;
    }

    public static function normalizeVisibilityChannel(?string $channel): string
    {
        $normalized = strtolower(trim((string) $channel));

        return in_array($normalized, self::VISIBILITY_CHANNELS, true)
            ? $normalized
            : self::CHANNEL_WEB;
    }

    /**
     * @param  array<array-key, mixed>  $channels
     * @return list<string>
     */
    public static function normalizeVisibilityChannels(array $channels): array
    {
        $valid = [];

        foreach ($channels as $channel) {
            if (! is_string($channel)) {
                continue;
            }

            $normalized = strtolower(trim($channel));

            if (in_array($normalized, self::VISIBILITY_CHANNELS, true)) {
                $valid[$normalized] = true;
            }
        }

        return array_values(
            array_filter(
                self::VISIBILITY_CHANNELS,
                static fn (string $channel): bool => isset($valid[$channel]),
            ),
        );
    }

    public function scopeVisibleIn(Builder $query, string $channel): Builder
    {
        return $query->whereJsonContains('visibility_channels', self::normalizeVisibilityChannel($channel));
    }

    public function isVisibleInChannel(string $channel): bool
    {
        $normalizedChannel = self::normalizeVisibilityChannel($channel);
        $channels = is_array($this->visibility_channels) ? $this->visibility_channels : [];
        $normalizedChannels = self::normalizeVisibilityChannels($channels);

        return in_array($normalizedChannel, $normalizedChannels, true);
    }

    /**
     * Get all order items that reference this menu item.
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Kitchen screens where this item should appear.
     */
    public function kitchenScreens(): BelongsToMany
    {
        return $this->belongsToMany(BranchScreen::class, 'branch_screen_menu_item');
    }
}
