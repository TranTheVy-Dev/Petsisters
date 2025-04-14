"use client";
import { getAllOrders } from "@/app/lib/api_order";
import { useState, useEffect } from "react";

export default function AdminProduct() {
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { orders, error } = await getAllOrders();
        console.log(orders);
        if (error) {
          setError(error);
        } else {
          setOrders(orders);
        }
      } catch (error) {
        setError("Failed to fetch customers.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between">
        <h3 className="mb-4">Đơn Hàng</h3>
        <div>
          <a href="#" className="btn btn-outline-success rounded-0">
            Manage Categories
          </a>
          <a href="/admin/them-san-pham" className="btn btn-primary rounded-0">
            Add Product
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card border-0 rounded-0 bg-primary-subtle text-primary">
            <div className="card-body text-end">
              <div className="display-6 d-flex justify-content-between">
                <i className="fal fa-box"></i>
                20
              </div>
              PRODUCTS
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card border-0 rounded-0 bg-danger-subtle text-danger">
            <div className="card-body text-end">
              <div className="display-6 d-flex justify-content-between">
                <i className="fal fa-box-open"></i>3
              </div>
              RUNNING OUT
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card border-0 rounded-0 bg-success-subtle text-success">
            <div className="card-body text-end">
              <div className="display-6 d-flex justify-content-between">
                <i className="fal fa-boxes"></i>5
              </div>
              CATEGORIES
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card border-0 rounded-0 bg-dark-subtle text-dark">
            <div className="card-body text-end">
              <div className="display-6 d-flex justify-content-between">
                <i className="fal fa-archive"></i>0
              </div>
              ARCHIVE
            </div>
          </div>
        </div>
      </div>

      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <table className="table text-center">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Người dùng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Ngày đặt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {orders.map((order) => (
                <tr>
                  <td style={{ width: "64px" }}>{order.order_code}</td>
                  <td>
                    <strong>{order.customer.full_name}</strong>
                  </td>
                  <td>{order.total_amount.toLocaleString()} VND</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <a
                      href={`/admin/don-hang/chi-tiet-don-hang/${order.id}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      <i className="fas fa-eye fa-fw"></i>
                    </a>
                    <a href="#" className="btn btn-outline-warning btn-sm me-2">
                      <i className="fas fa-pencil fa-fw"></i>
                    </a>
                    <a href="#" className="btn btn-outline-danger btn-sm">
                      <i className="fas fa-times fa-fw"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
