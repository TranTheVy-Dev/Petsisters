<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\ProductRequest;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Exception;
use Cloudinary\Cloudinary;

class ProductController extends Controller
{
    protected $categoryModel;
    public function __construct(Category $category)
    {
        $this->categoryModel = $category;
    }

    public function store(Request $request)
    {
        try {
            // Bước 1: Validate dữ liệu đầu vào
            $request['image_url'] = $request['image'];
            $productRequest = new ProductRequest($request->all());
            $validatedData = $productRequest->validate();

            // Bước 2: Kiểm tra và tải ảnh lên Cloudinary nếu dữ liệu hợp lệ
            if ($request->hasFile('image')) {
                $image = $request->file('image');

                // Kiểm tra tính hợp lệ của file
                if (!$image->isValid()) {
                    return $this->errorResponse('Invalid file upload', 400);
                }

                // Tải ảnh lên Cloudinary
                $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
                $uploadResult = $cloudinary->uploadApi()->upload(
                    $image->getRealPath(),
                    [
                        'folder' => 'products/images', // Thư mục trên Cloudinary
                        'public_id' => time() . '_' . pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME),
                        'overwrite' => true,
                        'resource_type' => 'image',
                    ]
                );

                // Thêm URL ảnh vào dữ liệu đã validate
                $validatedData['image_url'] = $uploadResult['secure_url'];
            }

            // Bước 3: Tạo và lưu sản phẩm
            $product = new Product($validatedData);

            // Lấy tên danh mục và sinh SKU
            $category_name = $this->categoryModel->getCategoryNameById($validatedData['category_id']);
            $product->product_sku = Product::generateProductSku($category_name);

            // Sinh slug sản phẩm
            $product->slugs = Product::generateProductSlug($product->product_name);

            // Lưu sản phẩm vào cơ sở dữ liệu
            $product->save();

            // Trả về phản hồi thành công
            return $this->successResponse($product, 201);
        } catch (ValidationException $e) {
            // Xử lý lỗi validate
            return $this->errorResponse($e->validator->errors(), 400);
        } catch (Exception $e) {
            // Xử lý lỗi khác
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
            // Tìm sản phẩm kể cả những sản phẩm đã bị "soft delete"
            $product = Product::withTrashed()->findOrFail($id);

            $product_images = ProductImage::where('product_id', $product->id)->get();
            if ($product_images && !$product_images->isEmpty()) {
                foreach ($product_images as $image) {
                    if (!empty($image->image_url)) {
                        $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
                        $parsedUrl = parse_url($image->image_url);
                        $path = $parsedUrl['path'] ?? ''; // /products/images/filename.jpg
                        $publicId = pathinfo($path, PATHINFO_FILENAME); // filename
                        if ($publicId) {
                            // Thư mục trên Cloudinary (nếu có)
                            $folder = trim(dirname($path), '/');
                            $cloudinaryPublicId = $folder ? "$folder/$publicId" : $publicId;

                            // Gửi yêu cầu xóa ảnh
                            $cloudinary->uploadApi()->destroy($cloudinaryPublicId);
                        }
                        // Xóa bản ghi ảnh trong bảng product_images
                        $image->delete();
                    }
                }
            }


            // Xóa ảnh chính của sản phẩm nếu có
            if (!empty($product->image_url)) {
                $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));

                // Lấy public_id từ URL
                $parsedUrl = parse_url($product->image_url);
                $path = $parsedUrl['path'] ?? ''; // /products/images/filename.jpg
                $publicId = pathinfo($path, PATHINFO_FILENAME); // filename
                // return $path;
                if ($publicId) {
                    // Thư mục trên Cloudinary (nếu có)
                    $folder = "products/images";
                    $cloudinaryPublicId = $folder ? "$folder/$publicId" : $publicId;
                    // Gửi yêu cầu xóa ảnh
                    $cloudinary->uploadApi()->destroy($cloudinaryPublicId);
                }
            }

            // Xóa sản phẩm vĩnh viễn
            $product->forceDelete();

            // Trả về phản hồi thành công
            return $this->successResponse(null, 204);
        } catch (ModelNotFoundException $e) {
            // Trả về lỗi nếu không tìm thấy sản phẩm
            return $this->errorResponse("Không tìm thấy sản phẩm với ID: $id", 404);
        } catch (Exception $e) {
            // Trả về lỗi hệ thống khác
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
