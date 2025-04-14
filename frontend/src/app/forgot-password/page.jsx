"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import "./style.css"; // Import file CSS riêng biệt

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(""); // State cho lỗi email
  const router = useRouter();

  // Hàm kiểm tra định dạng email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError("Email không đúng định dạng.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/web/user/forgotpass",
        { email }
      );

      setLoading(false);
      Swal.fire({
        title: "Thành Công",
        icon: "success",
        text: "Yêu cầu xác thực đã được gửi. Vui lòng kiểm tra hộp thư để lấy lại mật khẩu.",
        timer: 3000,
        didClose: () => {
          router.push("/dang-nhap");
        },
      });
    } catch (error) {
      setLoading(false);
      setEmailError(
        "Email không tồn tại trong hệ thống. Vui lòng kiểm tra lại."
      );
    }
  };

  return (
    <>
      <main className="login-main">
    <div className="forgotpass-content">
      <div className="forgotpass-text">Quên mật khẩu</div>
      {loading && (
        <div className="forgotpass-overlay">
          <ClipLoader size={60} color="#3498db" />
        </div>
      )}
      <form onSubmit={handleForgot}>
        <div className="forgotpass-field">
          <input
            placeholder="Nhập Email của bạn"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="forgotpass-input"
          />
          <span className="forgotpass-span"></span>
        </div>
        {emailError && (
          <p className="error-message" style={{ color: "red" }}>
            {emailError}
          </p>
        )}
        <button className="forgotpass-button" type="submit">
          Gửi
        </button>
        <div className="forgotpass-signup">
          Bạn chưa là thành viên? <Link href="/dang-ky">Đăng ký ngay</Link>
        </div>
      </form>
    </div>
    </main>
    </>
  );
}
