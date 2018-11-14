<?php

namespace Alphademy247\Http\GeneralService\Configurations;

use Alphademy247\Schools;
use Alphademy247\SchoolInformation;
use Alphademy247\SchoolBranch;
use Alphademy247\User;
use Illuminate\Support\Facades\Hash;


class SchoolSetup {
    public static function createInitUserAcct($data, $raw = "NILL")
    {
        $filteredUserData = [];

        $returnArr = self::initSchoolCreation($data, $raw);
        $lastBranchModelID = self::initBranchCreation($data, $returnArr['schoolID'], $returnArr['schoolCode'], $raw);
        $schoolUserAccount = self::initSchoolUserCreation($data, $returnArr['schoolID'], $returnArr['schoolCode'], $lastBranchModelID, $raw);
        return $schoolUserAccount;
    }

    private static function initSchoolCreation($data, $raw)
    {
        $schoolCode = self::generateSchoolCode($data->schoolName);

        $schoolModel = new Schools;
        $schoolModel->name       = $data->schoolName;
        $schoolModel->motto      = $data->schoolMotto;
        $schoolModel->schoolCode = $schoolCode;
        $schoolModel->package    = 1;
        $schoolModel->raw        = $raw;
        $schoolModel->save();

        $lastSchoolModelID = $schoolModel->id;
        $container = array('schoolID' => $lastSchoolModelID, 'schoolCode' => $schoolCode);
        return $container;
    }

    private static function initBranchCreation($data, $schoolID, $schoolCode, $raw = "NILL")
    {
        $xL = "MAINBRANCH";
        $schoolBranch = new SchoolBranch;
        $schoolBranch->branchName = $xL;
        $schoolBranch->branchCode = $schoolCode . '-' . $xL;
        $schoolBranch->schoolId   = $schoolID;
        $schoolBranch->schoolCode = $schoolCode;
        $schoolBranch->raw        = $raw;
        $schoolBranch->save();

        return $xL;
    }

    public static function initSchoolUserCreation($data, $lastSchoolModelID, $schoolCode, $branchCode, $raw = "NILL")
    {
        $user = new User;
        $user->name           = $data->userFullname;
        $user->email          = $data->email;
        $user->phone          = $data->userPhone;
        $user->password       = Hash::make($data->password);
        $user->userType       = "ADMINISTRATOR";
        $user->userCode       = self::generateUserCode($schoolCode, $branchCode, $data->userFullname);
        $user->schoolCode     = $schoolCode;
        $user->branchCode     = $branchCode;
        $user->raw            = $raw;

        return ( $user->save() ) ? true : false;
    }

    private static function generateUserCode( $schoolCode, $branchCode, $stringName)
    {
        return mb_strtoupper( $schoolCode . '-' . $branchCode . '-' . self::nativeCodeGenerator($stringName) );
    }

    private static function generateSchoolCode($schoolName)
    {
        $string_name = $schoolName;
        $username = self::nativeCodeGenerator($string_name);
         //str_shuffle to randomly shuffle all characters
        return mb_strtoupper( $username . 'SCHL' );
    }

    public static function nativeCodeGenerator($string_name)
    {
        $username_parts = array_filter(explode(" ", strtolower($string_name))); //explode and lowercase name
        $username_parts = array_slice($username_parts, 0, 2); //return only first two arry part

        $part1 = (!empty($username_parts[0]))?substr($username_parts[0], 0,3):""; //cut first name to 8 letters
        $part2 = (!empty($username_parts[1]))?substr($username_parts[1], 0,3):""; //cut second name to 5 letters
        $part3 = (100)?rand(0, 100):"";

        $username = $part1. str_shuffle($part2). $part3;
        return $username;
    }
}
