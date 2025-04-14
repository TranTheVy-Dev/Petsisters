"use client";

import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import "./thu_vien_anh.css";
import { getAllImages } from "@/app/lib/api-cloudinary";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import Modal from "@/components/Modal";
import Modal from "../components/modal";

const ITEMS_PER_PAGE = 8;

export default function GalleryPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [tooltip, setTooltip] = useState("Copy URL");

  // State cho modal sửa ảnh
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const { images, error } = await getAllImages();
      if (error) {
        setError(error);
      } else {
        setImages(images);
        setTotalPages(Math.ceil(images.length / ITEMS_PER_PAGE));
      }
      setLoading(false);
    };

    fetchImages();
  }, []);

  const getImagesForCurrentPage = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return images.slice(startIndex, endIndex);
  };

  const handleDelete = async (asset_id) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Chắc chắn",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      deleteImage(asset_id);
    }
  };

  const handleCopy = (value) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setTooltip("Copied!");
        setTimeout(() => setTooltip("Copy URL"), 2000);
      })
      .catch((err) => {
        console.error("Lỗi khi sao chép: ", err);
        alert("Không thể sao chép link ảnh!");
      });
  };

  //Handle Update
  const openEditModal = (image) => {
    setSelectedImage(image);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedImage(null);
    setIsEditModalOpen(false);
  };

  const handleEditSubmit = async (updatedPublicId) => {
    try {
      // Hiển thị thông báo đang xử lý
      const loadingAlert = Swal.fire({
        title: "Đang cập nhật...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const apiUpdate = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/cloudinary/update-image`;
      const formData = new FormData();
      formData.append("old_public_id", selectedImage.public_id);
      formData.append("new_public_id", updatedPublicId);

      const response = await axios.post(apiUpdate, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      // Đóng thông báo đang xử lý
      Swal.close();
      if (response.status === 200) {
        const newUrlImage = response.data.data.secure_url;
        setImages((prevImages) =>
          prevImages.map((img) =>
            img.asset_id === selectedImage.asset_id
              ? {
                  ...img,
                  public_id: updatedPublicId,
                  secure_url: newUrlImage, // Cập nhật secure_url mới từ API
                }
              : img
          )
        );
        Swal.fire({
          title: "Cập nhật thành công!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        closeEditModal();
      }
    } catch (error) {
      Swal.fire({
        title: "Lỗi!",
        text: `Không thể cập nhật ảnh: ${
          error.response?.data?.error || "Không rõ nguyên nhân."
        }`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const deleteImage = async (asset_id) => {
    try {
      // Hiển thị thông báo đang xử lý
      const loadingAlert = Swal.fire({
        title: "Đang xóa...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const apiDelete = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/cloudinary/${asset_id}`;
      const response = await axios.delete(apiDelete);

      // Đóng thông báo đang xử lý
      Swal.close();

      // Xử lý khi xóa thành công
      if (response.status === 204) {
        // Cập nhật danh sách ảnh
        setImages(images.filter((img) => img.asset_id !== asset_id));
        setTotalPages(Math.ceil(images.length / ITEMS_PER_PAGE));

        Swal.fire({
          title: "Xóa thành công!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      // Đóng thông báo đang xử lý
      Swal.close();
      // Hiển thị thông báo lỗi
      Swal.fire({
        title: "Lỗi!",
        text: `Đã xảy ra lỗi khi xóa ảnh: ${
          error.response?.data?.error || "Không rõ nguyên nhân."
        }`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const goToAddPage = () => {
    router.push(`${pathname}/them`);
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="admin-title">Thư viện ảnh</h3>
        <button onClick={goToAddPage} className="btn-zapxje btn-zapxje-go">
          <i className="far fa-plus me-2"></i>Thêm ảnh
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <p className="text-center">Đang tải ảnh...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {images.length === 0 && !loading && (
        <p className="text-center text-danger">
          Không có ảnh nào trong thư viện.
        </p>
      )}

      {/* Gallery Layout */}
      <div className="row">
        {getImagesForCurrentPage().map((image) => (
          <div
            key={image.asset_id}
            className="col-lg-3 col-md-4 col-sm-6 image-library-container"
          >
            <div className="frame-image-library-item">
              <img
                src={image.secure_url}
                alt={image.alt}
                className="image-library-item"
              />
              <div className="frame-image-bottom">
                <span>
                  {image.public_id.length > 20
                    ? `${image.public_id.substring(0, 20)}...`
                    : image.public_id}
                </span>
                <div>
                  <button
                    className="btn-copy-url-image me-2"
                    onClick={() => handleCopy(image.secure_url)}
                  >
                    <i className="fa fa-copy"></i>
                    <span className="tooltip-image">{tooltip}</span>
                  </button>
                  <button
                    className="btn-edit-image"
                    onClick={() => openEditModal(image)}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleDelete(image.asset_id)}
                className="btn-delete-image-library"
              >
                <span className="btn-delete-image-library-content">X</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Modal sửa ảnh */}
      {isEditModalOpen && (
        <Modal
          image={selectedImage}
          onClose={closeEditModal}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
}

// Component phân trang
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Hiển thị tối đa 5 nút trang
  const maxVisiblePages = 3;

  // Xác định trang đầu tiên và trang cuối cùng cần hiển thị
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  return (
    <nav>
      <ul className="pagination">
        {/* Nút Trang Đầu */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button onClick={() => onPageChange(1)} className="page-link">
            <i className="far fa-angle-left"></i>
            <i className="far fa-angle-left"></i>
          </button>
        </li>

        {/* Nút Trang Trước */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="page-link"
          >
            <i className="far fa-angle-left"></i>
          </button>
        </li>

        {/* Hiển thị các trang */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <li
            key={startPage + index}
            className={`page-item ${
              currentPage === startPage + index ? "active" : ""
            }`}
          >
            <button
              onClick={() => onPageChange(startPage + index)}
              className="page-link"
            >
              {startPage + index}
            </button>
          </li>
        ))}

        {/* Nút Trang Sau */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="page-link"
          >
            <i className="far fa-angle-right"></i>
          </button>
        </li>

        {/* Nút Trang Cuối */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            onClick={() => onPageChange(totalPages)}
            className="page-link"
          >
            <i className="far fa-angle-right"></i>
            <i className="far fa-angle-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};
