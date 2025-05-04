"use client";
import Sidebar from "./components/side";
import Script from "next/script";
import "@/app/admin/assets/css/bootstrap.min.css";
import "@/app/admin/assets/css/fontawesome.css";
import { checkIsAdmin } from "../lib/auth";

// import "@/app/admin/assets/css/fontawesome.min.css";

import "@/app/admin/assets/css/style.css";
import NavHead from "./components/head";
import Dashboard from "./dashboard/page";

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

const customer = JSON.parse(localStorage.getItem("customer"));

export default function AdminLayout({ children }) {
  checkIsAdmin();
  return (
    <div className="admin-layout">
      <div className="d-flex min-vh-100">
        <Sidebar></Sidebar>
        <div className="w-100">
          <NavHead></NavHead>
          {children}
        </div>
      </div>
      <Script src="/assets/js/bootstrap.bundle.min.js"></Script>
    </div>
  );
}
