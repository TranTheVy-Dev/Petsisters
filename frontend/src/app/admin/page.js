"use client";

import Sidebar from "./components/side";
import Script from "next/script";
import "@/app/admin/assets/css/bootstrap.min.css";
import "@/app/admin/assets/css/fontawesome.css";
// import "@/app/admin/assets/css/fontawesome.min.css"
import "@/app/admin/assets/css/style.css";
import NavHead from "./components/head";
import Dashboard from "./dashboard/page";
import { useEffect } from "react";
import { checkIsAdmin } from "../lib/auth";

export default function Admin() {
  checkIsAdmin();
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Trang Quản Trị</h1>
      <p>Chào mừng bạn đến với trang quản trị!</p>
      <Dashboard></Dashboard>
    </div>
  );
}
