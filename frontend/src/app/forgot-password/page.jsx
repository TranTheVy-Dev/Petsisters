"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';
import "./style.css";
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

export default function forgotpass() {
  const [email, setemail] = useState();
  const [loading, setloading] = useState();
  const router = useRouter();
  const handleForgot = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const response = await axios.post("http://localhost:8000/api/web/user/forgotpass", { email })
      setloading(false)
      Swal.fire({
        title: "Thành Công",
        icon: "success",
        text: "Bạn đã gởi yêu cầu xác thực vui lòng vào họp thư để xem hướng dẫn lấy lại mật khẩu nhé",
        timer: 3000,
        didClose: () => {
          router.push('/dang-nhap')
        },
        focusConfirm: false
      })
    } catch (error) {
      setloading(false)
      Swal.fire({
        title: "Có gì đó sai sai",
        icon: 'error',
        text: "Email của bạn không có trong hệ thống PetSister !",
        timer: 3000,
        focusConfirm: false
      })
      return
    }
  }

  return (
    <div className="content" >
      <div className="text">
        Quên mật khẩu
      </div>
      {loading && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}
      <form onSubmit={handleForgot}>
        <div className="field">
          <input placeholder='Nhập Email của bạn' 
            typeof='email' value={email}
            // value={email}
            // onChange={(e)=> setemail(e.target.value)}
            onChange={(e) => { setemail(e.target.value) }}
            required type="text" className="input" />
          <span className="span"></span>
        </div>
        <button className="button" type="submit">Gửi</button>
        <div className="sign-up">
          Bạn chưa là thành viên?{' '}
          <Link href="/dang-ky">Đăng ký ngay</Link>
        </div>
      </form>
    </div>
  );
};