<?php

namespace Alphademy247\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SchoolSetupRequest extends FormRequest
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
            'schoolName'      => 'required|string|min:10',
            'motto'           => 'required|string|min:5',
            'educationSystem' => 'required|string|min:5',
            'institutionType' => 'required|string|min:5',
            'companyLogo'     => 'string|min:1',
            'addresslocation' => 'required|string|min:5',
            'email'           => 'required', // school Email
            'phone'           => 'required', //school Phone
            'city'            => 'required|string|min:2',
            'region'          => 'required|string|min:3',
            'country'         => 'required|string|min:5',
        ];
    }
}
