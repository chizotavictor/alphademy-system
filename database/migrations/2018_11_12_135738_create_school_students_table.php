<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchoolStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('school_students', function (Blueprint $table) {
            $table->increments('id');
            $table->string('std_first_name');
            $table->string('std_middle_name')->nullable();
            $table->string('std_last_name');
            $table->string('std_admission_number')->nullable(true);
            $table->string('std_number')->nullable(false);
            $table->string('school_code');
            $table->string('branch_code');

            $table->string('std_photo');
            $table->string('std_gender');
            $table->string('std_date_of_birth');
            $table->string('std_nationality');
            $table->string('std_state')->nullable();
            $table->string('std_hometown')->nullable();
            $table->string('std_address')->nullable();
            $table->text('std_email');
            $table->text('std_phone');

            // $table->string('admission_date')->nullable();
            // $table->string('start_date')->nullable();


            $table->text('raw')->nullable();
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
        Schema::dropIfExists('school_students');
    }
}
