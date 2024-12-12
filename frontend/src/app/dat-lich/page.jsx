"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./sdstyle.css";

const ServiceRegistrationForm = () => {
  const [formData, setFormData] = useState({
    bossName: "",
    bossType: "Dog",
    bossGender: "Male",
    bossWeight: "",
    bossAge: "",
    appointmentDate: "",
    serviceType: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [registrationSuccessMessage, setRegistrationSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.bossName) newErrors.bossName = "Vui lòng nhập họ tên của boss";
    if (!formData.bossWeight) newErrors.bossWeight = "Vui lòng chọn cân nặng";
    if (!formData.bossAge) newErrors.bossAge = "Vui lòng chọn độ tuổi";
    if (!formData.appointmentDate) newErrors.appointmentDate = "Vui lòng chọn ngày hẹn";
    if (!formData.serviceType) newErrors.serviceType = "Vui lòng chọn loại dịch vụ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitAppointment = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/auth/appointment", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRegistrationSuccessMessage("Đăng ký thành công!");
      console.log("Appointment created:", response.data);
    } catch (error) {
      console.error("Error creating appointment:", error.response?.data || error.message);
      setErrors({ apiError: "Không thể gửi yêu cầu. Vui lòng thử lại sau." });
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setRegistrationSuccessMessage("");
    setErrors({});
    if (validateForm()) {
      await submitAppointment();
    }
  };

  return (
    <div className="form-container">
      <div className="form-left">
        <h1>Đăng Ký Dịch Vụ</h1>
        {registrationSuccessMessage && (
          <p className="success-message">{registrationSuccessMessage}</p>
        )}
        {errors.apiError && <p className="error-message">{errors.apiError}</p>}
        <form onSubmit={handleSubmitForm}>
          <div className="input-group">
            <label>Họ tên của boss *</label>
            <input
              type="text"
              name="bossName"
              value={formData.bossName}
              onChange={handleChange}
            />
            {errors.bossName && <p className="error-message">{errors.bossName}</p>}
          </div>

          <div className="input-group">
            <label>Loại dịch vụ *</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
            >
              <option value="">Chọn loại dịch vụ</option>
              <option value="Pet grooming">Cắt tỉa & làm đẹp</option>
              <option value="Medical check-up">Khám chữa bệnh</option>
            </select>
            {errors.serviceType && <p className="error-message">{errors.serviceType}</p>}
          </div>

          <div className="input-group">
            <label>Loại boss *</label>
            <select
              name="bossType"
              value={formData.bossType}
              onChange={handleChange}
            >
              <option value="Dog">Chó</option>
              <option value="Cat">Mèo</option>
            </select>
          </div>

          <div className="input-group">
            <label>Giới tính *</label>
            <select
              name="bossGender"
              value={formData.bossGender}
              onChange={handleChange}
            >
              <option value="Male">Đực</option>
              <option value="Female">Cái</option>
            </select>
          </div>

          <div className="input-group">
            <label>Cân nặng *</label>
            <select
              name="bossWeight"
              value={formData.bossWeight}
              onChange={handleChange}
            >
              <option value="">Chọn cân nặng</option>
              <option value="1-3kg">1-3 kg</option>
              <option value="3-5kg">3-5 kg</option>
              <option value="5-7kg">5-7 kg</option>
              <option value="7-10kg">7-10 kg</option>
              <option value="10-15kg">10-15 kg</option>
            </select>
            {errors.bossWeight && <p className="error-message">{errors.bossWeight}</p>}
          </div>

          <div className="input-group">
            <label>Độ tuổi *</label>
            <select
              name="bossAge"
              value={formData.bossAge}
              onChange={handleChange}
            >
              <option value="">Chọn độ tuổi</option>
              <option value="2-6m">2-6 tháng</option>
              <option value="6-12m">6-12 tháng</option>
              <option value="1y+">Trên 1 năm</option>
            </select>
            {errors.bossAge && <p className="error-message">{errors.bossAge}</p>}
          </div>

          <div className="input-group">
            <label>Thời gian đặt hẹn *</label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
            />
            {errors.appointmentDate && (
              <p className="error-message">{errors.appointmentDate}</p>
            )}
          </div>

          <div className="input-group">
            <label>Ghi chú</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <button type="submit" className="submit-button">
            Gửi Đăng Ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceRegistrationForm;
