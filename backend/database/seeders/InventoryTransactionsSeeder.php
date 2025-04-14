<?php

namespace Database\Seeders;

use App\Models\InventoryTransaction;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class InventoryTransactionsSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        InventoryTransaction::insert([
            [
                'product_id' => 1, // Thức ăn cho chó Royal Canin
                'transaction_type' => 'restock',
                'quantity' => 50,
                'transaction_date' => $now,
                'reference' => 'RESTOCK-001',
                'cancel_reason' => null,
                'cancel_status' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'product_id' => 2, // Thức ăn cho chó Pedigree
                'transaction_type' => 'sell',
                'quantity' => 30,
                'transaction_date' => $now,
                'reference' => 'SELL-001',
                'cancel_reason' => null,
                'cancel_status' => 'completed',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'product_id' => 3, // Đồ chơi mèo chuột giả
                'transaction_type' => 'return',
                'quantity' => 10,
                'transaction_date' => $now,
                'reference' => 'RETURN-001',
                'cancel_reason' => null,
                'cancel_status' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'product_id' => 4, // Đồ chơi mèo bóng nỉ
                'transaction_type' => 'sell',
                'quantity' => 20,
                'transaction_date' => $now,
                'reference' => 'SELL-002',
                'cancel_reason' => null,
                'cancel_status' => 'completed',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'product_id' => 5, // Dây xích cho chó
                'transaction_type' => 'cancel',
                'quantity' => 5,
                'transaction_date' => $now,
                'reference' => 'CANCEL-001',
                'cancel_reason' => 'Khách hàng hủy đơn',
                'cancel_status' => 'completed',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
