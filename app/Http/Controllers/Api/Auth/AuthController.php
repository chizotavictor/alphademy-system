<?php
namespace Alphademy247\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use Alphademy247\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public $successStatus = 200;

    // Request for Token
    public function index(Request $request)
    {
         if(Auth::check()){
            $user = Auth::user();

              $token =  $user->createToken('Alphademy247 Personal Access Client')->accessToken;

              return response()->json([ 'status' => true , 'token' => $token], $this->successStatus);
          }
          else{
              return response()->json(['status' => false, 'message' => 'unauthorized access'], 401);
          }
    }
}
