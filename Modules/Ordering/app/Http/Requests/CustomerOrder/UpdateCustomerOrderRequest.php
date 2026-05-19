<?php

namespace App\Http\Requests;

use App\Models\CustomerOrder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomerOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['nullable', Rule::in([
                CustomerOrder::STATUS_PENDING,
                CustomerOrder::STATUS_CONFIRMED,
                CustomerOrder::STATUS_PREPARING,
                CustomerOrder::STATUS_READY,
                CustomerOrder::STATUS_OUT_FOR_DELIVERY,
                CustomerOrder::STATUS_DELIVERED,
                CustomerOrder::STATUS_CANCELLED,
            ])],
            'receipt_status' => ['nullable', Rule::in([
                CustomerOrder::RECEIPT_STATUS_PENDING,
                CustomerOrder::RECEIPT_STATUS_APPROVED,
                CustomerOrder::RECEIPT_STATUS_REJECTED,
            ])],
        ];
    }
}
