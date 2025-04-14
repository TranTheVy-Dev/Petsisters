<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\OrderRequest;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use Exception;

class OrderDetailController extends Controller
{
    protected $model;

    public function __construct(OrderDetail $orderDetail)
    {
        $this->model = $orderDetail;
    }
    public function index()
    {
        try {
            // Load orders cùng với thông tin customer
            $orders = Order::with('customer')->get();
            return $this->successResponse($orders, 200);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function getOrderDetailsByOrderId($id)
    {
        try {
            $order_details = OrderDetail::where("order_id", $id)->with('order')->get();
            return $this->successResponse($order_details);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy đơn hàng với id người dùng  này: $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
