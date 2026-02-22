<?php

namespace Modules\Messaging\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSmsNotificationSettingRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>|string>
     */
    public function rules(): array
    {
        return [
            'is_enabled' => ['required', 'boolean'],
        ];
    }
}
