<?php

namespace Alphademy247\Http\Controllers;

use Illuminate\Http\Request;
use Alphademy247\Schools;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    public function managmentConsole()
    {
        $school_code = \Auth::user()->schoolCode;
        $school = Schools::where('schoolCode', '=', $school_code)->first();
        $school_name = $school->name;
        return view('console.management')->with('schoolName', $school_name);;
    }
}
