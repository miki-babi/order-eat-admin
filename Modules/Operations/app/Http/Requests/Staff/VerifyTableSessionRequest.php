<?php

namespace Modules\Operations\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;

class VerifyTableSessionRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>|string>
     */
    public function rules(): array
    {
        return [
            'verified_note' => ['nullable', 'string', 'max:500'],
        ];
    }
}
