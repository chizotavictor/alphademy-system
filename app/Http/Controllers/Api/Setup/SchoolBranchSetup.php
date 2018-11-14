<?php

namespace Alphademy247\Http\Controllers\Api\Setup;

use Illuminate\Http\Request;
use Alphademy247\Http\Controllers\Controller;
use Alphademy247\Http\GeneralService\Configurations\SchoolBranchSetup as sbSetup;

class SchoolBranchSetup extends Controller
{
    public function index(Request  $request){
        $branch_result =  sbSetup::loadSchoolBranch(\Auth::user()->schoolCode);
        $object = ['school_branches' => $branch_result];
  
        return response()->json($object, 200);
    }

    public function addNewBranch(Request $request)
    {
        $validator = $this->validate($request, [
            'branchName' => 'required|string|min:3',
            //'branch_id'  => 'required'
        ]);

        $message = sbSetup::addOrUpdateSchoolBranch(\Auth::user()->schoolCode, $request);
        return response()->json($message, 200);
    }

    public function updateSchoolBranch(Request $request)
    {
        $validator = $this->validate($request, [
            'branchName' => 'required|string|min:3',
            'branch_id' => 'required'
        ]);
        $message = sbSetup::updateSchoolBranch(\Auth::user()->schoolCode, $request);
        return response()->json($message, 200);
    }
}
