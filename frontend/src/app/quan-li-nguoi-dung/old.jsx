"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProfileForm = () => {
  const customer = JSON.parse(localStorage.getItem("customer"));
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (!customer) {
      localStorage.setItem("redirectURL", "/quan-li-nguoi-dung");
      router.push("/dang-nhap");
      return;
    }

    // Kiểm tra xem formData đã được khởi tạo chưa
    setFormData((prev) => {
      if (
        !prev.full_name &&
        !prev.email &&
        !prev.phone_number &&
        !prev.address
      ) {
        return {
          full_name: customer.full_name || "",
          email: customer.email || "",
          phone_number: customer.phone_number || "",
          address: customer.address || "",
        };
      }
      return prev;
    });
  }, [customer, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const loadingAlert = Swal.fire({
        title: "Đang cập nhật...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const formPayload = new FormData();
      formPayload.append("customer_id", customer.id);
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
        setErrors({});
        // Cập nhật localStorage và state customer
        const updatedCustomer = {
          ...customer,
          full_name: formData.full_name,
          email: formData.email,
          phone_number: formData.phone_number,
          address: formData.address,
          avatar: response.data.data.avatar || customer.avatar, // Lấy avatar mới từ API
        };
        localStorage.setItem("customer", JSON.stringify(updatedCustomer));
        // Cập nhật giao diện
        setFormData((prev) => ({ ...prev, ...updatedCustomer }));
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response?.data?.error) {
        setErrors(error.response.data.error);
      }
      Swal.close();
      // Swal.fire({
      //   icon: "error",
      //   title: "Lỗi",
      //   text: "Vui lòng kiểm tra lại thông tin của bạn.",
      // });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.avatar}>
          <img
            src={
              customer.avatar ||
              "https://res.cloudinary.com/dmped9z6o/image/upload/v1734469527/petsisters/images/avatar/default_avatart.png"
            }
            alt="Avatar"
            style={styles.avatarImage}
          />
        </div>
        <h2 style={styles.username}>{customer.full_name}</h2>
        <ul style={styles.menu}>
          <li style={styles.menuItem}>Tài khoản</li>
          <li style={styles.menuItem}>Đơn hàng</li>
          <li style={styles.menuItem}>Đăng xuất</li>
        </ul>
      </div>
      <div style={styles.formContainer}>
        <h1 style={styles.header}>Thông Tin Tài Khoản</h1>
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
            {errors.addredd && (
              <div style={styles.errorText}>{errors.addredd[0]}</div>
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
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginTop: "5px",
    width: "100%",
    backgroundColor: "#fff",
    color: "#000",
  },
  button: {
    padding: "10px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  errorText: {
    color: "red", // Màu đỏ
    fontSize: "12px", // Cỡ chữ nhỏ hơn
    marginTop: "5px", // Khoảng cách giữa input và lỗi
    fontStyle: "italic", // Chữ nghiêng để nổi bật hơn
  },
};

export default ProfileForm;
