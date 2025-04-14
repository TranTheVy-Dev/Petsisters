import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Hàm kiểm tra admin dựa trên dữ liệu localStorage
export const isAdmin = () => {
  const customer = JSON.parse(localStorage.getItem("customer"));
  if (!customer) {
    console.log("Chưa đăng nhập");
    return false;
  } else {
    if (customer.role === 0) {
      return false;
    } 
  }
  return true;
};

// Hàm kiểm tra trạng thái đăng nhập  
export const isLogin = () => {
  const customer = JSON.parse(localStorage.getItem("customer"));
  return !!customer;
};

// Custom hook: Xử lý điều hướng nếu người dùng không phải admin
export const checkIsAdmin = () => {
  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    if (!isLogin()) {
      localStorage.setItem("redirectURL", "/admin");
      window.location.href = "/dang-nhap";
      return;
    }
    // Kiểm tra quyền admin
    if (!isAdmin()) {
      window.location.href = "/not-authorized";
      return null;
    }
  });
};
