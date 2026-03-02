<?php

namespace Modules\Ordering\Http\Requests\Catering;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCateringServiceRequest extends FormRequest
{
    /**
     * Normalize phone input for validation.
     */
    protected function prepareForValidation(): void
    {
        $phone = $this->input('phone');

        if (! is_string($phone)) {
            return;
        }

        $normalized = preg_replace('/[^\d+]/', '', $phone);

        if (is_string($normalized)) {
            $this->merge(['phone' => $normalized]);
        }

        $packageIds = $this->input('package_ids');
        $legacyPackageId = $this->input('catering_package_id');

        if (! is_array($packageIds) && is_numeric($legacyPackageId)) {
            $this->merge([
                'package_ids' => [(int) $legacyPackageId],
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>|string>
     */
    public function rules(): array
    {
        return [
            'customer_token' => ['nullable', 'string', 'max:120', 'regex:/^[A-Za-z0-9_-]{20,120}$/'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20', 'regex:/^(?:\+?251|0)?[79]\d{8}$/'],
            'package_ids' => ['required', 'array', 'min:1', 'max:20'],
            'package_ids.*' => [
                'required',
                'integer',
                'distinct',
                Rule::exists('catering_packages', 'id')->where('is_active', true),
            ],
            'catering_package_id' => ['nullable', 'integer'],
            'event_date' => ['required', 'date', 'after_or_equal:today'],
            'guest_count' => ['required', 'integer', 'min:1', 'max:5000'],
            'venue' => ['nullable', 'string', 'max:255'],
            'special_instructions' => ['nullable', 'string', 'max:3000'],
        ];
    }

    /**
     * Custom messages for contact and phone validation.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'phone.regex' => 'Phone must be in 2519XXXXXXXX, +2519XXXXXXXX, 09XXXXXXXX, or 9XXXXXXXX format.',
            'customer_token.regex' => 'Customer token format is invalid.',
        ];
    }
}
