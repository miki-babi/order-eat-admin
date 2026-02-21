<?php

namespace App\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDiningTableRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, \Illuminate\Contracts\Validation\ValidationRule|string>|string>
     */
    public function rules(): array
    {
        return [
            'pickup_location_id' => [
                'required',
                'integer',
                Rule::exists('pickup_locations', 'id')->where('is_active', true),
            ],
            'name' => ['required', 'string', 'max:80'],
            'qr_code' => ['required', 'string', 'max:120', 'regex:/^[A-Za-z0-9._-]+$/', 'unique:dining_tables,qr_code'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
