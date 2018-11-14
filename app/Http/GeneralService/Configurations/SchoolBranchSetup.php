<?php 
namespace Alphademy247\Http\GeneralService\Configurations;

use Alphademy247\SchoolBranch;
use Alphademy247\Schools;
use Alphademy247\Http\GeneralService\Configurations\SchoolSetup;
use Illuminate\Http\Request;

class SchoolBranchSetup {

    public static function loadSchoolBranch($schoolCode)
    {
        return SchoolBranch::where('schoolCode', '=', $schoolCode)->get();
    }

    public static function addOrUpdateSchoolBranch($schoolCode, Request $request)
    {
        $branchObject = SchoolBranch::where('branchName', $request->branchName)
                        ->where('schoolCode', $schoolCode)->first();
        
        if( count($branchObject)  > 0 )
        {
            if(!isset($request->branch_id)){
                return ['status' => false, 'message' => 'Please select the branch record selected!'];
            }
            return ['status' => false, 'message' => 'Branch already exists!'];
        }else{
        
            $branchCode = SchoolSetup::nativeCodeGenerator($request->branchName);
            $object = new SchoolBranch;

            $object->branchName = $request->branchName;
            $object->branchCode = $schoolCode . '-' . strtoupper($branchCode);
            $object->schoolCode = $schoolCode;
            $object->schoolId   = self::getSchoolIdOfBranch($schoolCode);
            $object->raw        = 'NILL';

            if($object->save()){
                return ['status' => true, 'message' => $branchCode .' created successfully!'];
            }else{
                return ['status' => false, 'message' => 'Error occurred while creating school branch!'];
            }
        }
    }


    public static function UpdateSchoolBranch($schoolCode, Request $request){
        $flag = SchoolBranch::where('branchCode', $request->branch_id)->where('schoolCode', $schoolCode)->update(['branchName' => $request->branchName]);
        
        if($flag){
            return ['status' => true, 'message' => 'Branch name updated successfully!'];
        }else{
            return ['status' => true, 'message' => 'Error occurred during update!'];
        }  
    }

    public static function getSchoolIdOfBranch($schoolCode){
        $o = Schools::where('schoolCode', $schoolCode)->get()->first();
        return $o->id;
    }

    public static function getBranchName($branchCode){
        $o = SchoolBranch::where('branchCode', $branchCode)->get()->first();
        return $o->branchName;
    }

}