<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Cloudinary\Cloudinary;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Api\Admin\AdminApi;
use Exception;
use Illuminate\Http\Request;

class CloudinaryController extends Controller
{
    public function index()
    {
        try {
               

            $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
            $response = $cloudinary->adminApi()->ping();
            return response()->json(['status' => 'success', 'message' => 'Connected to Cloudinary']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function getAllImages()
    {
        try {
            $cloudinaryApi = new AdminApi();
            // Lấy danh sách ảnh từ thư mục 'products/images'
            $resources = $cloudinaryApi->assets([
                'type' => 'upload',
                // 'prefix' => 'petsisters',
                'max_results' => 5000,
            ]);
            // Lọc danh sách để chỉ trả về URL
            $image_urls = array_map(function ($resource) {
                return [
                    'asset_id' => $resource['asset_id'],
                    'secure_url' => $resource['secure_url'],
                ];
            }, $resources['resources']);

            // Trả về danh sách URL
            return $this->successResponse($resources['resources']);
        } catch (\Exception $e) {
            return $this->errorResponse("Lỗi kết nối với thư viện ảnh Cloudinary", 500);
        }
    }


    public function deleteCloudinaryImage($asset_id)
    {
        try {
            $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
            $image = $cloudinary->adminApi()->assetByAssetId($asset_id);
            $cloudinary->uploadApi()->destroy($image['public_id']);
            return $this->successResponse(null, 204);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }


    public function updatePublicIdCloudinaryImage(Request $request)
    {
        try {
            $oldPublicId = $request->input('old_public_id');
            $newPublicId = $request->input('new_public_id');
            $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
            $new_image = $cloudinary->uploadApi()->rename($oldPublicId, $newPublicId);
            return $this->successResponse($new_image, 200);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
