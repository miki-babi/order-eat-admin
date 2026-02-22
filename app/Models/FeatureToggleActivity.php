<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FeatureToggleActivity extends Model
{
    /** @use HasFactory<\Database\Factories\FeatureToggleActivityFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'feature_toggle_id',
        'actor_user_id',
        'action',
        'previous_enabled',
        'next_enabled',
        'message',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'previous_enabled' => 'boolean',
            'next_enabled' => 'boolean',
        ];
    }

    /**
     * Toggle associated with this audit entry.
     */
    public function featureToggle(): BelongsTo
    {
        return $this->belongsTo(FeatureToggle::class);
    }

    /**
     * User who performed the change.
     */
    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_user_id');
    }
}
