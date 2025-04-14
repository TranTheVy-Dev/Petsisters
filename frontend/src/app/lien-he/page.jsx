

"use client"
import axios from "axios";
import Link from "next/link";
import { useState } from 'react';
import Swal from "sweetalert2";

export default function contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phone : '',
  });
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Hàm xử lý khi form được gửi
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(responseMessage);

    setLoading(true);
    setResponseMessage('');
   
    Swal.fire({
      title: "Đang Gởi Yêu cầu của bạn...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => {
        reject(new Error('Request timed out'));
      }, 10000) // 30 giây
    );
    // Gửi dữ liệu tới backend
    try {
      const response = await axios.post(`${API_URL}/api/web/contact`, formData);
  
      if (response.status === 200) {
        Swal.fire({
          title : 'Success',
          icon: "success",
          title: "Cảm ơn bạn đã liên hệ chúng tôi sẽ sớm liên lạc với bạn!",
          timer: 3000,
          showConfirmButton: false,
        })
        setResponseMessage('Email sent successfully!');
        // Reset formData after successful submission
        setFormData({ name: '', email: '', message: '' ,phone: ''});
      } else {
        Swal.fire({
          title : "Có gì đó sai sai",
          icon : 'info',
         text : response.data.error || 'some thing went wrong',
        })
      }
    } catch (error) {
      Swal.close();

  if (error.message === "Request timed out") {
    Swal.fire({
      title: "Có gì đó sai sai",
      icon: "info",
      text: "Yêu cầu mất quá nhiều thời gian, vui lòng thử lại!",
      timer: 5000,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      title: "Có gì đó sai sai",
      icon: "error",
      text: error.response?.data?.error || error.message || "Không thể gởi message",
      timer: 5000,
      showConfirmButton: false,
    });
  }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <main className="fix">
      <section className="breadcrumb__area fix">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="breadcrumb__content">
                  <h3 className="title">Trang Liên Hệ</h3>
                  <nav className="breadcrumb">
                    <span property="itemListElement" typeof="ListItem">
                      <Link href={"index.html"}>Trang Chủ</Link>
                    </span>
                    <span className="breadcrumb-separator">
                      <i className="flaticon-right-arrow-angle"></i>
                    </span>
                    <span property="itemListElement" typeof="ListItem">
                      Liên hệ
                    </span>
                  </nav>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="breadcrumb__img">
                  <img src="/img/images/breadcrumb_img.png" alt="Breadcrumb" />
                </div>
              </div>
            </div>
          </div>
          <div className="breadcrumb__shape-wrap">
            <img
              src="/img/images/breadcrumb_shape01.png"
              alt="Breadcrumb Shape 1"
            />
            <img
              src="/img/images/breadcrumb_shape02.png"
              alt="Breadcrumb Shape 2"
            />
          </div>
        </section>
     
        {/* Các phần khác không thay đổi */}
        <section className="contact__area">
          <div className="container">
            <div className="row">
            <div className="col-lg-5">
                <div className="contact__content">
                  <div className="section__title mb-30">
                    <h2 className="title">
                      Chúng Tôi Luôn Sẵn Sàng Để Phục Vụ Bạn & Thú Cưng Của Bạn
                    </h2>
                    
                  </div>
                  <div className="contact__info-wrap">
                    <h6 className="title">Thông Tin:</h6>
                    <ul className="list-wrap">
                      <li>
                        <div className="icon">
                          <i className="flaticon-phone"></i>
                        </div>
                        <Link href={"tel:0123456789"}>+123 8989 444</Link>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="flaticon-placeholder"></i>
                        </div>
                        Thành Phố Hồ Chí Minh
                      </li>
                      <li>
                        <div className="icon">
                          <i className="flaticon-mail"></i>
                        </div>
                        <Link href={"mailto:info@gmail.com"}>
                        petsisters.80833@gmail.com
                        </Link>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-share-alt"></i>
                        </div>
                        <ul className="list-wrap contact__social">
                          <li>
                            <Link
                              href={"https://www.facebook.com/"}
                              target="_blank"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </Link>
                          </li>
                          <li>
                            <Link href={"https://twitter.com"} target="_blank">
                              <i className="fab fa-twitter"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={"https://www.whatsapp.com/"}
                              target="_blank"
                            >
                              <i className="fab fa-whatsapp"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={"https://www.instagram.com/"}
                              target="_blank"
                            >
                              <i className="fab fa-instagram"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={"https://www.youtube.com/"}
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
              <div className="col-lg-7">
                <div className="contact__form-wrap">
                  <form onSubmit={handleSubmit} id="contact-form" className="contact__form">
                    <h2 className="title">Gửi Một Bình Luận</h2>
                    <span>Địa chỉ email của bạn sẽ không được công bố.</span>
                    <div className="row gutter-20">
                      <div className="col-md-6">
                        <div className="form-grp">
                          <input
                            name="name"
                            type="text"
                            placeholder="Tên"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-grp">
                          <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-grp">
                          <textarea
                            id="phone"
                            name="phone"
                            placeholder="Số điện thoại"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                        <div className="form-grp">
                          <textarea
                            id="message"
                            name="message"
                            placeholder="Để lại lời nhắn của bạn ở đây , chúng tôi sẽ liên hệ lại với bạn"
                            value={formData.message}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn">
                      Gửi Tin Nhắn Cho Chúng Tôi{" "}
                      <img
                        src="assets/img/icon/right_arrow.svg"
                        alt=""
                        className="injectable"
                      />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
