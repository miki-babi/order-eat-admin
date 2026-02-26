<?php

namespace Modules\Ordering\Http\Requests\Orders;

use Illuminate\Foundation\Http\FormRequest;

class StoreTableOrderPhoneRequest extends FormRequest
{
    /**
     * Normalize phone formatting so validation accepts common user input variants.
     */
    protected function prepareForValidation(): void
    {
        $phone = $this->input('phone');

        if (! is_string($phone)) {
            return;
        }

        $normalizedForValidation = preg_replace('/[^\d+]/', '', $phone);

        if (is_string($normalizedForValidation)) {
            $this->merge([
                'phone' => $normalizedForValidation,
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, \Illuminate\Contracts\Validation\ValidationRule|string>|string>
     */
    public function rules(): array
    {
        return [
            'phone' => ['required', 'string', 'max:20', 'regex:/^(?:\+?251|0)?[79]\d{8}$/'],
        ];
    }

    /**
     * Custom messages for clearer customer guidance.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'phone.regex' => 'Phone must be in 2519XXXXXXXX, +2519XXXXXXXX, 09XXXXXXXX, or 9XXXXXXXX format.',
        ];
    }
}

