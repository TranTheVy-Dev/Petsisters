"use client"
import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard(){
    // Dữ liệu mẫu cho biểu đồ
    const labels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"];
    const barData = {
        labels,
        datasets: [
            {
                label: "Doanh thu (triệu VND)",
                data: [120, 190, 300, 500, 200],
                backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
        ],
    };
    const lineData = {
        labels,
        datasets: [
            {
                label: "Số đơn hàng",
                data: [30, 45, 60, 80, 50],
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.4,
            },
        ],
    };
    const pieData = {
        labels,
        datasets: [
            {
                label: "Số đơn hàng",
                data: [30, 45, 60, 80, 50],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return(
        <div className="container-fluid p-4">
  <div className="d-flex justify-content-between">
    <h3 className="mb-4">Dashboard</h3>
  </div>
  <div className="row">
    <div className="col-md-3 mb-4">
      <div className="card border-0 rounded-0 bg-primary-subtle text-primary">
        <div className="card-body text-end">
          <div className="display-6 d-flex justify-content-between">
            <i className="fal fa-file-invoice-dollar"></i>
            122
          </div>
          ORDERS
        </div>
      </div>
    </div>
    <div className="col-md-3 mb-4">
      <div className="card border-0 rounded-0 bg-warning-subtle text-warning">
        <div className="card-body text-end">
          <div className="display-6 d-flex justify-content-between">
            <i className="fal fa-boxes"></i>
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
            <i className="fal fa-users"></i>
            10,003
          </div>
          CUSTOMERS
        </div>
      </div>
    </div>
    <div className="col-md-3 mb-4">
      <div className="card border-0 rounded-0 bg-success-subtle text-success">
        <div className="card-body text-end">
          <div className="display-6 d-flex justify-content-between">
            <i className="fal fa-chart-line"></i>
            1.5 B
          </div>
          INCOMES
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-md-6 mb-4">
      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <h6 className="mb-3">Biểu đồ cột: Doanh thu theo tháng</h6>
          <Bar data={barData} />
        </div>
      </div>
    </div>
    <div className="col-md-6 mb-4">
      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <h6 className="mb-3">Biểu đồ đường: Số đơn hàng theo tháng</h6>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-md-6 mb-4">
      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <h6 className="mb-3">Biểu đồ hình tròn: Số đơn hàng theo tháng</h6>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  </div>
</div>

    );
}
Dashboard.isAdmin = true;