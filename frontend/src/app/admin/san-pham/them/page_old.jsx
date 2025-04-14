"use client";
import { useState } from "react";
import { useCategories } from "../../../lib/api_category";
import { useRouter } from "next/navigation"; // Import useRouter

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminProduct() {
  const { categories } = useCategories();
  const router = useRouter(); // Khởi tạo useRouter

  // State để lưu trữ thông tin sản phẩm
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    quantity_in_stock: "",
    category_id: "",
    price: "",
    sale_price: "",
    image_url: null,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // Nếu là file input
      if (name === "image_url") {
        setFormData({ ...formData, image_url: files[0].name }); // Gán đúng trường image_url
      } else if (name === "images") {
        setFormData({ ...formData, images: Array.from(files) });
      }
    } else {
      // Nếu là input hoặc select
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chuẩn bị dữ liệu gửi
    const productData = new FormData();
    productData.append("category_id", formData.category_id);
    productData.append("product_name", formData.product_name);
    productData.append("description", formData.description);
    productData.append("quantity_in_stock", formData.quantity_in_stock);
    productData.append("price", formData.price);
    // productData.append('sale_price', formData.sale_price);

    if (formData.image_url) {
      productData.append("image_url", formData.image_url); // Đảm bảo gán image_url
    }
    if (formData.images.length > 0) {
      formData.images.forEach((image, index) => {
        productData.append(`images[${index}]`, image);
      });
    }

    // Gửi dữ liệu tới API
    try {
      const response = await fetch(`${API_URL}/api/auth/product`, {
        method: "POST",
        body: productData,
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const result = await response.json();
      alert("Sản phẩm đã được tạo thành công!");

      // Chuyển hướng về trang danh sách sản phẩm
      router.push("/admin/san-pham"); // Điều hướng tới /admin/san-pham sau khi tạo sản phẩm
    } catch (error) {
      console.log(formData);
      console.error(error);
      alert("Đã xảy ra lỗi khi tạo sản phẩm.");
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Thêm sản phẩm</h3>
        <div>
          <a
            href="/admin/san-pham"
            className="btn btn-outline-secondary rounded-0"
          >
            <i className="far fa-long-arrow-left"></i> Quay lại
          </a>
        </div>
      </div>
      <form
        className="row"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="col-md-8 mb-4">
          <div className="card rounded-0 border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="pb-3 border-bottom">Thông tin cơ bản</h5>
              <div className="mb-3">
                <label htmlFor="product_name" className="form-label">
                  Tên sản phẩm *
                </label>
                <input
                  type="text"
                  name="product_name"
                  className="form-control rounded-0"
                  id="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  className="form-control rounded-0"
                  id="description"
                  rows="6"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="row">
                <div className="col mb-3">
                  <label htmlFor="quantity_in_stock" className="form-label">
                    Số lượng *
                  </label>
                  <input
                    type="number"
                    name="quantity_in_stock"
                    className="form-control rounded-0"
                    id="quantity_in_stock"
                    min="0"
                    value={formData.quantity_in_stock}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col mb-3">
                  <label htmlFor="category_id" className="form-label">
                    Danh mục *
                  </label>
                  <div className="input-group">
                    <select
                      name="category_id"
                      className="form-select rounded-0"
                      id="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Chọn danh mục
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded-0 border-0 shadow-sm">
            <div className="card-body">
              <h6 className="pb-3 border-bottom">Đơn giá</h6>
              <div className="row">
                <div className="col mb-3">
                  <label htmlFor="price" className="form-label">
                    Giá gốc *
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="form-control rounded-0"
                    id="price"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col mb-3">
                  <label htmlFor="sale_price" className="form-label">
                    Giá sale
                  </label>
                  <input
                    type="number"
                    name="sale_price"
                    className="form-control rounded-0"
                    id="sale_price"
                    min="0"
                    value={formData.sale_price}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card rounded-0 border-0 shadow-sm">
            <div className="card-body">
              <h5 className="pb-3 border-bottom">Hình ảnh</h5>
              <div className="mb-3">
                <label htmlFor="image_url" className="form-label">
                  Ảnh sản phẩm *
                </label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="image_url"
                  name="image_url"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="images" className="form-label">
                  Ảnh phụ
                </label>
                <input
                  className="form-control rounded-0"
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg rounded-0 mt-4 w-100"
          >
            Tạo sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
}
