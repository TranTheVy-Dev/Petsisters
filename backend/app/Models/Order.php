<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;
    protected $table = 'orders';
    protected $fillable = [
        'customer_id',
        'order_code',
        'order_date',
        'total_amount',
        'status',
    ];
    protected $casts = [
        'customer_id' => 'integer',
        'total_amount' => 'double',
    ];
    protected $dates = ['order_date', 'created_at', 'updated_at', 'deleted_at'];
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'order_id');
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
}