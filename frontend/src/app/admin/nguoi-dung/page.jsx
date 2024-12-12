"use client";

import { useEffect, useState } from "react";
import { getCustomers } from "@/app/lib/api_customer";

const AdminProduct = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const { customers } = getCustomers();

  useEffect(() => {
    const message = sessionStorage.getItem("successMessage");
    if (message) {
      setSuccessMessage(message);
      sessionStorage.removeItem("successMessage"); // Xóa thông báo sau khi đã hiển thị
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Người dùng</h3>
        <div>
          <a
            href="/admin/nguoi-dung/them"
            className="btn btn-primary rounded-0"
          >
            Thêm người dùng
          </a>
        </div>
      </div>

      {/* Hiển thị thông báo thành công */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <table className="table text-center">
            <thead>
              <tr>
                <th className="text-start" colSpan="2">
                  Ảnh đại diện
                </th>
                <th>Tên đầy đủ</th>
                <th>Tên đăng nhập</th>
                <th>Ngày Tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  {" "}
                  {/* Assuming customer has a unique id */}
                  <td style={{ width: "64px" }}>
                    <img
                      src={`/img/avatar/${
                        customer.avatar || "avatar_default.png"
                      }`}
                      className="w-100"
                      alt="Customer Avatar"
                    />
                  </td>
                  <td className="text-start">
                    <strong>{customer.name}</strong>
                  </td>
                  <td>
                    {customer.full_name || (
                      <a className="text-bold text-danger">Chưa cập nhật</a>
                    )}
                  </td>
                  <td>
                    {customer.user_name || (
                      <a className="text-bold text-danger">Chưa cập nhật</a>
                    )}
                  </td>
                  <td>
                    Ngày: {new Date(customer.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <a href={`/admin/nguoi-dung/sua/${customer.id}`} className="btn btn-outline-warning btn-sm me-2">
                      <i className="fas fa-pencil fa-fw"></i>
                    </a>
                    <a href="#" className="btn btn-outline-danger btn-sm">
                      <i className="fas fa-times fa-fw"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
