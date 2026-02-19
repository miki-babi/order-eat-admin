<?php

namespace App\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;

class ImportCustomerContactsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>|string>
     */
    public function rules(): array
    {
        return [
            'contacts_file' => ['required', 'file', 'mimes:csv,txt', 'max:5120'],
        ];
    }
}
