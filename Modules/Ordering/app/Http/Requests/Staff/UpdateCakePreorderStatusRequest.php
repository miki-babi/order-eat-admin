<?php

namespace Modules\Ordering\Http\Requests\Staff;

use App\Models\CakePreorder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCakePreorderStatusRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['required', 'string', Rule::in(CakePreorder::statuses())],
        ];
    }
}
