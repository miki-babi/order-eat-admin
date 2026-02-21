<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TableSession extends Model
{
    /** @use HasFactory<\Database\Factories\TableSessionFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'dining_table_id',
        'session_token',
        'started_at',
        'last_seen_at',
        'verified_at',
        'verified_by_user_id',
        'initial_ip',
        'initial_user_agent',
        'verified_note',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'started_at' => 'datetime',
            'last_seen_at' => 'datetime',
            'verified_at' => 'datetime',
        ];
    }

    /**
     * Table this session belongs to.
     */
    public function diningTable(): BelongsTo
    {
        return $this->belongsTo(DiningTable::class);
    }

    /**
     * Staff user who verified the session.
     */
    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by_user_id');
    }

    /**
     * Orders placed from this session.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
