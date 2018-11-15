<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/app/management-console', 'HomeController@managmentConsole')->name('management.console');


Route::group(['prefix' => '/auth/web'], function() {

    Route::get('loadUserAssignedModules',           'Api\Access\LoadModules@loadUserAssignedModule');
    Route::get('getSchoolBranches',                 'Api\Setup\SchoolBranchSetup@index');
    Route::get('getSchooolEducationalSystem',       'Api\Setup\SchoolEducationalSystemSetup@index');
    Route::get('loadClassSubject',                  'Api\Setup\SchoolSubjectSetup@index');
    Route::get('loadSchoolInformation',             'Api\Setup\SchoolInformationSetup@index');
    Route::get('getSchooolPrograms',                'Api\Setup\SchoolClassProgram@index');
    Route::get('getSchoolAcadmicYear',              'Api\Setup\SchoolAcademicYearSetup@index');
    Route::get('getSchooolBranchClass',             'Api\Setup\SchoolCLassSetup@index');
    Route::get('getSchooolProgramsBranch',          'Api\Setup\SchoolClassProgram@indexBranch');
    Route::get('loadClassGroup',                    'Api\Setup\SchoolClassGroupSetup@index');

    Route::post('loadSchoolInformation',            'Api\Setup\SchoolInformationSetup@loadInformation');
    Route::post('loadSchoolLogo',                   'Api\Setup\SchoolInformationSetup@setSchoolLogo');
    Route::post('addNewSchoolBranch',               'Api\Setup\SchoolBranchSetup@addNewBranch');
    Route::post('addNewProgram',                    'Api\Setup\SchoolClassProgram@addNewProgram');
    Route::post('addNewAcademicYea',                'Api\Setup\SchoolAcademicYearSetup@addAcademicYear');
    Route::post('addEducationSystem',               'Api\Setup\SchoolEducationalSystemSetup@addEducationalSystem');
    Route::post('addnewClass',                      'Api\Setup\SchoolCLassSetup@addnewClass');
    Route::post('addnewClassSubject',               'Api\Setup\SchoolSubjectSetup@addnewSchoolSubject');
    Route::post('addClassGroup',                    'APi\Setup\SchoolClassGroupSetup@addClassGroup');

    Route::put('addNewSchoolBranch',                'Api\Setup\SchoolBranchSetup@updateSchoolBranch');
    Route::put('updateSchoolProgram',               'Api\Setup\SchoolClassProgram@updateSchoolProgram');
    Route::put('updateAcademicYear',                'Api\Setup\SchoolAcademicYearSetup@updateAcademicYear');
    Route::put('updateEducationSystem',             'Api\Setup\SchoolEducationalSystemSetup@updateEducationSystem');
    Route::put('updateClass',                       'Api\Setup\SchoolCLassSetup@updateClass');
    Route::put('updateSchoolClassSubject',          'Api\Setup\SchoolSubjectSetup@updateSchoolSubject');
    Route::put('updateClassGroup',                  'Api\Setup\SchoolClassGroupSetup@updateClassGroup');

    Route::delete('deleteSchoolProgram',            'Api\Setup\SchoolClassProgram@deleteProgram');
    Route::delete('deleteEducationSystem',          'Api\Setup\SchoolEducationalSystemSetup@deleteEducationalSystem');
    Route::delete('deleteSubject',                  'Api\Setup\SchoolSubjectSetup@deleteSubject');
    Route::delete('deleteClass',                    'Api\Setup\SchoolCLassSetup@deleteClass');
    Route::delete('deleteClassgroup',               'Api\Setup\SchoolClassGroupSetup@deleteClassGroup');
});
