<?php

namespace App\Http\Controllers\Api\V1\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Http\Requests\PostRequest;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PostController extends Controller
{
    public function __construct()
    {
        //
    }
    public function index(request $request)
    {
        try {
            $post = Post::all();
            return $this->successResponse($post);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function show($id)
    {
        try {
            $post = Post::where("id", $id)->firstOrFail();
            return $this->successResponse($post);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("khong tim thay bai viet co slugs la: $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function update(request $request, $id)
    {
        try {
            $post = Post::findOrFail($id);
            $postRequest = new PostRequest($request->all());
            $postValidate = $postRequest->validate();
            $post->update($postValidate);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("khong tim thay bai viet c id la $id", 400);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors()->all(), 500);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function destroy($id)
    {
        try {
            $post = Post::findOrFail($id);
            $post->delete();
            return $this->successResponse($post);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("khog tim thay id duoc xoa $id ", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function forceDestroy($id)
    {
        try {
            $post = Post::withTrashed()->findOrFail($id);
            $post->forceDelete();
            return $this->successResponse($post);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("khong tim thay id de xoa $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 404);
        }
    }
    public function restore($id)
    {
        try {
            $post = Post::onlyTrashed()->findOrFail($id);
            $post->restore();
            return $this->successResponse($post);
        } catch (ModelNotFoundException) {
            return $this->errorResponse("khong tim thay id $id de khoi phuc", 404);
        }
    }
}
