<?php
namespace App\Http\Controllers\Api\V1\Web;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class ContactController extends Controller
{
    public function sendContactForm(Request $request)
    {
        // Sử dụng Validator để kiểm tra dữ liệu
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
            'phone' => 'required'
        ]);

        if ($validator->fails()) {
            // Trả về lỗi xác thực
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        try {
            // Sử dụng Mail facade để gửi email
            Mail::raw(
                "Tên: {$validated['name']}\n" .
                "Email: {$validated['email']}\n" .
                "Số Điện Thoại:\n{$validated['phone']}".
                "Tin Nhắn:\n{$validated['message']}",

                function ($message) use ($validated) {
                    $message->from(env('MAIL_FROM_EMAIL', 'no-reply@example.com'))
                            ->to(env('MAIL_FROM_EMAIL', 'vydev050204@gmail.com'))
                            ->subject("Có Thông Báo Cần Hỗ Trợ Từ Người Dùng {$validated['name']}");
                }
            );

            // Phản hồi thành công
            return response()->json(['message' => 'đã nhận được thông báo của bạn, chúng tôi sẽ sớm liên lạc'], 200);
        } catch (\Exception $e) {
            // Bắt lỗi và trả về phản hồi lỗi
            return response()->json([
                'error' => 'Failed to send email. ' . $e->getMessage(),
            ], 500);
        }
    }
}


?>
