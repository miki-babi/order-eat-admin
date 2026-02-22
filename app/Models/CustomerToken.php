<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class CustomerToken extends Model
{
    /** @use HasFactory<\Database\Factories\CustomerTokenFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'customer_id',
        'token',
        'first_seen_at',
        'last_seen_at',
        'last_seen_channel',
        'last_seen_user_agent',
        'last_seen_ip',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'first_seen_at' => 'datetime',
            'last_seen_at' => 'datetime',
        ];
    }

    public static function generateToken(): string
    {
        do {
            $token = Str::ulid()->toBase32();
        } while (static::query()->where('token', $token)->exists());

        return $token;
    }

    /**
     * Get the customer this token belongs to.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
