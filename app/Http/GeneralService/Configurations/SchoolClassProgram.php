<?php
namespace Alphademy247\Http\GeneralService\Configurations;

use Alphademy247\SchoolProgram;
use Alphademy247\Schools;
use Illuminate\Http\Request;
use Alphademy247\Http\GeneralService\Configurations\SchoolEducationalSystemSetup;
use Alphademy247\Http\GeneralService\Configurations\SchoolBranchSetup;

class SchoolClassProgram {

    public static function index($schoolCode)
    {
        $result =  SchoolProgram::where('school_code', $schoolCode)->get();
        return [ 'school_program' => $result ];
    }

    public static function indexBranch($schoolCode, $branchCode)
    {
        $branchCode = $schoolCode . '-' . $branchCode;
        $result =  SchoolProgram::where('school_code', $schoolCode)->where('branch_code', $branchCode)->get();
        return [ 'school_program' => $result ];
    }

    public static function saveNewClassprogram($schoolCode, Request $request, $raw = "NILL")
    {
        $branchCode  =  $request->cps_branch_code;
        $branchName  =  SchoolBranchSetup::getBranchName($request->cps_branch_code);
        $systemCode  =  $request->cps_system_code;
        $programName =  strtoupper($request->cps_program_name);
        $programCode =  strtoupper(preg_replace('/\s+/', '', $request->cps_program_name));
        $systemID    =  SchoolEducationalSystemSetup::getEduSystemID($schoolCode, $branchCode, $systemCode);

        if(is_null($systemID))
        {
            return ['status' => true, 'message' => 'Incorrect education system match!'];
        }

        $model = new SchoolProgram;
        $model->edu_system_id   = $systemID;
        $model->school_code     = $schoolCode;
        $model->edu_system_code = $systemCode;
        $model->branch_name     = $branchName;
        $model->branch_code     = $branchCode;
        $model->program_name    = $programName;
        $model->program_code    = $programCode;
        $model->raw             = $raw;

        if($model->save()){
            return ['status' => true, 'message' => 'New program added!'];
        }else{
            return ['status' => false, 'message' => 'Error occured while adding new program!'];
        }
    }

    public static function deleteProgram($schoolCode, $program_id)
    {
        $rsltDelRec = SchoolProgram::where('school_code', $schoolCode)->where('id', $program_id)->get()->first();
        if(count($rsltDelRec) > 0){
            $affectedRow = $rsltDelRec->delete();
            return ['affectedRow' => $affectedRow, 'status' => false, 'message' => 'Record deleted successfully!'];
        }else{
            return [ 'status' => false, 'message' => 'Error occurred during deletion!'];
        }
    }

    public static function updateClassprogram($schoolCode, Request $request)
    {
        $branchCode  =  $request->cps_branch_code;
        $branchName  =  SchoolBranchSetup::getBranchName($request->cps_branch_code);
        $systemCode  =  $request->cps_system_code;
        $programName =  strtoupper($request->cps_program_name);
        $programCode =  strtoupper(preg_replace('/\s+/', '', $request->cps_program_name));
        $systemID    =  SchoolEducationalSystemSetup::getEduSystemID($schoolCode, $branchCode, $systemCode);


        $flag = SchoolProgram::where('branch_code', $request->cps_branch_code)
            ->where('school_code', $schoolCode)
            ->where('id', $request->cps_id)
            ->update([
                'program_name' => $programName,
                'program_code' => $programCode,
            ]);

        if($flag){
            return ['status' => true, 'message' => 'Record updated successfully!'];
        }else{
            return ['status' => true, 'message' => 'Error occurred during update!'];
        }
    }
}
