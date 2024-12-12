<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\AppointmentRequest;
use App\Http\Controllers\Controller;
use App\Models\Appointment;

use Exception;
use Illuminate\Database\QueryException;

class AppointmentController extends Controller
{
    protected $appointment;
    public function __construct(Appointment $Appointment)
    {
        $this->model = $appointment;
    }
    public function store(Request $request)
    {
        try {
            // Xác thực dữ liệu
            $orderRequest = new OrderRequest($request->all());
            $validatedData = $orderRequest->validate();
            return response()->json($validatedData);
        }catch (ValidationException $e){
        return " heloo morther";
        }
        }
}
