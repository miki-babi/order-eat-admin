<?php

namespace Modules\Messaging\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class SendPromoCampaignRequest extends FormRequest
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

            'message' => ['required', 'string', 'max:2000'],
            'save_template' => ['nullable', 'boolean'],
            'template_label' => ['nullable', 'string', 'max:255'],

            'telegram_button_text' => [
                'nullable',
                'string',
                'max:64',
                'required_with:telegram_button_url',
                'exclude_unless:platform,telegram',
            ],
            'telegram_button_url' => [
                'nullable',
                'string',
                'max:2048',
                'url',
                'required_with:telegram_button_text',
                'exclude_unless:platform,telegram',
            ],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            $platform = is_string($this->input('platform'))
                ? strtolower(trim((string) $this->input('platform')))
                : 'sms';

            if ($platform !== 'telegram' && mb_strlen((string) $this->input('message', '')) > 480) {
                $validator->errors()->add('message', 'The message may not be greater than 480 characters for SMS.');
            }
        });
    }
}
