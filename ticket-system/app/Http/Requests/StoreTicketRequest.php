<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Must be true so authenticated users can create tickets
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:5', 'max:255'],
            'description' => ['required', 'string', 'min:10'],
            'priority' => ['required', Rule::in(['Low', 'Medium', 'High', 'Urgent'])],
            'status' => ['required', Rule::in(['Open', 'In Progress', 'Resolved', 'Closed'])],
            'category' => ['required', Rule::in(['Hardware', 'Software', 'Network', 'Account', 'Other'])],
        ];
    }
}