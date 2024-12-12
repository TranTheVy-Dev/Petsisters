"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path) => pathname.startsWith(path) ? "active" : "";

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-primary" style={{ maxWidth: '280px' }} data-bs-theme="dark">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none justify-content-center">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" x="0" y="0" viewBox="0 0 24 24" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve">
          <g fill="#000">
            <path
              fillRule="evenodd"
              d="M20 7a3 3 0 0 1-2.608-4.484 9.768 9.768 0 0 0-.929-.142c-1.142-.124-2.581-.124-4.418-.124h-.09c-1.837 0-3.276 0-4.419.124-1.165.126-2.11.388-2.916.974A5.75 5.75 0 0 0 3.348 4.62c-.586.807-.848 1.75-.974 2.916-.124 1.143-.124 2.582-.124 4.419v.09c0 1.837 0 3.276.124 4.418.126 1.166.388 2.11.974 2.917a5.75 5.75 0 0 0 1.272 1.272c.807.586 1.75.848 2.916.974 1.143.124 2.582.124 4.419.124h.09c1.837 0 3.276 0 4.418-.124 1.166-.126 2.11-.388 2.917-.974a5.749 5.749 0 0 0 1.272-1.272c.586-.807.848-1.75.974-2.916.124-1.143.124-2.582.124-4.419v-.09c0-1.837 0-3.276-.124-4.419a9.782 9.782 0 0 0-.142-.928C21.046 6.858 20.54 7 20 7zm-2.67 1.47a.75.75 0 0 1 .343 1.003l-1.46 2.977c-1.023 2.085-4.028 1.983-4.907-.166-.39-.951-1.72-.996-2.172-.074l-1.46 2.977a.75.75 0 1 1-1.347-.66l1.46-2.977c1.023-2.085 4.028-1.983 4.907.166.39.951 1.72.996 2.172.074l1.46-2.977a.75.75 0 0 1 1.004-.344z"
              clipRule="evenodd"
              fill="#ffffff"
              opacity="1"
            />
            <path d="M18 4a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" fill="#ffffff" opacity="1" />
          </g>
        </svg>
        <span className="fs-4 d-none d-sm-inline-block">BS ADMIN</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto" data-bs-theme="dark">
        <li className="nav-item">
          <a href="/admin/dashboard" className={`nav-link rounded-0 text-white ${isActive("/admin/dashboard")}`}>
            <i className="far fa-tachometer-alt-fastest fa-fw"></i>
            <span className="d-none d-sm-inline-block">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/admin/don-hang" className={`nav-link rounded-0 text-white ${isActive("/admin/don-hang")}`}>
            <i className="far fa-shopping-cart fa-fw"></i>
            <span className="d-none d-sm-inline-block">Đơn Hàng</span>
          </a>
        </li>
        <li>
          <a href="/admin/san-pham" className={`nav-link rounded-0 text-white ${isActive("/admin/san-pham")}`}>
            <i className="far fa-boxes fa-fw"></i>
            <span className="d-none d-sm-inline-block">Sản Phẩm</span>
          </a>
        </li>
        <li>
          <a href="/admin/nguoi-dung" className={`nav-link rounded-0 text-white ${isActive("/admin/nguoi-dung")}`}>
            <i className="far fa-users fa-fw"></i>
            <span className="d-none d-sm-inline-block">Người Dùng</span>
          </a>
        </li>
        <li>
          <a href="/admin/danh-gia" className={`nav-link rounded-0 text-white ${isActive("/admin/danh-gia")}`}>
            <i className="far fa-star-half-alt"></i>
            <span className="d-none d-sm-inline-block">Đánh Giá</span>
          </a>
        </li>
        <li>
          <a href="/admin/dich-vu" className={`nav-link rounded-0 text-white ${isActive("/admin/dich-vu")}`}>
            <i className="far fa-star-half-alt"></i>
            <span className="d-none d-sm-inline-block">Dịch Vụ</span>
          </a>
        </li>
        <li>
          <a href="/admin/bai-viet" className={`nav-link rounded-0 text-white ${isActive("/admin/bai-viet")}`}>
            <i className="far fa-star-half-alt"></i>
            <span className="d-none d-sm-inline-block">Bài Viết</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
