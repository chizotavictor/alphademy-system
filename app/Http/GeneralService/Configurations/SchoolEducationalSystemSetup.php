<?php 
namespace Alphademy247\Http\GeneralService\Configurations;

use Alphademy247\SchoolBranch;
use Illuminate\Http\Request;
use Alphademy247\EducationalSystem;
use Alphademy247\Http\GeneralService\Configurations\SchoolBranchSetup;

class SchoolEducationalSystemSetup {

    public static function index($schoolCode)
    {
        return EducationalSystem::where('schoolCode', $schoolCode)->get();
    }

    public static function saveEducationSystem($schoolCode, Request $request, $raw = "NILL")
    {
        $model = new EducationalSystem;
        $model->schoolCode  =   $schoolCode;
        $model->branchCode  =   $request->eds_branch_code;
        $model->branchName  =   SchoolBranchSetup::getBranchName($request->eds_branch_code);
        $model->systemName  =   strtoupper($request->eds_system_name);
        $model->systemCode  =   strtoupper(preg_replace('/\s+/', '', $request->eds_system_name));
        $model->raw         =   $raw;
        
        if($model->save()){
            return ['status' => true, 'message' => 'New education system added!'];
        }else{
            return ['status' => false, 'message' => 'Error occured while adding new Education System!'];
        }
    }

    public static function updateEducationSystem($schoolCode, Request $request)
    {
        $flag = EducationalSystem::where('schoolCode', '=', \Auth::user()->schoolCode)
            ->where('id', $request->eds_id)
            ->update([
                'systemName'        =>      strtoupper($request->eds_system_name),
                'branchCode'        =>      $request->eds_branch_code,
                'branchName'        =>      SchoolBranchSetup::getBranchName($request->eds_branch_code)
            ]);

        if ($flag ) {
            return ["rowcount" => 1 , 'message' => 'Record updated successfully!' ];
        }
        return ['status' => false, 'message' => 'Error occured while updating record!'];
    } 

    public static function deleteEducationSystem($schoolCode, $rowId)
    {
        $rsltDelRec = EducationalSystem::where('schoolCode', $schoolCode)
                        ->where('id', $rowId)->get()->first();
        if(count($rsltDelRec) > 0){
            $affectedRow = $rsltDelRec->delete();
            return ['affectedRow' => $affectedRow, 'status' => false, 'message' => 'Record deleted successfully!'];
        }else{
            return [ 'status' => false, 'message' => 'Error occurred during deletion!'];
        }
    }


    public static function getEduSystemID($schoolCode, $branchCode, $systemCode)
    {
        $object =  EducationalSystem::where('schoolCode', $schoolCode)
                    ->where('branchCode', $branchCode)
                    ->where('systemCode', $systemCode)->get()->first();
        if(!isset($object))
            return null;
        else
            return $object->id;
    } 
}