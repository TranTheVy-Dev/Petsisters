<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('service_id');
            $table->string('pet_name', 100)->nullable(); 
            $table->string('pet_age', 100)->nullable(); 
            $table->string('pet_type', 50)->nullable();
            $table->string('pet_weight', 50)->nullable();
            $table->dateTime('appointment_date');
            $table->enum('status', [
                'pending', 'confirmed', 'completed', 'cancelled'
            ])->default('pending'); // Trạng thái với giá trị mặc định là 'pending'

            $table->text('notes')->nullable(); // notes text null
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
    }
    public function down()
    {
        Schema::dropIfExists('appointments');
    }
}