<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Requests\CustomerRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\ProductRequest;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use Cloudinary\Cloudinary;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Api\Admin\AdminApi;
use Exception;
use PHPUnit\Framework\Constraint\IsEmpty;

class CustomerController extends Controller
{
    protected $model;
    protected $categoryModel;
    public function __construct(Customer $customer, Category $category)
    {
        $this->model = $customer;
        $this->categoryModel = $category;
    }

    public function index()
    {
        try {
            $customers = Customer::all();
            return $this->successResponse($customers, 200);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $customer = Customer::findOrFail($id);
            return $this->successResponse($customer);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy người dùng với id: $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $customerRequest = new CustomerRequest($request->all());
            $validatedData = $customerRequest->validate();
            $customer = Customer::create($validatedData);
            return $this->successResponse($customer, 201);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors()->all(), 400);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function update(Request $request)
    {
        try {
            // Tìm customer cần cập nhật
            $customer = Customer::findOrFail($request['id']);
            // Validate input
            $this->validate(
                $request,
                [
                    'full_name' => 'required|string|max:255',
                    'email' => 'required|string|email|unique:customers,email,' . $customer->id,
                    'address' => 'nullable|string',
                    'phone_number' => 'nullable|string',
                    'avatar' => 'nullable', // Max 2MB, phải là file hình ảnh
                    'role' => 'nullable|boolean'
                ],
                [
                    'full_name.required' => 'Tên người dùng là bắt buộc.',
                    'email.required' => 'Email là bắt buộc.',
                    'email.unique' => 'Email này đã được sử dụng.'
                ]
            );


            // Khởi tạo Cloudinary
            $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));

            // Xóa avatar cũ và upload ảnh mới nếu có
            if ($request->hasFile('avatar')) {
                $file = $request->file('avatar');

                // Xóa avatar cũ nếu tồn tại
                if ($customer->avatar && $customer->is_update_avatar == 1) {
                    $public_id = $this->extractPublicIdFromUrl($customer->avatar);
                    $cloudinary->uploadApi()->destroy($public_id);
                }

                // Upload ảnh mới lên Cloudinary
                $result = $cloudinary->uploadApi()->upload($file->getRealPath(), [
                    'folder' => 'petsisters/images/avatar',
                    'public_id' => uniqid('avatar_'),

                ]);

                // Cập nhật đường dẫn avatar mới
                $customer->avatar = $result['secure_url'];
                $customer->is_update_avatar = 1; // Đánh dấu là đã cập nhật avatar
            }

            // Cập nhật các thông tin khác
            $customer->full_name = $request->input('full_name');
            $customer->email = $request->input('email');
            $customer->address = $request->input('address');
            $customer->phone_number = $request->input('phone_number');

            if (isset($request['role'])) {
                $customer->role = $request['role'];
            }
            $customer->save();

            // Trả về kết quả thành công
            return $this->successResponse($customer, 200);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors(), 400);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $customer = Customer::findOrFail($id);
            $customer->delete();
            return $this->successResponse($customer, 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm người đùng với ID: $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }




    public function extractPublicIdFromUrl($secureUrl)
    {
        // Regex để lấy public_id từ secure_url
        preg_match("/upload\/v\d+\/([^\.]+)\./", $secureUrl, $matches);
        return $matches[1] ?? null; // Trả về public_id hoặc null
    }
}
