<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();

        // Tạo 3 danh mục "service" với dữ liệu thực tế
        Category::insert([
            [
                'category_name' => 'Dịch vụ cắt tỉa',
                'category_type' => 'service',
                'slugs' => 'dich-vu-cat-tia',
                'description' => 'Dịch vụ cắt tỉa cho thú cưng, giúp thú cưng của bạn có bộ lông gọn gàng, dễ thương và hợp xu hướng.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_name' => 'Dịch vụ cạo lông',
                'category_type' => 'service',
                'slugs' => 'dich-vu-cao-long',
                'description' => 'Dịch vụ cạo lông an toàn và nhẹ nhàng, mang lại sự thoải mái và sạch sẽ cho thú cưng của bạn.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_name' => 'Dịch vụ tắm',
                'category_type' => 'service',
                'slugs' => 'dich-vu-tam',
                'description' => 'Dịch vụ tắm chuyên nghiệp, sử dụng các sản phẩm an toàn và phù hợp với làn da thú cưng.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_name' => 'Dịch vụ tiêm phòng',
                'category_type' => 'service',
                'slugs' => 'dich-vu-tiem-phong',
                'description' => 'Dịch vụ tiêm phòng giúp bảo vệ thú cưng của bạn khỏi các bệnh nguy hiểm.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_name' => 'Dịch vụ khám tổng quát',
                'category_type' => 'service',
                'slugs' => 'dich-vu-kham-tong-quat',
                'description' => 'Dịch vụ khám tổng quát định kỳ giúp kiểm tra sức khỏe toàn diện cho thú cưng của bạn.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);

        // Tạo 3 danh mục "product" với dữ liệu thực tế
        Category::insert([
            ['category_name' => 'Thức ăn cho chó', 'category_type' => 'product', 'slugs' => 'thuc-an-cho-cho', 'description' => 'Thức ăn cho cún yêu.', 'created_at' => $now, 'updated_at' => $now],
            ['category_name' => 'Thức ăn cho mèo', 'category_type' => 'product', 'slugs' => 'thuc-an-cho-meo', 'description' => 'Đồ ăn cho chú mèo của bạn.', 'created_at' => $now, 'updated_at' => $now],
            ['category_name' => 'Phụ kiện thú cưng', 'category_type' => 'product', 'slugs' => 'phu-kien-thu-cung', 'description' => 'Phụ kiện, trang sức cho thú cưng.', 'created_at' => $now, 'updated_at' => $now],
        ]);

        // Tạo 3 danh mục "post" với dữ liệu thực tế
        Category::insert([
            ['category_name' => 'Bài viết về chăm sóc thú cưng', 'category_type' => 'post', 'slugs' => 'bai-viet-cham-soc-thu-cung', 'description' => 'Hướng dẫn và mẹo về cách chăm sóc thú cưng', 'created_at' => $now, 'updated_at' => $now],
            ['category_name' => 'Bài viết về dinh dưỡng', 'category_type' => 'post', 'slugs' => 'bai-viet-dinh-duong', 'description' => 'Thông tin về dinh dưỡng và thực phẩm phù hợp cho thú cưng', 'created_at' => $now, 'updated_at' => $now],
            ['category_name' => 'Bài viết về huấn luyện thú cưng', 'category_type' => 'post', 'slugs' => 'bai-viet-huan-luyen-thu-cung', 'description' => 'Hướng dẫn huấn luyện các thói quen tốt cho thú cưng', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
