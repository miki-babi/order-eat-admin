<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SmsPhoneList extends Model
{
    /** @use HasFactory<\Database\Factories\SmsPhoneListFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'phone',
        'normalized_phone',
        'list_type',
        'note',
    ];
}
