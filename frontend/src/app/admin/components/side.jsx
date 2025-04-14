"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path) => pathname.startsWith(path) ? "active" : "";

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-primary" style={{ maxWidth: '280px' }} data-bs-theme="dark">
      <a href="/admin" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none justify-content-center">
        <img src="https://res.cloudinary.com/dmped9z6o/image/upload/v1734520006/petsisters/images/library/w_logo.png" alt="" />
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto" data-bs-theme="dark">
        <li className="nav-item">
          <a href="/admin/dashboard" className={`nav-link rounded-0 text-white ${isActive("/admin/dashboard")}`}>
            <i className="far fa-tachometer-alt-fastest fa-fw"></i>
            <span className="d-none d-sm-inline-block ms-2">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/admin/don-hang" className={`nav-link rounded-0 text-white ${isActive("/admin/don-hang")}`}>
            <i className="far fa-shopping-cart fa-fw"></i>
            <span className="d-none d-sm-inline-block ms-2">Đơn Hàng</span>
          </a>
        </li>
        <li>
          <a href="/admin/san-pham" className={`nav-link rounded-0 text-white ${isActive("/admin/san-pham")}`}>
            <i className="far fa-boxes fa-fw"></i>
            <span className="d-none d-sm-inline-block ms-2">Sản Phẩm</span>
          </a>
        </li>
        <li>
          <a href="/admin/nguoi-dung" className={`nav-link rounded-0 text-white ${isActive("/admin/nguoi-dung")}`}>
            <i className="far fa-users fa-fw"></i>
            <span className="d-none d-sm-inline-block ms-2">Người Dùng</span>
          </a>
        </li>
        <li>
          <a href="/admin/thu-vien-anh" className={`nav-link rounded-0 text-white ${isActive("/admin/thu-vien-anh")}`}>
            <i className="far fa-image fa-fw"></i>
            <span className="d-none d-sm-inline-block ms-2">Thư viện ảnh</span>
          </a>
        </li>
        <li>
          <a href="/admin/danh-gia" className={`nav-link rounded-0 text-white ${isActive("/admin/danh-gia")}`}>
            <i className="far fa-star-half-alt"></i>
            <span className="d-none d-sm-inline-block ms-2">Đánh Giá</span>
          </a>
        </li>
        <li>
          <a href="/admin/dich-vu" className={`nav-link rounded-0 text-white ${isActive("/admin/dich-vu")}`}>
            <i className="far fa-star-half-alt"></i>
            <span className="d-none d-sm-inline-block ms-2">Dịch Vụ</span>
          </a>
        </li>
        <li>
          <a href="/admin/bai-viet" className={`nav-link rounded-0 text-white ${isActive("/admin/bai-viet")}`}>
            <i className="far fa-star-half-alt"></i>
            <span className="d-none d-sm-inline-block ms-2">Bài Viết</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
