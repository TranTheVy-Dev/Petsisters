<?php
namespace App\Http\Controllers\Api\V1\Web;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CommentBlog;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use PhpParser\Node\Expr\Throw_;
use Throwable;

class CommentBlogController extends Controller{

public function show(Request $request) {
    try {
        $data = CommentBlog::all();
        return $this->successResponse($data);
    } catch (ModelNotFoundException $th) {
        return $this->errorResponse('không tìm thấy bình luận của blog', 404);
    } catch (Throwable $th) {
        return $this->errorResponse($th->getMessage(),500);
    }
}
public function commentById($id){
   try {
    $data = CommentBlog::where('blog_id' ,$id)->get();
    return $this->successResponse($data);
    } catch (ModelNotFoundException $th) {
    return $this->errorResponse('không tìm thấy bình luận của blog', 404);
   } catch (Throwable $th) {
    return $this->errorResponse($th->getMessage(),500);
   }
}
public function postComment(Request $request) {
    $this->validate($request,[
    'comment' => 'required',
    'email' => 'required|email',
    'full_name' => 'required',
    'blog_id' => 'required'
    ]);
    $comment = CommentBlog::create([
     'comment' => $request->comment,
     'email' => $request->email,
     'full_name' => $request->full_name,
     'blog_id' => $request->blog_id
    ]);
    return $this->successResponse($comment);
}
}
