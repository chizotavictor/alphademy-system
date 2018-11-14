<?php
namespace Alphademy247\Http\GeneralService\Configurations;

use Illuminate\Http\Request;
use Alphademy247\SchoolClassGroup;
/**
 * ClassGroupSetup Service Class
 */
class ClassGroupSetup {
    public static function addClassGroup($schoolCode, $branchCode, Request $request, $raw = 'NILL')
    {
        $model = new SchoolClassGroup;
        $model->school_code = $schoolCode;
        $model->branch_code = $branchCode;
        $model->program_code = $request->sgclass_program_code;
        $model->class = $request->sgclass_class_name;
        $model->class_group = strtoupper($request->sgclass_class_group_name);

        if($model->save())
        {
            return ['status' => true, 'message' => 'Class group created successfully!'];
        }else{
            return ['status' => false, 'message' => 'Error occurred while creating record!'];
        }
    }

    public static function loadClassGroup($schoolCode, $branchCode)
    {
        $result =  SchoolClassGroup::where('school_code', $schoolCode)->where('branch_code', $branchCode)->get();
        return [ 'school_class_group' => $result ];
    }

    public static function deleteClassGroup($schoolCode, $branchCode, Request $request)
    {
        $rsltDelRec = SchoolClassGroup::where('branch_code', $branchCode)->where('school_code', $schoolCode)->where('id', $request->class_group_id)->get()->first();
        if(count($rsltDelRec) > 0)
        {
            $affectedRow = $rsltDelRec->delete();
            return [
                'affectedRow' => $affectedRow, 
                'status' => false, 
                'message' => 'Record deleted successfully!'
            ];
        }else{
            return [ 
                'status' => false, 
                'message' => 'Error occurred during deletion!'
            ];
        }
    }


    public static function updateClassGroup($schoolCode, $branchCode, Request $request)
    {
        $sgclass_program_code     = $request->sgclass_program_code;
        $sgclass_class_group_name = $request->sgclass_class_group_name;
        $sgclass_class_name       = $request->sgclass_class_name;

        $flag = SchoolClassGroup::where('branch_code', $branchCode)
            ->where('school_code', $schoolCode)
            ->where('id', $request->subps_id)
            ->update([
                'class_group'   =>  $sgclass_class_group_name,
                'class'         => $sgclass_class_name,
                'program_code'  => $sgclass_program_code,
            ]);

        if($flag){
            return ['status' => true, 'message' => 'Record updated successfully!'];
        }else{
            return ['status' => true, 'message' => 'Error occurred during update!'];
        }
    }
}