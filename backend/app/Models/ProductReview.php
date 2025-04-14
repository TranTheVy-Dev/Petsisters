<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductReview extends Model
{
    use SoftDeletes;
    protected $table = 'product_reviews';
    protected $fillable = [
        'product_id',
        'full_name',
        'email',
        'rating',
        'review',
        'is_approved',
    ];
    protected $casts = [
        'product_id' => 'integer',
        'rating' => 'integer',
        'is_approved'=> 'boolean'
    ];
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class,'product_id');
    }
}
