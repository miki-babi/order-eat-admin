<?php

namespace App\Http\Requests\Orders;

use App\Models\MenuItem;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class StoreOrderRequest extends FormRequest
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
        $channel = MenuItem::normalizeVisibilityChannel(
            is_string($this->input('channel')) ? $this->input('channel') : null,
        );

        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20', 'regex:/^(?:\+?251|0)?[79]\d{8}$/'],
            'pickup_date' => ['required', 'date', 'after_or_equal:today'],
            'pickup_location_id' => [
                'required',
                'integer',
                Rule::exists('pickup_locations', 'id')->where('is_active', true),
            ],
            'channel' => ['nullable', Rule::in(MenuItem::visibilityChannels())],
            'notify_when_ready' => ['nullable', 'boolean'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.menu_item_id' => [
                'required',
                'integer',
                Rule::exists('menu_items', 'id')->where(function ($query) use ($channel): void {
                    $query
                        ->where('is_active', true)
                        ->whereJsonContains('visibility_channels', $channel);
                }),
            ],
            'items.*.quantity' => ['required', 'integer', 'min:1', 'max:100'],
            'receipt' => ['nullable', 'image', 'max:5120'],
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

    /**
     * Log validation failures for order submit diagnostics.
     */
    protected function failedValidation(Validator $validator): void
    {
        $items = $this->input('items');

        Log::warning('orders.store.validation_failed', [
            'name' => $this->input('name'),
            'phone' => $this->input('phone'),
            'pickup_date' => $this->input('pickup_date'),
            'pickup_location_id' => $this->input('pickup_location_id'),
            'channel' => MenuItem::normalizeVisibilityChannel(
                is_string($this->input('channel')) ? $this->input('channel') : null,
            ),
            'notify_when_ready' => $this->boolean('notify_when_ready'),
            'items_count' => is_array($items) ? count($items) : 0,
            'has_receipt' => $this->hasFile('receipt'),
            'receipt_size' => $this->file('receipt')?->getSize(),
            'receipt_mime' => $this->file('receipt')?->getMimeType(),
            'errors' => $validator->errors()->toArray(),
            'ip' => $this->ip(),
            'user_agent' => $this->userAgent(),
        ]);

        parent::failedValidation($validator);
    }
}
