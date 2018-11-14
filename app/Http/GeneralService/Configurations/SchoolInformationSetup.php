<?php

namespace Alphademy247\Http\GeneralService\Configurations;

use Alphademy247\Schools;
use Alphademy247\SchoolInformation;
use Alphademy247\SchoolBranch;
use Alphademy247\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;


class SchoolInformationSetup {

    public static function getSchoolSetupInformation(Request $request)
    {
        $userId = \Auth::user()->id;
        $branchCode = \Auth::user()->branchCode;
        $schoolCode = \Auth::user()->schoolCode;

        $schoolObject = SchoolInformation::where('schoolCode', '=', $schoolCode)->first();
        return $schoolObject;
    }


    public static function saveSchoolInfomation(Request $request)
    {
        $phonenumber   = strtoupper($request->phonenumber);
        $schoolAddress = strtoupper($request->schoolAddress);
        $schoolEmail   = strtoupper($request->schoolEmail);
        $schoolWebsite = strtoupper($request->schoolWebsite);
        $schoolCity    = strtoupper($request->schoolCity);
        $schoolState   = strtoupper($request->schoolState);
        $schoolCountry = strtoupper($request->schoolCountry);
        $schoolPoBox   = strtoupper($request->pobox);

        $schoolMotto   = $request->schoolmotto;
        $studentPrefix = strtoupper($request->studentprefix);

        //save parameters
        $schoolObject = SchoolInformation::where('schoolCode', '=', \Auth::user()->schoolCode)->first();
        
        if( count($schoolObject) > 0 )
        {
            // update 

            $flag = SchoolInformation::where('schoolCode', '=', \Auth::user()->schoolCode)
                ->update([
                    'addresslocation' =>    $schoolAddress,
                    'pobox'           =>    $schoolPoBox,
                    'email'           =>    $schoolEmail,
                    'phone'           =>    $phonenumber,
                    'city'            =>    $schoolCity,
                    'region'          =>    $schoolState,
                    'country'         =>    $schoolCountry,
                    'schoolWebsite'   =>    $schoolWebsite,
                    'schoolmotto'     =>    $schoolMotto,
                    'studentprefix'   =>    $studentPrefix,
                ]);
            
            if ($flag ) {
                return ["rowcount" => 1 , 'message' => 'Information updated successfully!',"data" => [ 'status' => true, 'reason' => 'School information updated!', 'imgSrc' => self::getUserSchoolLogo()] ];
            }
            return ['status' => false, 'message' => 'Error occured while updating information!'];
            
        }else
        {
            $o = new SchoolInformation;
            $o->schoolCode      =   \Auth::user()->schoolCode;
            $o->educationSystem	=    "NILL";
            $o->institutionType =    "NILL";
            $o->companyLogo     =    "NILL";
            $o->addresslocation =    $schoolAddress;
            $o->pobox           =    $schoolPoBox;
            $o->email           =    $schoolEmail;
            $o->phone           =    $phonenumber;
            $o->city            =    $schoolCity;
            $o->region          =    $schoolState;
            $o->country         =    $schoolCountry;
            $o->is_blocked      =    false;
            $o->schoolWebsite   =    $schoolWebsite;
            $o->raw             =    "NILL";
            $o->schoolmotto     =    $schoolMotto;
            $o->studentprefix   =    $studentPrefix;

            if($o->save())
            {
                return ['flag' => 'success', 'message' => 'Information saved successfully!' ];
            }else{
                return ['flag' => 'error', 'message' => 'Error occured while saving data!' ];
            }  
        }

    }

    public static function setSchoolLogo(Request $request)
    {
        $schoolCode = \Auth::user()->schoolCode;
        $branchCode = \Auth::user()->branchCode;
        $filename   = 'school-photo-' . time() . '.'  . $request->file('schoolLogo')->getClientOriginalExtension();

        $img = $request->file('schoolLogo')->storeAs( $schoolCode . '/' . $branchCode, $filename);
        $flag = SchoolInformation::where('schoolCode', '=', \Auth::user()->schoolCode)
                            ->update(['companyLogo' => $img]);
        if($flag == TRUE)
        {
            return ['status' => true, 'reason' => 'Image uploaded successfully!',  'imgSrc' =>$img];
        }
        return ['status' => false, 'reason' => 'Error occured while uploading image!'];
    }

    public static function getUserSchoolLogo(){
        $schoolObject = SchoolInformation::where('schoolCode', '=', \Auth::user()->schoolCode)->get()->first();
        return $schoolObject->companyLogo;
    }
}