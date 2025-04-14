<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\AppointmentRequest;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\PriceList;
use App\Models\Service;
use DateTime;
use Exception;

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
            $appointment = Appointment::where("customer_id" , $id)->get();
            return $this->successResponse($appointment);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy đơn hàng với id người dùng  này: $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // Xác thực dữ liệu
            $dateTime = new DateTime($request['appointment_date']);
            $day = $dateTime->format('w');
            $price_list = PriceList::where('service_id', $request['service_id'])
                ->where('pet_weight', $request['pet_weight'])
                ->first();
            if ($price_list) {
                $total_price = $day == 6 ? $price_list->price - (($price_list->price / 100) * 10) : $price_list->price;
                $request['total_price'] = $total_price;
            }else{
                $price_list = 0;
            }
            $appointmentRequest = new AppointmentRequest($request->all());
            $validatedData = $appointmentRequest->validate();
            $appointment = $this->model->create($validatedData);
            $service = Service::findOrFail($appointment->service_id);
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
