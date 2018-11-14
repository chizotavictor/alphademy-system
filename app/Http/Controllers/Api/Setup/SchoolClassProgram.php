<?php

namespace Alphademy247\Http\Controllers\Api\Setup;

use Illuminate\Http\Request;
use Alphademy247\Http\Controllers\Controller;
use Alphademy247\Http\GeneralService\Configurations\SchoolClassProgram as SCProgram;

class SchoolClassProgram extends Controller
{
    public function index(Request $request)
    {
        return response()->json(SCProgram::index(\Auth::user()->schoolCode), 200);
    }

    public function indexBranch(Request $request)
    {
        return response()->json(SCProgram::indexBranch(\Auth::user()->schoolCode, \Auth::user()->branchCode), 200);
    }

    public function addNewProgram(Request $request)
    {
        $validator = $this->validate($request, [
            'cps_branch_code'   => 'required',
            'cps_system_code'   => 'required',
            'cps_program_name'  => 'required',
        ]);
        return response()->json(SCProgram::saveNewClassprogram(\Auth::user()->schoolCode, $request), 200);
    }

    public function deleteProgram(Request $request)
    {
        $validator = $this->validate($request, [
            'program_id'   => 'required',
        ]);
        return response()->json(SCProgram::deleteProgram(\Auth::user()->schoolCode, $request->program_id), 200);
    }

    public function updateSchoolProgram(Request $request)
    {
        $validator = $this->validate($request, [
            'cps_id'        => 'required',
            'cps_branch_code'   => 'required',
            'cps_system_code'   => 'required',
            'cps_program_name'  => 'required',
        ]);

        return response()->json(SCProgram::updateClassprogram(\Auth::user()->schoolCode, $request), 200);
    }
}
