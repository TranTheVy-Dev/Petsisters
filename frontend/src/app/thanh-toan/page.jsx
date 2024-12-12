"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import "./style.css";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const total_amount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = async () => {
    if (!phone || !address || !paymentMethod) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const order = {
      customer_id: 1, // Tạm đặt giá trị giả cho demo
      order_date: new Date().toISOString(),
      phone,
      address,
      paymentMethod,
      items: cartItems,
      total_amount,
    };

    // Lưu vào Local Storage
    localStorage.setItem("checkoutOrder", JSON.stringify(order));
    console.log("Order saved to localStorage:", order);

    // Gửi dữ liệu lên database
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
        throw new Error(data.error);
      } 
            
      return  router.push('/xac-nhan-thanh-toan');


    } catch (error) {
      console.error("Error while saving order:", error);
      alert("Không thể kết nối đến server. Vui lòng kiểm tra lại.");
    }
  };

  return (
    <div className="checkout-page">
      <h2 className="page-title">Thanh toán</h2>
      <div className="order-summary">
        <h3 className="section-title">Danh sách sản phẩm</h3>
        <ul className="product-list">
          {cartItems.map((item) => (
            <li className="product-item" key={item._id}>
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
          <strong>Tổng tiền: {total_amount.toLocaleString()} VNĐ</strong>
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
