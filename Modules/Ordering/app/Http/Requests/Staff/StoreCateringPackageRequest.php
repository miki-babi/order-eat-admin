<?php

namespace Modules\Ordering\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;

class StoreCateringPackageRequest extends FormRequest
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
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
            'price_per_person' => ['required', 'numeric', 'min:0'],
            'min_guests' => ['required', 'integer', 'min:1', 'max:10000'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
