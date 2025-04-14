"use client";
import React from 'react';
import styles from './OrderPage.module.css'; 

const OrderPage = () => {
    const orders = [
        { id: 1, product: "Sản phẩm A", quantity: 2, status: "Đã giao" },
        { id: 2, product: "Sản phẩm B", quantity: 1, status: "Chưa giao" },
        { id: 3, product: "Sản phẩm C", quantity: 3, status: "Đang xử lý" },
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Danh Sách Đơn Hàng</h1>
            <table className={styles.table}>    
                <thead>
                    <tr>
                        <th className={styles.tableHeader}>ID</th>
                        <th className={styles.tableHeader}>Sản phẩm</th>
                        <th className={styles.tableHeader}>Số lượng</th>
                        <th className={styles.tableHeader}>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className={styles.tableCell}>{order.id}</td>
                            <td className={styles.tableCell}>{order.product}</td>
                            <td className={styles.tableCell}>{order.quantity}</td>
                            <td className={styles.tableCell}>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderPage;