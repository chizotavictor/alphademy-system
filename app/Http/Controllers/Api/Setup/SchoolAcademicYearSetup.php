<?php

namespace Alphademy247\Http\Controllers\Api\Setup;

use Illuminate\Http\Request;
use Alphademy247\Http\Controllers\Controller;
use Alphademy247\Http\GeneralService\Configurations\SchoolAcademicYearSetup as acaYearSetup;

class SchoolAcademicYearSetup extends Controller
{
    public function index(Request $request)
    {
        return response()->json(acaYearSetup::loadAcademicYear(\Auth::user()->schoolCode), 200);
    }

    public function addAcademicYear(Request $request)
    {
        $this->validate($request, [
            //'ays_id' => 'required',
            'ays_year'  =>  'required',
            'aysStartDate'  =>  'required',
            'aysEndDate'   =>  'required',
            'aysStatus'     =>  'required',
        ]);

        return response()->json(acaYearSetup::addNewAcademicYear(\Auth::user()->schoolCode, $request));
    }

    public function updateAcademicYear(Request $request)
    {
        $this->validate($request, [
            'ays_id' => 'required',
            'ays_year'  =>  'required',
            'aysStartDate'  =>  'required',
            'aysEndDate'   =>  'required',
            'aysStatus'     =>  'required',
        ]);

        return response()->json(acaYearSetup::updateAcademicYear(\Auth::user()->schoolCode, $request));
    }
}
