"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // 'next/navigation' trong Next.js 13+
import { useSelector } from "react-redux";
import styles from "./orderConfirmation.module.css"; // Sử dụng CSS module

export default function OrderConfirmation() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    setIsClient(true); // Đảm bảo chỉ render phía client
  }, []);

  if (!isClient) {
    return null; // Trả về null nếu chưa render trên client
  }

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleContinueShopping = () => {
    router.push("/"); // Điều hướng về trang chủ
  };

  return (
    <div className={styles["order-confirmation"]}>
      <h2>Xác nhận đơn hàng</h2>
      <div className={styles["order-summary"]}>
        <h3>Danh sách sản phẩm</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              <p>{item.product_name}</p>
              <p>Số lượng: {item.quantity}</p>
              <p>Giá: {item.price.toLocaleString()} VNĐ</p>
              <p>Tổng: {(item.price * item.quantity).toLocaleString()} VNĐ</p>
            </li>
          ))}
        </ul>
        <div>
          <strong>Tổng tiền: {totalAmount.toLocaleString()} VNĐ</strong>
        </div>
      </div>

      <div className={styles["confirmation-message"]}>
        <p>Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đang được xử lý.</p>
        <button onClick={handleContinueShopping} className={styles["btn"]}>
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
}