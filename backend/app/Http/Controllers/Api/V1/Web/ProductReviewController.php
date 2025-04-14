<?php
namespace App\Http\Controllers\Api\V1\Web;

use App\Models\ProductReview;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class ProductReviewController extends Controller{
    public function reviewByProduct($id)
    {
        try {
            $data = ProductReview::where("product_id", $id)->get();
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

        $review = ProductReview::create([
          "rating" => $request->rating,
          "review" => $request->review,
          "product_id" => $request->product_id,
          "full_name" => $request->full_name,
          "email" => $request->email
        ]);
        return response()->json([
            "message" => "đánh giá được rồi nha bro",
            "reivew" => $review
        ],200);
    }
}
