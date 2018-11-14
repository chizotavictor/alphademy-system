<?php
namespace Alphademy247\Http\GeneralService\Configurations;

use Illuminate\Http\Request;
use Alphademy247\SchoolSubject;
/**
 * SubjectSetup Service Class
 */
class SubjectSetup
{
    public static function index($branchCode, $schoolCode){
        $o = SchoolSubject::where('branch_code', $branchCode)->where('school_code', $schoolCode)->get();
        return ['subjects' => $o];
    }

    public static function addnewSubject($branchCode, $schoolCode, Request $request, $raw = 'NILL')
    {
        $model = new SchoolSubject;
        $model->school_code  = $schoolCode;
        $model->branch_code  = $branchCode;
        $model->subject_name = strtoupper($request->subps_subject_name);
        $model->subject_code = strtoupper($request->subps_subject_code);
        $model->program_id   = 0;
        $model->program_code = strtoupper($request->subps_program_code);
        $model->gradable     = strtoupper($request->subps_gradable);
        $model->raw          = $raw;
        if ($model->save()) {
            return ['status' => true, 'message' => 'New subject added!'];
        }else{
            return ['status' => true, 'message' => 'Error occured while saving subject!'];
        }
    }

    public static function updateSubject($schoolCode, $branchCode, Request $request){
        $flag = SchoolSubject::where('branch_code', $branchCode)
                        ->where('school_code', $schoolCode)
                        ->where('id', $request->subps_id)
                        ->update([
                            'subject_name' => $request->subps_subject_name,
                            'subject_code' => $request->subps_subject_code,
                            'gradable'  =>  $request->subps_gradable,
                            'program_code' => $request->subps_program_code
                        ]);
        if($flag){
            return ['status' => true, 'message' => 'Subject list updated successfully!'];
        }else{
            return ['status' => true, 'message' => 'Error occurred during update!'];
        }
    }

    public static function deleteSubject($schoolCode, $branchCode, $subjectID)
    {
        $rsltDelRec = SchoolSubject::where('branch_code', $branchCode)
                        ->where('id', $subjectID)->get()->first();
        if(count($rsltDelRec) > 0){
            $affectedRow = $rsltDelRec->delete();
            return ['affectedRow' => $affectedRow, 'status' => false, 'message' => 'Record deleted successfully!'];
        }else{
            return [ 'status' => false, 'message' => 'Error occurred during deletion!'];
        }
    }
}
