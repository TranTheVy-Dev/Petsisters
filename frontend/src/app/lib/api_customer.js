import { useState, useEffect } from "react";

export const getCustomerById = async (id) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error("API_URL is not defined");
  }

  const response = await fetch(`${API_URL}/api/auth/customer/${id}`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.error) {
      throw new Error(errorData.error);
    }
    throw new Error("Failed to fetch customer data");
  }

  const { data: customer } = await response.json();
  return customer;
};

export const getCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if (!API_URL) {
        setError("API_URL is not defined");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/api/auth/customer`, {
          headers: { "Cache-Control": "no-store" },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCustomers(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);
  return { customers, loading, error };
};

export const createCustomer = async (userData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/customer`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (Array.isArray(errorData.error)) {
        throw new Error(errorData.error.join("\n"));
      }
      throw new Error(errorData.message || "Đã xảy ra lỗi không xác định.");
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi tạo người dùng:", error.message);
    throw error;
  }
};