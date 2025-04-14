<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PriceList extends Model
{
    use SoftDeletes;
    protected $table = 'price_list';
    protected $fillable = [
        'service_id',
        'pet_weight',
        'price',
    ];
    protected $casts = [
        'service_id' => 'integer',
    ];
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];
    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
}
