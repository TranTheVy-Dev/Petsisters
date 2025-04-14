<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use SoftDeletes;
    protected $table = 'services';
    protected $fillable = [
        'category_id',
        'service_name',
        'image_url',
        'price',
        'slugs',
        'description',
        'duration',
        'tags',
    ];
    protected $casts = [
        'price' => 'double',
        'duration' => 'integer',
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
