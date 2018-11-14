<?php
namespace Alphademy247\Http\GeneralService\Configurations;

use Illuminate\Http\Request;
use Alphademy247\SchoolClass;
/**
 * ClassSetup Service Class
 */
class ClassSetup{
    public static function index($schoolCode, $branchCode)
    {
        $result =  SchoolClass::where('school_code', $schoolCode)->where('branch_code', $branchCode)->get();
        return [ 'school_branch_class' => $result ];
    }
    public static function addClass($schoolCode, $branchCode, Request $request, $raw = 'NILL')
    {
        $model = new SchoolClass;
        $model->school_code = $schoolCode;
        $model->branch_code = $branchCode;
        $model->program_code = $request->subps_program_code;
        $model->class = $request->sclass_class;
        $model->next_class = $request->sclass_next_class;
        $model->raw = $raw;

        if ($model->save()) {
            return ['status' => true, 'message' => 'New Class added!'];
        }else{
            return ['status' => true, 'message' => 'Error occured while saving class!'];
        }
    }

    public static function deleteClass($schoolCode, $branchCode, $id)
    {
        $rsltDelRec = SchoolClass::where('branch_code', $branchCode)
                        ->where('school_code', $schoolCode)
                        ->where('id', $id)->get()->first();
        if(count($rsltDelRec) > 0){
            $affectedRow = $rsltDelRec->delete();
            return ['affectedRow' => $affectedRow, 'status' => false, 'message' => 'Record deleted successfully!'];
        }else{
            return [ 'status' => false, 'message' => 'Error occurred during deletion!'];
        }
    }

    public static function updateClass($schoolCode, $branchCode, Request $request)
    {
        $flag = SchoolClass::where('branch_code', $branchCode)
                        ->where('school_code', $schoolCode)
                        ->where('id', $request->sclass_id)
                        ->update([
                            'next_class'  =>  $request->sclass_next_class,
                            'class' =>  $request->sclass_class,
                            'program_code' => $request->subps_program_code
                        ]);
        if($flag){
            return ['status' => true, 'message' => 'Class updated successfully!'];
        }else{
            return ['status' => true, 'message' => 'Error occurred during update!'];
        }
    }
}
