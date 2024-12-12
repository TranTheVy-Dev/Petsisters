<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\ProductRequest;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Exception;
use Illuminate\Database\QueryException;

class ProductController extends Controller
{
    protected $categoryModel;
    public function __construct(Category $category)
    {
        $this->categoryModel = $category;
    }

    public function store(Request $request)
    {
        // return $request->all;
        try {
            if ($request->hasFile('image') && !empty($request->hasFile('image'))) {
                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->storeAs('public/images', $imageName);
                $request['image_url'] = (string) $imageName;
            }
            $productRequest = new ProductRequest($request->all());
            $validatedData = $productRequest->validate();
            $product = new Product($validatedData);
            $category_name = $this->categoryModel->getCategoryNameById($validatedData['category_id']);
            $product->product_sku = Product::generateProductSku($category_name);
            $product->slugs = Product::generateProductSlug($product->product_name);
            $product->save();
            return $this->successResponse($product, 201);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors(), 400);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            return $this->successResponse(['message' => 'Sản phẩm đã được xóa'], 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy sản phẩm với ID: $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function getDeletedProducts()
    {
        try {
            // Lấy danh sách các sản phẩm đã xóa (soft delete)
            $deletedProducts = Product::onlyTrashed()->with('category')->get();

            // Trả về phản hồi thành công cùng với danh sách sản phẩm đã xóa
            return $this->successResponse($deletedProducts, 200);
        } catch (Exception $e) {
            // Xử lý lỗi nếu có
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function restore($id)
    {
        try {
            $product = Product::onlyTrashed()->find($id);
            if (!$product) {
                return $this->errorResponse("Không tìm thấy sản phẩm bị xóa với ID: $id", 404);
            }
            $product->restore();
            return $this->successResponse(['message' => 'Sản phẩm đã được phục hồi'], 200);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function forceDestroy($id)
    {
        try {
            $product = Product::withTrashed()->findOrFail($id);
            $product->forceDelete();
            return $this->successResponse(null, 204);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy sản phẩm với ID: $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
{
    try {
        if ($request->hasFile('image') && !empty($request->hasFile('image'))) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/images', $imageName);
            $request['image_url'] = (string) $imageName;
        }
        $product = Product::findOrFail($id);
        $productRequest = new ProductRequest($request->all());
        $validatedData = $productRequest->validate(true, $id);  // Lấy dữ liệu đã xác thực
        $product->update($validatedData);
        return $this->successResponse($product);
    } catch (ModelNotFoundException $e) {
        return $this->errorResponse("Không tìm thấy sản phẩm với ID: $id", 404);
    } catch (ValidationException $e) {
        return $this->errorResponse($e->validator->errors(), 400);
    } catch (Exception $e) {
        return $this->errorResponse($e->getMessage(), 500);
    }
}

}
