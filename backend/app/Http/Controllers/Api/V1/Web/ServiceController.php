<?php

namespace App\Http\Controllers\Api\V1\Web;

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

    public function show($id)
    {
        try {
            //nếu sử dụng findOrFail nó sẽ mặc định là tìm kiếm theo ID
            // $service = Service::findOrFail($id);
            $service = Service::where("id", $id)->firstOrFail();
            return $this->successResponse($service);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("không tìm thấy dịch vụ có slugs là: $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function creatService(Request $request)
    {
        try {
            $data =$request->all();
            if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('public/images');
            $data['image_url'] = basename($path);
            }
            $servicereq = new ServiceRequest($data);
            $servicevalidate = $servicereq->validate();
            $servicedata = Service::create($servicevalidate);
            return $this->successResponse($servicedata);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors()->all(), 400);
        }catch (ModelNotFoundException $e) {
          return $this->errorResponse("không tìm thấy dịch vụ", 404);
        }
        catch(Exception $e) {
          return $this->errorResponse($e->getMessage(),500);
        }
    }
 
    public function update(Request $request, $id)
    {
        try {
            $service = Service::findOrFail($id);
            $serviceRequest = new ServiceRequest($request->all());
            $serviceValidate = $serviceRequest->validate();
            $service->update($serviceValidate);
            return $this->successResponse($service);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("không tìm thấy dịch vụ có ID là : $id", 404);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors()->all(), 400);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $service = Service::findOrFail($id);
            $service->delete();
            return $this->successResponse($service);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("không tìm thấy dịch vụ có id là $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function forceDestroy($id)
    {
        try {
            $service = Service::withTrashed()->findOrFail($id);
            $service->forceDelete();
            return $this->successResponse($service);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("không tìm thấy dịch vụ có id là $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function restore($id)
    {
        try {
            //phương thức onlyTrashed cho phép truy cập các data bị xoá mềm bởi function destroy
            $service = Service::onlyTrashed()->findOrFail($id);
            $service->restore();
            return $this->successResponse($service);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("can not found product with id: $id", 404);
        }
    }
}
