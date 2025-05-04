<?php

namespace App\Http\Controllers\Api\V1\Web;

use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\resetpassword;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Exception;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate dữ liệu đầu vào
        $this->validate($request, [
            "email" => "required|email",
            "password" => "required"
        ]);
        $customer = Customer::where('email', $request->email)->first();
        if ($customer && Hash::check($request->password, $customer->password)) {
            $token = JWTAuth::fromUser($customer);
            return response()->json([
                'message' => "đăng nhập thành công",
                'token' => $token,
                'customer' => $customer
            ], 200);
        } else {
            return response()->json([
                "message" => "sai tk hoac mk"
            ], 404);
        }
    }

    public function register(Request $request)
    {
        try {
            $this->validate(
                $request,
                [
                    'full_name' => 'required|string|max:255',
                    'email' => 'required|string|email|unique:customers,email',
                    'password' => 'required',
                    'avatar' => 'required|string'
                ],
                [
                    'email.unique' => 'Email này đã được sử dụng.'
                ]
            );
            $customer = Customer::create([
                'full_name' => $request->full_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'avatar' => $request->avatar, // Lưu trường avatar
            ]);

            $this->successResponse($customer, 201);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors(), 400);
        } catch (Exception $e) {
            // Xử lý lỗi khác
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function forgotPassword(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
        ]);
        $customer = Customer::where('email', $request->email)->first();
        if (!$customer) {
            return response()->json(["erro" => "không tìm thấy email của m"], 404);
        }
        $token = Str::random(60);
        var_dump($token);
        resetpassword::updateOrCreate(
            ['email' => $customer->email],
            //laravel khong nhan duoc now nen khai bao them carbon now
            values: ['token' => $token, 'createdAt' => Carbon::now()]
        );
        $resetlink = env('FE_URL') . '/reset-password?token=' . $token;
        Mail::send('emails.reset_password', ['resetlink' => $resetlink, 'customer' => $customer], function ($message) use ($customer) {
            $message->to($customer->email);
            $message->subject('Đặt lại mật khẩu');
        });
    }
    public function resetPassword(Request $request)
    {
        $this->validate($request, [
            'password' => 'required|min:6',
            'token' => 'required'
        ]);
        $passwordreset = resetpassword::where('token', $request->token)->first();
        var_dump('data of email', $passwordreset->email);
        // có một cái bug lớn ở đây : nếu muốn dùng được eloquent truy cập vào bảng resetpassword lấy
        //trường email ra thì phải bỏ cái khoá chính tk email đi thì mới lấy được email trong bảng resetpassword
        // thông qua token và đem đi so sánh với trường email trong bảng customer
        if (!$passwordreset) {
            return response()->json(['erro' => 'Token không hợp lệ, vui lòng không giả mạo Token'], 404);
        } elseif (Carbon::parse($passwordreset->createdAt)->addMinutes(15)->isPast()) {
            return response()->json(['erro' => 'Token đã hết hạn hãy yêu cầu đặt mật khẩu lại.'], 404);
        };
        $customer = Customer::where('email', $passwordreset->email)->first();
        if (!$customer) {
            return response()->json(['erro' => 'Không tìm thấy Email trong hệ thống PetSister'], 404);
        }
        $newpassword = Hash::make($request->password);
        $customer->password = $newpassword;
        $customer->save();
        $passwordreset->delete();
        if (!$customer->save()) {
            return response()->json(['error' => 'Không thể lưu mật khẩu mới, vui lòng thử lại'], 500);
        }
    }
};
