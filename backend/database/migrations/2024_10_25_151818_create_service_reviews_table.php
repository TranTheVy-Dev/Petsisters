<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceReviewsTable extends Migration
{
    public function up()
    {
        Schema::create('service_reviews', function (Blueprint $table) {
            $table->bigIncrements('id'); 
            $table->unsignedBigInteger('service_id');
            $table->string('full_name', 255);
            $table->string('email', 255)->nullable();
            $table->tinyInteger('rating')->unsigned();
            $table->text('review');
            $table->boolean('is_approved')->default(true);
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('service_reviews');
    }
}
