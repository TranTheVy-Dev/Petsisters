<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class resetpassword extends Model
{
    //chặn không cho tự động thêm createdAt và updatedAt và deleledAt
    public $timestamps = false;
    //  nếu muốn dùng eloquent truy cập vào một trường có khoá chính thông qua một token thì điều đó là điều
    // không thể nên theo quy tắc

    protected $table = "reset_password";
    protected $primarykey = "token";
    public $incrementing = false;          // Khóa chính không tự tăng
    protected $keyType = 'string';         // Khóa chính là chuỗi
    protected $fillable = [
        'email',
        'token',
        'createdAt'
    ];
    public function resetpassword()
    {
        return $this->belongsTo(Customer::class);
    }
    //
}
