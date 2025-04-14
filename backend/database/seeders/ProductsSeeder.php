<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ProductsSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();
        Product::insert([
            [
                'category_id' => 6,
                'product_sku' => 'DOGFOOD001',
                'product_name' => 'Thức ăn cho chó con PURINA PRO PLAN Small & Mini Puppy',
                'image_url' => 'https://res.cloudinary.com/dmped9z6o/image/upload/v1734456279/petsisters/images/products/thuc_an_cho_cho_con_purina_pro_plan_small_mini_puppy.jpg',
                'slugs' => 'thuc-an-cho-cho-con-purina-pro-plan-small-mini-puppy',
                'price' => 135000,
                'quantity_in_stock' => 20,
                'reorder_level' => 5,
                'description' => 'Thức ăn dinh dưỡng cao cho chó con, giúp phát triển khỏe mạnh và bảo vệ hệ tiêu hóa, phù hợp với chó con nhỏ và giống mini.',
                'tags' => 'thức ăn chó con, purina pro plan, thức ăn cho chó nhỏ, dinh dưỡng cho thú cưng',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => 6,
                'product_sku' => 'DOGFOOD002',
                'product_name' => 'Thức ăn cho chó mẹ và chó con cỡ nhỏ ROYAL CANIN Mini Starter Mother & Babydog',
                'image_url' => 'https://res.cloudinary.com/dmped9z6o/image/upload/v1734456284/petsisters/images/products/thuc_an_cho_cho_me_va_cho_con_co_nho_royal_canin_mini_starter_mother_babydog.jpg',
                'slugs' => 'thuc-an-cho-cho-me-va-cho-con-co-nho-royal-canin-mini-starter-mother-babydog',
                'price' => 1590000,
                'quantity_in_stock' => 20,
                'reorder_level' => 5,
                'description' => 'Dành cho chó mẹ và chó con, hỗ trợ hệ tiêu hóa và hệ miễn dịch, cung cấp đầy đủ dưỡng chất cho giai đoạn phát triển quan trọng.',
                'tags' => 'thức ăn chó mẹ, thức ăn chó con, royal canin, dinh dưỡng cho thú cưng',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => 7,
                'product_sku' => 'CATFOOD001',
                'product_name' => 'Thức ăn cho mèo con vị thịt gà PURINA PRO PLAN Kitten',
                'image_url' => 'https://res.cloudinary.com/dmped9z6o/image/upload/v1734456299/petsisters/images/products/thuc_an_cho_meo_con_vi_thit_ga_purina_pro_plan_kitten.jpg',
                'slugs' => 'thuc-an-cho-meo-con-vi-thit-ga-purina-pro-plan-kitten',
                'price' => 450000,
                'quantity_in_stock' => 20,
                'reorder_level' => 5,
                'description' => 'Thức ăn cho mèo con với hương vị thịt gà, cung cấp protein và dưỡng chất thiết yếu cho sự phát triển toàn diện của mèo con.',
                'tags' => 'thức ăn mèo, purina pro plan, thức ăn cho mèo con, dinh dưỡng cho mèo',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => 7,
                'product_sku' => 'CATFOOD002',
                'product_name' => 'Thức ăn cho mèo Anh lông ngắn con ROYAL CANIN British Shorthair Kitten',
                'image_url' => 'https://res.cloudinary.com/dmped9z6o/image/upload/v1734456299/petsisters/images/products/thuc_an_cho_meo_anh_long_ngan_con_royal_canin_british_shorthair_kitten.jpg',
                'slugs' => 'thuc-an-cho-meo-anh-long-ngan-con-royal-canin-british-shorthair-kitten',
                'price' => 150000,
                'quantity_in_stock' => 20,
                'reorder_level' => 5,
                'description' => 'Thức ăn cho mèo Anh lông ngắn con, giúp hỗ trợ sự phát triển của mèo con với các dưỡng chất thiết yếu như Omega-3 và Omega-6.',
                'tags' => 'thức ăn mèo Anh, royal canin, thức ăn cho mèo con, british shorthair, dinh dưỡng cho mèo',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => 8,
                'product_sku' => 'ACCESSORY001',
                'product_name' => 'Balo đựng chó mèo phi hành gia LOFFE Outdoor Transparent',
                'image_url' => 'https://res.cloudinary.com/dmped9z6o/image/upload/v1734456299/petsisters/images/products/balo_dung_cho_meo_phi_hanh_gia_loffe_outdoor_transparent.jpg',
                'slugs' => 'balo-dung-cho-meo-phi-hanh-gia-loffe-outdoor-transparent',
                'price' => 535000,
                'quantity_in_stock' => 20,
                'reorder_level' => 5,
                'description' => 'Balo đựng chó mèo kiểu phi hành gia, thiết kế trong suốt giúp thú cưng dễ dàng nhìn ra ngoài. Phù hợp cho những chuyến đi xa hoặc đi dạo.',
                'tags' => 'balo chó mèo, phụ kiện thú cưng, balo phi hành gia, balo ngoài trời',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => 8,
                'product_sku' => 'ACCESSORY002',
                'product_name' => 'Xích cho chó đai ngực cỡ mini HAND IN HAND',
                'image_url' => 'https://res.cloudinary.com/dmped9z6o/image/upload/v1734456299/petsisters/images/products/xich_cho_cho_dai_nguc_co_mini_hand_in_hand.jpg',
                'slugs' => 'xich-cho-cho-dai-nguc-co-mini-hand-in-hand',
                'price' => 80000,
                'quantity_in_stock' => 20,
                'reorder_level' => 5,
                'description' => 'Xích đai ngực cho chó nhỏ, dễ dàng điều chỉnh và thoải mái cho thú cưng khi di chuyển. Dùng cho chó cỡ mini.',
                'tags' => 'xích chó, phụ kiện chó, đai ngực cho chó, xích mini, đi dạo với chó',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
