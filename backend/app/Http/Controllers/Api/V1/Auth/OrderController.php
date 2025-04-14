<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\OrderRequest;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;

use Exception;
use Illuminate\Database\QueryException;

class OrderController extends Controller
{
    protected $model;
    protected $categoryModel;

    public function __construct(Category $category, Order $order)
    {
        $this->model = $order;
        $this->categoryModel = $category;
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

    public function getOrderByIdCustomer($id)
    {
        try {
            $orders = Order::where("customer_id", $id)->get();
            return $this->successResponse($orders);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy đơn hàng với id người dùng  này: $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            //Tạo mã Order
            $request['order_code'] = Order::createOrderCode();
            // Xác thực dữ liệu đơn hàng
            $orderRequest = new OrderRequest($request->all());
            $validatedData = $orderRequest->validate();

            // Tạo đơn hàng
            $order = Order::create($validatedData);

            // Lấy danh sách items từ request
            $items = $request->input('items', []); // Mặc định là mảng rỗng nếu không có items

            if (!is_array($items) || empty($items)) {
                return $this->errorResponse(['message' => 'Danh sách sản phẩm không hợp lệ.'], 400);
            }

            // Duyệt qua từng item và lưu vào bảng order_details
            foreach ($items as $item) {
                $orderDetailData = [
                    'order_id' => $order->id,
                    'product_id' => $item['id'] ?? null,
                    'quantity' => $item['quantity'] ?? 0,
                    'unit_price' => $item['price'] ?? 0,
                    'subtotal' => ($item['price'] ?? 0) * ($item['quantity'] ?? 0),
                ];

                // Xác thực dữ liệu của từng chi tiết đơn hàng
                // $orderDetailRequest = new OrderDetailRequest($orderDetailData);
                // $validatedDetailData = $orderDetailRequest->validate();

                // Lưu chi tiết đơn hàng
                OrderDetail::create($orderDetailData);
            }

            return $this->successResponse($order->load('orderDetails'), 201); // Load chi tiết đơn hàng kèm theo
        } catch (ValidationException $e) {
            return $this->errorResponse([
                'message' => 'Lỗi xác thực',
                'errors' => $e->validator->errors(),
            ], 400);
        } catch (Exception $e) {
            return $this->errorResponse([
                'message' => 'Đã xảy ra lỗi khi tạo đơn hàng',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }
}
