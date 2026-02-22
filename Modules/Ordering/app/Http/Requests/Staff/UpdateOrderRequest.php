<?php

namespace Modules\Ordering\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOrderRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, \Illuminate\Contracts\Validation\ValidationRule|string>|string>
     */
    public function rules(): array
    {
        return [
            'order_status' => [
                'nullable',
                Rule::in(['pending', 'preparing', 'ready', 'completed']),
            ],
            'receipt_status' => [
                'nullable',
                Rule::in(['pending', 'approved', 'disapproved']),
            ],
            'disapproval_reason' => [
                'nullable',
                'required_if:receipt_status,disapproved',
                'string',
                'max:500',
            ],
            'notify_customer' => [
                'nullable',
                'boolean',
            ],
        ];
    }
}
