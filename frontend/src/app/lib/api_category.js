import { useState, useEffect } from 'react';
import axios from "axios";

const WEB_API_URL = process.env.NEXT_PUBLIC_WEB_API_URL;

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${WEB_API_URL}/category`);
    return { categories: response.data.data, error: null };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { categories: [], error };
  }
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        if (!API_URL) {
          setError("API_URL is not defined");
          setLoading(false);
          return;
        }
        try {
            const response = await fetch(`${API_URL}/api/web/category`, {
              headers: { "Cache-Control": "no-store" },
            });
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            setCategories(data.data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    fetchCategories();
  }, []);

  return { categories, loading, error };
};
