import Sidebar from "./components/side";
import Script from "next/script";
import "@/app/admin/assets/css/bootstrap.min.css";
import "@/app/admin/assets/css/fontawesome.css";
import "@/app/admin/assets/css/style.css"
import NavHead from "./components/head";
import Dashboard from "./dashboard/page";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <div class="d-flex min-vh-100">

      <Sidebar></Sidebar>
      <div class="w-100">
      <NavHead></NavHead>
      {(children)}
      </div>
      </div>
      <Script src="/assets/js/bootstrap.bundle.min.js"></Script>
      </div>
  );
}
