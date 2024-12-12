<?php

namespace App\Http\Controllers\Api\V1\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\ServiceReview;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ServiceReviewController extends Controller
{

    public function show(Request $request)
    {
        try {
            $data = ServiceReview::all();
            return $this->successResponse($data);
        } catch (ModelNotFoundException  $th) {
            return $this->errorResponse('không tìm thấy đánh giá của dịch vụ', 404);
        }
    }
    public function reviewByService($id)
    {
        try {
            $data = ServiceReview::where("service_id", $id)->get();
            return $this->successResponse($data);
        } catch (ModelNotFoundException $th) {
            return $this->errorResponse("không tìm thấy dịch vụ", 404);
        }
    }
    public function submitreview(Request $request)
    {
        $this->validate($request, [
            "rating" => "required",
            "review" => "required|string",
            "email" => "email|required",
            "full_name" => "string|required"
        ]);

        $review = ServiceReview::create([
          "rating" => $request->rating,
          "review" => $request->review,
          "service_id" => $request->service_id,
          "full_name" => $request->full_name,
          "email" => $request->email
        ]);
        return response()->json([
            "message" => "đánh giá được rồi nha bro",
            "reivew" => $review
        ],200);
    }
}
