"use client";
import React, { useState } from 'react';
import Link from 'next/link'; 
import axios from 'axios';
import "../../../public/css/login.css"
import Swal from 'sweetalert2';
export default function login() {
// lưu trữ dữ liệu vào state để quản lý và đưa qua backend
const [email, setemail] = useState('')
const [password,setpassword]= useState('')
const [erro, seterro]= useState(null)
const handlelogin = async (e) => {  
  e.preventDefault();
    try {
    const response = await axios.post('http://localhost:8000/api/web/user/login',
      {
        email,
        password,
      });      

    localStorage.setItem('token',response.data.token)
    localStorage.setItem('customer',JSON.stringify(response.data.customer)) 

    //lưu đường dẫn trước đó vào local
    const redirectURL = localStorage.getItem('redirectURL') || '/';
    localStorage.removeItem('redirectURL')
    Swal.fire({
      icon : 'success',
      title : 'Chúc mừng',
      text : "Bạn đã đăng nhập thành công, hệ thống sẽ chuyển về trang bạn sử dụng gần đây nhất.",
     timer : 4000,
     didClose : () =>  {
      window.location.href = redirectURL;
     }
     })
  //end
  } catch (erro) {
    Swal.fire ({
      icon : 'error',
      title : 'Có gì đó sai sai !',
      text : 'Mật khẩu hoặc email của bạn không đúng vui lòng kiểm tra lại',
      focusConfirm : true
    })
  }
}
  return (
    <div className="content">
      <div className="text">
        Đăng Nhập
      </div>
      <form onSubmit={handlelogin}>
        {erro}
        <div className="field"> 
          <input placeholder='Nhập email của bạn'
          typeof='email'
          value={email}
          onChange={(e)=> setemail(e.target.value)}
          required type="text" className="input" />
          <span className="span"></span>
        </div>
        <div className="field">
          <input placeholder='Mật Khẩu'
          typeof='password'
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required type="password" className="input" />
          <span  className="span"></span>
        </div>
        <div className="forgot-pass">
          <Link href="/forgot-password">Bạn quên mật khẩu?</Link>
        </div>
        <button className="button" type="submit">Đăng nhập</button>
        <div className="sign-up">
          Bạn chưa là thành viên?{' '}
          <Link href="/dang-ky">Đăng ký ngay</Link>
        </div>
      </form>
    </div>
  );
};


