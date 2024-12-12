"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProductById, updateProduct } from "@/app/lib/api_product";
import { getAllCategories } from "@/app/lib/api_category";

export default function EditProductPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState({
    product_name: "",
    price: "",
    quantity_in_stock: "",
    category_id: "",
    image: null,
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch categories when component loads
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

  // Fetch product when `id` is available
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await getProductById(id);
      if (error) {
        setErrors({ general: "Không thể lấy sản phẩm. Vui lòng thử lại." });
      } else {
        setProduct(data.data);
        setPreviewImage(data.data.image_url); // Assuming image_url exists in the product data
      }
    };
    fetchProduct();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // Handle file changes (image)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({ ...prev, image: file }));

    // Show preview image
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("price", product.price);
    formData.append("quantity_in_stock", product.quantity_in_stock);
    formData.append("category_id", product.category_id);
    formData.append("description", product.description);
    if (product.image) {
      formData.append("image", product.image);
    }

    const { data, error } = await updateProduct(id, formData);

    // Handle errors from the server
    if (error) {
      const errorMessages = {};
      if (error.error) {
        for (const [key, value] of Object.entries(error.error)) {
          errorMessages[key] = Array.isArray(value) ? value.join(", ") : value;
        }
      }
      setErrors(errorMessages);
    } else {
      setSuccessMessage("Cập nhật sản phẩm thành công!");
      setTimeout(() => router.push("/admin/san-pham"), 2000);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-center mb-0">Sửa sản phẩm</h3>
        <button className="btn btn-secondary" onClick={() => router.back()}>
          Quay lại
        </button>
      </div>

      {/* Display error messages */}
      {errors.general && <div className="alert alert-danger">{errors.general}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Product Edit Form */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className={`form-control ${errors.product_name ? "is-invalid" : ""}`}
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
            placeholder="Nhập tên sản phẩm"
          />
          {errors.product_name && <div className="invalid-feedback">{errors.product_name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Giá (VND)</label>
          <input
            type="number"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Nhập giá sản phẩm"
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Tồn kho</label>
          <input
            type="number"
            className={`form-control ${errors.quantity_in_stock ? "is-invalid" : ""}`}
            name="quantity_in_stock"
            value={product.quantity_in_stock}
            onChange={handleChange}
            placeholder="Nhập số lượng tồn kho"
          />
          {errors.quantity_in_stock && (
            <div className="invalid-feedback">{errors.quantity_in_stock}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Danh mục</label>
          <select
            className={`form-select ${errors.category_id ? "is-invalid" : ""}`}
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
          {errors.category_id && <div className="invalid-feedback">{errors.category_id}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            name="description"
            rows="4"
            value={product.description}
            onChange={handleChange}
            placeholder="Nhập mô tả sản phẩm"
          ></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Ảnh sản phẩm</label>
          <input
            type="file"
            className={`form-control ${errors.image_url ? "is-invalid" : ""}`}
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {errors.image_url && <div className="invalid-feedback">{errors.image_url}</div>}
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
          Cập nhật sản phẩm
        </button>
      </form>
    </div>
  );
}
