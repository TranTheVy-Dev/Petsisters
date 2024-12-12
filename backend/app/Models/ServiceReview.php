<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceReview extends Model
{
    use SoftDeletes;
    protected $table = 'service_reviews';
    protected $fillable = [
        'service_id',
        'full_name',
        'email',
        'rating',
        'review',
        'is_approved',
    ];
    protected $casts = [
        'service_id' => 'integer',
        'rating' => 'integer',
        'is_approved' => 'boolean',
    ];
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
