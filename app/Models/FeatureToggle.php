<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FeatureToggle extends Model
{
    /** @use HasFactory<\Database\Factories\FeatureToggleFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'feature_key',
        'name',
        'description',
        'is_enabled',
        'lock_message',
        'help_url',
        'last_toggled_at',
        'last_toggled_by_user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_enabled' => 'boolean',
            'last_toggled_at' => 'datetime',
        ];
    }

    /**
     * User who last changed this toggle.
     */
    public function lastToggledBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'last_toggled_by_user_id');
    }

    /**
     * Audit entries for this toggle.
     */
    public function activities(): HasMany
    {
        return $this->hasMany(FeatureToggleActivity::class);
    }
}
