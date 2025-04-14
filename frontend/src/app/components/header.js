"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../lib/logout";
import { Router } from "react-router-dom";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isActive = (path) =>
    pathname === path || pathname.startsWith(`${path}/`) ? "active" : "";
  const cartItems = useSelector((state) =>
    state.cart ? state.cart.items : []
  );
  const cartCount = cartItems.reduce(
    (count, item) => count + Number(item.quantity),
    0
  );
  let customer = null;
  try {
    const customerData = localStorage.getItem("customer");
    if (customerData) {
      customer = JSON.parse(customerData);
    }
  } catch (error) {
    console.error("Error parsing customer data from localStorage:", error);
  }
  const hanldelogout = () => {
    try {
      logout();
      window.location.href = "/dang-nhap";
    } catch (error) {
      console.log("can not logot:", error);
    }
  };
  return (
    <>
      {/* <div id="preloader">
            <div id="loader" className="loader">
                <div className="loader-container">
                    <div className="loader-icon"><img src="img/logo/preloader.svg" alt="Preloader"/></div>
                </div>
            </div>
        </div> */}
      <button className="scroll__top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>
      <header>
        <div id="header-fixed-height"></div>
        <div className="tg-header__top">
          <div className="container custom-container">
            <div className="row">
              <div className="col-xl-6 col-lg-8">
                <ul className="tg-header__top-info left-side list-wrap">
                  <li>
                    <i className="flaticon-placeholder"></i>Thành Phố Hồ Chí
                    Minh
                  </li>
                  <li>
                    <i className="flaticon-mail"></i>
                    <Link href="mailto:Petspostinfo@gmail.com">
                      petsisters.80833@gmail.com
                    </Link>
                  </li>
                  <li>
                    <i className="flaticon-user"></i>
                    {customer
                      ? `Xin chào ${customer.full_name}`
                      : "Xin chào Quý Khách"}
                  </li>
                </ul>
              </div>
              <div className="col-xl-6 col-lg-4">
                <ul className="tg-header__top-right list-wrap">
                  <li>
                    <i className="flaticon-three-o-clock-clock"></i>Giờ mở cửa:
                    09.00 am- 11.00 pm
                  </li>
                  <li className="tg-header__top-social">
                    <ul className="list-wrap">
                      <li>
                        <Link href="https://www.facebook.com/" target="_blank">
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="https://twitter.com" target="_blank">
                          <i className="fab fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.whatsapp.com/" target="_blank">
                          <i className="fab fa-whatsapp"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.instagram.com/" target="_blank">
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.youtube.com/" target="_blank">
                          <i className="fab fa-youtube"></i>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="sticky-header" className="tg-header__area">
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                <div className="tgmenu__wrap">
                  <nav className="tgmenu__nav">
                    <div className="logo">
                      <Link href="/">
                        <img src="/img/logo/logo.png" alt="Logo" />
                      </Link>
                    </div>
                    <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-lg-flex">
                      <ul className="navigation">
                        <li className={`${isActive("/")}`}>
                          <Link href="/">Trang chủ</Link>
                          {/* <ul className="sub-menu">
                                                    <li className="active"><Link href="index.html">Pet Care & Veterinary</Link></li>
                                                    <li><Link href="index-2.html">Pet Breed</Link></li>
                                                    <li><Link href="index-3.html">Pet Adopt</Link></li>
                                                    <li><Link href="index-4.html">pet Woocommerce</Link></li>
                                                </ul> */}
                        </li>
                        <li className={`${isActive("/thong-tin")}`}>
                          <Link href={"/thong-tin"}>Thông Tin</Link>
                        </li>
                        <li className={`${isActive("/cua-hang")}`}>
                          <Link href="/cua-hang">Cửa Hàng</Link>
                          {/* <ul className="sub-menu">
                                                        <li><Link href="/cua-hang">Cửa Hàng Chúng tôi</Link></li>
                                                        <li><Link href="/chi-tiet-san-pham">Chi Tiết Cửa Hàng</Link></li>
                                                    </ul> */}
                        </li>
                        <li className={`${isActive("/dich-vu")}`}>
                          <Link href={"/dich-vu"}>Dịch Vụ</Link>
                        </li>
                        <li className={`${isActive("/lien-he")}`}>
                          <Link href={"/lien-he"}>Liên Hệ</Link>
                        </li>
                        <li className={`${isActive("/tin-tuc")}`}>
                          <Link href={"/tin-tuc"}>Tin tức</Link>
                        </li>
                      </ul>
                    </div>

                    <div className="tgmenu__action d-none d-md-block">
                      <ul className="list-wrap">
                        {/* <li className="header-search">
                                                    <Link href="#" className="search-open-btn">
                                                        <i className="flaticon-loupe"></i>
                                                    </Link>
                                                </li> */}

                        <li className="header-cart">
                          <Link href={"/gio-hang"}>
                            <i className="flaticon-shopping-bag"></i>
                            <span
                              id="amount-cart"
                              className="text-white position-absolute top-0 start-75 translate-middle bg-success px-2 rounded-circle"
                            >
                              {cartCount}
                            </span>
                          </Link>
                        </li>
                        {customer && (
                          <li className="header-cart">
                            <Link href={"/quan-li-nguoi-dung"}>
                              <i className="far fa-user"></i>
                            </Link>
                          </li>
                        )}
                        {/* <li className="offCanvas-menu">
                          <Link href="#" className="menu-tigger">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="16"
                              viewBox="0 0 26 16"
                              fill="none"
                            >
                              <rect
                                width="9"
                                height="2"
                                rx="1"
                                fill="currentcolor"
                              />
                              <rect
                                x="11"
                                width="15"
                                height="2"
                                rx="1"
                                fill="currentcolor"
                              />
                              <rect
                                y="14"
                                width="26"
                                height="2"
                                rx="1"
                                fill="currentcolor"
                              />
                              <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                fill="currentcolor"
                              />
                              <rect
                                x="17"
                                y="7"
                                width="9"
                                height="2"
                                rx="1"
                                fill="currentcolor"
                              />
                            </svg>
                          </Link>
                        </li> */}
                        {customer ? (
                          <li className="header-btn">
                            <button
                              onClick={hanldelogout}
                              type="submit"
                              className="btn"
                            >
                              <i className="flaticon-user"></i> Đăng Xuất
                            </button>
                          </li>
                        ) : (
                          <li className="header-btn">
                            <Link href={"/dang-nhap"} className="btn">
                              <i className="flaticon-user"></i>đăng nhập
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="mobile-nav-toggler">
                      <i className="flaticon-layout"></i>
                    </div>
                  </nav>
                </div>

                <div className="tgmobile__menu">
                  <nav className="tgmobile__menu-box">
                    <div className="close-btn">
                      <i className="fas fa-times"></i>
                    </div>
                    <div className="nav-logo">
                      <Link href="index.html">
                        <img src="/img/logo/logo.png" alt="Logo" />
                      </Link>
                    </div>
                    <div className="tgmobile__search">
                      <form action="#">
                        <input type="text" placeholder="Search here..." />
                        <button>
                          <i className="fas fa-search"></i>
                        </button>
                      </form>
                    </div>
                    <div className="tgmobile__menu-outer"></div>
                    <div className="social-links">
                      <ul className="list-wrap">
                        <li>
                          <Link
                            href="https://www.facebook.com/"
                            target="_blank"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="https://twitter.com" target="_blank">
                            <i className="fab fa-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://www.whatsapp.com/"
                            target="_blank"
                          >
                            <i className="fab fa-whatsapp"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://www.instagram.com/"
                            target="_blank"
                          >
                            <i className="fab fa-instagram"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="https://www.youtube.com/" target="_blank">
                            <i className="fab fa-youtube"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className="tgmobile__menu-backdrop"></div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="search__popup">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="search__wrapper">
                                    <div className="search__close">
                                        <button type="button" className="search-close-btn">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M1 1L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="search__form">
                                        <form action="#">
                                            <div className="search__input">
                                                <input className="search-input-field" type="text" placeholder="Type keywords here" />
                                                <span className="search-focus-border"></span>
                                                <button>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.55 18.1C14.272 18.1 18.1 14.272 18.1 9.55C18.1 4.82797 14.272 1 9.55 1C4.82797 1 1 4.82797 1 9.55C1 14.272 4.82797 18.1 9.55 18.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        <path d="M19.0002 19.0002L17.2002 17.2002" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="search-popup-overlay"></div>
                <div className="offCanvas__info">
                    <div className="offCanvas__close-icon menu-close">
                        <button><i className="far fa-window-close"></i></button>
                    </div>
                    <div className="offCanvas__logo mb-30">
                        <Link href="index.html"><img src="/img/logo/logo.png" alt="Logo" /></Link>
                    </div>
                    <div className="offCanvas__side-info mb-30">
                        <div className="contact-list mb-30">
                            <h4>Địa chỉ phòng khám</h4>
                            <p>Thành Phố Hồ Chí Minh </p>
                        </div>
                        <div className="contact-list mb-30">
                            <h4>Phone Number</h4>
                            <p>+0989 7876 9865 9</p>
                            <p>+(090) 8765 86543 85</p>
                        </div>
                        <div className="contact-list mb-30">
                            <h4>Địa chỉ Email</h4>
                            <p>
                            petsisters.80833@gmail.com</p>
                            
                        </div>
                    </div>
                    <div className="offCanvas__social-icon mt-30">
                        <Link href="#"><i className="fab fa-facebook-f"></i></Link>
                        <Link href="#"><i className="fab fa-twitter"></i></Link>
                        <Link href="#"><i className="fab fa-google-plus-g"></i></Link>
                        <Link href="#"><i className="fab fa-instagram"></i></Link>
                    </div>
                </div>
                <div className="offCanvas__overly"></div>
            </header>
        </>
    );
};
export default Header;
