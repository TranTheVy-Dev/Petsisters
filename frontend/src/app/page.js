'use client';
import Link from "next/link";
import Image from "next/image";
import useFetchService from './lib/api_service'; // Import custom hook
import { useProducts } from '../app/lib/api_product'; // Import custom hook

export default function Home() {
    const { services } = useFetchService();
    const { products } = useProducts();
    const displayedProducts = products.slice(0, 4); // Chỉ lấy 12 sản phẩm đầu tiên
    const displayedService = services.slice(0, 3); // Chỉ lấy 12 sản phẩm đầu tiên

    return (
        <>
        
            <div className="fix">
                
                {/* <div className="banner__area banner__bg" data-background="/img/banner/banner_bg.jpg">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-xl-5 col-lg-6">
                                <div className="banner__content">
                                    <h2 className="title" data-aos="fade-up" data-aos-delay="200">Trusted Pet <img src="/img/banner/banner_title_img01.png" alt="" /> care & Veterinary Center <span className="icon"><img src="/img/banner/banner_title_img02.png" alt="" /></span> Point</h2>
                                    <p data-aos="fade-up" data-aos-delay="400">Template Kit uses demo images from Envato Elements Follower will need to license these images from Envato.</p>
                                    <Link href={"/thong-tin"} className="btn" data-aos="fade-up" data-aos-delay="600">Read More <img src="img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-6 col-md-9">
                                <div className="banner__img text-end">
                                    <img src="/img/banner/banner_img01.png" alt="img" data-aos="fade-left" data-aos-delay="800" />
                                    <div className="healthy-pets" data-aos="zoom-in" data-aos-delay="1000">
                                        <div className="icon">
                                            <img src="img/icon/pet_icon01.svg" alt="" className="injectable" />
                                        </div>
                                        <div className="content">
                                            <h6 className="circle rotateme">BETTER - HEALTHY - PETS - LOVE -</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="banner__shape-wrap">
                        <img src="/img/banner/banner_shape01.png" alt="img" data-aos="fade-down" data-aos-delay="1200" />
                        <img src="/img/banner/banner_shape02.png" alt="img" data-aos="fade-up-right" data-aos-delay="1200" />
                        <img src="/img/banner/banner_shape03.png" alt="img" className="ribbonRotate" />
                        <img src="/img/banner/banner_shape04.png" alt="img" />
                    </div>
                </div> */}
                <div className="about__area">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-xl-5 col-lg-6 col-md-8">
                                <div className="about__img">
                                    <img src="img/images/about_im.png" alt="" />
                                    <div className="video__box">
                                        <div className="video__box-shape">
                                            <img src="img/images/about_video_shape.svg" alt="" className="injectable" />
                                        </div>
                                        <h5 className="title">Xem video làm việc <br />của chúng tôi </h5>
                                        <Link href={"https://www.youtube.com/watch?v=XdFfCPK5ycw"} className="popup-video play-btn"><i className="fas fa-play"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-6">
                                <div className="about__content">
                                    <div className="section__title mb-20">
                                        <span className="sub-title">Biết thêm về chúng tôi
                                            <strong className="shake">
                                                <img src="img/icon/pet_icon02.svg" alt="" className="injectable" />
                                            </strong>
                                        </span>
                                        <h2 className="title">Niềm đam mê của chúng tôi là cung cấp <br /> Chăm sóc thú cưng cao cấp </h2>
                                    </div>
                                    <div className="about__content-inner">
                                        <div className="experience__box">
                                            <div className="experience__box-shape">
                                                <img src="img/images/experience_shape.svg" alt="" className="injectable" />
                                            </div>
                                            <div className="experience__box-content">
                                                <h4 className="title">1.5 <span>năm</span></h4>
                                                <p>Kinh nghiệm</p>
                                            </div>
                                        </div>
                                        <p>
                                            Hãy xem cách tôi tạo kiểu cho những ngày cuối hè này với những bảng màu tươi sáng và những gam màu nổi bật sẽ làm mê hoặc tủ quần áo của bạn quanh năm!</p>
                                    </div>
                                    <p>Chúng tôi sẽ làm việc với bạn để phát triển các kế hoạch chăm sóc cá nhân, bao gồm cả việc quản lý các bệnh mãn tính. Chúng tôi cam kết trở thành mạng lưới chăm sóc sức khỏe hàng đầu trong khu vực, cung cấp dịch vụ chăm sóc lấy bệnh nhân làm trung tâm và truyền cảm hứng..</p>
                                    <div className="about__content-bottom">

                                        <div className="customer__review">
                                            <div className="customer__review-img">
                                                <ul className="list-wrap">
                                                    <li><img src="img/images/author_01.png" alt="" /></li>
                                                    <li><img src="img/images/author_02.png" alt="" /></li>
                                                    {/* <li><img src="img/images/author_03.png" alt=""/></li>
                                                    <li><img src="img/images/author_04.png" alt=""/></li> */}
                                                </ul>
                                            </div>
                                            <div className="customer__review-content">
                                                <div className="rating">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <span>4.7 (1,567 lượt đánh giá)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shape">
                                        <img src="img/images/about_shape02.png" alt="img" data-aos="fade-down-left" data-aos-delay="400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about__shape-wrap">
                        <img src="img/images/about_shape01.png" alt="img" data-aos="fade-up-right" data-aos-delay="800" />
                        <img src="img/images/about_shape03.png" alt="img" className="ribbonRotate" />
                    </div>
                </div>
                <section className="product__area-four">
                    <div className="container">
                        <h1>Sản Phẩm Của Chúng Tôi</h1>
                        <div className="view__all-btn text-end mb-40">
                            <Link href="/cua-hang" className="btn border-btn">Xem tất cả sản phảm <img src="img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                        </div>
                        <div className="row gutter-20 row-cols-1 row-cols-md-4 justify-content-center">
                            {/* Render Products */}
                            {displayedProducts.map((product) => (
                                <div className="col" key={product.id}>
                                    <div className="product__item">
                                        <div className="product__thumb">
                                            <Link href={`/chi-tiet-san-pham/${product.id}`}>
                                                <img
                                                    src={`${product.image_url}`}
                                                    alt={product.product_name}
                                                />
                                            </Link>
                                            <div className="product__action">
                                                <Link href="#">
                                                    <i className="flaticon-love"></i>
                                                </Link>
                                                <Link href="#">
                                                    <i className="flaticon-loupe"></i>
                                                </Link>
                                                <Link href="#">
                                                    <i className="flaticon-exchange"></i>
                                                </Link>
                                            </div>
                                            <div className="sale-wrap">
                                                <span>Mới</span>
                                            </div>
                                            <div className="product__add-cart">
                                                <Link href="/gio-hang" className="btn">
                                                    <i className="flaticon-shopping-bag"></i>Thêm vào giỏ
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="product__content">
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
                                            <h4 className="title">
                                                <Link href={`/chi-tiet-san-pham/${product.id}`}>
                                                    {product.product_name}
                                                </Link>
                                            </h4>
                                            <h3 className="price">
                                                {product.price.toLocaleString()} VNĐ
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="marquee__area">
                    <div className="marquee__wrap">
                        <div className="marquee__box">
                            <Link href={"/lien-he"}>Đặt lịch hẹn trực tuyến <img src="img/images/marquee_icon.svg" alt="" /></Link>
                            <Link href={"/lien-he"}>Đặt lịch hẹn trực tuyến <img src="img/images/marquee_icon.svg" alt="" /></Link>
                            <Link href={"/lien-he"}>Đặt lịch hẹn trực tuyến <img src="img/images/marquee_icon.svg" alt="" /></Link>
                            <Link href={"/lien-he"}>Đặt lịch hẹn trực tuyến <img src="img/images/marquee_icon.svg" alt="" /></Link>
                        </div>
                        <div className="marquee__box">
                            <Link href={"/lien-he"}>Đặt lịch hẹn trực tuyến <img src="img/images/marquee_icon.svg" alt="" /></Link>
                            <Link href={"/lien-he"}>Đặt lịch hẹn trực tuyến <img src="img/images/marquee_icon.svg" alt="" /></Link>
                            <Link href={"/lien-he"}>Đặt lịch hẹn trực tuyến <img src="img/images/marquee_icon.svg" alt="" /></Link>
                            <Link href={"/lien-he"}>Đặt lịch hẹn trực tuyến <img src="img/images/marquee_icon.svg" alt="" /></Link>
                        </div>
                    </div>
                </div>
                <div className="services__area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-7">
                                <div className="section__title mb-40">
                                    <span className="sub-title">Cung cấp dịch vụ chăm sóc tại nhà đẳng cấp thế giới
                                    </span>
                                    <h2 className="title">Cung cấp dịch vụ chăm sóc thú cưng và thú y tốt nhất của chúng tôi</h2>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-5">
                                <div className="view__all-btn text-end mb-40">
                                    <Link href="/dich-vu" className="btn border-btn">Xem tất cả dịch vụ <img src="img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-5">
                            {displayedService.map((service) => (
                                <div
                                    className="col-xl-4 col-lg-4 col-md-6 col-sm-8 mt-5"
                                    key={service.id}
                                >
                                    <div className="services__item">
                                        <div className="services__icon">
                                            <div className="services__icon-shape">
                                            <Link href={`/chi-tiet-dich-vu/${service.id}`}>
                                                <img
                                                    src={`${service.image_url}`}
                                                    alt={service.product_name}
                                                />
                                            </Link>
                                            </div>
                                        </div>
                                        <div className="services__content">
                                            <h4 className="title">
                                                <Link href={`/chi-tiet-dich-vu/${service.id}`}>
                                                    {service.name}
                                                </Link>
                                            </h4>
                                            <p>
                                                <b>{service.service_name}</b>
                                            </p>
                                            <p>
                                                <b>{service.price.toLocaleString()} VNĐ</b>
                                            </p>
                                            <Link
                                                href={`/chi-tiet-dich-vu/${service.id}`}
                                                className="btn border-btn"
                                            >
                                                Xem Chi Tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="services__shape-wrap">
                        <img src="img/images/services_shape01.png" alt="img" className="ribbonRotate" />
                        <img src="img/images/services_shape02.png" alt="img" data-aos="fade-up-right" data-aos-delay="800" />
                        <img src="img/images/services_shape03.png" alt="img" data-aos="fade-down-left" data-aos-delay="400" />
                    </div>
                </div>
                <div className="why__we-are-area">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-6 col-md-8 col-sm-10">
                                <div className="why__we-are-img">
                                    <img src="img/images/why_we_are_img.png" alt="" />
                                    <div className="shape shape-one" data-aos="fade-down-right" data-aos-delay="500">
                                        <img src="img/images/why_shape01.svg" alt="" className="injectable" />
                                    </div>
                                    <div className="shape shape-two" data-aos="fade-up-right" data-aos-delay="500">
                                        <img src="img/images/why_shape02.svg" alt="" className="injectable" />
                                    </div>
                                    <div className="shape shape-three" data-aos="fade-up-left" data-aos-delay="500">
                                        <img src="img/images/why_shape03.svg" alt="" className="injectable" />
                                    </div>
                                    <div className="shape shape-four ribbonRotate">
                                        <img src="img/images/why_shape04.svg" alt="" className="injectable" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="why__we-are-content">
                                    <div className="section__title mb-10">
                                        <span className="sub-title">Tại sao chúng tôi là tốt nhất
                                            <strong className="shake">
                                                <img src="img/icon/pet_icon02.svg" alt="" className="injectable" />
                                            </strong>
                                        </span>
                                        <h2 className="title">Trường hợp khẩn cấp<br /> Những gì bạn cần biết.</h2>
                                    </div>
                                    <p>Chúng tôi hiểu rằng người bạn lông xù của bạn là một thành viên quý giá trong gia đình bạn và xứng đáng được chăm sóc và quan tâm tốt nhất bởi thú cưng.</p>
                                    <div className="why__list-box">
                                        <ul className="list-wrap">
                                            <li>
                                                <div className="why__list-box-item">
                                                    <div className="why__list-box-item-top">
                                                        <div className="icon">
                                                            <img src="img/icon/check_icon.svg" alt="" className="injectable" />
                                                        </div>
                                                        <h4 className="title">Thêm kinh nghiệm</h4>
                                                    </div>
                                                    <p>
                                                        Hãy tin tưởng vào kế hoạch điều trị và khả năng của bác sĩ.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="why__list-box-item">
                                                    <div className="why__list-box-item-top">
                                                        <div className="icon">
                                                            <img src="img/icon/check_icon.svg" alt="" className="injectable" />
                                                        </div>
                                                        <h4 className="title">Giá cả phải chăng</h4>
                                                    </div>
                                                    <p>Hãy tin tưởng vào kế hoạch điều trị và khả năng của bác sĩ.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="why__list-box-item">
                                                    <div className="why__list-box-item-top">
                                                        <div className="icon">
                                                            <img src="img/icon/check_icon.svg" alt="" className="injectable" />
                                                        </div>
                                                        <h4 className="title">Huấn luyện thú cưng hiện đại</h4>
                                                    </div>
                                                    <p>Hãy tin tưởng vào kế hoạch điều trị và khả năng của bác sĩ.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="why__list-box-item">
                                                    <div className="why__list-box-item-top">
                                                        <div className="icon">
                                                            <img src="img/icon/check_icon.svg" alt="" className="injectable" />
                                                        </div>
                                                        <h4 className="title">
                                                            Duy trì thói quen hàng ngày</h4>
                                                    </div>
                                                    <p>Hãy tin tưởng vào kế hoạch điều trị và khả năng của bác sĩ.</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="counter__area">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-6 col-md-12 order-0 order-lg-2">
                                <div className="counter__img">
                                    <div className="mask-img-wrap">
                                        <img src="img/images/cat_long_cho.png" alt="img" />
                                    </div>
                                    <div className="shape">
                                        <img src="img/images/counter_shape01.png" alt="img" className="ribbonRotate" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="counter__content">
                                    <div className="section__title white-title mb-10">
                                        <span className="sub-title">Sự tin cậy của bạn là ưu tiên hàng đầu của chúng tôi
                                            <strong className="shake">
                                                <img src="img/icon/pet_icon02.svg" alt="" className="injectable" />
                                            </strong>
                                        </span>
                                        <h2 className="title">Chăm sóc chuyên nghiệp và đảm bảo chất lượng</h2>
                                    </div>
                                    <p>Chúng tôi hiểu rằng người bạn lông xù của bạn là thành viên quý giá trong gia đình.</p>
                                    <Link href="/thong-tin" className="btn border-btn white-btn">Đọc Thêm <img src="img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                                </div>
                            </div>
                            {/* <div className="col-lg-3 col-md-5 order-3">
                                <div className="counter__item-wrap">
                                    <div className="counter__item">
                                        <h2 className="count"><span className="odometer" data-count="15"></span>+</h2>
                                        <p>27 years of experience</p>
                                    </div>
                                    <div className="counter__item">
                                        <h2 className="count"><span className="odometer" data-count="23"></span>K</h2>
                                        <p>Our Beloved Clients</p>
                                    </div>
                                    <div className="counter__item">
                                        <h2 className="count"><span className="odometer" data-count="15"></span>K+</h2>
                                        <p>Real Customer Reviews</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="counter__shape">
                        <img src="img/images/counter_shape02.png" alt="img" data-aos="fade-up-left" data-aos-delay="400" />
                    </div>
                </div>

                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-6 col-md-8 order-0 order-lg-2">
                            <div className="testimonial__img">
                                <div className="mask-img testimonial__img-mask">
                                    <img src="img/images/testimonial_img.jpg" alt="img" />
                                </div>
                                <div className="testimonial__img-shape">

                                    <div className="shape-two">
                                        <img src="img/images/testimonial_shape03.png" alt="img" className="alltuchtopdown" />
                                    </div>
                                </div>
                                <div className="review__box">
                                    <div className="review__box-shape">
                                        <img src="img/images/review_shape.svg" alt="" className="injectable" />
                                    </div>
                                    <div className="review__box-content">
                                        <img src="img/icon/star.svg" alt="" className="injectable" />
                                        <h2 className="title">1500+</h2>
                                        <span>Reviews</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="testimonial__item-wrap">
                                <div className="swiper testimonial-active">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="testimonial__item">
                                                <div className="testimonial__icon">
                                                    <img src="img/icon/quote.svg" alt="" className="injectable" />
                                                </div>
                                                <div className="testimonial__content">
                                                    <h2 className="title">Sức khỏe thú cưng quan trọng</h2>
                                                    <p>“ Chúng tôi hiểu rằng người bạn lông xù của bạn, thành viên quý giá trong thú cưng của bạn là.”</p>
                                                    <div className="testimonial__author">
                                                        <div className="testimonial__author-thumb">
                                                            <img src="img/images/testi_author01.png" alt="" />
                                                        </div>
                                                        {/* <div className="testimonial__author-content">
                                                                <h4 className="title">Uraney Jacke</h4>
                                                                <span>Business Study</span>
                                                            </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="testimonial__item">
                                                <div className="testimonial__icon">
                                                    <img src="img/icon/quote.svg" alt="" className="injectable" />
                                                </div>
                                                <div className="testimonial__content">
                                                    <h2 className="title">Pet Health Important</h2>
                                                    <p>“ Duis aute irure dolor in repreerit in voluptate velitesse We understand that your furry aute irure dolor in repreerit in voluptate ute irure dolor in repreerit in voluptate understand that you ”</p>
                                                    <div className="testimonial__author">
                                                        <div className="testimonial__author-thumb">
                                                            <img src="img/images/testi_author01.png" alt="" />
                                                        </div>
                                                        <div className="testimonial__author-content">
                                                            <h4 className="title">Uraney Jacke</h4>
                                                            <span>Business Study</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="testimonial__shape-wrap">
                    <img src="img/images/testimonial_shape01.png" alt="img" data-aos="fade-down-right" data-aos-delay="400" />
                    <img src="img/images/testimonial_shape02.png" alt="img" data-aos="fade-right" data-aos-delay="400" />
                </div>
            </div>
            <div className="registration__area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="registration__inner-wrap">
                                <h2 className="title">Lên lịch tham quan ngay hôm nay!</h2>
                                <div className="shape">
                                    <img src="img/images/registration_shape.svg" alt="" />
                                </div>
                                <form action="#">
                                    <div className="row gutter-15">
                                        <div className="col-lg-4 col-md-6">
                                            <div className="form-grp">
                                                <label htmlFor="name">Tên</label>
                                                <input id="name" type="text" placeholder="Họ và tên" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="form-grp select-grp">
                                                <label>Loại</label>
                                                <select name="pet_type" className="orderby">
                                                    <option value="Select Pet Type">Chọn loại thú cưng của bạn</option>
                                                    <option value="Cat">mèo</option>
                                                    <option value="Dog">chó</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="form-grp select-grp">
                                                <label>Quan tâm đến</label>
                                                <select name="interest" className="orderby">
                                                    <option value="Select Service">Chọn dịch vụ</option>
                                                    <option value="Pet Training">Huấn luyện thú cưng</option>
                                                    <option value="Pet Grooming">Pet Grooming</option>
                                                    <option value="Care Services">Dịch vụ chăm sóc</option>
                                                    <option value="Pet Boarding">Pet Boarding</option>
                                                    <option value="Pet Bath">Tắm cho thú cưng</option>
                                                    <option value="Pet Adoption">Nhận nuôi thú cưng</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="form-grp">
                                                <label htmlFor="date">Ngày</label>
                                                <input id="date" className="textbox-n" type="date" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="form-grp">
                                                <label htmlFor="time">Thời gian</label>
                                                <input id="time" placeholder="08:00 am - 10:00 am" />
                                                <i className="flaticon-three-o-clock-clock"></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="form-grp">
                                                <label htmlFor="phone">Số điện thoại</label>
                                                <input id="phone" type="number" placeholder="+123 888 ...." />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="submit__btn text-center mt-25">
                                        <Link href={"/dat-lich"}><button type="submit" className="btn">Bắt đầu đặt lịch <img src="img/icon/right_arrow.svg" alt="" className="injectable" /></button></Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blog__post-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-8">
                                <div className="section__title mb-40">
                                    <span className="sub-title">Tin tức và bài viết
                                        <strong className="shake">
                                            <img src="img/icon/pet_icon02.svg" alt="" className="injectable" />
                                        </strong>
                                    </span>
                                    <h2 className="title">Các bài viết gần đây của chúng tôi</h2>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="view__all-btn text-end mb-40">
                                    <Link href="blog.html" className="btn btn-two">Xem tất cả bài viết <img src="img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 col-sm-8">
                                <div className="blog__post-item shine-animate-item">
                                    <div className="blog__post-thumb">
                                        <div className="blog__post-mask shine-animate">
                                            <Link href="blog-details.html"><img src="img/blog/blog_post01.jpg" alt="img" /></Link>
                                            <ul className="list-wrap blog__post-tag">
                                                <li><Link href="blog.html">Thú cưng</Link></li>
                                                <li><Link href="blog.html">Thuộc về y học</Link></li>
                                            </ul>
                                        </div>
                                        <div className="shape">
                                            <img src="img/blog/blog_img_shape.svg" alt="" className="injectable" />
                                        </div>
                                    </div>
                                    <div className="blog__post-content">
                                        <div className="blog__post-meta">
                                            <ul className="list-wrap">
                                                <li><i className="flaticon-user"></i>by <Link href="blog-details.html">admin</Link></li>
                                                <li><i className="flaticon-calendar"></i>25th Aug, 2024</li>
                                            </ul>
                                        </div>
                                        <h2 className="title"><Link href="blog-details.html">Làm sạch không khí trong nhà là điều quan trọng trong việc kiểm soát bệnh hen suyễn</Link></h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-8">
                                <div className="blog__post-item shine-animate-item">
                                    <div className="blog__post-thumb">
                                        <div className="blog__post-mask shine-animate">
                                            <Link href="blog-details.html"><img src="img/blog/blog_post02.jpg" alt="img" /></Link>
                                            <ul className="list-wrap blog__post-tag">
                                                <li><Link href="blog.html">Chăm sóc</Link></li>
                                            </ul>
                                        </div>
                                        <div className="shape">
                                            <img src="img/blog/blog_img_shape.svg" alt="" className="injectable" />
                                        </div>
                                    </div>
                                    <div className="blog__post-content">
                                        <div className="blog__post-meta">
                                            <ul className="list-wrap">
                                                <li><i className="flaticon-user"></i>by <Link href="blog-details.html">admin</Link></li>
                                                <li><i className="flaticon-calendar"></i>25th Aug, 2024</li>
                                            </ul>
                                        </div>
                                        <h2 className="title"><Link href="blog-details.html">Làm sạch không khí trong nhà là điều quan trọng trong việc kiểm soát bệnh hen suyễn</Link></h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-8">
                                <div className="blog__post-item shine-animate-item">
                                    <div className="blog__post-thumb">
                                        <div className="blog__post-mask shine-animate">
                                            <Link href="blog-details.html"><img src="img/blog/blog_post03.jpg" alt="img" /></Link>
                                            <ul className="list-wrap blog__post-tag">
                                                <li><Link href="blog.html">Chăm sóc thú cưng</Link></li>
                                            </ul>
                                        </div>
                                        <div className="shape">
                                            <img src="img/blog/blog_img_shape.svg" alt="" className="injectable" />
                                        </div>
                                    </div>
                                    <div className="blog__post-content">
                                        <div className="blog__post-meta">
                                            <ul className="list-wrap">
                                                <li><i className="flaticon-user"></i>by <Link href="blog-details.html">admin</Link></li>
                                                <li><i className="flaticon-calendar"></i>25th Aug, 2024</li>
                                            </ul>
                                        </div>
                                        <h2 className="title"><Link href="blog-details.html">Làm sạch không khí trong nhà là điều quan trọng trong việc kiểm soát bệnh hen suyễn</Link></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="blog__shape-wrap">
                        <img src="img/blog/blog_shape01.png" alt="img" data-aos="fade-up-right" data-aos-delay="400" />
                        <img src="img/blog/blog_shape02.png" alt="img" className="ribbonRotate" />
                    </div>
                </div>
                <div className="instagram__area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="instagram__follow-btn">
                                    <Link href="https://www.instagram.com/" target="_blank">Theo dõi chúng tôi trên Instagram</Link>
                                </div>
                            </div>
                        </div>
                        {/* <div className="swiper instagram-active">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="instagram__item">
                                        <Link href="https://www.instagram.com/" target="_blank"><img src="img/instagram/instagram_img01.jpg" alt=""/></Link>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="instagram__item">
                                        <Link href="https://www.instagram.com/" target="_blank"><img src="img/instagram/instagram_img02.jpg" alt=""/></Link>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="instagram__item">
                                        <Link href="https://www.instagram.com/" target="_blank"><img src="img/instagram/instagram_img03.jpg" alt=""/></Link>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="instagram__item">
                                        <Link href="https://www.instagram.com/" target="_blank"><img src="img/instagram/instagram_img04.jpg" alt=""/></Link>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="instagram__item">
                                        <Link href="https://www.instagram.com/" target="_blank"><img src="img/instagram/instagram_img05.jpg" alt=""/></Link>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="instagram__item">
                                        <Link href="https://www.instagram.com/" target="_blank"><img src="img/instagram/instagram_img03.jpg" alt=""/></Link>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        
                    </div>
                </div>
            </div>
        </>
    );
}