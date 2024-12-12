"use client";
import Swal from "sweetalert2";
const useAuth = () => {
  const token = localStorage.getItem('token')
  try {
    if (!token) {
      localStorage.setItem('redirectURL', window.location.href)
      Swal.fire({
        title: 'Cảnh báo',
        text: 'Bạn Phải đăng nhập mới sử dụng được dịch vụ này ',
        icon: 'warning',
        confirmButtonColor: 'YES',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: false,
        focusConfirm: true,
        focusCancel: false
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/dang-nhap'
        }  
      }); return false //chưa đăng nhập
    } else 
    return true; //đã đăng nhập
  } catch (error) {
    console.log('lỗi rồi cha ơi', error);

  }
}
export default useAuth;