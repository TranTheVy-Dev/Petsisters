<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatCommentBlogTable extends Migration{

    public function up(){
        Schema::create('comment_blog', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger("blog_id");
            $table->string('full_name');
            $table->string('email',255)->nullable();
            $table->text('comment');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign("blog_id")->references('id')->on('posts')->onDelete('cascade');
        });
    }

    public function down(){
        Schema::dropIfExists('comment_blog');
    }
}
