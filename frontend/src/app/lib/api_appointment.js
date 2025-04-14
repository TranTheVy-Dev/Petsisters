import axios from "axios";

const url_auth_api = process.env.NEXT_PUBLIC_AUTH_API_URL;

// 1. Lấy tất cả đơn hàng
export const getAllAppointment = async () => {
  try {
    const url = `${url_auth_api}/appointment`;
    const response = await axios.get(url);
    return { appointments: response.data.data, error: null };
  } catch (error) {
    console.error(error.response?.data || error.message);
    return { appointments: [], error: error.response?.data?.error || "Failed to fetch orders" };
  }
};

// 2. Lấy đơn hàng theo ID người dùng
export const getAppointmentByCustomerId = async (customerId) => {
  try {
    const url = `${url_auth_api}/order/${customerId}`;
    const response = await axios.get(url);
    return { appointments: response.data.data, error: null };
  } catch (error) {
    console.error(error.response?.data || error.message);
    return { appointments: [], error: error.response?.data?.error || "Failed to fetch orders by customer ID" };
  }
};

