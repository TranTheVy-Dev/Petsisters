<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AppointmentRequest
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
            'service_id' => 'required|exists:services,id',
            'pet_name' => 'required|string|max:100',
            'pet_age' => 'required|string|max:50',
            'pet_type' => 'required|string|max:50',
            'pet_weight' => 'required|string|max:50',
            'pet_gender' => 'required|string|max:50',
            //bug book appointment khi tạo data lưu vô dtb giá bằng 0 nằm ở đây
            // thiếu request cho total_price
            'total_price' => 'required|numeric|min:0',
            'appointment_date' => 'required|date|after_or_equal:today',
            'notes' => 'nullable|string',
        ], [
            'customer_id.required' => 'ID khách hàng là bắt buộc',
            'customer_id.exists' => 'Khách hàng không tồn tại',
            'service_id.required' => 'ID dịch vụ là bắt buộc',
            'service_id.exists' => 'Dịch vụ không tồn tại',
            'pet_name.required' => 'Tên thú cưng là bắt buộc',
            'pet_name.string' => 'Tên thú cưng phải là dạng chuỗi',
            'pet_name.max' => 'Tên thú cưng không được vượt quá 100 ký tự',
            'appointment_date.required' => 'Ngày hẹn là bắt buộc',
            'appointment_date.date' => 'Ngày hẹn phải là định dạng ngày hợp lệ',
            'appointment_date.after_or_equal' => 'Ngày hẹn phải là hôm nay hoặc trong tương lai',
            'status.required' => 'Trạng thái là bắt buộc',
            'status.in' => 'Trạng thái không hợp lệ',
            'notes.string' => 'Ghi chú phải là dạng chuỗi',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
