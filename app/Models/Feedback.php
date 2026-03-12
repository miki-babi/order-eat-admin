<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    protected $table = 'feedbacks';

    protected $fillable = [
        'rating',
        'comment',
        'customer_id',
        'order_id',
    ];

    /**
     * Get the customer that submitted the feedback.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the order associated with the feedback.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
