<?php

namespace Database\Seeders;

use App\Models\CommentBlog;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CommentBlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        CommentBlog::insert([
            [
                'blog_id' => 2,
                'full_name' => 'Trần Thế Vỹ',
                'email' => 'Vyhotran5@gmail.com',
                'comment' => 'Tuyệt vời, dịch vụ tốt.',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'blog_id' => 3,
                'full_name' => 'Trần Thế Vỹ',
                'email' => 'Vyhotran6@gmail.com',
                'comment' => 'Rất tuyệt, dịch vụ tốt.',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'blog_id' => 4,
                'full_name' => 'Trần Thế Vỹ',
                'email' => 'Vyhotran7@gmail.com',
                'comment' => ' dịch vụ tốt.',
                'created_at' => $now,
                'updated_at' => $now
            ],
        ]);
    }
}
