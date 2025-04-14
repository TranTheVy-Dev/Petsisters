import axios from "axios";
import { useState, useEffect } from 'react';

const url_web_api = process.env.NEXT_PUBLIC_WEB_API_URL;
const url_auth_api = process.env.NEXT_PUBLIC_AUTH_API_URL;

const useFetchService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if (!API_URL) {
        setError("API_URL is not defined");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/web/service`, {
          headers: { "Cache-Control": "no-store" },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setServices(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, []); // Chạy khi component mount

// api_service.js
 const addService = async (newService) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!API_URL) {
    throw new Error("API_URL is not defined");
  }

  try {
    const response = await fetch(`${API_URL}/api/web/service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify(newService),
    });

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({}));
      throw new Error(errorResponse.message || "Failed to add service (unknown error)");
    }

    const data = await response.json();
    return data.data; // trả về dữ liệu dịch vụ mới thêm vào
  } catch (err) {
    throw new Error(err.message || "Có lỗi xảy ra khi thêm dịch vụ");
  }
};

  return { services, loading, error, addService };
};

export default useFetchService;


//Zapxje
export const getAllServices = async () => {
  try {
    const url = `${url_auth_api}/service`;
    const response = await axios.get(url);
    return { services: response.data.data, error: null };
  } catch {
    console.log(error.response.data);
    return { services: [], error: error.response.data.error };
  }
};


