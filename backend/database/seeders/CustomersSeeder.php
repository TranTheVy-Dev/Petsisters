<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;

class CustomersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Customer::insert([
            [
                'full_name' => 'Nguyễn Văn A',
                'phone_number' => '0987654321',
                'email' => 'nguyenvana@example.com',
                'address' => '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
                'pet_name' => 'Mít',
                'pet_type' => 'Chó',
                'pet_age' => 3,
                'preferred_products' => 'Thức ăn cho chó, Đồ chơi cho chó',
                'last_purchase_date' => '2024-01-15 14:30:00',
                'total_spent' => 1500000,
                'notes' => 'Khách hàng thân thiết',
                'password' => 'vy123456'

            ],
            [
                'full_name' => 'Trần Thị B',
                'phone_number' => '0912345678',
                'email' => 'tranthib@example.com',
                'address' => '456 Đường Hai Bà Trưng, Quận 3, TP. Hồ Chí Minh',
                'pet_name' => 'Mèo Mướp',
                'pet_type' => 'Mèo',
                'pet_age' => 2,
                'preferred_products' => 'Thức ăn cho mèo, Cát vệ sinh cho mèo',
                'last_purchase_date' => '2024-03-22 10:15:00',
                'total_spent' => 800000,
                'notes' => 'Ưu tiên vận chuyển nhanh',
                'password' => 'vy123456'
            ]
        ]);
    }
}
