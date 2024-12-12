<?php

namespace Database\Seeders;

use App\Models\OrderDetail;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class OrderDetailsSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();
        OrderDetail::insert([
            // Order 1: Nguyễn Văn A (nguyenvana) - Thức ăn cho chó Royal Canin
            [
                'order_id' => 1, // Assumed order_id from the first order in OrderSeeder
                'product_id' => 1, // Thức ăn cho chó Royal Canin
                'quantity' => 2,
                'unit_price' => 500000,
                'subtotal' => 2 * 500000,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            // Order 2: Trần Thị B (tranthib) - Thức ăn cho mèo, Đồ chơi mèo
            [
                'order_id' => 2, // Assumed order_id from the second order in OrderSeeder
                'product_id' => 2, // Thức ăn cho chó Pedigree
                'quantity' => 1,
                'unit_price' => 300000,
                'subtotal' => 1 * 300000,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'order_id' => 2, // Trần Thị B order
                'product_id' => 3, // Đồ chơi mèo chuột giả
                'quantity' => 3,
                'unit_price' => 100000,
                'subtotal' => 3 * 100000,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            // Order 3: Phạm Thị C (phamthic) - Dây xích cho chó
            [
                'order_id' => 3, // Assumed order_id from the third order in OrderSeeder
                'product_id' => 5, // Dây xích cho chó
                'quantity' => 2,
                'unit_price' => 150000,
                'subtotal' => 2 * 150000,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            // Order 4: Lê Thị D (lethid) - Quần áo cho mèo
            [
                'order_id' => 4, // Assumed order_id from the fourth order in OrderSeeder
                'product_id' => 6, // Quần áo cho mèo
                'quantity' => 1,
                'unit_price' => 250000,
                'subtotal' => 1 * 250000,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            // Order 5: Đặng Văn E (dangvane) - Thức ăn cho chó Merrick
            [
                'order_id' => 5, // Assumed order_id from the fifth order in OrderSeeder
                'product_id' => 7, // Thức ăn cho chó Merrick
                'quantity' => 1,
                'unit_price' => 700000,
                'subtotal' => 1 * 700000,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
