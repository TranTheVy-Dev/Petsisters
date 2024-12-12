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
use Exception;

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
        return $this->successResponse($this->model::all());
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
}
