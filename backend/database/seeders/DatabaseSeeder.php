<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call('UsersTableSeeder');
        $this->call(CustomersSeeder::class);
        $this->call(CategoriesSeeder::class);
        $this->call(ProductsSeeder::class);
        $this->call(ProductImagesSeeder::class);
        $this->call(ProductReviewsSeeder::class);
        $this->call(ServicesSeeder::class);
        $this->call(ServiceReviewsSeeder::class);
        $this->call(AppointmentSeeder::class);
        // $this->call(OrdersSeeder::class);
        // $this->call(OrderDetailsSeeder::class);
        $this->call(PostsSeeder::class);
        $this->call(CommentBlogSeeder::class);
        $this->call(InventoryTransactionsSeeder::class);
        $this->call(PriceListSeeder::class);
    }
}
