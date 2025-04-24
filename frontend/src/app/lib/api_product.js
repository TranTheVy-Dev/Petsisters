import { useState, useEffect } from "react";
import axios from "axios";

const WEB_API_URL = process.env.NEXT_PUBLIC_WEB_API_URL;
const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${WEB_API_URL}/product`);
    return { products: response.data.data, error: null };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], error };
  }
};

  export const addProduct = async (formData) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { data: response.data, error: null };
    } catch (error) {
      if (error.response) {
        console.error("Response Data:", error.response.data); // Dữ liệu phản hồi từ server
        return {
          data: null,
          error: error.response.data,
        };
      } else {
        console.error("Unexpected error:", error.message);
        return {
          data: null,
          error: { error_code: 500, error: "Unexpected error" },
        };
      }
    }
  };

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${AUTH_API_URL}/product/${productId}`);

    // Kiểm tra phản hồi thành công và trả về thông báo thành công
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "Sản phẩm đã được xóa",
      };
    }
    return { success: false, error: "Không thể xóa sản phẩm" };
  } catch (error) {
    // Xử lý lỗi từ server
    if (error.response) {
      console.error("Response Data:", error.response.data);
      return {
        success: false,
        error:
          error.response.data.message ||
          error.response.data.error ||
          "Không thể xóa sản phẩm",
      };
    } else {
      console.error("Unexpected error:", error.message);
      return {
        success: false,
        error: "Lỗi không xác định khi xóa sản phẩm",
      };
    }
  }
};

export const getDeletedProducts = async () => {
  try {
    const response = await axios.get(`${AUTH_API_URL}/product/deleted`);
    const deletedProducts = response.data.data;
    if (Array.isArray(deletedProducts)) {
      return { data: deletedProducts, error: null };
    } else {
      return { data: [], error: "Dữ liệu không hợp lệ" };
    }
  } catch (error) {
    console.error("Error fetching deleted products:", error);
    if (error.response) {
      return { data: [], error: error.response.data };
    } else {
      return { data: [], error: "Unexpected error occurred" };
    }
  }
};

export const restoreProduct = async (productId) => {
  try {
    const response = await axios.post(
      `${AUTH_API_URL}/product/restore/${productId}`
    );
    // Kiểm tra response và đảm bảo trả về đúng định dạng
    if (response.status === 200) {
      return { success: true };
    }
    return { success: false, error: "Không thể phục hồi sản phẩm." };
  } catch (error) {
    console.error("Error restoring product:", error);
    return { success: false, error: error.response?.data || error.message };
  }
};

export const forceDestroy = async (id) => {
  try {
    const response = await axios.delete(`${AUTH_API_URL}/product/${id}/force`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || "Không thể xóa sản phẩm",
    };
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${WEB_API_URL}/product/${productId}`);
    return { data: response.data, error: null }; // Return 'product' instead of 'data'
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      data: null,
      error: error.response ? error.response.data : error.message,
    }; // Ensure 'product' is null if there's an error
  }
};

export const updateProduct = async (productId, formData) => {
  try {
    const response = await axios.put(`${AUTH_API_URL}/product/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    if (error.response) {
      console.error("Response Data:", error.response.data);
      return {
        data: null,
        error: error.response.data,
      };
    } else if (error.request) {
      console.error("Request was made but no response received:", error.request);
      return {
        data: null,
        error: "No response received from server",
      };
    } else {
      console.error("Unexpected error:", error.message);
      return {
        data: null,
        error: { error_code: 500, error: "Unexpected error occurred" },
      };
    }
  }
};

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if (!API_URL) {
        setError("API_URL is not defined");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/api/web/product`, {
          headers: { "Cache-Control": "no-store" },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading, error };
};
