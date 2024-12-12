<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class Product extends Model
{
    use SoftDeletes; // Để hỗ trợ xóa mềm (soft delete)

    protected $table = 'products'; // Tên bảng trong cơ sở dữ liệu

    // Các cột được phép thêm hoặc chỉnh sửa
    protected $fillable = [
        'category_id',
        'product_sku',
        'product_name',
        'image_url',
        'slugs',
        'price',
        'quantity_in_stock',
        'reorder_level',
        'description',
        'tags',
    ];
    protected $casts = [
        'category_id' => 'integer',
        'price' => 'double',
        'quantity_in_stock' => 'integer',
        'reorder_level' => 'integer',
    ];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
    public static function generateProductSku($categoryName)
    {
        // Viết tắt tên danh mục (lấy ký tự đầu tiên của mỗi từ)
        $shortCategoryName = collect(explode(' ', $categoryName))
            ->map(fn($word) => strtoupper(mb_substr($word, 0, 1)))
            ->join('');
        // Lấy thời gian hiện tại định dạng YmdHis (năm, tháng, ngày, giờ, phút, giây)
        $timestamp = Carbon::now()->format('YmdHis');
        // Mã hóa thời gian bằng hàm hash (md5), cắt ngắn và in hoa
        $encodedTime = strtoupper(substr(md5($timestamp), 0, 6));
        // Kết hợp tên danh mục viết tắt với thời gian mã hóa
        return "{$shortCategoryName}{$timestamp}{$encodedTime}";
    }
    // Hàm tạo slug từ tên sản phẩm
    public static function generateProductSlug($productName)
    {
        // Chuyển tên sản phẩm thành chữ thường
        $slug = Str::slug($productName, '-');  // Sử dụng hàm slug của Laravel để thay dấu cách bằng '-'

        // Trả về slug đã chuẩn hóa
        return $slug;
    }
}
