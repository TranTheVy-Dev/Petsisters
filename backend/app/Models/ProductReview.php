<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductReview extends Model
{
    use SoftDeletes;
    protected $table = 'product_reviews';
    protected $fillable = [
        'customer_id', 
        'product_id', 
        'rating', 
        'review', 
        'is_approved'
    ];
    protected $casts = [
        'customer_id' => 'integer',
        'product_id' => 'integer',
        'rating' => 'tinyInteger',
        'is_approved'=> 'boolean'
    ];
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
