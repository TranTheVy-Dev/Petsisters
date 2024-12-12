"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCustomer } from "../../../lib/api_customer";

export default function AddUserForm() {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Xóa lỗi cũ trước khi submit

    try {
      // Tạo người dùng
      await createCustomer(formData);

      // Lưu thông báo thành công vào sessionStorage
      sessionStorage.setItem("successMessage", "🎉 Người dùng được thêm thành công!");

      // Chuyển hướng đến trang "/admin/nguoi-dung"
      router.push("/admin/nguoi-dung");
    } catch (error) {
      console.log("Error:", error);
      if (error.message) {
        const errorList = error.message.split("\n");
        const newErrors = {};
        errorList.forEach((err) => {
          if (err.includes("Tên người dùng")) newErrors.user_name = err;
          if (err.includes("Email")) newErrors.email = err;
          if (err.includes("Mật khẩu")) newErrors.password = err;
          if (err.includes("Vai trò")) newErrors.role = err;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between mb-4">
        <h3>Thêm người dùng</h3>
        <a href="/admin/users" className="btn btn-outline-secondary rounded-0">
          <i className="fas fa-arrow-left"></i> Quay lại
        </a>
      </div>

      <form className="card shadow-sm p-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="user_name" className="form-label">
            Tên đăng nhập <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            className={`form-control rounded-0 ${errors.user_name ? "is-invalid" : ""}`}
            value={formData.user_name}
            onChange={handleChange}
          />
          {errors.user_name && <div className="invalid-feedback">{errors.user_name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control rounded-0 ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu <span className="text-danger">*</span>
          </label>
          <div className="input-group">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              className={`form-control rounded-0 ${errors.password ? "is-invalid" : ""}`}
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="input-group-text rounded-0"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <i className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Vai trò <span className="text-danger">*</span>
          </label>
          <select
            id="role"
            name="role"
            className={`form-select rounded-0 ${errors.role ? "is-invalid" : ""}`}
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Chọn vai trò
            </option>
            <option value="0">Người dùng</option>
            <option value="1">Quản trị viên</option>
          </select>
          {errors.role && <div className="invalid-feedback">{errors.role}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100 rounded-0">
          Thêm người dùng
        </button>
      </form>
    </div>
  );
}
