<?php

namespace Alphademy247\Http\Controllers\Api\Setup;

use Illuminate\Http\Request;
use Alphademy247\Http\Controllers\Controller;
use Alphademy247\Http\GeneralService\Configurations\ClassSetup;

class SchoolCLassSetup extends Controller
{
    public function deleteClass(Request $request)
    {
        $this->validate($request, [
            'class_id'  =>  'required'
        ]);
        return response()->json(
            ClassSetup::deleteClass(
                \Auth::user()->schoolCode,
                \Auth::user()->branchCode,
                $request->class_id)
            , 200);
    }

    public function index(Request $request)
    {
        return response()->json(
            ClassSetup::index(
                \Auth::user()->schoolCode,
                \Auth::user()->branchCode
                )
        , 200);
    }

    public function addnewClass(Request $request)
    {
        $this->validate($request, [
            'subps_program_code'    =>  'required',
            'sclass_class'  =>  'required',
            'sclass_next_class' =>  'required'
        ]);
        return response()->json(
            ClassSetup::addClass(
                \Auth::user()->schoolCode,
                \Auth::user()->branchCode,
                $request
            )
        );
    }

    public function updateClass(Request $request)
    {
        $this->validate($request, [
            'subps_program_code'    =>  'required',
            'sclass_id' =>  'required',
            'sclass_class'  =>  'required',
            'sclass_next_class' =>  'required'
        ]);
        return response()->json(
            ClassSetup::updateClass(
                \Auth::user()->schoolCode,
                \Auth::user()->branchCode,
                $request
            )
        );
    }
}
