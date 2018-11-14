<?php

namespace Alphademy247\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SchoolInitUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'schoolName'        => 'required|string|min:10',
            'schoolMotto'       => 'required|string|min:5',
            'userFullname'      => 'required|string|max:100',
            'email'             => 'required|string|email|max:255|unique:users',
            'userPhone'         => 'required|string|max:15',
            'password'          => 'required|string|min:6|',
        ];
    }
}
