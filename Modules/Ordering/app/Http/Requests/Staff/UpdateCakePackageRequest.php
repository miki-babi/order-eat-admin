<?php

namespace Modules\Ordering\Http\Requests\Staff;

use App\Models\CakePackage;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCakePackageRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>|string>
     */
    public function rules(): array
    {
        $cakePackage = $this->route('cakePackage');
        $cakePackageId = $cakePackage instanceof CakePackage ? $cakePackage->id : null;

        return [
            'parent_id' => [
                'nullable',
                'integer',
                Rule::exists('cake_packages', 'id')->where(function ($query) use ($cakePackageId): void {
                    $query->whereNull('parent_id');

                    if ($cakePackageId !== null) {
                        $query->where('id', '!=', $cakePackageId);
                    }
                }),
            ],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
