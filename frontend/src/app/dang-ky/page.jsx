"use client";
import Link from "next/link";
import "./dangky.css";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function DangKy() {
  const searchParams = useSearchParams();
  const prefilledEmail = searchParams.get("email") || "";

  const [fromdata, setfromdata] = useState({
    full_name: "",
    email: prefilledEmail,
    password: "",
    confrimpassword: "",
  });

  const [erromassage, seterromassage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password and calculate strength
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
      strength += 1;
    }

    setPasswordStrength(strength);
    return strength === 5; // Đủ tất cả tiêu chí
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setfromdata({ ...fromdata, [name]: value });

    if (name === "email") {
      setEmailError(validateEmail(value) ? "" : "Email không đúng định dạng.");
    }

    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleregister = async (e) => {
    e.preventDefault();

    const { full_name, email, password, confrimpassword } = fromdata;

    if (!validateEmail(email)) {
      setEmailError("Email không đúng định dạng.");
      return;
    }

    if (!validatePassword(password)) {
      seterromassage(
        "Mật khẩu phải từ 6-20 ký tự, bao gồm chữ thường, chữ in hoa, số và ký tự đặc biệt."
      );
      return;
    }

    if (password !== confrimpassword) {
      seterromassage(" * Mật khẩu xác nhận không khớp.");
      return;
    } else {
      seterromassage("");
    }

    try {
      // Lấy chữ cái đầu của tên sau cùng
      const nameParts = full_name.trim().split(" ");
      const lastNameInitial =
        nameParts[nameParts.length - 1][0].toLocaleLowerCase();

      // Tạo URL cho avatar
      const URL_CLOUDINARY_AVATAR =
        "https://res.cloudinary.com/dmped9z6o/image/upload/v1734465316/petsisters/images/avatar/";
      const avatar = `${URL_CLOUDINARY_AVATAR}${lastNameInitial}_avatar`;

      // Cập nhật trường avatar vào fromdata
      const updatedFormData = {
        ...fromdata,
        avatar,
      };

      // Gửi dữ liệu đến API
      const response = await axios.post(
        "http://localhost:8000/api/web/user/register",
        updatedFormData
      );

      Swal.fire({
        icon: "success",
        title: "Chúc mừng",
        text: "Bạn đã tạo thành công tài khoản, bạn sẽ được chuyển qua đăng nhập sau ít giây",
        timer: 5000,
        didClose: () => {
          router.push("/dang-nhap");
        },
      });
    } catch (error) {
      console.log(error.response);
      const firstError = Object.values(error.response.data.error)[0][0];
      Swal.fire({
        icon: "warning",
        title: "Cảnh báo",
        text: firstError || "Có lỗi xảy ra, vui lòng thử lại.",
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
      <main className="register-main">
        <div className="content">
          <div className="text">Đăng Ký</div>
          <form onSubmit={handleregister}>
            <div className="field">
              <input
                placeholder="Họ Và Tên"
                name="full_name"
                value={fromdata.full_name}
                onChange={handlechange}
                required
                type="text"
                className="input"
              />
            </div>
            <div className="field">
              <input
                placeholder="Email"
                name="email"
                value={fromdata.email}
                onChange={handlechange}
                required
                type="email"
                className="input"
              />
              {emailError && (
                <p className="danger" style={{ color: "red" }}>
                  {emailError}
                </p>
              )}
            </div>
            <div className="field">
              <input
                placeholder="Mật Khẩu"
                name="password"
                value={fromdata.password}
                onChange={handlechange}
                required
                type="password"
                className="input"
              />
              {renderPasswordStrength()}
            </div>
            <div className="field">
              <input
                placeholder="Xác nhận Mật Khẩu"
                name="confrimpassword"
                value={fromdata.confrimpassword}
                onChange={handlechange}
                required
                type="password"
                className="input"
              />
            </div>
            <p className="danger" style={{ color: "red" }}>
              {erromassage}
            </p>
            <button className="button" type="submit">
              Đăng Ký
            </button>
            <div className="sign-in">
              Đã có tài khoản? <Link href="/dang-nhap">Đăng Nhập Ngay</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
