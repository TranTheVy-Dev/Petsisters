<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InventoryTransaction extends Model
{
    use SoftDeletes;
    protected $table = 'inventory_transactions';
    protected $fillable = [
        'product_id',
        'transaction_type',
        'quantity',
        'transaction_date',
        'reference',
        'cancel_reason',
        'cancel_status',
    ];
    protected $casts = [
        'product_id' => 'integer',
        'quantity'=> 'integer',
    ];
    protected $dates = ['transaction_date', 'created_at', 'updated_at', 'deleted_at'];
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
