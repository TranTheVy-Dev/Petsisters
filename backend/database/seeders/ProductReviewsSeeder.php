<?php

namespace Database\Seeders;

use App\Models\ProductReview;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProductReviewsSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        ProductReview::insert([
            [
                'full_name' => 'Nguyễn Văn A',
                'email' => 'nguyenvana@example.com',
                'product_id' => 1,  // Thức ăn cho chó Royal Canin
                'rating' => 5,
                'review' => 'Sản phẩm rất tốt, chó nhà mình rất thích!',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'full_name' => 'Trần Thị B',
                'email' => 'nguyenvana@example.com',
                'product_id' => 2,  // Thức ăn cho chó Pedigree
                'rating' => 4,
                'review' => 'Chất lượng khá tốt, nhưng giá hơi cao.',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
               'full_name' => 'Nguyễn Văn B',
                'email' => 'nguyenvana@example.com',
                'product_id' => 3,  // Đồ chơi mèo chuột giả
                'rating' => 5,
                'review' => 'Mèo nhà mình chơi cả ngày không chán.',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'full_name' => 'Nguyễn Văn C',
                'email' => 'nguyenvana@example.com',
                'product_id' => 4,  // Đồ chơi mèo bóng nỉ
                'rating' => 3,
                'review' => 'Đồ chơi ổn, nhưng mèo mình không thích lắm.',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
               'full_name' => 'Nguyễn Văn D',
                'email' => 'nguyenvana@example.com',
                'product_id' => 5,  // Dây xích cho chó
                'rating' => 5,
                'review' => 'Dây xích chắc chắn, rất hài lòng!',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
