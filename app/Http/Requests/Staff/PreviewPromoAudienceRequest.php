<?php

namespace App\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PreviewPromoAudienceRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, \Illuminate\Contracts\Validation\ValidationRule|string>|string>
     */
    public function rules(): array
    {
        return [
            'platform' => ['required', Rule::in(['sms', 'telegram'])],
            'search' => ['nullable', 'string', 'max:80'],

            'orders_min' => ['nullable', 'integer', 'min:0'],
            'orders_max' => ['nullable', 'integer', 'min:0'],
            'recency_min_days' => ['nullable', 'integer', 'min:0'],
            'recency_max_days' => ['nullable', 'integer', 'min:0'],
            'total_spent_min' => ['nullable', 'numeric', 'min:0'],
            'total_spent_max' => ['nullable', 'numeric', 'min:0'],
            'avg_order_value_min' => ['nullable', 'numeric', 'min:0'],
            'avg_order_value_max' => ['nullable', 'numeric', 'min:0'],

            'branch_ids' => ['nullable', 'array'],
            'branch_ids.*' => ['integer', 'exists:pickup_locations,id'],
            'include_menu_item_ids' => ['nullable', 'array'],
            'include_menu_item_ids.*' => ['integer', 'exists:menu_items,id'],
            'exclude_menu_item_ids' => ['nullable', 'array'],
            'exclude_menu_item_ids.*' => ['integer', 'exists:menu_items,id'],
        ];
    }
}
