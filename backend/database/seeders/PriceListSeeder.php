<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PriceListSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        // Lấy danh sách các dịch vụ bằng slugs (giả sử các dịch vụ đã được tạo)
        $services = DB::table('services')->whereIn('slugs', [
            'cat-tia',
            'cao-long-cho-thu-cung',
            'tam-rua',
            'tiem-phong-thu-cung',
            'kham-tong-quat'
        ])->pluck('id', 'slugs');

        DB::table('price_list')->insert([
            // Dịch vụ cắt tỉa
            ['service_id' => $services['cat-tia'], 'pet_weight' => '3kg', 'price' => 150000, 'created_at' => $now, 'updated_at' => $now],
            ['service_id' => $services['cat-tia'], 'pet_weight' => '4-8kg', 'price' => 180000, 'created_at' => $now, 'updated_at' => $now],
            ['service_id' => $services['cat-tia'], 'pet_weight' => '12-20kg', 'price' => 220000, 'created_at' => $now, 'updated_at' => $now],
            ['service_id' => $services['cat-tia'], 'pet_weight' => '20-25kg', 'price' => 230000, 'created_at' => $now, 'updated_at' => $now],
            ['service_id' => $services['cat-tia'], 'pet_weight' => '25-30kg', 'price' => 250000, 'created_at' => $now, 'updated_at' => $now],

            // Dịch vụ cạo lông
            ['service_id' => $services['cao-long-cho-thu-cung'], 'pet_weight' => '3kg', 'price' => 100000, 'created_at' => $now, 'updated_at' => $now],
            ['service_id' => $services['cao-long-cho-thu-cung'], 'pet_weight' => '4-8kg', 'price' => 150000, 'created_at' => $now, 'updated_at' => $now],
            ['service_id' => $services['cao-long-cho-thu-cung'], 'pet_weight' => '12-20kg', 'price' => 170000, 'created_at' => $now, 'updated_at' => $now],
            ['service_id' => $services['cao-long-cho-thu-cung'], 'pet_weight' => '20-25kg', 'price' => 190000, 'created_at' => $now, 'updated_at' => $now],
            ['service_id' => $services['cao-long-cho-thu-cung'], 'pet_weight' => '25-30kg', 'price' => 200000, 'created_at' => $now, 'updated_at' => $now],

            // Dịch vụ tắm
            ['service_id' => $services['tam-rua'], 'pet_weight' => '3kg', 'price' => 100000, 'created_at' => $now, 'updated_at' => $now],
            ['service_id' => $services['tam-rua'], 'pet_weight' => '4-8kg', 'price' => 130000, 'created_at' => $now, 'updated_at' => $now],
            ['service_id' => $services['tam-rua'], 'pet_weight' => '12-20kg', 'price' => 140000, 'created_at' => $now, 'updated_at' => $now],
            ['service_id' => $services['tam-rua'], 'pet_weight' => '20-25kg', 'price' => 155000, 'created_at' => $now, 'updated_at' => $now],
            ['service_id' => $services['tam-rua'], 'pet_weight' => '25-30kg', 'price' => 170000, 'created_at' => $now, 'updated_at' => $now],

            // Dịch vụ tiêm phòng
            ['service_id' => $services['tiem-phong-thu-cung'], 'pet_weight' => 'Tất cả', 'price' => 50000, 'created_at' => $now, 'updated_at' => $now],

            // Dịch vụ khám tổng quát
            ['service_id' => $services['kham-tong-quat'], 'pet_weight' => 'Tất cả', 'price' => 300000, 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
