<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class OrderRequest
{
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function validate()
    {
        $validator = Validator::make($this->data, [
            'customer_id' => 'required|exists:customers,id',
            'order_code' => 'nullable|string|max:50|unique:orders,order_code',
            'order_date' => 'required|date',
            'total_amount' => 'required|numeric|min:0',
            'status' => 'nullable|in:pending,paid,cancelled',
        ], [
            'customer_id.required' => 'ID khách hàng là bắt buộc',
            'customer_id.exists' => 'Khách hàng không tồn tại',
            'order_code.string' => 'Mã đơn hàng phải là dạng chuỗi',
            'order_code.max' => 'Mã đơn hàng không được vượt quá 50 ký tự',
            'order_code.unique' => 'Mã đơn hàng đã tồn tại',
            'order_date.required' => 'Ngày đặt hàng là bắt buộc',
            'order_date.date' => 'Ngày đặt hàng phải là định dạng ngày hợp lệ',
            'total_amount.required' => 'Tổng số tiền là bắt buộc',
            'total_amount.numeric' => 'Tổng số tiền phải là kiểu số',
            'total_amount.min' => 'Tổng số tiền không được nhỏ hơn 0',
            'status.in' => 'Trạng thái đơn hàng không hợp lệ',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
