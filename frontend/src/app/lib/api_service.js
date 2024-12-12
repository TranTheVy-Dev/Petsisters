import { useState, useEffect } from 'react';

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

  return { services, loading, error };
};

export default useFetchService;
