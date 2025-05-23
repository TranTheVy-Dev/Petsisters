<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\AppointmentRequest;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\PriceList;
use App\Models\Service;
use DateTime;
use Exception;
use Illuminate\Support\Arr;

class AppointmentController extends Controller
{
    protected  $model;
    public function __construct(Appointment $appointment)
    {
        $this->model = $appointment;
    }
    public function index()
    {
        try {
            $appointment = Appointment::all();
            return $this->successResponse($appointment, 200);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function getAppointmentByIdCustomer($id)
    {
        try {
            $data = Appointment::with('service')->where('customer_id', $id)->orderByDesc('created_at')->get();
            if ($data->isEmpty()) {
                return $this->errorResponse("We don't have data with customer have ID: $id", 404);
            }
            return $this->successResponse($data, 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse($e->getMessage(), 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $data = $request->all();
            // Xác thực dữ liệu
            $dateTime = new DateTime($data['appointment_date']);

            $day = $dateTime->format('w');
            $price_list =  $this->priceList($data);
            if ($price_list) {
                $total_price = $day == 6
                    ? $price_list->price - (($price_list->price / 100) * 10)
                    : $price_list->price;
                $data['total_price'] = $total_price;

                //laravel không khuyến khích gán giá trị = cách dưới vì request là một đối tượng không phải mảng
                //cách trên là cách đã sửa hoàn chỉnh
                // $request['total_price'] = $total_price;
            } else {
                $price_list = null;
                return $this->errorResponse('Không tìm thấy bản giá phù hợp', 404);
            }
            //lưu ý chỗ này nếu không có total_price ở trong AppointmentRequest Laravel sẽ tự động bỏ qua trường dữ liệu này
            // sẽ tạo ra Bug ẩn biến tổng giá thành 0 khi lưu vào database
            $appointmentRequest = new AppointmentRequest($data);
            $validatedData = $appointmentRequest->validate();
            //trường hợp đặt biệt , dữ liệu backend gởi qua FE sẽ kèm theo var_dump nếu chúng ta không xóa chúng
            // bên FE sẽ không truy cập vào các trường dữ liệu chính được vì có dữ liệu từ Var_dump kèm theo js sẽ không hiểu
            // và đóng băng trường dữ liệu này
            // var_dump($validatedData);
            // $appointment = $this->model->create($validatedData);
            $appointment = Appointment::create($validatedData);
            $service = Service::findOrFail($appointment->service_id);

            // Send confirmation email
            try {
                Mail::send('emails.appointment_confirmation', [
                    'appointment' => $appointment->load('customer'),
                    'service' => $service
                ], function ($message) use ($appointment) {
                    $message->to($appointment->customer->email)
                        ->subject('Xác nhận lịch hẹn - PetSisters');
                });
            } catch (Exception $e) {
                return $this->errorResponse($e->getMessage(), 500);
                // Log the email error but don't fail the appointment creation
            }

            return $this->successResponse([
                'appointment' => $appointment,
                'total_price' => $total_price,
                'service_name' => $service->service_name,
            ]);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors(), 400);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
