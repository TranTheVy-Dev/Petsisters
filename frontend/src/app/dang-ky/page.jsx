"use client";
import Link from "next/link";
import "../../../public/css/dangky.css"
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
export default function DangKy() {

  const [fromdata, setfromdata] = useState( {
    'full_name' : '',
    'email' : '',
    'password' : '',
    'confrimpassword' : '',
  });
  const [erromassage,seterromassage]= useState();
  const handlechange = (e) => {
    setfromdata ({...fromdata, [e.target.name] : e.target.value})
  }
   const  handleregister = async(e) => {
    e.preventDefault();
    
    if (fromdata.password !== fromdata.confrimpassword) {
      seterromassage(' * Mật khẩu xác nhận không khớp')
      return;
    }else {
      seterromassage('')
    }
    try {
      const response = await axios.post('http://localhost:8000/api/web/user/register',fromdata);
      Swal.fire ({
        icon : 'success',
        title : 'Chúc mừng',
        text : 'Bạn đã tạo thành công tài khoản, bạn sẽ được chuyển qua đăng nhập sau ít giây',
        timer : 5000,
      //thư viện này giúp chuyển trang hoặc làm bất cứ gì trong function này sau khi time hết (thông báo đóng)
        didClose : () => {
          window.location.href = '/dang-nhap'
        }
      })
    } catch (error) {
      Swal.fire({
        icon : 'warning',
        title :'Cảnh báo',
        text : 'Có lỗi xảy ra vui lòng kiểm tra mạng'
      })
    }
   }
  return (
    <>
      <div className="content">
        <div className="text">
          Đăng Ký
        </div>
        <form onSubmit={handleregister}>
          <div className="field">
            <input placeholder="Họ Và Tên" name="full_name" value={fromdata.full_name} onChange={handlechange} required type="text" className="input" />
            <span className="span">{/* icon SVG code here */}</span>
          </div>
          <div className="field">
            <input placeholder="Email" name="email" value={fromdata.email} onChange={handlechange} required type="email" className="input" />
            <span className="span">{/* icon SVG code here */}</span>
          </div>
          <div className="field">
            <input placeholder="Mật Khẩu" name="password" value={fromdata.password} onChange={handlechange} required type="password" className="input" />
            <span className="span">{/* icon SVG code here */}</span>
          </div>
          <div className="field">
            <input placeholder="Xác nhận Mật Khẩu" name="confrimpassword" value={fromdata.confrimpassword} onChange={handlechange} required type="password" className="input" />
            <span className="span">{/* icon SVG code here */}</span>
          </div>
          <p className="danger" style={{color : "red"}}>{erromassage}</p>
          <button className="button" type="submit">Đăng Ký</button>
          <div className="sign-in">
            Đã có tài khoản?{' '}
            <Link href="/login">Đăng Nhập Ngay</Link>
          </div>
        </form>
      </div>
    </>
  );
}
