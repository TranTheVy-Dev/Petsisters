"use client";
import Link from "next/link";
import React, { use, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartslices";
import useSWR from "swr";
import "./rating.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
const fetcher = (url) => fetch(url).then((res) => res.json());
const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function datareview(id) {
  const response = await axios.get(`${API_URL}/api/web/productreview/${id}`, {
    cache: "no-cache",
  });
  const reviews = await response.data.data;
  return reviews;
}
export default function ProductDetail({ params }) {
  const [rating, setRating] = useState(0);
  const [reviews, setReview] = useState(null);
  const [review, setComment] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const token = localStorage.getItem("token");
  const unwrappedParams = use(params);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use the new React.use() approach to unwrap `params`
    const fetchParamsAndService = async () => {
      // Unwrap the params (use await for Promise)
      const unwrappedParams = await params;
      const id = unwrappedParams.id;
      // Fetch service data
      const getreview = await datareview(id);
      setReview(getreview);
      setLoading(false);
    };
    fetchParamsAndService();
  }, [params]);

  // Fetch product data using SWR
  const { data, error, isLoading } = useSWR(
    `${API_URL}/api/web/product/${unwrappedParams.id}`,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRating(0);
    setComment("");
    const customer = localStorage.getItem("customer")
    try {
      if (!customer) {
        localStorage.setItem('redirectURL', window.location.href)
        Swal.fire({
          title: 'Thông báo',
          text: 'Bạn Phải đăng nhập mới sử dụng được dịch vụ này ',
          icon: 'info',
          confirmButtonText: "OK",
          didClose: () => {
            router.push('/dang-nhap')
          }
        })
        return false //chưa đăng nhập
      }
    } catch (error) {
      console.log('lỗi rồi cha ơi', error);
    }
    let email, full_name;
    try {
      const customerdata = JSON.parse(customer);
      email = customerdata.email;
      full_name = customerdata.full_name;
    } catch (error) {
      console.log("can not get data", error);
    }
    const reviewData = {
      product_id: product.id,
      rating,
      review,
      full_name,
      email,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/web/productreview`,
        reviewData
      );
      if (response) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Cảm ơn bạn đã đánh giá",
          didClose: () => {
            router.replace(`/chi-tiet-san-pham/${reviewData.product_id}`);
          },
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Có gì đó sai sai",
        text: "Vui Lòng kiểm tra mạng hoặc kiểm tra lại mình đã nhập đầy đủ from chưa !",
        icon: "error",
      });
    }
  };
  // Update quantity handler
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!token) {
      localStorage.setItem('redirectURL', window.location.href)
      Swal.fire({
        title: 'Thông báo',
        text: 'Bạn Phải đăng nhập mới được mua hàng',
        icon: 'error',
        didClose: () => {
          router.push('/dang-nhap')
        }
      })
      return false //chưa đăng nhập
    }
    else if (quantity <= 0) {
      alert("Please select a valid quantity.");
      return;
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
    Swal.fire({
      title: "Thành công!",
      text: `Bạn đã thêm sản phẩm "${product.product_name}" vào giỏ hàng.`,
      icon: "success",
      confirmButtonText: "OK",
    });
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
                        href={`${product.image_url}`}
                        className="popup-image"
                      >
                        <img src={`${product.image_url}`} alt="img" />
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
                          href={`${image.image_url}`}
                          className="popup-image"
                        >
                          <img
                            src={`${image.image_url}`}
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
                        <img src={`${product.image_url}`} alt="img" />
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
                            src={`${image.image_url}`}
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
                                  {Array.from(
                                    { length: review.rating },
                                    (_, i) => (
                                      <span key={i} className="star">
                                        ★
                                      </span>
                                    )
                                  )}
                                  {Array.from(
                                    { length: 5 - review.rating },
                                    (_, i) => (
                                      <span key={i} className="star empty">
                                        ☆
                                      </span>
                                    )
                                  )}
                                </p>
                                <p>Nhận xét: {review.review}</p>
                                <p>Người gửi: {review.full_name} </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="comment-form mt-4 col-lg-12"
              >
                <h3 className="comment-reply-title">
                  Đánh giá về Sản Phẩm này
                </h3>
                <p className="comment-notes">
                  Email của bạn sẽ không được công khai. Các trường bắt buộc
                  được đánh dấu *
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
        </section>
      </main>
    </>
  );
}
