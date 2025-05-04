"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getOrdersByCustomerId } from "@/app/lib/api_order"; // Đường dẫn file API của bạn
import "./style.css";
import { getAllAppointmentBycustomerId } from "../lib/api_appointment";
const ProfileForm = () => {
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [activeTab, setActiveTab] = useState("info");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    if (!storedCustomer) {
      localStorage.setItem("redirectURL", "/quan-li-nguoi-dung");
      router.push("/dang-nhap");
      return;
    }

    const parsedCustomer = JSON.parse(storedCustomer);
    setCustomer(parsedCustomer);
    setFormData((prev) => ({
      ...prev,
      full_name: parsedCustomer.full_name || "",
      email: parsedCustomer.email || "",
      phone_number: parsedCustomer.phone_number || "",
      address: parsedCustomer.address || "",
    }));

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { orders, error } = await getOrdersByCustomerId(
          parsedCustomer.id
        );
        if (error) {
          setError(error);
        } else {
          setOrders(orders);
        }
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    const fetchdatappoint = async () => {
      setLoading(true);
      try {
        const { appointment, error } = await getAllAppointmentBycustomerId(
          parsedCustomer.id
        );
        if (error) {
          setError(error);
        } else {
          setAppointment(appointment);
        }
      } catch (error) {
        setError("We can't GET Data of Appointmant");
      } finally {
        setLoading(false);
      }
    };
fetchdatappoint();
    fetchOrders();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const loadingAlert = Swal.fire({
        title: "Đang cập nhật...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const formPayload = new FormData();
      formPayload.append("id", customer.id);
      formPayload.append("full_name", formData.full_name);
      formPayload.append("email", formData.email);
      formPayload.append("phone_number", formData.phone_number);
      formPayload.append("address", formData.address);
      if (avatar) formPayload.append("avatar", avatar);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_API_URL}/customer/update`,
        formPayload
      );

      Swal.close();

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
          timer: 1000,
          showConfirmButton: false,
        });

        const updatedCustomer = {
          ...customer,
          full_name: formData.full_name,
          email: formData.email,
          phone_number: formData.phone_number,
          address: formData.address,
          avatar: response.data.data.avatar || customer.avatar,
        };

        localStorage.setItem("customer", JSON.stringify(updatedCustomer));
        setCustomer(updatedCustomer);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (err) {
      console.error(err.response);
      if (err.response?.data?.error) {
        setErrors(err.response.data.error);
      }
      Swal.close();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.avatar}>
          <img
            src={
              customer?.avatar ||
              "https://res.cloudinary.com/dmped9z6o/image/upload/v1734469527/petsisters/images/avatar/default_avatart.png"
            }
            alt="Avatar"
            style={styles.avatarImage}
          />
        </div>
        <h2 style={styles.username}>{customer?.full_name}</h2>
        <ul style={styles.menu}>
          <li
            style={{
              ...styles.menuItem,
              borderBottom: activeTab === "info" ? "2px solid #0070f3" : "none",
            }}
            onClick={() => handleTabChange("info")}
          >
            Tài khoản
          </li>
          <li></li>
          <li
            style={{
              ...styles.menuItem,
              borderBottom:
                activeTab === "booking_service" ? "2px solid #0070f3" : "none",
            }}
            onClick={() => handleTabChange("booking_service")}
          >
            Đặt Lịch
          </li>
          <li
            style={{
              ...styles.menuItem,
              borderBottom:
                activeTab === "orders" ? "2px solid #0070f3" : "none",
            }}
            onClick={() => handleTabChange("orders")}
          >
            Đơn hàng
          </li>
          <li style={styles.menuItem}>Đăng xuất</li>
        </ul>
      </div>
      <div style={styles.formContainer}>
        <h1 style={styles.header}>
          {activeTab === "info"
            ? "Thông Tin Tài Khoản"
            : activeTab === "orders"
            ? "Đơn Hàng"
            : "Dịch Vụ Đã Đặt Lịch"}
        </h1>
        {activeTab === "info" ? (
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Tên đầy đủ</label>
              <input
                name="full_name"
                type="text"
                value={formData.full_name}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Nhập họ và tên"
              />
              {errors.full_name && (
                <div style={styles.errorText}>{errors.full_name[0]}</div>
              )}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Nhập email"
              />
              {errors.email && (
                <div style={styles.errorText}>{errors.email[0]}</div>
              )}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Số điện thoại</label>
              <input
                name="phone_number"
                type="text"
                value={formData.phone_number}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Nhập số điện thoại"
              />
              {errors.phone_number && (
                <div style={styles.errorText}>{errors.phone_number[0]}</div>
              )}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Địa chỉ</label>
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Nhập địa chỉ"
              />
              {errors.address && (
                <div style={styles.errorText}>{errors.address[0]}</div>
              )}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Thay đổi avatar</label>
              <input
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={styles.fileInput}
              />
              {errors.avatar && (
                <div style={styles.errorText}>{errors.avatar[0]}</div>
              )}
            </div>
            <button type="submit" style={styles.button}>
              Lưu lại
            </button>
          </form>
        ) : activeTab === "orders" ? (
          <div>
            {loading ? (
              <p>Loading orders...</p>
            ) : orders.length > 0 ? (
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày đặt</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.order_code}</td>
                      <td>
                        {new Date(order.created_at).toLocaleDateString("vi-VN")}
                      </td>
                      <td>
                        {order.total_amount.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Người dùng chưa có đơn hàng nào!!</p>
            )}
          </div>
        ) : activeTab === "booking_service" ? (
          <div>
            {loading ? (
              <p>Loading Booking...</p>
            ) : appointment.length > 0 ? (
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th style={{ width: '20%' }}>Hình ảnh</th>
                    <th style={{ width: '20%' }}>Tên</th>
                    <th style={{ width: '20%' }}>Ngày đặt</th>
                    <th style={{ width: '20%' }}>Tổng tiền</th>
                    <th style={{ width: '30%' }}>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {appointment.map((appoint) => (
                    <tr key={appoint.id}>
                      <td>
                        <img 
                          src={appoint.service.image_url || "https://res.cloudinary.com/dmped9z6o/image/upload/v1734469527/petsisters/images/avatar/default_avatart.png"} 
                          alt={appoint.service.service_name}
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }}
                        />
                      </td>
                      <td>{appoint.service.service_name}</td>
                      <td>
                        {new Date(appoint.created_at).toLocaleDateString(
                          "vi-VN"
                        )}
                      </td>
                      <td>
                        {appoint.total_price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>{appoint.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Người dùng chưa có Dịch vụ nào!!</p>
            )}
          </div>
        ) : (
          <p>không có dịch vụ được đặt</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    maxWidth: "800px",
    margin: "50px auto",
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  },
  sidebar: {
    width: "250px",
    padding: "20px",
    borderRight: "1px solid #ccc",
    textAlign: "center",
  },
  avatar: {
    marginBottom: "15px",
  },
  avatarImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid #d3d3d3",
  },
  username: {
    fontSize: "24px",
    margin: "10px 0",
  },
  menu: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  menuItem: {
    padding: "10px 0",
    cursor: "pointer",
    borderBottom: "1px solid #ccc",
  },
  formContainer: {
    flex: 1,
    padding: "20px",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
    backgroundColor: "#fff",
    color: "#000",
  },
  fileInput: {
    padding: "10px",
    borderRadius: "4px",
    width: "100%",
    backgroundColor: "#fff",
    color: "#000",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#0070f3",
    color: "#fff",
    cursor: "pointer",
    textAlign: "center",
    width: "100%",
    marginTop: "20px",
  },
  orderItem: {
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default ProfileForm;
