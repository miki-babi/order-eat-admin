<?php

namespace Modules\AccessControl\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRoleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, \Illuminate\Contracts\Validation\ValidationRule|string>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('roles', 'name')],
            'description' => ['nullable', 'string', 'max:1000'],
            'permission_slugs' => ['nullable', 'array'],
            'permission_slugs.*' => ['required', 'string', Rule::exists('permissions', 'slug')],
        ];
    }
}

