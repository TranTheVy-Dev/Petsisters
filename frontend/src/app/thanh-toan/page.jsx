"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearCart } from "@/redux/slices/cartslices";
import "./style.css";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const customer = typeof window !== "undefined" && JSON.parse(localStorage.getItem("customer"));

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const validateForm = () => {
    const phoneRegex = /^0\d{9,10}$/;
    let valid = true;

    if (!phone) {
      valid = false;
      setPhoneError("Số điện thoại không được để trống.");
    } else if (!phoneRegex.test(phone)) {
      valid = false;
      setPhoneError("Số điện thoại không hợp lệ.");
    } else {
      setPhoneError("");
    }

    if (!address) {
      valid = false;
      setAddressError("Địa chỉ không được để trống.");
    } else {
      setAddressError("");
    }

    return valid;
  };

  const handleConfirmOrder = async () => {
    if (!validateForm()) return;

    const order = {
      customer_id: customer?.id,
      order_date: new Date().toISOString(),
      phone,
      address,
      paymentMethod,
      items: cartItems,
      total_amount: totalAmount,
    };

    localStorage.setItem("checkoutOrder", JSON.stringify(order));
    console.log("Order saved to localStorage:", order);

    try {
      const response = await fetch("http://localhost:8000/api/auth/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessage =
          typeof data.error === "string"
            ? data.error
            : JSON.stringify(data.error);
        throw new Error(errorMessage);
      }

      dispatch(clearCart());
      router.push("/xac-nhan-thanh-toan");
    } catch (error) {
      console.error("Error while saving order:", error.message);
      alert(`Lỗi xảy ra: ${error.message}`);
    }
  };

  return (
    <div className="checkout-page">
      <h2 className="page-title">Thanh toán</h2>

      <div className="order-summary">
        <h3 className="section-title">Danh sách sản phẩm</h3>
        <ul className="product-list">
          {cartItems.map((item, index) => (
            <li className="product-item" key={item._id || index}>
              <div className="product-info">
                <p className="product-name">{item.product_name}</p>
                <p className="product-quantity">Số lượng: {item.quantity}</p>
                <p className="product-price">
                  Giá: {item.price.toLocaleString()} VNĐ
                </p>
                <p className="product-total">
                  Tổng: {(item.price * item.quantity).toLocaleString()} VNĐ
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="total-amount">
          <strong>Tổng tiền: {totalAmount.toLocaleString()} VNĐ</strong>
        </div>
      </div>

      <div className="checkout-form">
        <h3 className="section-title">Thông tin giao hàng</h3>
        <form>
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại:</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {phoneError && <p className="error-text">{phoneError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Địa chỉ giao hàng:</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {addressError && <p className="error-text">{addressError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="payment-method">Phương thức thanh toán:</label>
            <select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cash">Tiền mặt</option>
              <option value="momo">Momo</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleConfirmOrder}
          >
            Xác nhận đơn hàng
          </button>
        </form>
      </div>
    </div>
  );
}
