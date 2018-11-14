<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchoolInformationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('school_informations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('schoolCode');
            $table->string('educationSystem')->nullable(false); // British, IB, American Standard, Native Goverment
            $table->string('institutionType')->nullable(false);
            $table->text('companyLogo');
            $table->text('addresslocation');
            $table->string('poBox');
            $table->text('email');
            $table->text('phone');
            $table->string('city');
            $table->string('region');
            $table->string('country');
            $table->string('schoolWebsite');
            $table->boolean('is_blocked')->default(false);
            $table->string('schoolmotto');
            $table->string('studentprefix');
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
        Schema::dropIfExists('school_informations');
    }
}
