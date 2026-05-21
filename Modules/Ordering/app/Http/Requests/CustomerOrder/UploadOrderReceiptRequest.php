<?php

namespace Modules\Ordering\Http\Requests\CustomerOrder;

use Illuminate\Foundation\Http\FormRequest;

class UploadOrderReceiptRequest extends FormRequest
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
            'receipt' => ['required', 'image', 'max:5120'],
        ];
    }
}
