"use client";

import { useState, useEffect } from "react";
import { addService } from "@/app/lib/api_service"; // API thêm dịch vụ
import { getAllCategories } from "@/app/lib/api_category"; // API lấy danh mục
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.error("API_URL chưa được cấu hình. Vui lòng kiểm tra lại biến môi trường.");
}

const validationSchema = Yup.object().shape({
  service_name: Yup.string().required("Tên dịch vụ là bắt buộc"),
  price: Yup.number()
    .required("Giá là bắt buộc")
    .positive("Giá phải là số dương")
    .typeError("Giá phải là số"),
  description: Yup.string().required("Mô tả là bắt buộc"),
  image_url: Yup.mixed().required("Hình ảnh là bắt buộc"),
  category_id: Yup.string().required("Danh mục là bắt buộc"),
  duration: Yup.string().required("Thời gian dịch vụ là bắt buộc")
});

export default function AddService() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState(null);
  const router = useRouter();

  // Fetch danh mục khi component load
  useEffect(() => {
    const fetchCategories = async () => {
      const { categories, error } = await getAllCategories();
      if (error) {
        setErrors({ general: "Không thể lấy danh mục. Vui lòng thử lại." });
      } else {
        setCategories(categories);
      }
    };
    fetchCategories();
  }, []);

  // Xử lý submit form
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const data = new FormData();
    data.append("service_name", values.service_name);
    data.append("price", values.price);
    data.append("description", values.description);
    data.append("category_id", values.category_id);
    data.append("duration", values.duration);
    if (values.img) data.append("image_url", values.image_url);

    try {
      const res = await fetch(`${API_URL}/api/web/service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Xử lý lỗi HTTP
      if (!res.ok) {
        const errorResponse = await res.json().catch(() => ({}));
        const errorMessage = errorResponse.message || `Có lỗi xảy ra với mã trạng thái: ${res.status}`;
        throw new Error(errorMessage);
      }

      try {
        await addService(newService);  // Gọi addService từ hook
      } catch (err) {
        setErrors({ api: err.message });
      }  
      // Xử lý thành công
      console.log("Dịch vụ đã được thêm thành công!");
      router.push("/admin/dich-vu"); // Chuyển đến trang danh sách dịch vụ
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error.message);
      setErrors({ api: error.message }); // Hiển thị lỗi cho người dùng
    } finally {
      setSubmitting(false);
    }
  };

  // Hiển thị trạng thái tải danh mục
  if (loadingCategories) return <p>Đang tải danh mục...</p>;
  if (categoryError) return <p>Lỗi: {categoryError}</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-center mb-0">Thêm dịch vụ</h3>
        <button
          className="btn btn-secondary"
          onClick={() => router.back()} // Quay lại trang trước
        >
          Quay lại
        </button>
      </div>

      {/* Hiển thị thông báo lỗi chung */}
      {errors.general && (
        <div className="alert alert-danger">{errors.general}</div>
      )}

      {/* Hiển thị thông báo thành công */}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {/* Form thêm dịch vụ */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Tên dịch vụ</label>
          <input
            type="text"
            className={`form-control ${
              errors.service_name ? "is-invalid" : ""
            }`}
            name="service_name"
            value={service.service_name}
            onChange={handleChange}
            placeholder="Nhập tên dịch vụ"
          />
          {errors.service_name && (
            <div className="invalid-feedback">{errors.service_name}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Giá (VND)</label>
          <input
            type="number"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            name="price"
            value={service.price}
            onChange={handleChange}
            placeholder="Nhập giá dịch vụ"
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Danh mục</label>
          <select
            className={`form-select ${errors.category_id ? "is-invalid" : ""}`}
            name="category_id"
            value={service.category_id}
            onChange={handleChange}
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <div className="invalid-feedback">{errors.category_id}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            name="description"
            rows="4"
            value={service.description}
            onChange={handleChange}
            placeholder="Nhập mô tả dịch vụ"
          ></textarea>
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Ảnh dịch vụ</label>
          <input
            type="file"
            className={`form-control ${errors.image_url ? "is-invalid" : ""}`}
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {errors.image_url && (
            <div className="invalid-feedback">{errors.image_url}</div>
          )}
        </div>

        {previewImage && (
          <div className="mb-3">
            <label className="form-label">Ảnh xem trước</label>
            <div>
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Thêm dịch vụ
        </button>
      </form>
    </div>
  );
}
