"use client";
import { getOrderDetailsByOrderId } from "@/app/lib/api_order";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function OrderDetails({ params }) {
  const { id } = use(params);
  console.log(id);
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const { orderDetails, error } = await getOrderDetailsByOrderId(orderId);
        if (error) {
          setError(error);
        } else {
          setOrderDetails(orderDetails);
        }
      } catch (error) {
        console.log(error.response);
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid p-4">
      <h3>Chi Tiết Đơn Hàng</h3>
      {orderDetails ? (
        <div className="card rounded-0 border-0 shadow-sm">
          <div className="card-body">
            <p><strong>Mã đơn hàng:</strong> {orderDetails.order_code}</p>
            <p><strong>Khách hàng:</strong> {orderDetails.customer.full_name}</p>
            <p><strong>Tổng tiền:</strong> {orderDetails.total_amount.toLocaleString()} VND</p>
            <p><strong>Trạng thái:</strong> {orderDetails.status}</p>
            <p><strong>Ngày đặt:</strong> {new Date(orderDetails.created_at).toLocaleDateString()}</p>

            <h5 className="mt-4">Danh Sách Sản Phẩm</h5>
            <table className="table text-center">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Tổng</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit_price.toLocaleString()} VND</td>
                    <td>{(item.quantity * item.unit_price).toLocaleString()} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No details found.</p>
      )}
    </div>
  );
}
