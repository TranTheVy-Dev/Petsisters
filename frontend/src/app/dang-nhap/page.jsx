"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import "./login.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
// import { loadComponents } from "next/dist/server/load-components";
const url_web_api = process.env.NEXT_PUBLIC_WEB_API_URL;
export default function Login() {
  const router = useRouter();
  const customer = JSON.parse(localStorage.getItem("customer"));
  if (customer) {
    localStorage.setItem(
      "error",
      "Bạn đã đăng nhập không thể tiếp tục đăng nhập!"
    );
    router.push("/error");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Email không đúng định dạng.");
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự.");
      isValid = false;
    }

    if (!isValid) return;

    try {
      const url = `${url_web_api}/user/login`;
      const response = await axios.post(url, { email, password });

      // Lưu thông tin vào localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("customer", JSON.stringify(response.data.customer));

      const redirectURL = localStorage.getItem("redirectURL") || "/";
      localStorage.removeItem("redirectURL");
      router.push(redirectURL);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          // Hộp thông báo nếu tài khoản không tồn tại
          Swal.fire({
            icon: "warning",
            title: "Tài khoản không tồn tại!",
            text: "Tài khoản bạn nhập không tồn tại. Bạn có muốn chuyển sang trang đăng ký không?",
            showCancelButton: true,
            confirmButtonText: "Có, chuyển ngay",
            cancelButtonText: "Hủy bỏ",
          }).then((result) => {
            if (result.isConfirmed) {
              // Chuyển đến trang đăng ký và lưu email
              window.location.href = `/dang-ky?email=${email}`;
            }
          });
        } else if (err.response.status === 401) {
          setPasswordError("Mật khẩu không chính xác.");
        } else {
          console.log(err.response);

          Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: "Đã xảy ra lỗi không xác định, vui lòng thử lại.",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi kết nối!",
          text: "Không thể kết nối đến server.",
        });
      }
    }
  };

  return (
    <>
      <main className="login-main">
        <div className="content">
          <div className="text">Đăng Nhập</div>
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="field">
              <input
                placeholder="Nhập email của bạn"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
              {emailError && <div className="error-text">{emailError}</div>}
            </div>

            {/* Password Field */}
            <div className="field">
              <input
                placeholder="Mật Khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
              />
              {passwordError && (
                <div className="error-text">{passwordError}</div>
              )}
            </div>

            <div className="forgot-pass">
              <Link href="/forgot-password">Bạn quên mật khẩu?</Link>
            </div>

            <button className="button" type="submit">
              Đăng nhập
            </button>

            <div className="sign-up">
              Bạn chưa là thành viên? <Link href="/dang-ky">Đăng ký ngay</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
