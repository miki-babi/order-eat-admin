<?php

namespace App\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, \Illuminate\Contracts\Validation\ValidationRule|string>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role_slugs' => ['required', 'array', 'min:1'],
            'role_slugs.*' => ['required', 'string', Rule::exists('roles', 'slug')],
            'pickup_location_ids' => ['nullable', 'array'],
            'pickup_location_ids.*' => ['required', 'integer', Rule::exists('pickup_locations', 'id')],
        ];
    }

    /**
     * Add post-validation checks for branch role assignment requirements.
     */
    public function withValidator($validator): void
    {
        $validator->after(function ($validator): void {
            $roleSlugs = collect($this->input('role_slugs', []))
                ->filter(fn ($slug) => is_string($slug))
                ->values();

            $requiresBranchAssignment = $roleSlugs->contains(
                fn ($slug) => in_array($slug, ['branch_manager', 'branch_staff'], true),
            );

            $branchIds = $this->input('pickup_location_ids', []);

            if ($requiresBranchAssignment && (! is_array($branchIds) || $branchIds === [])) {
                $validator->errors()->add(
                    'pickup_location_ids',
                    'At least one branch is required for branch manager or branch staff roles.',
                );
            }
        });
    }
}

