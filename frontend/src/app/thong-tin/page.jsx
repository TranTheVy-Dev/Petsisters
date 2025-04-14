import Link from "next/link";
export default function about() {
  return (
    <>
      <main className="fix">
        <section className="breadcrumb__area fix">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="breadcrumb__content">
                  <h3 className="title">
                    Thông tin <i className="fa fa-info-circle"></i>
                  </h3>
                  <nav className="breadcrumb">
                    <span property="itemListElement" typeof="ListItem">
                      <Link href="/">Trang chủ</Link>
                    </span>
                    <span className="breadcrumb-separator">
                      <i className="flaticon-right-arrow-angle"></i>
                    </span>
                    <span property="itemListElement" typeof="ListItem">
                      Thông tin
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

        <section className="about__area-four">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div className="about__img-four">
                 
                  <img
                    src="/img/images/inner_about_img02.jpg"
                    alt="img"
                    
                  />
                 
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about__content-four">
                  <div className="section__title mb-15">
                    <span className="sub-title">
                      Về chúng tôi 
                      <strong className="shake">
                        <img
                          src="/img/icon/pet_icon02.svg"
                          alt=""
                          className="injectable"
                        />
                      </strong>
                    </span>
                    <h2 className="title">
                    Chúng tôi sẽ làm cho thú cưng của bạn thực sự hạnh phúc <br />
                    </h2>
                  </div>
                  <p>
                  Chúng tôi cung cấp thức ăn chất lượng và dịch vụ chăm sóc sức khỏe cho thú cưng, 
                  bao gồm khám bệnh và quản lý các vấn đề sức khỏe mãn tính. Với đội ngũ chuyên gia tận tâm, 
                  chúng tôi cam kết giúp thú cưng của bạn luôn khỏe mạnh và hạnh phúc, trở thành điểm đến hàng đầu trong khu vực cho mọi nhu cầu chăm sóc thú cưng.
                  </p>
                  <div className="about__content-inner-two">
                    <div className="experience__box">
                      <div className="experience__box-shape">
                        <img
                          src="/img/images/experience_shape.svg"
                          alt=""
                          className="injectable"
                        />
                      </div>
                      <div className="experience__box-content">
                        <h4 className="title">
                          5 <span>Năm</span>
                        </h4>
                        <p>Kinh nghiệm</p>
                      </div>
                    </div>
                    <div className="introducing__list-box introducing__list-box-two">
                      <ul className="list-wrap">
                        <li>
                          <span className="icon">
                            <img
                              src="/img/icon/check_icon02.svg"
                              alt=""
                              className="injectable"
                            />
                          </span>
                          Phục vụ tận tâm 
                        </li>
                        <li>
                          <span className="icon">
                            <img
                              src="/img/icon/check_icon02.svg"
                              alt=""
                              className="injectable"
                            />
                          </span>
                          20 bác sĩ thú y tài năng 
                        </li>
                        <li>
                          <span className="icon">
                            <img
                              src="/img/icon/check_icon02.svg"
                              alt=""
                              className="injectable"
                            />
                          </span>
                          Chỉ sản phẩm chất lượng cao
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p>
                  Ngoài các sản phẩm dinh dưỡng cao cấp, chúng tôi còn cung cấp các dịch vụ làm đẹp, 
                  tắm rửa và cắt tỉa lông, đảm bảo thú cưng của bạn luôn khỏe mạnh và xinh đẹp. Với phương châm tận tâm 
                  và chuyên nghiệp, chúng tôi mong muốn trở thành điểm đến hàng đầu trong khu vực, nơi bạn có thể
                   tìm thấy mọi thứ cần thiết để chăm sóc sức khỏe và hạnh phúc cho thú cưng của mình.
                  </p>
                  <Link href={"contact.html"} className="btn">
                    Tìm hiểu thêm{" "}
                    <img
                      src="/img/icon/right_arrow.svg"
                      alt=""
                      className="injectable"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="why__we-are-area-two">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="section__title text-center mb-40">
                  <span className="sub-title">
                    Tại sao bạn nên chọn chúng tôi
                    <strong className="shake">
                      <img
                        src="/img/icon/pet_icon02.svg"
                        alt=""
                        className="injectable"
                      />
                    </strong>
                  </span>
                  <h2 className="title">Xem Chu Prong có thể giúp gì</h2>
                  <p>
                    Với đội ngũ bác sĩ thú ý yêu nghề thì mọi thú cưng của quý khách điều được thăm khám một cách
                     <br /> tận tâm và xứng đáng được chăm sóc tốt nhất.
                  </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 col-sm-10">
                <div className="why__we-are-item">
                  <div className="why__we-are-item-icon">
                    <img
                      src="/img/icon/why_icon01.svg"
                      alt=""
                      className="injectable"
                    />
                  </div>
                  <div className="why__we-are-item-content">
                    <h4 className="title">Bảo đảm sức khỏe</h4>
                    <p>
                      Chúng tôi luôn đảm bảo rằng khi thú cưng của khách hàng sử dụng sản phẩm cũng như dịch vụ 
                      của chúng tôi đều được đảm bảo sức khỏe 1 cách an toàn nhất 
                    </p>
                  </div>
                  {/* <div className="why__we-are-item-shape">
                    <div className="shape-one">
                      <img
                        src="/img/images/why_item_shape01.svg"
                        alt=""
                        className="injectable"
                      />
                    </div>
                    <div className="shape-two">
                      <img
                        src="/img/images/why_item_shape02.svg"
                        alt=""
                        className="injectable"
                      />
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-10">
                <div className="why__we-are-item">
                  <div className="why__we-are-item-icon">
                    <img
                      src="/img/icon/why_icon02.svg"
                      alt=""
                      className="injectable"
                    />
                  </div>
                  <div className="why__we-are-item-content">
                    <h4 className="title">Làm việc chuyên nghiệp</h4>
                    <p>
                     Với đội ngũ được đạo tạo bài bản sẽ giúp thú cưng của bạn có những dịch vụ tốt nhất 
                    </p>
                  </div>
                  <div className="why__we-are-item-shape">
                    {/* <div className="shape-one">
                      <img
                        src="/img/images/why_item_shape01.svg"
                        alt=""
                        className="injectable"
                      />
                    </div>
                    <div className="shape-two">
                      <img
                        src="/img/images/why_item_shape02.svg"
                        alt=""
                        className="injectable"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-10">
                <div className="why__we-are-item">
                  <div className="why__we-are-item-icon">
                    <img
                      src="/img/icon/why_icon03.svg"
                      alt=""
                      className="injectable"
                    />
                  </div>
                  <div className="why__we-are-item-content">
                    <h4 className="title">Chính sách minh bạch</h4>
                    <p>
                      Đến với sử dụng dịch vụ và sản phẩm của chúng tôi sẽ được các bạn nhân viên cũng như 
                      bác sĩ tư vấn cận kẻ và minh bạch
                    </p>
                  </div>
                  {/* <div className="why__we-are-item-shape">
                    <div className="shape-one">
                      <img
                        src="/img/images/why_item_shape01.svg"
                        alt=""
                        className="injectable"
                      />
                    </div>
                    <div className="shape-two">
                      <img
                        src="/img/images/why_item_shape02.svg"
                        alt=""
                        className="injectable"
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="why__shape-wrap">
            <img
              src="/img/images/h2_why_shape01.png"
              alt="shape"
              data-aos="fade-down-right"
              data-aos-delay="400"
            />
            <img
              src="/img/images/h2_why_shape02.png"
              alt="shape"
              className="ribbonRotate"
            />
          </div>
        </section>

        <div
          className="counter__area-two counter__area-bg"
          data-background="/img/bg/counter_bg.jpg"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="counter__item-two">
                  <div className="counter__item-shape">
                    <img src="/img/images/h2_counter_shape.png" alt="" />
                  </div>
                  
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="counter__item-two">
                  <div className="counter__item-shape">
                    <img src="/img/images/h2_counter_shape.png" alt="" />
                  </div>
                  
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="counter__item-two">
                  <div className="counter__item-shape">
                    <img src="/img/images/h2_counter_shape.png" alt="" />
                  </div>
                  
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="counter__item-two">
                  <div className="counter__item-shape">
                    <img src="/img/images/h2_counter_shape.png" alt="" />
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="team__area-two">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <div className="section__title text-center mb-40">
          <span className="sub-title">
            CHÚNG TÔI THAY ĐỔI CUỘC SỐNG VÀ THẾ GIỚI CỦA BẠN
            <strong className="shake">
              <img
                src="/img/icon/pet_icon02.svg"
                alt=""
                className="injectable"
              />
            </strong>
          </span>
          <h2 className="title">
            Chúng tôi tận tâm về dịch vụ và chăm sóc xuất sắc
          </h2>
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
        <div className="team__item">
          <div className="team__item-img">
            <div className="mask-img-wrap">
              <img src="/img/team/team_img01.jpg" alt="img" />
            </div>
            <div className="team__item-img-shape">
              <div className="shape-one">
                <img
                  src="/img/team/team_img_shape01.svg"
                  alt=""
                  className="injectable"
                />
              </div>
              <div className="shape-two">
                <img
                  src="/img/team/team_img_shape02.svg"
                  alt=""
                  className="injectable"
                />
              </div>
            </div>
            <div className="team__social">
              <ul className="list-wrap">
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
            </div>
          </div>
          <div className="team__item-content">
            <h4 className="title">
              <Link href={"https://www.youtube.com/"}>
                Daria Andaloro
              </Link>
            </h4>
            <span>Kỹ thuật viên thú y</span>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
        <div className="team__item">
          <div className="team__item-img">
            <div className="mask-img-wrap">
              <img src="/img/team/team_img02.jpg" alt="img" />
            </div>
            <div className="team__item-img-shape">
              <div className="shape-one">
                <img
                  src="/img/team/team_img_shape01.svg"
                  alt=""
                  className="injectable"
                />
              </div>
              <div className="shape-two">
                <img
                  src="/img/team/team_img_shape02.svg"
                  alt=""
                  className="injectable"
                />
              </div>
            </div>
            <div className="team__social">
              <ul className="list-wrap">
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
            </div>
          </div>
          <div className="team__item-content">
            <h4 className="title">
              <Link href={"team-details.html"}>Michael Brian</Link>
            </h4>
            <span>Chuyên gia y học</span>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
        <div className="team__item">
          <div className="team__item-img">
            <div className="mask-img-wrap">
              <img src="/img/team/team_img03.jpg" alt="img" />
            </div>
            <div className="team__item-img-shape">
              <div className="shape-one">
                <img
                  src="/img/team/team_img_shape01.svg"
                  alt=""
                  className="injectable"
                />
              </div>
              <div className="shape-two">
                <img
                  src="/img/team/team_img_shape02.svg"
                  alt=""
                  className="injectable"
                />
              </div>
            </div>
            <div className="team__social">
              <ul className="list-wrap">
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
            </div>
          </div>
          <div className="team__item-content">
            <h4 className="title">
              <Link href={"team-details.html"}>Kenroly Gajon</Link>
            </h4>
            <span>Kỹ thuật viên thực phẩm</span>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
        <div className="team__item">
          <div className="team__item-img">
            <div className="mask-img-wrap">
              <img src="/img/team/team_img04.jpg" alt="img" />
            </div>
            <div className="team__item-img-shape">
              <div className="shape-one">
                <img
                  src="/img/team/team_img_shape01.svg"
                  alt=""
                  className="injectable"
                />
              </div>
              <div className="shape-two">
                <img
                  src="/img/team/team_img_shape02.svg"
                  alt=""
                  className="injectable"
                />
              </div>
            </div>
            <div className="team__social">
              <ul className="list-wrap">
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
            </div>
          </div>
          <div className="team__item-content">
            <h4 className="title">
              <Link href={"team-details.html"}>Lizay Arianya</Link>
            </h4>
            <span>Kỹ thuật viên thú y</span>
          </div>
        </div>
      </div>
    </div>
    <div className="team__bottom-content">
      <p>Đội ngũ bác sĩ chuyên gia quý giá của chúng tôi</p>
      <Link href={"team.html"} className="btn">
        Xem tất cả đội ngũ{" "}
        <img
          src="/img/icon/right_arrow.svg"
          alt=""
          className="injectable"
        />
      </Link>
    </div>
  </div>
  <div className="team__shape-two">
    <img
      src="/img/team/h2_team_shape.png"
      alt="img"
      className="ribbonRotate"
    />
  </div>
</section>
      </main>
    </>
  );
}
