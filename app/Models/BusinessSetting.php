<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessSetting extends Model
{
    /** @use HasFactory<\Database\Factories\BusinessSettingFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'business_name',
        'description',
        'contact_phone',
        'contact_email',
        'contact_address',
        'social_facebook',
        'social_instagram',
        'social_tiktok',
        'social_telegram',
        'social_x',
    ];
}
