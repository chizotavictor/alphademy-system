<?php 
namespace Alphademy247\Http\GeneralService\Configurations;

use Alphademy247\AcademicYear;
use Illuminate\Http\Request;

class SchoolAcademicYearSetup {

    public static function loadAcademicYear($schoolCode)
    {
        $object = AcademicYear::where('schoolCode', $schoolCode)->get();
        return ['academic_year' => $object];
    }

    public static function addNewAcademicYear($schoolCode, Request $request, $raw = "NILL")
    {
        $object = AcademicYear::where('schoolCode', $schoolCode)->where('academicYear', $request->ays_year)->get()->first();

        $activeObject = AcademicYear::where('schoolCode', $schoolCode) ->where('status', 'Active')->get()->first();

        $academicYearObject = new AcademicYear;
        $academicYearObject->schoolCode = $schoolCode;
        $academicYearObject->academicYear = $request->ays_year;
        $academicYearObject->startDate  = $request->aysStartDate;
        $academicYearObject->endDate  =  $request->aysEndDate;
        $academicYearObject->status = $request->aysStatus;
        $academicYearObject->raw   = $raw;

        if($academicYearObject->save()){
            return ['status' => true, 'message' => 'Academic year created successfully!'];
        }else{
            return ['status' => false, 'message' => 'Error occurred while creating new academic year!'];
        }
           
    }

    public static function updateAcademicYear($schoolCode, Request $request, $raw = "NILL")
    {
        
        $flag = AcademicYear::where('schoolCode', '=', \Auth::user()->schoolCode)
            ->where('id', '=', $request->ays_id)
            ->update([
                'academicYear'      =>      $request->ays_year,
                'startDate'         =>      $request->aysStartDate,
                'endDate'           =>      $request->aysEndDate,
                'status'            =>      $request->aysStatus
            ]);

        if ($flag ) {
            return ["rowcount" => 1 , 'message' => 'Academic year updated successfully!' ];
        }
        return ['status' => false, 'message' => 'Error occured while updating Academic year!'];
    
    }
}