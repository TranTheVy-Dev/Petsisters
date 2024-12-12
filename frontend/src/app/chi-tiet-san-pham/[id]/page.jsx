"use client";
import Link from "next/link";
import React, { use, useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartslices";
import useSWR from "swr";
import useAuth from "@/app/lib/securitypage";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const fetcher = (url) => fetch(url).then((res) => res.json());
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductDetail({ params }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter()
  const token = localStorage.getItem('token')


  // Fetch product data using SWR
  const { data, error, isLoading } = useSWR(
    `${API_URL}/api/web/product/${params.id}`,
    fetcher,
    { refreshInterval: 6000 }
  );

  // Handle error and loading states
  if (error) return <div>Error loading product data.</div>;
  if (isLoading) return <div>Loading product details...</div>;

  const product = data?.data;

  if (!product) {
    return <div>Product not found.</div>;
  }

  // Construct full image URL if needed
  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${API_URL}${product.image}`;

  // Update quantity handler
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (quantity <= 0) {
      alert("Please select a valid quantity.");
      return;
    }
    try {
      if (!token) {
        localStorage.setItem('redirectURL', window.location.href)
        Swal.fire({
          title: 'Thông báo',
          text: 'Bạn Phải đăng nhập mới sử dụng được dịch vụ này ',
          icon: 'info',
          confirmButtonColor: 'YES',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: false,
          focusConfirm: true,
          focusCancel: false,
          didClose :()=>{
            router.push('/dang-nhap')
          }
        })
      } 
    } catch (error) {
      console.log('lỗi rồi cha ơi', error);

    }
    // Dispatch addToCart action with correct quantity
    dispatch(
      addToCart({
        id: product.id,
        item: product,
        price: product.price,
        quantity: quantity, // Use selected quantity
      })
    );
  };

  return (
    <>
      <main className="fix">
        <section className="breadcrumb__area fix">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="breadcrumb__content">
                  <h3 className="title">Chi tiết sản phẩm</h3>
                  <nav className="breadcrumb">
                    <span property="itemListElement" typeof="ListItem">
                      <Link href="/">Trang chủ</Link>
                    </span>
                    <span className="breadcrumb-separator">
                      <i className="flaticon-right-arrow-angle"></i>
                    </span>
                    <span property="itemListElement" typeof="ListItem">
                      Chi tiết sản phẩm
                    </span>
                  </nav>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="breadcrumb__img">
                  <img
                    src="/img/images/breadcrumb_img.png"
                    alt="img"
                    data-aos="fade-left"
                    data-aos-delay="800"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="breadcrumb__shape-wrap">
            <img
              src="../img/images/breadcrumb_shape01.png"
              alt="img"
              data-aos="fade-down-right"
              data-aos-delay="400"
            />
            <img
              src="/img/images/breadcrumb_shape02.png"
              alt="img"
              data-aos="fade-up-left"
              data-aos-delay="400"
            />
          </div>
        </section>

        <section className="product__details-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="product__details-images-wrap">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane show active"
                      id="itemOne-tab-pane"
                      role="tabpanel"
                      aria-labelledby="itemOne-tab"
                      tabIndex="0"
                    >
                      <Link
                        href={`${API_URL}/storage/images/${product.image_url}`}
                        className="popup-image"
                      >
                        <img
                          src={`${API_URL}/storage/images/${product.image_url}`}
                          alt="img"
                        />
                      </Link>
                    </div>
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        className="tab-pane"
                        id={`item${index + 1}-tab-pane`}
                        role="tabpanel"
                        aria-labelledby={`item${index + 1}-tab`}
                        tabIndex="0"
                      >
                        <Link
                          href={`${API_URL}/storage/images/${image.image_url}`}
                          className="popup-image"
                        >
                          <img
                            src={`${API_URL}/storage/images/${image.image_url}`}
                            alt={`Product Image ${index + 1}`}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="itemOne-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#itemOne-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="itemOne-tab-pane"
                        aria-selected="true"
                      >
                        <img
                          src={`${API_URL}/storage/images/${product.image_url}`}
                          alt="img"
                        />
                      </button>
                    </li>
                    {product.images.map((image, index) => (
                      <li key={index} className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id={`item${index + 1}-tab`}
                          data-bs-toggle="tab"
                          data-bs-target={`#item${index + 1}-tab-pane`}
                          type="button"
                          role="tab"
                          aria-controls={`item${index + 1}-tab-pane`}
                          aria-selected="false"
                        >
                          <img
                            src={`${API_URL}/storage/images/${image.image_url}`}
                            alt={`Product Image Thumbnail ${index + 1}`}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="product__details-content">
                  <span className="tag">{product.tags}</span>
                  <h2 className="title">{product.product_name}</h2>
                  <div className="product__reviews-wrap">
                    <div className="product__reviews">
                      <div className="rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                      <span>(2 Reviews)</span>
                    </div>
                    <div className="product__code">
                      <span>
                        Mã sản phẩm: <strong>{product.product_sku}</strong>
                      </span>
                    </div>
                  </div>
                  <h4 className="price">
                    {product.price.toLocaleString()} VNĐ
                  </h4>
                  <p>{product.description}</p>
                  <div className="product__details-qty">
                    <div className="cart-plus-minus">
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                      />
                    </div>
                    <button
                      className="btn btn-primary px-3"
                      onClick={handleAddToCart}
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                  <div className="product__details-bottom">
                    <ul className="list-wrap">
                      <li className="product__details-category">
                        <span className="title">Danh mục:</span>
                        <Link href="product-details.html">
                          {product.category.category_name}
                        </Link>
                      </li>
                      <li className="product__details-social">
                        <span className="title">Chia sẻ :</span>
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
                            <Link
                              href="https://www.youtube.com/"
                              target="_blank"
                            >
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
            <div className="row">
              <div className="col-12">
                <div className="product-desc-wrap">
                  <ul className="nav nav-tabs" id="myTab2" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="description-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#description-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="description-tab-pane"
                        aria-selected="true"
                      >
                        Mô tả
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="reviews-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#reviews-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="reviews-tab-pane"
                        aria-selected="false"
                      >
                        Đánh giá
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent2">
                    <div
                      className="tab-pane fade show active"
                      id="description-tab-pane"
                      role="tabpanel"
                      aria-labelledby="description-tab"
                      tabIndex="0"
                    >
                      <p>{product.description}</p>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="reviews-tab-pane"
                      role="tabpanel"
                      aria-labelledby="reviews-tab"
                      tabIndex="0"
                    >
                      <div className="product-desc-review">
                        <div className="product-desc-review-title mb-15">
                          <h5 className="title">Đánh giá người dùng (0)</h5>
                        </div>
                        <div className="left-rc">
                          <p>Không có review nào!</p>
                        </div>
                        <div className="right-rc">
                          <Link href="#">Viết đánh giá ngày</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
