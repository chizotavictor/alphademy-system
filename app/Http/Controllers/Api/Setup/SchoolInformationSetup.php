<?php

namespace Alphademy247\Http\Controllers\Api\Setup;

use Illuminate\Http\Request;
use Alphademy247\Http\Controllers\Controller;
use Alphademy247\SchoolInformation;
use Alphademy247\Http\GeneralService\Configurations\SchoolInformationSetup as SchoolInformationSetupService;


class SchoolInformationSetup extends Controller
{
    public function index(Request $request)
    {
        $o = SchoolInformationSetupService::getSchoolSetupInformation($request);
        return response()->json( ['rowcount' => count($o),  'data' => $o ] )->setStatusCode(200, null);
    }

    public function loadInformation(Request $request)
    {
    
        $validator = $this->validate($request, [
            'phonenumber' => 'required',
            'schoolAddress'  => 'required|string|min:5',
            //'schoolEmail' => 'required',
            //'schoolWebsite' => 'required',
            'schoolCity' => 'required',
            'schoolState' => 'required',
            'schoolCountry' => 'required',
        ]);

        // if ($validator->fails()) { 
        //     return response()->json([
        //         'message'=>'you have not inserted',
        //         'error' => $validator->errors()->all(),
        //     ]);
        // }
        $o = SchoolInformationSetupService::saveSchoolInfomation($request);
        return response()->json( $o )->setStatusCode(200, null);;
    }

    public function setSchoolLogo(Request $request){
        return SchoolInformationSetupService::setSchoolLogo($request);
    }
}
 