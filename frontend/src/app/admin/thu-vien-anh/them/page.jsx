"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../them/them_anh.css";
import Swal from "sweetalert2";
import axios from "axios";

export default function AddImagePage() {
  const [imageType, setImageType] = useState(""); // Lưu loại ảnh được chọn
  const [images, setImages] = useState([]); // Lưu file ảnh được chọn
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const router = useRouter(); // Dùng để điều hướng

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages(files);
    }
  };

  const uploadFiles = async (files) => {
    setLoading(true); // Bắt đầu loading
    Swal.fire({
      title: "Đang thêm ảnh...",
      text: "Vui lòng đợi trong giây lát.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading(); // Hiển thị vòng xoay loading
      },
    });

    try {
      const urls = [];
      const FOLDER_NAME = `petsisters/images/${imageType}`;
      const api = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;

      for (const file of files) {
        const formData = new FormData();
        formData.append("upload_preset", process.env.NEXT_PUBLIC_PRESET_NAME);
        formData.append("folder", FOLDER_NAME);
        formData.append("file", file);

        // Lấy tên file (không có phần mở rộng)
        const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        const publicId = `/${fileNameWithoutExt}`;
        formData.append("public_id", publicId);

        const response = await axios.post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        urls.push(response.data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire({
        title: "Lỗi!",
        text: "Đã xảy ra lỗi khi tải lên ảnh. Vui lòng thử lại sau.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
      Swal.close();
      Swal.fire({
        title: "Thành công!",
        text: `Đã thêm ảnh loại "${imageType}" thành công!`,
        icon: "success",
        timer: 1000,
        timerProgressBar: true, // Hiển thị thanh tiến trình
        showConfirmButton: false, // Ẩn nút "OK"
      }).then(() => {
        router.push("/admin/thu-vien-anh"); // Chuyển trang sau khi thông báo timeout
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageType || images.length === 0) {
      Swal.fire({
        title: "Cảnh báo!",
        text: "Vui lòng chọn loại ảnh và tải lên hình ảnh.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    uploadFiles(images);
  };

  return (
    <div className="container-fluid p-4">
      <div className="justify-content-center">
        <div className="d-flex justify-content-between mb-3">
          <h3 className="admin-title">Thêm Ảnh</h3>
          <button
            className="btn-zapxje"
            onClick={() => router.push("/admin/thu-vien-anh")}
          >
            <i className="far fa-arrow-left me-2"></i>Quay lại
          </button>
        </div>
        <form className="card shadow-sm p-4" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-8">
              <div className="mb-3">
                <label htmlFor="imageType" className="form-label">
                  Chọn loại ảnh
                </label>
                <select
                  id="imageType"
                  className="form-select"
                  value={imageType}
                  onChange={(e) => setImageType(e.target.value)}
                >
                  <option value="">-- Chọn loại ảnh --</option>
                  <option value="products">Ảnh sản phẩm</option>
                  <option value="posts">Ảnh bài viết</option>
                  <option value="services">Ảnh dịch vụ</option>
                  <option value="library">Ảnh thư viện</option>
                  <option value="avatar">Ảnh đại diện</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="imageUpload" className="form-label">
                  Chọn hình ảnh
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageUpload}
                  multiple
                />
              </div>
              <button
                type="submit"
                className={`btn btn-primary w-100 mb-3 ${
                  loading ? "disabled" : ""
                }`}
                disabled={!imageType || images.length === 0 || loading}
              >
                {loading ? "Đang thêm..." : "Thêm ảnh"}
              </button>
            </div>
            <div className="col-lg-4">
              <div className="img-thumbnail-container">
                {images.length > 0 ? (
                  images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Ảnh ${index + 1} đã tải lên`}
                      className="img-select"
                    />
                  ))
                ) : (
                  <img
                    src="https://res.cloudinary.com/dmped9z6o/image/upload/v1734262658/petsisters/images/library/lhw3fgb1ivgtatg5txwo.png"
                    alt="Thumbnail mặc định"
                    className="img-example"
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
