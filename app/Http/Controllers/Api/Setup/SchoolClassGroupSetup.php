<?php

namespace Alphademy247\Http\Controllers\Api\Setup;

use Illuminate\Http\Request;
use Alphademy247\Http\Controllers\Controller;
use Alphademy247\Http\GeneralService\Configurations\ClassGroupSetup;

class SchoolClassGroupSetup extends Controller
{
    public function addClassGroup(Request $request)
    {
        $this->validate($request, [
            'sgclass_program_code'  =>  'required',
            'sgclass_class_group_name'  =>  'required',
            'sgclass_class_name'    =>  'required'
        ]);
        return response()->json(
            ClassGroupSetup::addClassGroup(
                \Auth::user()->schoolCode,
                \Auth::user()->branchCode,
                $request
            )
        , 200);
    }

    public function index(Request $request)
    {
        return response()->json(
            ClassGroupSetup::loadClassGroup(
                \Auth::user()->schoolCode,
                \Auth::user()->branchCode
        ), 200);
    }

    public function deleteClassGroup(Request $request)
    {
        $this->validate($request, [
            'class_group_id'  =>  'required|int',
        ]);
        return response()->json(
            ClassGroupSetup::deleteClassGroup(
                \Auth::user()->schoolCode,
                \Auth::user()->branchCode,
                $request
            )
        , 200);
    }

    public function updateClassGroup(Request $request)
    {
        $this->validate($request, [
            'subps_id'  =>  'required|int',
            'sgclass_program_code'  =>  'required',
            'sgclass_class_group_name'  =>  'required',
            'sgclass_class_name'    =>  'required'
        ]);

        return response()->json( 
            ClassGroupSetup::updateClassGroup(
                \Auth::user()->schoolCode,
                \Auth::user()->branchCode,
                $request
            )    
        , 200);
    }
}
