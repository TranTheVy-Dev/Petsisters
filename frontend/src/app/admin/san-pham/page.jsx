"use client";

import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "@/app/lib/api_product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Hàm fetch data
const fetchProducts = async (setProducts, setError, setLoading) => {
  try {
    const { products, error } = await getAllProducts();
    if (error) {
      setError(error);
    } else {
      setProducts(products);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    setError(error);
  } finally {
    setLoading(false);
  }
};

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const product_lenght = 0;

  useEffect(() => {
    fetchProducts(setProducts, setError, setLoading);
  }, []);

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const response = await deleteProduct(productId);
        if (response.success) {
          setProducts((prevProducts) => 
            (prevProducts || []).filter((product) => product.id !== productId)
          );
          alert("Sản phẩm đã được xóa!");
        } else {
          alert("Không thể xóa sản phẩm.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Đã có lỗi xảy ra khi xóa sản phẩm.");
      }
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Sản phẩm</h3>
        <div>
          <a
            href="/admin/san-pham/da-xoa"
            className="btn btn-outline-danger rounded-0"
          >
            Sản phẩm đã xóa
          </a>
          <a href="/admin/san-pham/them" className="btn btn-primary rounded-0">
            Thêm sản phẩm
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card border-0 rounded-0 bg-primary-subtle text-primary">
            <div className="card-body text-end">
              <div className="display-6 d-flex justify-content-between">
                <i className="fal fa-box"></i>
                {products?.length || 0}
              </div>
              SẢN PHẨM
            </div>
          </div>
        </div>
        {/* Other cards here */}
      </div>

      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <table className="table text-center">
            <thead>
              <tr>
                <th className="text-start" colSpan="2">
                  Sản phẩm
                </th>
                <th>Đơn giá</th>
                <th>Tồn kho</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={{ width: "64px" }}>
                    <img
                      src={`${product.image_url}`}
                      className="w-100"
                      alt={product.product_name}
                    />
                  </td>
                  <td className="text-start">
                    <strong>{product.product_name}</strong>
                    <br />
                    <small>
                      Id: <strong>{product.id}</strong> | Danh mục:{" "}
                      <a href="#" className="text-decoration-none fw-bold">
                        {product.category.category_name}
                      </a>
                    </small>
                  </td>
                  <td>
                    {product.price.toLocaleString()} VND
                    <br />
                    {/* <del>{(product.price * 1.1).toLocaleString()} VND</del> */}
                  </td>
                  <td>{product.quantity_in_stock}</td>
                  <td>
                    <a
                      href="#"
                      target="_blank"
                      className="btn btn-primary btn-sm"
                    >
                      <i className="fas fa-eye fa-fw"></i>
                    </a>
                    <a
                      href={`/admin/san-pham/sua/${product.id}`}
                      className="btn btn-outline-warning btn-sm"
                    >
                      <i className="fas fa-pencil fa-fw"></i>
                    </a>
                    <a
                      href="#"
                      onClick={() => handleDeleteProduct(product.id)} // Gọi hàm xóa
                      className="btn btn-outline-danger btn-sm"
                    >
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
}
