<?php

namespace Alphademy247\Http\Controllers\Api\Setup;

use Illuminate\Http\Request;
use Alphademy247\Http\Requests\SchoolSetupRequest;
use Alphademy247\Http\Requests\SchoolInitUserRequest;
use Alphademy247\Http\GeneralService\Configurations\SchoolSetup;
/**
 *  SchoolSetupController [Setup]
 */
class SchoolSetupController
{
    private $_schoolAccountCreated = false;
    private $_schoolInitUserCreated = false;

    /**
        Returns School Init User registeration flag [true or false]
    **/

    public function createUserAccount(SchoolInitUserRequest $request)
    {
        // Set schoolCode and create Branch

        $this->_schoolInitUserCreated = SchoolSetup::createInitUserAcct($request);
        return response()->json( ["status" => $this->_schoolInitUserCreated] )->setStatusCode(200, null);

    }

    /**
        Returns School registeration flag [true or false]
    */
    public function createSchoolAccount(SchoolSetupRequest $request)
    {
        //
        // $newDumpID = SchoolSetup::createInitUserAcct($request);
        // if( $newDumpID > 0 )
        // {
        //     // Exec School & Branch Creation Func
        //     $this->$is_schoolAccountCreated = School::createInitSchoolAcct($request)
        // }
        return response()->json( ["status" => $this->_schoolAccountCreated] )->setStatusCode(200, null);
    }
}
