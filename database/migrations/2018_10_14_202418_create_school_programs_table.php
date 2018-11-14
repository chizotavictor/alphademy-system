<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchoolProgramsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('school_programs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('edu_system_id')->unsigned();
            $table->string('edu_system_code');
            $table->string('program_name');
            $table->string('program_code');
            $table->string('branch_name');
            $table->string('branch_code');
            $table->string('school_code');
            $table->text('raw');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('school_programs');
    }
}
