<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Customer;
use Carbon\Carbon;

class OrdersSeeder extends Seeder
{
    public function run()
    {
        $customers = Customer::all();

        Order::insert([
            [
                'customer_id' => $customers->where('user_name', 'nguyenvana')->first()->id,
                'order_code' => 'ORD001',
                'order_date' => Carbon::create('2024', '01', '15'),
                'total_amount' => 500000,
                'status' => 'pending',
                'created_at' => Carbon::now(),
                'updated_at'=> Carbon::now()
            ],
            [
                'customer_id' => $customers->where('user_name', 'tranthib')->first()->id,
                'order_code' => 'ORD002',
                'order_date' => Carbon::create('2024', '03', '22'),
                'total_amount' => 300000,
                'status' => 'paid',
                'created_at' => Carbon::now(),
                'updated_at'=> Carbon::now()
            ],
            [
                'customer_id' => $customers->where('user_name', 'phamthic')->first()->id,
                'order_code' => 'ORD003',
                'order_date' => Carbon::create('2024', '05', '18'),
                'total_amount' => 400000,
                'status' => 'cancelled',
                'created_at' => Carbon::now(),
                'updated_at'=> Carbon::now()
            ],
            [
                'customer_id' => $customers->where('user_name', 'lethid')->first()->id,
                'order_code' => 'ORD004',
                'order_date' => Carbon::create('2024', '06', '30'),
                'total_amount' => 350000,
                'status' => 'pending',
                'created_at' => Carbon::now(),
                'updated_at'=> Carbon::now()
            ],
            [
                'customer_id' => $customers->where('user_name', 'dangvane')->first()->id,
                'order_code' => 'ORD005',
                'order_date' => Carbon::create('2024', '08', '10'),
                'total_amount' => 450000,
                'status' => 'paid',
                'created_at' => Carbon::now(),
                'updated_at'=> Carbon::now()
            ],
        ]);
    }
}
