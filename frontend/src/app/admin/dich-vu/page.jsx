"use client";

import React from "react";
import Link from "next/link";
import useFetchService from "@/app/lib/api_service"; // Cập nhật đúng đường dẫn

export default function Services() {
  const { services, loading, error } = useFetchService(); // Sử dụng custom hook
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if (!API_URL) return;

      try {
        const response = await fetch(`${API_URL}/api/web/category`, {
          headers: { "Cache-Control": "no-store" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error)
    return (
      <div>
        <p>Đã xảy ra lỗi: {error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Thử lại
        </button>
      </div>
    );  

  // Map category_id in services to category_name in categories
  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.category_name : "Không có";
  };

  return (
    <div className="container">
      <h1>Danh sách dịch vụ</h1>
      <Link href="/admin/dich-vu/them" className="btn btn-primary rounded-0 mb-3">
        Thêm dịch vụ
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên dịch vụ</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Hình ảnh</th>
            <th>Tên danh mục</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                Không có dịch vụ nào.
              </td>
            </tr>
          ) : (
            services.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.service_name}</td>
                <td>{service.description}</td>
                <td>{service.price.toLocaleString()} VND</td>
                <td>
                  {service.image_url ? (
                    <img
                      src={`/img/service/${service.image_url}.jpg`}
                      alt={service.service_name}
                      style={{ width: "100px", height: "auto" }}
                    />
                  ) : (
                    "Không có hình ảnh"
                  )}
                </td>
                <td>{getCategoryName(service.category_id)}</td>
                <td>
                  <div className="d-flex justify-content-start">
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => alert(`Xóa dịch vụ ID: ${service.id}`)}
                    >
                      Xóa
                    </button>
                    <Link href={`/admin/dich-vu/sua/${service.id}`}>
                      <button className="btn btn-warning">Chỉnh sửa</button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
