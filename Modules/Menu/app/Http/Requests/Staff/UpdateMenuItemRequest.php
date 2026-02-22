<?php

namespace Modules\Menu\Http\Requests\Staff;

use App\Models\MenuItem;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMenuItemRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'category' => ['nullable', 'string', 'max:50'],
            'image' => ['nullable', 'image', 'max:5120'],
            'is_active' => ['nullable', 'boolean'],
            'visibility_channels' => ['required', 'array', 'min:1'],
            'visibility_channels.*' => ['string', Rule::in(MenuItem::visibilityChannels())],
        ];
    }
}
