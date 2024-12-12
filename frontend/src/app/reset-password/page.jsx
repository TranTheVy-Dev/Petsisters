"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function resetpass() {
  const [password, setpassword] = useState('')
  const [message, setmessage] = useState('')
  const [confrimpassword, setconfrimpassword] = useState('')
  const router = useRouter()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const queryparams = new URLSearchParams(window.location.search)
    const TokenUrl = queryparams.get('token')
     console.log('token ne',TokenUrl);
    if (TokenUrl) {
      setToken(TokenUrl)
    }
  }, []);
  if (!token) {
    console.log('khong tim thay token', token);
  }
  const handlereset = async (e) => {
    //ngan load trang
    e.preventDefault();
    if (password !== confrimpassword) {
      setmessage("Mật khẩu xác nhận không khớp")
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/api/web/user/resetpass", {
        password,
        token
      })
      setmessage("Mật khẩu đã được đặt thành công")
      Swal.fire({
        title: 'Thành Công',
        text: 'Đã thay đổi mật khẩu thành công vui lòng đăng nhập lại bằng tài mật mật khẩu mới ',
        icon: 'success',
        timer: 3000,
        didClose: () => {
          router.push('/dang-nhap')
        }
      })
    } catch (error) {
      setmessage(error.response?.data?.erro || "đã có lỗi xảy ra")
      Swal.fire({
        title: "Có gì đó sai sai",
        icon: "error",
        text : "Thời hạn hiệu lực đặt lại mật khẩu của bạn đã hết hoặc mạng có vấn đề vui lòng kiểm tra kỹ"
      })
    }
  }

  return (
    <div className="content">
      <div className="text">
        Xác nhận mật khẩu
      </div>
      <form onSubmit={handlereset}>
        <div className="field">
          <input placeholder='Nhập Mật khẩu mới của bạn'
            typeof='password'
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required type="text" className="input" />
          <span className="span"></span>
        </div>
        <div className="field">
          <input placeholder='Xác nhận mật khẩu'
            typeof='confrimpassword'
            value={confrimpassword}
            onChange={(e) => setconfrimpassword(e.target.value)}
            required type="text" className="input" />
           {message && (  <div class="alert alert-danger" role="alert">
            {message}
          </div>)}  
        </div>
        <button className="button" type="submit">Xác nhận</button>
        <div className="sign-up">
          Bạn chưa là thành viên?{' '}
          <Link href="/dang-ky">Đăng ký ngay</Link>
        </div>
      </form>
    </div>
  );
};
