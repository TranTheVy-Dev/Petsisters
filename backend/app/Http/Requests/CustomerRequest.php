<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CustomerRequest
{
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function validate()
    {
        $validator = Validator::make($this->data, [
            'user_name' => 'required|string|max:100|unique:customers,user_name',
            'full_name' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'email' => 'required|email|max:255|unique:customers,email',
            'password' => 'required|string|min:8|max:255',
            'address' => 'nullable|string|max:255',
            'avatar' => 'nullable|string|max:255',
            'pet_name' => 'nullable|string|max:100',
            'pet_type' => 'nullable|string|max:50',
            'pet_age' => 'nullable|integer|min:0',
            'preferred_products' => 'nullable|string',
            'last_purchase_date' => 'nullable|date',
            'total_spent' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
            'role' => 'nullable|integer|min:0|max:1',
        ], [
            'user_name.required' => 'Tên người dùng là bắt buộc',
            'user_name.string' => 'Tên người dùng phải là dạng chuỗi',
            'user_name.max' => 'Tên người dùng không được vượt quá 100 ký tự',
            'user_name.unique' => 'Tên người dùng đã tồn tại',
            'full_name.string' => 'Họ và tên phải là dạng chuỗi',
            'full_name.max' => 'Họ và tên không được vượt quá 255 ký tự',
            'phone_number.string' => 'Số điện thoại phải là dạng chuỗi',
            'phone_number.max' => 'Số điện thoại không được vượt quá 20 ký tự',
            'email.required' => 'Email là bắt buộc',
            'email.email' => 'Email không hợp lệ',
            'email.max' => 'Email không được vượt quá 255 ký tự',
            'email.unique' => 'Email đã tồn tại',
            'password.required' => 'Mật khẩu là bắt buộc',
            'password.string' => 'Mật khẩu phải là dạng chuỗi',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự',
            'password.max' => 'Mật khẩu không được vượt quá 255 ký tự',
            'address.string' => 'Địa chỉ phải là dạng chuỗi',
            'address.max' => 'Địa chỉ không được vượt quá 255 ký tự',
            'avatar.string' => 'URL ảnh đại diện phải là dạng chuỗi',
            'avatar.max' => 'URL ảnh đại diện không được vượt quá 255 ký tự',
            'pet_name.string' => 'Tên thú cưng phải là dạng chuỗi',
            'pet_name.max' => 'Tên thú cưng không được vượt quá 100 ký tự',
            'pet_type.string' => 'Loại thú cưng phải là dạng chuỗi',
            'pet_type.max' => 'Loại thú cưng không được vượt quá 50 ký tự',
            'pet_age.integer' => 'Tuổi thú cưng phải là số nguyên',
            'pet_age.min' => 'Tuổi thú cưng không được nhỏ hơn 0',
            'preferred_products.string' => 'Danh sách sản phẩm yêu thích phải là dạng chuỗi',
            'last_purchase_date.date' => 'Ngày mua hàng cuối cùng phải là ngày hợp lệ',
            'total_spent.numeric' => 'Tổng chi tiêu phải là số',
            'total_spent.min' => 'Tổng chi tiêu không được nhỏ hơn 0',
            'notes.string' => 'Ghi chú phải là dạng chuỗi',
            'role.integer' => 'Vai trò phải là số nguyên',
            'role.min' => 'Vai trò không được nhỏ hơn 0',
            'role.max' => 'Vai trò không được lớn hơn 1',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
