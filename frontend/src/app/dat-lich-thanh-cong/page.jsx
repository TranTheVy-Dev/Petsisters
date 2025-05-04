"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "./style.css";

const SuccessAppointment = () => {
  const [appointment, setAppointment] = useState(null);
  const router = useRouter();
  const customer = JSON.parse(localStorage.getItem("customer"));
  const appointmentData = JSON.parse(localStorage.getItem("appointment"));
  useEffect(() => {
    if (appointmentData) {
      setAppointment(appointmentData);
      Swal.fire({
        icon: "success",
        title: "Đặt lịch thành công",
        html: "Vui Lòng kiểm tra Email để xác nhận thông tin<br><br>Lưu Ý: nếu không thấy Email trong hộp thư đến, vui lòng kiểm tra thư rác nhé",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Không tìm thấy dữ liệu",
        text: "Hãy thử đặt lịch hẹn lại.",
      }).then(() => {
        router.push("/dat-lich");
      });
    }

    // Xóa dữ liệu khi rời khỏi trang
    return () => {
      localStorage.removeItem("appointment");
    };
  }, [router]);

  if (!appointment) {
    return null;
  }

  return (
    <main className="success-main">
      <section className="success-header">
        <div className="container text-center">
          <h1 className="success-title">🎉 Đặt Lịch Thành Công 🎉</h1>
          <p className="success-message">
            Chúng tôi đã nhận được lịch hẹn của bạn. Dưới đây là thông tin chi
            tiết:
          </p>
        </div>
      </section>
      <section className="success-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 card">
              <h2>Thông Tin Lịch Hẹn</h2>
              <ul>
                <li>
                  <strong>Tên khách hàng:</strong>
                  <span>{customer.full_name}</span>
                </li>
                <li>
                  <strong>Tên thú cưng:</strong>
                  <span>{appointment.pet_name}</span>
                </li>
                <li>
                  <strong>Loại thú cưng:</strong>
                  <span>{appointment.pet_type}</span>
                </li>
                <li>
                  <strong>Giới tính thú cưng:</strong>
                  <span>{appointment.pet_gender}</span>
                </li>
                <li>
                  <strong>Cân nặng:</strong>
                  <span>{appointment.pet_weight}</span>
                </li>
                <li>
                  <strong>Độ tuổi:</strong>
                  <span>{appointment.pet_age}</span>
                </li>
                <li>
                  <strong>Dịch vụ:</strong>
                  <span>{appointment.service_name}</span>
                </li>
                <li>
                  <strong>Thời gian hẹn:</strong>
                  <span>{appointment.appointment_date}</span>
                </li>
                <li>
                  <strong>Ghi chú:</strong>
                  <span>{appointment.notes || "Không có"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center mt-3">
        <button className="back-button" onClick={() => router.push("/")}>
          Về Trang Chủ
        </button>
      </div>
    </main>
  );
};

export default SuccessAppointment;
