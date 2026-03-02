<?php

namespace Modules\Ordering\Http\Requests\Cake;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCakePreorderRequest extends FormRequest
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

        $items = $this->input('items');

        if (! is_array($items)) {
            return;
        }

        $normalizedItems = collect($items)
            ->map(function ($item): mixed {
                if (! is_array($item)) {
                    return $item;
                }

                if (! isset($item['quantity']) || ! is_numeric($item['quantity'])) {
                    $item['quantity'] = 1;
                }

                return $item;
            })
            ->all();

        $this->merge(['items' => $normalizedItems]);
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
            'needed_date' => ['required', 'date', 'after_or_equal:today'],
            'special_instructions' => ['nullable', 'string', 'max:3000'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.cake_package_id' => [
                'required',
                'integer',
                Rule::exists('cake_packages', 'id')->where('is_active', true),
            ],
            'items.*.quantity' => ['required', 'integer', 'min:1', 'max:20'],
            'items.*.size' => ['required', 'string', 'max:100'],
            'items.*.servings' => ['required', 'integer', 'min:1', 'max:1000'],
            'items.*.specification' => ['nullable', 'string', 'max:1000'],
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
