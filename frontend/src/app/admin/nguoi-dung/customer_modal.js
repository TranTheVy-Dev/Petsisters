"use client";
import { useState } from "react";
import "./customer_modal.css";

const Modal = ({ customer, onClose, onSubmit,errors}) => {
  const [updatedCustomer, setUpdatedCustomer] = useState(customer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer({ ...updatedCustomer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedCustomer);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Sửa thông tin người dùng</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              name="full_name"
              value={updatedCustomer.full_name}
              onChange={handleChange}
              className={`form-control ${errors.full_name ? "is-invalid" : ""}`}
            />
            {errors.full_name && (
              <div className="invalid-feedback">{errors.full_name}</div>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={updatedCustomer.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label>Vai trò</label>
            <select
              name="role"
              value={updatedCustomer.role}
              onChange={handleChange}
              className={`form-control custom-select ${
                errors.role ? "is-invalid" : ""
              }`}
              required
            >
              <option value="0">Người dùng</option>
              <option value="1">Quản trị viên</option>
            </select>
            {errors.role && (
              <div className="invalid-feedback">{errors.role}</div>
            )}
          </div>
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
