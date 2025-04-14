<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ServiceRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function validate()
    {
        $validator = Validator::make($this->data, [
            'category_id' => 'required',
            'service_name' => 'required|string|max:50|unique:products,product_sku,',
            'image_url' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'slugs' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'required|integer|min:0',
            'tags' => 'nullable|string|max:100',
        ], [
            // 'product_sku.required' => 'Mã Dịch vụ là bắt buộc',
            // 'product_sku.string' => 'Mã Dịch vụ phải là dạng chuỗi',
            // 'product_sku.max' => 'Mã Dịch vụ không được vượt quá 50 ký tự',
            // 'product_sku.unique' => 'Mã Dịch vụ đã tồn tại',
            'service_name.required' => 'Tên Dịch vụ là bắt buộc',
            'service_name.string' => 'Tên Dịch vụ phải là dạng chuỗi',
            'service_name.max' => 'Tên Dịch vụ không được vượt quá 255 ký tự',
            'service_name.unique' => 'Tên Dịch vụ đã tồn tại',
            'image_url.string' => 'URL hình ảnh phải là dạng chuỗi',
            'image_url.max' => 'URL hình ảnh không được vượt quá 255 ký tự',
            'slugs.string' => 'Slugs phải là dạng chuỗi',
            'slugs.max' => 'Slugs không được vượt quá 255 ký tự',
            'price.required' => 'Giá Dịch là bắt buộc',
            'price.numeric' => 'Giá Dịch phải là kiểu số',
            'price.min' => 'Giá Dịch không được nhỏ hơn 0',
            'description.string' => 'Mô tả phải là dạng chuỗi',
            'tags.string' => 'Thẻ Dịch vụ phải là dạng chuỗi',
            'tags.max' => 'Thẻ Dịch vụ không được vượt quá 100 ký tự',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
