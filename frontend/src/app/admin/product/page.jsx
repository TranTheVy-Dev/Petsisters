"use client";

import axios from "axios";
import { useState, useEffect } from "react";

export default function productAdminPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ product_name: "", price: "", category_id: "", quantity_in_stock: "" });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("http://localhost:8000/api/web/product");
        setProducts(res.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Thêm sản phẩm mới
  const handleAddProduct = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/web/product",
        newProduct
      );
      setProducts([...products, res.data]);
      setNewProduct({product_name: "", price: "", category_id: "", quantity_in_stock: ""});
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Xóa sản phẩm
  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/web/product/${id}`
      );
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h1>Admin Product Management</h1>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.product_name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, product_name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Quantity"
          value={newProduct.quantity_in_stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, quantity_in_stock: e.target.value })
          }
        />
        <input
          type="integer"
          placeholder="Category Id"
          value={newProduct.category_id}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category_id: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.product_name} - ${product.price}
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
