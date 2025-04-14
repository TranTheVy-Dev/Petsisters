"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const errorPage = () => {
  const error = localStorage.getItem("error");
  const router = useRouter();

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi 404",
        text: error,
      });
    }

    // Xóa localStorage error khi rời khỏi trang
    return () => {
      localStorage.removeItem("error");
    };
  }, [error]);

  const handleBackToHome = () => {
    localStorage.removeItem("error"); // Xóa error khi người dùng chuyển hướng
    router.push("/"); // Chuyển đến trang chủ
  };

  return (
    <div className="container p-5">
      <h1>{error || "Không tìm thấy lỗi gì"}</h1>
      <p>
        <a
          style={{
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={handleBackToHome}
        >
          Quay lại trang chủ
        </a>
      </p>
    </div>
  );
};

export default errorPage;
