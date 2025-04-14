<?php
namespace App\Http\Controllers\Api\V1\Web;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;


class CategoryController extends Controller{
 public function index(Request $request){
    try {
        $categories = Category::all();
        return $this->successResponse($categories);
    } catch (\Throwable $th) {
        return $this->errorResponse($th->getMessage(),500);
    }
 }
 public function categoryType(Request $request,$category_type){
    try {
        $data = Category::where("category_type",$category_type)->get();
        return $this->successResponse($data);
    } catch (ModelNotFoundException $th) {
    return $this->errorResponse(`không tìm thất bản ghi có type là: `,404);
    }catch (\Throwable $th) {
     return $this->errorResponse($th->getMessage(),500);
    }
 }
}
