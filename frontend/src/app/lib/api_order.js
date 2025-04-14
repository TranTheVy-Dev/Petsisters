import axios from "axios";

const url_auth_api = process.env.NEXT_PUBLIC_AUTH_API_URL;

// 1. Lấy tất cả đơn hàng
export const getAllOrders = async () => {
  try {
    const url = `${url_auth_api}/order`;
    const response = await axios.get(url);
    return { orders: response.data.data, error: null };
  } catch (error) {
    console.error(error.response?.data || error.message);
    return {
      orders: [],
      error: error.response?.data?.error || "Failed to fetch orders",
    };
  }
};

// 2. Lấy đơn hàng theo ID người dùng
export const getOrdersByCustomerId = async (customerId) => {
  try {
    const url = `${url_auth_api}/order/${customerId}`;
    const response = await axios.get(url);
    return { orders: response.data.data, error: null };
  } catch (error) {
    console.error(error.response?.data || error.message);
    return {
      orders: [],
      error:
        error.response?.data?.error || "Failed to fetch orders by customer ID",
    };
  }
};

export const getOrderDetailsByOrderId = async (order_id) => {
  try {
    const url = `${url_auth_api}/order-detail/${order_id}`;
    const response = await axios.get(url);
    return { orderDetails: response.data.data, error: null };
  } catch (error) {
    console.error(error.response?.data || error.message);
    return {
      orderDetails: [],
      error:
        error.response?.data?.error ||
        "Failed to fetch order detail by order ID",
    };
  }
};
