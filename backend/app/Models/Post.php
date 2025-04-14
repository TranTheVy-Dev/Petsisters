<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;
    protected $table = 'posts';
    protected $fillable = [
        'category_id', 'title', 'content', 'slugs', 'tags', 'is_published','image'
    ];
    protected $casts = [
        'category_id'=> 'integer',
        'is_published' => 'boolean',
    ];
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];
    public function category()
    {
        return $this->belongsTo(related: Category::class);
    }
}
