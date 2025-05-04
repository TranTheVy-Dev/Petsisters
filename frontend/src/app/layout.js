// "use client"; // Không cần phải khai báo "use client" vì `RootLayout` đang là Client Component
"use client";
import "./globals.css";
import React, { useState, useEffect } from "react";
import Providers from "../redux/Provider";
import Header from "./components/header";
import Footer from "./components/footer";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation"; // Thay vì useRouter()

import Script from "next/script"; // Import Script từ next
import "../../public/bootstrap/css/bootstrap.min.css";
import "../../public/css/animate.min.css";
import "../../public/css/magnific-popup.css";
import "../../public/css/fontawesome-all.min.css";
import "../../public/css/flaticon_pet_care.css";
import "../../public/css/odometer.css";
import "../../public/css/swiper-bundle.min.css";
import "../../public/css/select2.min.css";
import "../../public/css/jquery-ui.css";
import "../../public/css/aos.css";
import "../../public/css/default.css";
import "../../public/css/main.css";
// import 'bootstrap/dist/css/bootstrap.min.css';   xóa dòng này dùm 

const useLocalStorage = process.env.NEXT_PUBLIC_USE_LOCAL_STORAGE === 'true';
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Lấy pathname hiện tại
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu đường dẫn bắt đầu bằng "/admin"
    setIsAdminPage(pathname.startsWith("/admin"));
  }, [pathname]); // Đảm bảo cập nhật khi pathname thay đổi

  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Providers>
          {/* Chỉ hiển thị Header và Footer nếu không phải là trang Admin */}
          {!isAdminPage && <Header />}
          <main>{children}</main>
          {!isAdminPage && <Footer />}
          
          {/* Các script và link vẫn được giữ nguyên */}
          <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.png" />
          <Script src="/js/vendor/jquery-3.6.0.min.js" />
          <Script src="/js/bootstrap.bundle.min.js" />
          <Script src="/js/jquery.magnific-popup.min.js" />
          <Script src="/js/jquery.odometer.min.js" />
          <Script src="/js/jquery.appear.js" />
          <Script src="/js/swiper-bundle.min.js" />
          <Script src="/js/jquery.countdown.min.js" />
          <Script src="/js/svg-inject.min.js" />
          <Script src="/js/select2.min.js" />
          <Script src="/js/jquery-ui.min.js" />
          <Script src="/js/ajax-form.js" />
          <Script src="/js/wow.min.js" />
          <Script src="/js/aos.js" />
          <Script src="/js/main.js" />
        </Providers>
      </body>
    </html>
  );
}
