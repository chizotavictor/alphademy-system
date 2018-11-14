<?php

namespace Alphademy247\Http\Controllers\Api\Access;

use Illuminate\Http\Request;
use Alphademy247\Http\Controllers\Controller;
use Alphademy247\Http\GeneralService\ModuleAccess\ModuleAccess;

class LoadModules extends Controller
{

    public function loadUserAssignedModule(Request $request)
    {
        if(\Auth::check()){
            $userID     = \Auth::user()->id;
            $userCode   = \Auth::user()->userCode;
            $schoolCode = \Auth::user()->schoolCode;
            $branchCode = \Auth::user()->branchCode;

            $result =  ModuleAccess::getModule($userID, $userCode, $schoolCode, $branchCode, $request);

            return response()->json( $result , 200);
           
        }else{
            return response()->json(['status' => false, 'message' => 'Unauthenticated.'], 401);
        }
    }
}
