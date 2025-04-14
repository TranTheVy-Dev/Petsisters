<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appointment extends Model
{
    use SoftDeletes;
    protected $table = 'appointments';
    protected $fillable = [
        'customer_id',
        'service_id',
        'pet_name',
        'pet_age',
        'pet_type',
        'pet_weight',
        'pet_gender',
        'appointment_date',
        'status',
        'notes',
        'total_price',
    ];
    protected $casts = [
        'customer_id'=> 'integer',
        'service_id' => 'integer',
    ];
    protected $dates = [
        'appointment_date',
        'created_at',
        'updated_at',
        'deleted_at',
    ];
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
    // $appointments = Appointment::with(['customer', 'service'])->get();
}
