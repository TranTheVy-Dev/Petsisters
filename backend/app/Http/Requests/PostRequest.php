<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class PostRequest
{
    protected $data;
    public function __construct($data)
    {
        $this->data = $data;
    }
    public function validate()
    {
        $validator = Validator::make(
            $this->data,
            [
                "category_id" => "required|exists:categories,id",
                "title" => "required|string|max:100",
                "content" => "required|text",
                "slugs" => "nullable|string|max:255",
                "tags" => "nullable|string|max:100",
                "image_url" => "nullable",
            ],[
                "category_id.required"=> "ID danh muc la bat buoc",
                "category_id.exists"=> "Danh muc khong tim thay",
                "title.required"=> "Tieu de la bat buoc",
                "title.string"=> "Tieu de phai la dang chuoi",
                "title.max"=> "Tieu de khong qua 100 ky tu",
                "slugs.string"=> "slugs phai la dang chuoi",
                "slugs.max"=> "slug khong qua 100 ky tu",
            ]
        );
        if ($validator->fails()) { 
            throw new ValidationException($validator);
        }
        
        return $validator->validate();
    }
}
