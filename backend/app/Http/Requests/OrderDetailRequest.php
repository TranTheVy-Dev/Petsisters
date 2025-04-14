<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class OrderDetailRequest
{
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function validate()
    {
        $validator = Validator::make($this->data, [
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
            'subtotal' => 'required|numeric|min:0',
        ], [
            'order_id.required' => 'ID đơn hàng là bắt buộc',
            'order_id.exists' => 'Đơn hàng không tồn tại',
            'product_id.required' => 'ID sản phẩm là bắt buộc',
            'product_id.exists' => 'Sản phẩm không tồn tại',
            'quantity.required' => 'Số lượng là bắt buộc',
            'quantity.integer' => 'Số lượng phải là số nguyên',
            'quantity.min' => 'Số lượng phải lớn hơn hoặc bằng 1',
            'unit_price.required' => 'Đơn giá là bắt buộc',
            'unit_price.numeric' => 'Đơn giá phải là kiểu số',
            'unit_price.min' => 'Đơn giá không được nhỏ hơn 0',
            'subtotal.required' => 'Thành tiền là bắt buộc',
            'subtotal.numeric' => 'Thành tiền phải là kiểu số',
            'subtotal.min' => 'Thành tiền không được nhỏ hơn 0',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
