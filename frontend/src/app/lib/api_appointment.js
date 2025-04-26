import axios from "axios";
import errors from "formidable/FormidableError";
import ProductDetail from "../chi-tiet-san-pham/[id]/page";

const url_auth_api = process.env.NEXT_PUBLIC_AUTH_API_URL;

// 1. Lấy tất cả đơn hàng
export const getAllAppointment = async () => {
  try {
    const url = `${url_auth_api}/appointment`;
    const response = await axios.get(url);
    return { appointments: response.data.data, error: null };
  } catch (error) {
    console.error(error.response?.data || error.message);
    return {
      appointments: [],
      error: error.response?.data?.error || "Failed to fetch orders",
    };
  }
};
// 2. Lấy đơn hàng theo ID người dùng
export const getAllAppointmentBycustomerId =  async(customerId)=> {
try {
  const urlAuth = `${url_auth_api}/appointment/${customerId}`
  const response = await axios.get(urlAuth)
  return {appointment: response.data.data ,errors:null}
} catch (error) {
  console.error(error.response?.data || error.message)
  return{
    appointment: [],
    error : error.response?.data?.response || 'faild to connect data'
  }
}
}


// tạo book lich hen
export const createAppointment = async (formData) => {
  try {
    const appointment = `${url_auth_api}/appointment`;
    const response = await axios.post(appointment, formData);
    return { data: response, error: null };
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
