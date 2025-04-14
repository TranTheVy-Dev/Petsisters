<?php

namespace Database\Seeders;

use App\Models\ServiceReview;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ServiceReviewsSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();
        ServiceReview::insert([
            [
                'service_id' => 1, // Tắm rửa cho chó nhỏ
                'full_name' => 'Nguyễn Văn A',
                'email' => 'nguyenvana@example.com',
                'rating' => 5,
                
                'review' => 'Dịch vụ tuyệt vời, nhân viên rất thân thiện và chăm sóc chó tôi rất tốt!',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'service_id' => 2, // Tắm rửa cho mèo
                'full_name' => 'Trần Thị B',
                'email' => 'tranthib@example.com',
                'rating' => 4,
                'review' => 'Mèo của tôi rất thích, dịch vụ tốt nhưng thời gian hơi lâu.',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'service_id' => 3, // Khám tổng quát cho chó mèo
                'full_name' => 'Phạm Văn C',
                'email' => 'phamvanc@example.com',
                'rating' => 5,
                'review' => 'Khám tổng quát rất kỹ lưỡng, bác sĩ rất có tâm.',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'service_id' => 4, // Tiêm phòng cho thú cưng
                'full_name' => 'Lê Văn D',
                'email' => 'levand@example.com',
                'rating' => 3,
                'review' => 'Thú cưng của tôi không thấy đau, nhưng nhân viên có phần thiếu thân thiện.',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'service_id' => 5, // Cắt tỉa lông chó
                'full_name' => 'Nguyễn Thị E',
                'email' => 'nguyenthe@example.com',
                'rating' => 5,
                'review' => 'Chó của tôi rất đẹp sau khi được cắt tỉa, dịch vụ chuyên nghiệp!',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'service_id' => 1,
                'full_name' => 'Trần Văn F',
                'email' => 'tranvanf@example.com',
                'rating' => 4,
                'review' => 'Chất lượng dịch vụ rất tốt, nhưng cần cải thiện thời gian chờ.',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'service_id' => 2,
                'full_name' => 'Phan Thị G',
                'email' => 'phanthig@example.com',
                'rating' => 5,
                'review' => 'Mèo của tôi rất sạch sẽ và thoải mái sau khi tắm.',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'service_id' => 3,
                'full_name' => 'Ngô Văn H',
                'email' => 'ngovanh@example.com',
                'rating' => 2,
                'review' => 'Dịch vụ khá tốt nhưng thời gian khám hơi lâu.',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'service_id' => 4,
                'full_name' => 'Nguyễn Văn I',
                'email' => 'nguyenvani@example.com',
                'rating' => 3,
                'review' => 'Dịch vụ tiêm phòng tốt nhưng giá hơi cao.',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'service_id' => 5,
                'full_name' => 'Lê Thị J',
                'email' => 'lethij@example.com',
                'rating' => 4,
                'review' => 'Cắt tỉa lông rất đẹp, sẽ quay lại lần sau!',
                'is_approved' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
