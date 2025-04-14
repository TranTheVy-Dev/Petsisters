"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch service data
async function dataservice(id) {
  const res = await fetch(`${API_URL}/api/web/service/${id}`, {
    cache: "no-cache",
  });
  const { data: service } = await res.json();
  return service;
}
async function datareview(id) {
  const response = await axios.get(`${API_URL}/api/web/review/${id}`, {
    cache: "no-cache",
  })
  const reviews = await response.data.data;
  console.log('====================================');
  console.log(reviews);
  console.log('====================================');
  return reviews;
}
export default function ServiceDetail({ params }) {

  const [service, setService] = useState(null);
  const [reviews, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  // State for review form
  const [rating, setRating] = useState(0);
  const [review, setComment] = useState("");
  const router = useRouter();


  // New state to store the list of reviews


  useEffect(() => {
    // Use the new React.use() approach to unwrap `params`
    const fetchParamsAndService = async () => {
      // Unwrap the params (use await for Promise)
      const unwrappedParams = await params;
      const id = unwrappedParams.id;

      // Fetch service data
      const fetchedService = await dataservice(id);
      const getreview = await datareview(id);
      setService(fetchedService);
      setReview(getreview);
      setLoading(false);
    };

    fetchParamsAndService();
  }, [params]); // Dependency array: rerun when `params` changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRating(0);
    setComment("");
    const customer = localStorage.getItem("customer")
    if (!customer) {
      Swal.fire({
          title: 'có gì đó sai sai',
          icon: 'info',
          text: "Vui lòng đăng nhập để đánh giá dịch vụ này",
          didClose: () => {
              router.push('/dang-nhap')
          }
      })
      return;
  }
    if (!customer) {
      console.log('ko co ng dung');
      return
    }
    let email, full_name;
    try {
      const customerdata = JSON.parse(customer)
      email = customerdata.email
      full_name = customerdata.full_name
    } catch (error) {
      console.log('can not get data', error);

    }
    const reviewData = {
      service_id: service?.id,
      rating,
      review,
      full_name,
      email,
    };

    try {
      const response = await axios.post(`${API_URL}/api/web/review`,
        reviewData,
      );
      if (response) {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: "Cảm ơn bạn đã đánh giá",
          didClose: () => {
            router.replace(`/chi-tiet-dich-vu/${reviewData.service_id}`)
          }
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Có gì đó sai sai',
        text: "Vui Lòng kiểm tra mạng hoặc kiểm tra lại mình đã nhập đầy đủ from chưa !",
        icon: 'error'
      })
    }

  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="fix">
        <section className="breadcrumb__area fix">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="breadcrumb__content">
                  <h3 className="title">Dịch vụ</h3>
                  <nav className="breadcrumb">
                    <span property="itemListElement" typeof="ListItem">
                      <Link href={"index.html"}>Home</Link>
                    </span>
                    <span className="breadcrumb-separator">
                      <i className="flaticon-right-arrow-angle"></i>
                    </span>
                    <span property="itemListElement" typeof="ListItem">
                      Tất cả dịch vụ
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
              src="/img/images/breadcrumb_shape01.png"
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
                        href="/img/products/products_img01.jpg"
                        className="popup-image"
                      >
                        <img
                          src={service.image_url}
                          alt="img"
                        />
                      </Link>
                    </div>
                    <div
                      className="tab-pane"
                      id="itemTwo-tab-pane"
                      role="tabpanel"
                      aria-labelledby="itemTwo-tab"
                      tabIndex="0"
                    >
                      <Link
                        href="/img/products/products_img02.jpg"
                        className="popup-image"
                      >
                        <img
                          src={service.image_url}

                          alt="img"
                        />
                      </Link>
                    </div>
                    <div
                      className="tab-pane"
                      id="itemThree-tab-pane"
                      role="tabpanel"
                      aria-labelledby="itemThree-tab"
                      tabIndex="0"
                    >
                      <Link
                        href="/img/products/products_img03.jpg"
                        className="popup-image"
                      >
                        <img
                          src={service.image_url}
                          alt="img"
                        />
                      </Link>
                    </div>
                    <div
                      className="tab-pane"
                      id="itemFour-tab-pane"
                      role="tabpanel"
                      aria-labelledby="itemFour-tab"
                      tabIndex="0"
                    >
                      <Link
                        href="/img/products/products_img04.jpg"
                        className="popup-image"
                      >
                        <img
                          src={service.image_url}

                          alt="img"
                        />
                      </Link>
                    </div>
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
                          src={service.image_url}
                          alt="img"
                        />
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="itemTwo-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#itemTwo-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="itemTwo-tab-pane"
                        aria-selected="false"
                      >
                        <img
                          src={service.image_url}
                          alt="img"
                        />
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="itemThree-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#itemThree-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="itemThree-tab-pane"
                        aria-selected="false"
                      >
                        <img
                          src={service.image_url}
                          alt="img"
                        />
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="itemFour-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#itemFour-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="itemFour-tab-pane"
                        aria-selected="false"
                      >
                        <img
                          src={service.image_url}
                          alt="img"
                        />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="product__details-content">
                  <span className="tag">{service.tags}</span>
                  <h2 className="title">
                    {service.service_name}
                  </h2>
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
                  </div>

                  <h4 className="price"> {service.price.toLocaleString()} VNĐ{" "}</h4>
                  <p>
                    {service.description}
                  </p>
                  <div className="product__details-qty">
                    <Link href="/dat-lich" className="add-btn">
                      Đăng Ký Dịch Vụ
                    </Link>
                  </div>
                  <div className="product__details-bottom">
                    <ul className="list-wrap">
                      <li className="product__details-category">
                        <span className="title">Categories:</span>
                        <Link href="product-details.html">Cắt Tỉa</Link>
                        <Link href="product-details.html">Tắm Rửa</Link>
                        <Link href="product-details.html">Chăm Sóc</Link>
                      </li>
                      <li className="product__details-tags">
                        <span className="title">Tags: {service.tags}</span>
                        <Link href="/dich-vu">Dịch Vụ</Link>
                        <Link href="/dich-vu">Chăm Sóc</Link>
                      </li>
                      <li className="product__details-social">
                        <span className="title">Share :</span>
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
                  <div className="product__details-checkout">
                    <span className="title">Đánh Giá</span>
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
                        Giới Thiệu
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
                      <p>
                        {service.description}
                      </p>

                    </div>
                    <div
                      className="tab-pane fade"
                      id="reviews-tab-pane"
                      role="tabpanel"
                      aria-labelledby="reviews-tab"
                      tabIndex="0"
                    >
                      <div className="product-desc-review mt">
                        <div className="product-desc-review-title mb-15">
                          <h5 className="title">Đánh giá của Khách Hàng</h5>
                        </div>
                        <div className="left-rc">
                          {reviews.length === 0 ? (
                            <div className="left-rc">
                              <p>No reviews yet</p>
                            </div>
                          ) : (
                            reviews.map((review, index) => (
                              <div key={index} className="review-item">
                                <p>
                                  Đánh giá:{" "}
                                  {Array.from({ length: review.rating }, (_, i) => (
                                    <span key={i} className="star">
                                      ★
                                    </span>
                                  ))}
                                  {Array.from({ length: 5 - review.rating }, (_, i) => (
                                    <span key={i} className="star empty">☆</span>
                                  ))}
                                </p>
                                <p>Nhận xét: {review.review}</p>
                                <p>Người gửi: {review.full_name}</p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="comment-form mt-4">
                  <h3 className="comment-reply-title">Đánh giá về dịch vụ này</h3>
                  <p className="comment-notes">
                    Email của bạn sẽ không được công khai. Các trường bắt buộc được đánh dấu *
                  </p>
                  <div className="form-group mb-3">
                    <label htmlFor="rating">Đánh giá của bạn *</label>
                    <div id="rating" className="rating">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <React.Fragment key={star}>
                          <input
                            type="radio"
                            id={`star${star}`}
                            name="rating"
                            value={star}
                            checked={rating === star}
                            onChange={() => setRating(star)}
                          />
                          <label htmlFor={`star${star}`} title={`${star} stars`}>
                            ★
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <textarea
                      name="review"
                      className="form-control"
                      rows="5"
                      placeholder="Viết nhận xét của bạn *"
                      value={review}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Gửi đánh giá
                  </button>
                </form>
              </div>
            </div>
            <div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}