<?php

namespace Alphademy247\Http\Controllers\Api\Setup;

use Illuminate\Http\Request;
use Alphademy247\Http\Controllers\Controller;
use Alphademy247\Http\GeneralService\Configurations\SchoolEducationalSystemSetup as sesSetup;

class SchoolEducationalSystemSetup extends Controller
{
    public function index(Request  $request){
        $result =  sesSetup::index(\Auth::user()->schoolCode);
        $object = ['educational_system' => $result];
  
        return response()->json($object, 200);
    }

    public function addEducationalSystem(Request $request)
    {
        $validator = $this->validate($request, [
            'eds_branch_code'  => 'required',
            'eds_system_name'  => 'required',
        ]);

        return response()->json( sesSetup::saveEducationSystem(\Auth::user()->schoolCode, $request), 200);
    }

    public function deleteEducationalSystem(Request $request){
        $validator = $this->validate($request, [
            'edu_sys_id'  => 'required',
        ]);

        return response()->json( sesSetup::deleteEducationSystem(\Auth::user()->schoolCode, $request->edu_sys_id), 200);
    }

    public function updateEducationSystem(Request $request)
    {
        $validator = $this->validate($request, [
            'eds_id'    =>  'required',
            'eds_branch_code' =>  'required',
            'eds_system_name'   =>  'required',
        ]);

        return response()->json( sesSetup::updateEducationSystem(\Auth::user()->schoolCode, $request), 200);
    }
}
