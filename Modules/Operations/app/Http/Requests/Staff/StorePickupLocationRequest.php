<?php

namespace Modules\Operations\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;

class StorePickupLocationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
            'google_maps_url' => ['nullable', 'url', 'max:2048'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
