<?php
namespace Alphademy247\Http\Controllers\Api\Setup;

use Illuminate\Http\Request;
use Alphademy247\Http\Controllers\Controller;
use Alphademy247\Http\GeneralService\Configurations\SubjectSetup;

class SchoolSubjectSetup extends Controller
{
    public function index(Request $request){
        $branchCode = \Auth::user()->branchCode;
        $schoolCode = \Auth::user()->schoolCode;
        return response()->json(SubjectSetup::index($branchCode, $schoolCode), 200);
    }

    public function addnewSchoolSubject(Request $request)
    {
        $this->validate($request, [
            'subps_branch_code'  =>  'required',
            'subps_subject_code'  =>  'required',
            'subps_subject_name'   =>  'required',
            'subps_program_code'   => 'required',
            'subps_gradable'     =>  'required|min:4',
        ]);
        return response()->json(
            SubjectSetup::addnewSubject(
                \Auth::user()->branchCode,
                \Auth::user()->schoolCode,
                $request
            )
        );
    }

    public function updateSchoolSubject(Request $request)
    {
        $this->validate($request, [
            'subps_id' => 'required',
            'subps_branch_code'  =>  'required',
            'subps_subject_code'  =>  'required',
            'subps_subject_name'   =>  'required',
            'subps_program_code'   => 'required',
            'subps_gradable'     =>  'required|min:4',
        ]);

        return response()->json(
            SubjectSetup::updateSubject(
                \Auth::user()->schoolCode,
                \Auth::user()->branchCode,
                $request
                )
        );
    }

    public function deleteSubject(Request $request)
    {
        $this->validate($request, [
            'subject_id' => 'required'
        ]);
        return response()->json(SubjectSetup::deleteSubject(
            \Auth::user()->schoolCode,
            \Auth::user()->branchCode,
            $request->subject_id
        ), 200);
    }
}
