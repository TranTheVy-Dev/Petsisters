"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { getAllServices } from "@/app/lib/api_service";
import { createAppointment } from "@/app/lib/api_appointment";
import "./sdstyle.css";

const Appointment = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const customer = JSON.parse(localStorage.getItem("customer") || "{}");
  const router = useRouter();
  const [services, setServices] = useState([]);

  const [appointmentData, setAppointmentData] = useState({
    customer_id: customer?.id || "",
    service_id: "",
    pet_name: customer.pet_name || "",
    pet_type: customer.pet_type || "",
    pet_gender: "",
    pet_weight: "",
    pet_age: "",
    appointment_date: "",
    notes: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const { services, error } = await getAllServices();
        if (error) {
          setError(error);
        } else {
          setServices(services);
        }
      } catch (error) {
        console.log(error.response);
        setError("Failed to fetch customers.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value);

    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const customer = localStorage.getItem("customer")
    if (!customer) {
      localStorage.setItem('redirectURL', window.location.href)
      Swal.fire({
        title: 'Thông báo',
        text: 'Bạn Phải đăng nhập mới sử dụng được dịch vụ này ',
        icon: 'error',
        didClose: () => {
          router.push('/dang-nhap')
        }
      })
      return false //chưa đăng nhập
    }else if (customer){
      Swal.fire({
        title: "Đang Xử Lý...",
        text: "Vui lòng đợi Petsisters trong giây lát",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    try {
      const formPayload = new FormData();
      formPayload.append("customer_id", appointmentData.customer_id);
      formPayload.append("pet_name", appointmentData.pet_name);
      formPayload.append("service_id", appointmentData.service_id);
      formPayload.append("pet_type", appointmentData.pet_type);
      formPayload.append("pet_gender", appointmentData.pet_gender);
      formPayload.append("pet_age", appointmentData.pet_age);
      formPayload.append("pet_weight", appointmentData.pet_weight);
      formPayload.append("appointment_date", appointmentData.appointment_date);
      formPayload.append("notes", appointmentData.notes);
      console.log("FormData content:");
      formPayload.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      const response = await createAppointment(formPayload);
      if (response?.error?.error_code === 400) {
        Swal.fire({
          title: "Có gì đó sai sai",
          text: response.error.error.appointment_date,
          icon: "error",
        });
      } else if (response.data.status === 200) {
        Swal.fire({
          title: "Đặt lịch thành công",
          icon: "success",
          html:"Vui Lòng kiểm tra Email để xác nhận thông tin nhé<br><br>Lưu ý: Nếu không tìm thấy Thông tin được gởi qua Hộp thư chính vui lòng kiểm tra trong thư rác nhé"
        });
        let dataAppointment = response.data.data.data.appointment;
        const appointmentData = dataAppointment;
        appointmentData.total_price = response.data.data.data.total_price;
        appointmentData.service_name = response.data.data.data.service_name;
        localStorage.setItem("appointment", JSON.stringify(appointmentData));
        router.push("/dat-lich-thanh-cong");
        Swal.close();
      }
    } catch (error) {
      console.log("Due Bro");
    }
  };

  return (
    <>
      <main className="appointment-main">
        <section className="breadcrumb__area fix">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="breadcrumb__content">
                  <h3 className="title">Đặt lịch dịch vụ</h3>
                  <nav className="breadcrumb">
                    <span property="itemListElement" typeof="ListItem">
                      <a href="/">Trang chủ</a>
                    </span>
                    <span className="breadcrumb-separator">
                      <i className="flaticon-right-arrow-angle"></i>
                    </span>
                    <span property="itemListElement" typeof="ListItem">
                      Đặt lịch dịch vụ
                    </span>
                  </nav>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="breadcrumb__img">
                  <img
                    src="img/images/breadcrumb_img.png"
                    alt="img"
                    data-aos="fade-left"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="breadcrumb__shape-wrap">
            <img
              src="img/images/breadcrumb_shape01.png"
              alt="img"
              data-aos="fade-down-right"
            />
            <img
              src="img/images/breadcrumb_shape02.png"
              alt="img"
              data-aos="fade-up-left"
            />
          </div>
        </section>
        <div className="p-5">
          <div className="form-container">
            <div className="banggia">
              <img src="img/images/1.png" />
            </div>
            <br />
            <br />
            <div className="form-left">
              <h1>Thông Tin Đặt Lịch</h1>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>
                    Tên của thú cưng <span className="icon-required">*</span>
                  </label>
                  <input required
                    type="text"
                    name="pet_name"
                    value={appointmentData.pet_name}
                    onChange={handleInputChange}
                    placeholder="Nhập tên thú cưng"
                  />
                  {errors.pet_name && (
                    <p className="error-message m-0 p-0">{errors.pet_name}</p>
                  )}
                </div>

                <div className="input-group">
                  <label>
                    Loại dịch vụ <span className="icon-required">*</span>
                  </label>
                  <select required
                    name="service_id"
                    value={appointmentData.service_id || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn dịch vụ</option>
                    {services &&
                      services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.service_name}
                        </option>
                      ))}
                  </select>
                  {errors.service_id && (
                    <p className="error-message  m-0 p-0">
                      {errors.service_id}
                    </p>
                  )}
                </div>

                <div className="input-group">
                  <label>
                    Loại thú cưng <span className="icon-required">*</span>
                  </label>
                  <select required
                    name="pet_type"
                    value={appointmentData.pet_type}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn loại thú cưng</option>
                    <option value="Dog">Chó</option>
                    <option value="Cat">Mèo</option>
                    <option value="Rabbit">Thỏ</option>
                  </select>
                  {errors.pet_type && (
                    <p className="error-message  m-0 p-0">{errors.pet_type}</p>
                  )}
                </div>

                <div className="input-group">
                  <label>
                    Giới tính <span className="icon-required">*</span>
                  </label>
                  <select required
                    name="pet_gender"
                    value={appointmentData.pet_gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="Male">Đực</option>
                    <option value="Female">Cái</option>
                  </select>
                  {errors.pet_gender && (
                    <p className="error-message  m-0 p-0">
                      {errors.pet_gender}
                    </p>
                  )}
                </div>

                <div className="input-group">
                  <label>
                    Cân nặng <span className="icon-required">*</span>
                  </label>
                  <select required
                    name="pet_weight"
                    value={appointmentData.pet_weight}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn cân nặng</option>
                    <option value="3kg">3 kg</option>
                    <option value="4-8kg">4-8 kg</option>
                    <option value="12-20kg">12-20 kg</option>
                    <option value="20-25kg">20-25 kg</option>
                    <option value="25-30kg">25-30 kg</option>
                  </select>
                  {errors.pet_weight && (
                    <p className="error-message  m-0 p-0">
                      {errors.pet_weight}
                    </p>
                  )}
                </div>

                <div className="input-group">
                  <label>
                    Độ tuổi <span className="icon-required">*</span>
                  </label>
                  <select required
                    name="pet_age"
                    value={appointmentData.pet_age}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn độ tuổi</option>
                    <option value="2-6m">2-6 tháng</option>
                    <option value="6-12m">6-12 tháng</option>
                    <option value="1y+">Trên 1 năm</option>
                  </select>
                  {errors.pet_age && (
                    <p className="error-message  m-0 p-0">{errors.pet_age}</p>
                  )}
                </div>

                <div className="input-group">
                  <label>
                    Thời gian đặt hẹn <span className="icon-required">*</span>
                  </label>
                  <input required
                    type="datetime-local"
                    name="appointment_date"
                    value={appointmentData.appointment_date}
                    onChange={handleInputChange}
                  />
                  {errors.appointment_date && (
                    <p className="error-message  m-0 p-0">
                      {errors.appointment_date}
                    </p>
                  )}
                </div>

                <div className="input-group">
                  <label>Ghi chú</label>
                  <textarea required
                    name="notes"
                    value={appointmentData.notes}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Ghi chú lịch hẹn"
                  />
                </div>
                <button type="submit" className="submit-button">
                  Gửi Đăng Ký
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Appointment;
