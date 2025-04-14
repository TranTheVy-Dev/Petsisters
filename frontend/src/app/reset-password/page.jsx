"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "./style.css" ;

export default function ResetPass() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();
  const [token, setToken] = useState(null);

  // Lấy token từ URL
  useEffect(() => {
    const queryparams = new URLSearchParams(window.location.search);
    const TokenUrl = queryparams.get("token");
    if (TokenUrl) {
      setToken(TokenUrl);
    }
  }, []);

  // Hàm đánh giá độ mạnh mật khẩu
  const validatePassword = (password) => {
    const strengthCriteria = [
      /[a-z]/, // Chữ thường
      /[A-Z]/, // Chữ in hoa
      /[0-9]/, // Số
      /[!@#$%^&*(),.?":{}|<>]/, // Ký tự đặc biệt
    ];
    let strength = 0;

    strengthCriteria.forEach((regex) => {
      if (regex.test(password)) strength++;
    });

    if (password.length >= 6 && password.length <= 20) {
      strength++;
    }

    setPasswordStrength(strength);
    return strength === 5; // Đủ tất cả tiêu chí
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword); // Cập nhật độ mạnh mật khẩu
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp");
      return;
    }

    if (!validatePassword(password)) {
      setMessage(
        "Mật khẩu phải từ 6-20 ký tự, bao gồm chữ thường, chữ in hoa, số và ký tự đặc biệt."
      );
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/web/user/resetpass", {
        password,
        token,
      });
      Swal.fire({
        title: "Thành Công",
        text: "Đã thay đổi mật khẩu thành công, vui lòng đăng nhập lại.",
        icon: "success",
        timer: 3000,
        didClose: () => {
          router.push("/dang-nhap");
        },
      });
    } catch (error) {
      setMessage(error.response?.data?.error || "Đã có lỗi xảy ra");
      Swal.fire({
        title: "Có lỗi xảy ra",
        icon: "error",
      });
    }
  };

  const renderPasswordStrength = () => {
    const strengthLabels = ["Rất yếu", "Yếu", "Trung bình", "Khá mạnh", "Mạnh"];
    const colors = ["#ff4d4f", "#ff7a45", "#ff9c00", "#52c41a", "#389e0d"];

    return (
      <div className="password-strength">
        <div
          style={{
            height: "8px",
            width: `${(passwordStrength / 5) * 100}%`,
            backgroundColor: colors[passwordStrength - 1] || "#ddd",
            transition: "width 0.3s",
          }}
        ></div>
        <p style={{ color: colors[passwordStrength - 1] || "#aaa" }}>
          {strengthLabels[passwordStrength - 1] || "Nhập mật khẩu"}
        </p>
      </div>
    );
  };

  return (
    <>
      <main className="login-main">
    <div className="content">
      <div className="text">Xác nhận mật khẩu</div>
      <form onSubmit={handleReset}>
        <div className="field">
          <input
            placeholder="Nhập Mật khẩu mới của bạn"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="input"
          />
          {renderPasswordStrength()}
        </div>
        <div className="field">
          <input
            placeholder="Xác nhận mật khẩu"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        {message && (
          <div className="alert" style={{ color: "red", marginTop: "10px" }}>
            {message}
          </div>
        )}
        <button className="button" type="submit">
          Xác nhận
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
