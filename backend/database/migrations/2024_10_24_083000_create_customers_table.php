<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('full_name', 255)->nullable();
            $table->string('phone_number', 20)->nullable();
            $table->string('email', 255)->unique();
            $table->string('password', 255);
            $table->string('address', 255)->nullable();
            $table->string('avatar', 255)->nullable();
            $table->tinyInteger('is_update_avatar')->default(0);
            $table->string('pet_name', 100)->nullable();
            $table->string('pet_type', 50)->nullable();
            $table->integer('pet_age')->nullable();
            $table->text('preferred_products')->nullable();
            $table->dateTime('last_purchase_date')->nullable();
            $table->double('total_spent')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('role')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    public function down()
    {
        Schema::dropIfExists('customers');
    }
}
