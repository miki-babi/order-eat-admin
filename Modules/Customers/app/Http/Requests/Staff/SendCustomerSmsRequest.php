<?php

namespace Modules\Customers\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class SendCustomerSmsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>|string>
     */
    public function rules(): array
    {
        return [
            'customer_ids' => ['required', 'array', 'min:1'],
            'customer_ids.*' => ['required', 'integer', 'exists:customers,id'],
            'platform' => ['nullable', Rule::in(['sms', 'telegram'])],
            'message' => ['required', 'string', 'max:2000'],
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
