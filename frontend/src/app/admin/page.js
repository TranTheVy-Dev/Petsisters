import Sidebar from "./components/side";
import Script from "next/script";
import "@/app/admin/assets/css/bootstrap.min.css"
import "@/app/admin/assets/css/fontawesome.css"
import "@/app/admin/assets/css/style.css"
import NavHead from "./components/head";
import Dashboard from "./dashboard/page";

export default function Admin() {
  return (
<>
<Dashboard></Dashboard>
</>
  );
}
