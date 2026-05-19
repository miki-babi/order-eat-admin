<?php

namespace App\Http\Requests;

use App\Models\CustomerOrder;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule as ValidationRule;

class StoreCustomerOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $deliveryPhone = $this->input('delivery_phone');

        if (is_string($deliveryPhone)) {
            $this->merge([
                'delivery_phone' => preg_replace('/[^\d+]/', '', $deliveryPhone),
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
        $rules = [
            'customer_token' => ['nullable', 'string', 'max:120', 'regex:/^[A-Za-z0-9_-]{20,120}$/'],
            'type' => ['required', ValidationRule::in([CustomerOrder::TYPE_PICKUP, CustomerOrder::TYPE_DELIVERY])],
            'pickup_date' => ['nullable', 'date', 'after_or_equal:today'],
            'pickup_time' => ['nullable', 'date_format:H:i'],
            'pickup_location_id' => ['nullable', 'integer', Rule::exists('pickup_locations', 'id')->where('is_active', true)],
            'delivery_phone' => ['nullable', 'string', 'max:32', 'regex:/^(?:\+?251|0)?[79]\d{8}$/'],
            'delivery_address' => ['nullable', 'string', 'max:1000'],
            'notify_when_ready' => ['nullable', 'boolean'],
            'source_channel' => ['nullable', 'string', 'max:50'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.menu_item_id' => ['required', 'integer', Rule::exists('menu_items', 'id')->where('is_active', true)],
            'items.*.quantity' => ['required', 'integer', 'min:1', 'max:100'],
        ];

        return array_merge($rules, $this->conditionalRules());
    }

    protected function conditionalRules(): array
    {
        return match ($this->input('type')) {
            CustomerOrder::TYPE_PICKUP => [
                'pickup_date' => ['required', 'date', 'after_or_equal:today'],
                'pickup_time' => ['required', 'date_format:H:i'],
                'pickup_location_id' => ['required', 'integer', Rule::exists('pickup_locations', 'id')->where('is_active', true)],
                'delivery_phone' => ['nullable'],
                'delivery_address' => ['nullable'],
            ],
            CustomerOrder::TYPE_DELIVERY => [
                'delivery_phone' => ['required', 'string', 'max:32', 'regex:/^(?:\+?251|0)?[79]\d{8}$/'],
                'delivery_address' => ['required', 'string', 'max:1000'],
                'pickup_date' => ['nullable'],
                'pickup_time' => ['nullable'],
                'pickup_location_id' => ['nullable'],
            ],
            default => [],
        };
    }

    public function messages(): array
    {
        return [
            'delivery_phone.regex' => 'Delivery phone must be in 2519XXXXXXXX, +2519XXXXXXXX, 09XXXXXXXX, or 9XXXXXXXX format.',
            'customer_token.regex' => 'Customer token format is invalid.',
        ];
    }
}
