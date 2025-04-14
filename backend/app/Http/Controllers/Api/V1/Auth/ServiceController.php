<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\ServiceRequest;
use App\Http\Controllers\Controller;
use App\Models\Service;
use Exception;

/**
 * @OA\Tag(
 *     name="service",
 *     description="API để quản lý dịch vụ"
 * )
 */

class ServiceController extends Controller
{
    public function __construct()
    {
        //
    }
    public function index(Request $request)
    {
        try {
            $sevices = Service::all();
            return $this->successResponse($sevices);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
   
}
