"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./orderConfirmation.module.css"; // Sử dụng CSS module

export default function OrderConfirmation() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setIsClient(true); // Đảm bảo chỉ render phía client
    const savedOrder = JSON.parse(localStorage.getItem("checkoutOrder"));
    if (savedOrder) {
      setOrder(savedOrder);
    } else {
      router.push("/"); // Nếu không có đơn hàng, chuyển về trang chủ
    }
  }, []);

  if (!isClient || !order) {
    return null;
  }

  const totalAmount = order.items.reduce(
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
          {order.items.map((item) => (
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
