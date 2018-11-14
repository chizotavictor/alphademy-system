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
Route::get('/management-console', 'HomeController@managmentConsole')->name('management.console');


Route::group(['prefix' => '/auth/web'], function() {

    Route::get('loadUserAssignedModules', 'Api\Access\LoadModules@loadUserAssignedModule');
    Route::get('getSchoolBranches', 'Api\Setup\SchoolBranchSetup@index');
    Route::get('getSchooolEducationalSystem', 'Api\Setup\SchoolEducationalSystemSetup@index');
    Route::get('loadClassSubject', 'Api\Setup\SchoolSubjectSetup@index');
    Route::get('loadSchoolInformation', 'Api\Setup\SchoolInformationSetup@index');
    Route::get('getSchooolPrograms', 'Api\Setup\SchoolClassProgram@index');
    Route::get('getSchoolAcadmicYear', 'Api\Setup\SchoolAcademicYearSetup@index');

    Route::post('loadSchoolInformation', 'Api\Setup\SchoolInformationSetup@loadInformation');
    Route::post('loadSchoolLogo', 'Api\Setup\SchoolInformationSetup@setSchoolLogo');
    Route::post('addNewSchoolBranch', 'Api\Setup\SchoolBranchSetup@addNewBranch');
    Route::post('addNewProgram', 'Api\Setup\SchoolClassProgram@addNewProgram');
    Route::post('addNewAcademicYea', 'Api\Setup\SchoolAcademicYearSetup@addAcademicYear');
    Route::post('addEducationSystem', 'Api\Setup\SchoolEducationalSystemSetup@addEducationalSystem');

    Route::put('addNewSchoolBranch', 'Api\Setup\SchoolBranchSetup@updateSchoolBranch');
    Route::put('updateSchoolProgram', 'Api\Setup\SchoolClassProgram@updateSchoolProgram');
    Route::put('updateAcademicYear', 'Api\Setup\SchoolAcademicYearSetup@updateAcademicYear');
    Route::put('updateEducationSystem', 'Api\Setup\SchoolEducationalSystemSetup@updateEducationSystem');

    Route::delete('deleteSchoolProgram', 'Api\Setup\SchoolClassProgram@deleteProgram');
    Route::delete('deleteEducationSystem', 'Api\Setup\SchoolEducationalSystemSetup@deleteEducationalSystem');
    Route::delete('deleteSubject', 'Api\Setup\SchoolSubjectSetup@deleteSubject');
});
