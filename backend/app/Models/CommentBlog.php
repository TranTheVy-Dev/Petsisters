<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CommentBlog extends Model{
    use SoftDeletes;
    protected $table = "comment_blog";

    protected $fillable = [
        'blog_id',
        'full_name',
        'email',
        'comment'
    ];
    protected $date = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function blog(){
        return $this->belongsTo(Post::class);
    }
}
