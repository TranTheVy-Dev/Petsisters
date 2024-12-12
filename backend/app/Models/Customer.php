<?php
namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;

class Customer extends Model implements Authenticatable, JWTSubject
{
    protected $table = 'customers';

    protected $fillable = [
        'full_name',
        'phone_number',
        'email',
        'address',
        'pet_name',
        'pet_type',
        'pet_age',
        'preferred_products',
        'last_purchase_date',
        'total_spent',
        'notes',
        'password',
        'role'
    ];

    protected $casts = [
        'pet_age' => 'integer',
        'total_spent' => 'double',
    ];

    public $timestamps = true;

    // Các phương thức của Authenticatable

    public function getAuthIdentifierName()
    {
        return 'id'; // Hoặc trường định danh khác
    }

    public function getAuthIdentifier()
    {
        return $this->getKey(); // Trả về giá trị của trường định danh (thường là 'id')
    }

    public function getAuthPassword()
    {
        return $this->password; // Trả về mật khẩu người dùng
    }

    public function getRememberToken()
    {
        return null; // Nếu không sử dụng tính năng remember me, bạn có thể trả về null
    }

    public function setRememberToken($value)
    {
        // Nếu không sử dụng tính năng remember me, bạn có thể bỏ qua
    }

    // Thêm phương thức getRememberTokenName
    public function getRememberTokenName()
    {
        return 'remember_token'; // Trả về tên của trường remember_token trong bảng
    }

    // Thêm phương thức getAuthPasswordName
    public function getAuthPasswordName()
    {
        return 'password'; // Trả về tên trường mật khẩu trong bảng
    }

    // Phương thức cần có khi sử dụng JWTSubject
    public function getJWTIdentifier()
    {
        return $this->getKey(); // Thường là ID của model
    }

    public function getJWTCustomClaims()
    {
        return []; // Bạn có thể thêm các claims tùy chỉnh ở đây nếu cần
    }
}

?>
