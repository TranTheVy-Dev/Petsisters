<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class ProductImagesSeeder extends Seeder
{
    public function run()
    {
        ProductImage::insert([
            [
                'product_id' => 1,
                'image_url' => 'thuc_an_cho_cho_con_purina_pro_plan_small_mini_puppy1.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'product_id' => 1,
                'image_url' => 'thuc_an_cho_cho_con_purina_pro_plan_small_mini_puppy2.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'product_id' => 2,
                'image_url' => 'thuc_an_cho_cho_me_va_cho_con_co_nho_royal_canin_mini_starter_mother_babydog1.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'product_id' => 3,
                'image_url' => 'thuc_an_cho_meo_con_vi_thit_ga_purina_pro_plan_kitten1.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'product_id' => 4,
                'image_url' => 'thuc_an_cho_meo_anh_long_ngan_con_royal_canin_british_shorthair_kitten1.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'product_id' => 5,
                'image_url' => 'balo_dung_cho_meo_phi_hanh_gia_loffe_outdoor_transparent1.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'product_id' => 5,
                'image_url' => 'balo_dung_cho_meo_phi_hanh_gia_loffe_outdoor_transparent2.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'product_id' => 5,
                'image_url' => 'balo_dung_cho_meo_phi_hanh_gia_loffe_outdoor_transparent3.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'product_id' => 6,
                'image_url' => 'xich_cho_cho_dai_nguc_co_mini_hand_in_hand1.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'product_id' => 6,
                'image_url' => 'xich_cho_cho_dai_nguc_co_mini_hand_in_hand2.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'product_id' => 6,
                'image_url' => 'xich_cho_cho_dai_nguc_co_mini_hand_in_hand3.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}