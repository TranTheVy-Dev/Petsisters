<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductImage extends Model
{
    use SoftDeletes; // Để hỗ trợ xóa mềm (soft delete)

    protected $table = 'product_images'; // Tên bảng trong cơ sở dữ liệu

    // Các cột được phép thêm hoặc chỉnh sửa
    protected $fillable = [
        'product_id',
        'image_url',
    ];

    // Định dạng dữ liệu cho các cột kiểu số
    protected $casts = [
        'product_id' => 'integer',
    ];

    // Các cột ngày tháng
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    // Mối quan hệ với Product (mỗi ảnh thuộc về một sản phẩm)
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
