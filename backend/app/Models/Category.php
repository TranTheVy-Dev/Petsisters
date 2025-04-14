<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;
    protected $table = 'categories';
    protected $fillable = [
        'category_name',
        'category_type',
        'slugs',
        'description',
    ];
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function getCategoryNameById($category_id)
    {
        return $this->where('id', $category_id)->value('category_name');
    }
}
