<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchoolBranchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('school_branches', function (Blueprint $table) {
            $table->increments('id');
            $table->string('branchName');
            $table->string('branchCode')->unique();
            $table->string('schoolCode')->nullable(false);
            $table->integer('schoolId')->unsigned();
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
        Schema::dropIfExists('school_branches');
    }
}
