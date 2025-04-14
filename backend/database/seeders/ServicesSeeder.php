<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ServicesSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        // Lấy danh sách các danh mục bằng slugs (chúng ta giả sử các danh mục đã được tạo)
        $categories = Category::whereIn('slugs', [
            'dich-vu-cat-tia', 
            'dich-vu-cao-long', 
            'dich-vu-tam',
            'dich-vu-tiem-phong',
            'dich-vu-kham-tong-quat'
        ])->pluck('id', 'slugs');

        Service::insert([
            [
                'category_id' => $categories['dich-vu-cat-tia'],
                'service_name' => 'Dịch vụ cắt tỉa',
                'image_url' => 'https://res.cloudinary.com/dmped9z6o/image/upload/v1734515561/petsisters/images/services/cat_tia.jpg',
                'price' => 150000,
                'slugs' => 'cat-tia',
                'description' => 'Dịch vụ cắt tỉa cho thú cưng, giúp thú cưng của bạn có bộ lông gọn gàng, dễ thương và hợp xu hướng.',
                'duration' => 30,
                'tags' => 'tia-long, cat-tia',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => $categories['dich-vu-cao-long'],
                'service_name' => 'Cạo lông cho thú cưng',
                'image_url' => 'https://res.cloudinary.com/dmped9z6o/image/upload/v1734515562/petsisters/images/services/cao_long.jpg',
                'price' => 120000,
                'slugs' => 'cao-long-cho-thu-cung',
                'description' => 'Dịch vụ cạo lông an toàn và nhẹ nhàng, mang lại sự thoải mái và sạch sẽ cho thú cưng của bạn.',
                'duration' => 25,
                'tags' => 'cao-long',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => $categories['dich-vu-tam'],
                'service_name' => 'Dịch vụ tắm rửa',
                'image_url' => 'https://res.cloudinary.com/dmped9z6o/image/upload/v1734515556/petsisters/images/services/tam.jpg',
                'price' => 300000,
                'slugs' => 'tam-rua',
                'description' => 'Dịch vụ tắm chuyên nghiệp, sử dụng các sản phẩm an toàn và phù hợp với làn da thú cưng.',
                'duration' => 45,
                'tags' => 'tam-rua',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => $categories['dich-vu-tiem-phong'],
                'service_name' => 'Tiêm phòng cho thú cưng',
                'image_url' => 'https://res.cloudinary.com/dmped9z6o/image/upload/v1734515556/petsisters/images/services/tiem_phong',
                'price' => 50000,
                'slugs' => 'tiem-phong-thu-cung',
                'description' => 'Dịch vụ tiêm phòng các loại bệnh cho thú cưng (bao gồm bệnh dại, care, parvo).',
                'duration' => 15,
                'tags' => 'tiêm phòng, thú cưng, phòng bệnh',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => $categories['dich-vu-kham-tong-quat'],
                'service_name' => 'Dịch vụ khám tổng quát',
                'image_url' => 'https://res.cloudinary.com/dmped9z6o/image/upload/v1734515556/petsisters/images/services/kham_tong_quat',
                'price' => 200000,
                'slugs' => 'kham-tong-quat',
                'description' => 'Dịch vụ cắt tỉa lông cho chó với các kiểu dáng đẹp, chuyên nghiệp.',
                'duration' => 60,
                'tags' => 'cắt lông, chăm sóc lông, chó',
                'created_at' => $now,
                'updated_at' => $now,
            ]
        ]);
    }
}