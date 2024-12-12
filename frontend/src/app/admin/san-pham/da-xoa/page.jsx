"use client";

import { useEffect, useState } from "react";
import {
  getDeletedProducts,
  restoreProduct,
  forceDestroy,
} from "@/app/lib/api_product"; // Cần tạo hàm restoreProduct trong API
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap for styling
import { useRouter } from "next/navigation"; // Sử dụng useRouter để quay lại trang trước

export default function DeletedProductsPage() {
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Khởi tạo router để điều hướng quay lại trang trước

  useEffect(() => {
    const fetchDeletedProducts = async () => {
      const { data, error } = await getDeletedProducts();
      if (error) {
        setError(error);
      } else {
        if (Array.isArray(data)) {
          setDeletedProducts(data);
        } else {
          setError({ message: "Dữ liệu trả về không phải là mảng" });
        }
      }
      setLoading(false);
    };
    fetchDeletedProducts();
  }, []);

  const handleRestore = async (productId) => {
    try {
      const response = await restoreProduct(productId); // Gọi API phục hồi sản phẩm
      if (response && response.success) {
        // Nếu thành công, xóa sản phẩm khỏi danh sách đã xóa
        setDeletedProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } else {
        setError(response.error || { message: "Không thể phục hồi sản phẩm" });
      }
    } catch (error) {
      setError(
        error || {
          message: "Đã có lỗi xảy ra trong quá trình phục hồi sản phẩm",
        }
      );
    }
  };

  const handleForceDelete = async (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm này?")) {
      try {
        const { success, error } = await forceDestroy(productId); // Gọi API xóa vĩnh viễn
        if (success) {
          alert("Sản phẩm đã được xóa vĩnh viễn.");
          const { data, error } = await getDeletedProducts();
          if (error) {
            setError(error);
          } else {
            setDeletedProducts(data);
          }
        } else {
          alert(error || "Có lỗi xảy ra khi xóa sản phẩm.");
        }
      } catch (error) {
        setError(error || { message: "Có lỗi xảy ra khi xóa sản phẩm." });
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-center mb-0">Sản phẩm đã xóa</h3>
        <button
          className="btn btn-secondary"
          onClick={() => router.back()} // Quay lại trang trước
        >
          Quay lại
        </button>
      </div>

      <div className="card shadow-sm rounded-3">
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {deletedProducts.length > 0 ? (
                deletedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.product_name}</td>
                    <td>{product.category?.category_name || "N/A"}</td>
                    <td>{product.price.toLocaleString()} VND</td>
                    <td>{product.quantity_in_stock}</td>
                    <td className="button-container">
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleRestore(product.id)} // Xử lý phục hồi
                      >
                        Phục hồi
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleForceDelete(product.id)} // Gọi hàm xóa vĩnh viễn
                      >
                        Xóa vĩnh viễn
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Không có sản phẩm đã xóa
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
