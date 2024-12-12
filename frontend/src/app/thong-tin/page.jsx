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
                  <h3 className="title">About Us</h3>
                  <nav className="breadcrumb">
                    <span property="itemListElement" typeof="ListItem">
                      <Link href={"index.html"}>Home</Link>
                    </span>
                    <span className="breadcrumb-separator">
                      <i className="flaticon-right-arrow-angle"></i>
                    </span>
                    <span property="itemListElement" typeof="ListItem">
                      About Us
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

        <section className="about__area-four">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div className="about__img-four">
                  <img
                    src="/img/images/"
                    alt="img"
                    data-aos="fade-right"
                    data-aos-delay="400"
                  />
                  <img
                    src="/img/images/inner_about_img02.jpg"
                    alt="img"
                    data-aos="fade-left"
                    data-aos-delay="600"
                  />
                  <div className="shape">
                    <img
                      src="/img/images/inner_about_shape.png"
                      alt="shape"
                      data-aos="fade-down-left"
                      data-aos-delay="800"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about__content-four">
                  <div className="section__title mb-15">
                    <span className="sub-title">
                      About Us
                      <strong className="shake">
                        <img
                          src="/img/icon/pet_icon02.svg"
                          alt=""
                          className="injectable"
                        />
                      </strong>
                    </span>
                    <h2 className="title">
                      We'll Make Your Pets <br /> Really Happy
                    </h2>
                  </div>
                  <p>
                    We will work with you to develop individualised care plans,
                    including management chronic diseases. We are committed to
                    bein region’s premier healthcare network providing patient.
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
                          15 <span>Yr</span>
                        </h4>
                        <p>Experience</p>
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
                          Over 10 years of experience
                        </li>
                        <li>
                          <span className="icon">
                            <img
                              src="/img/icon/check_icon02.svg"
                              alt=""
                              className="injectable"
                            />
                          </span>
                          20 talented vets ready to help you
                        </li>
                        <li>
                          <span className="icon">
                            <img
                              src="/img/icon/check_icon02.svg"
                              alt=""
                              className="injectable"
                            />
                          </span>
                          High-quality products only
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p>
                    We will work with you to develop individualised care plans,
                    including management chronic diseases. We are committed to
                    bein region’s premier healthcare network providing patient.
                  </p>
                  <Link href={"contact.html"} className="btn">
                    Read More{" "}
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
                    Why we are the best
                    <strong className="shake">
                      <img
                        src="/img/icon/pet_icon02.svg"
                        alt=""
                        className="injectable"
                      />
                    </strong>
                  </span>
                  <h2 className="title">See How Petpal can Help</h2>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse <br /> amily and deserves ets are the best care.
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
                    <h4 className="title">Health Guarantee</h4>
                    <p>
                      Duis aute irure dolor in reprehenderit voluptate velit
                      essed eservesets are their health best care
                    </p>
                  </div>
                  <div className="why__we-are-item-shape">
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
                  </div>
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
                    <h4 className="title">Ethical breeding</h4>
                    <p>
                      Duis aute irure dolor in reprehenderit voluptate velit
                      essed eservesets are their health best care
                    </p>
                  </div>
                  <div className="why__we-are-item-shape">
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
                    <h4 className="title">Transparent Policy</h4>
                    <p>
                      Duis aute irure dolor in reprehenderit voluptate velit
                      essed eservesets are their health best care
                    </p>
                  </div>
                  <div className="why__we-are-item-shape">
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
                  </div>
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
                  <span className="count odometer" data-count="5985"></span>
                  <p>Happy Family</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="counter__item-two">
                  <div className="counter__item-shape">
                    <img src="/img/images/h2_counter_shape.png" alt="" />
                  </div>
                  <span className="count odometer" data-count="1322"></span>
                  <p>New Listed States</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="counter__item-two">
                  <div className="counter__item-shape">
                    <img src="/img/images/h2_counter_shape.png" alt="" />
                  </div>
                  <span className="count odometer" data-count="3102"></span>
                  <p>Core Breeding</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="counter__item-two">
                  <div className="counter__item-shape">
                    <img src="/img/images/h2_counter_shape.png" alt="" />
                  </div>
                  <span className="count odometer" data-count="1125"></span>
                  <p>Annual Awards</p>
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
                    WE CHANGE YOUR LIFE & WORLD
                    <strong className="shake">
                      <img
                        src="/img/icon/pet_icon02.svg"
                        alt=""
                        className="injectable"
                      />
                    </strong>
                  </span>
                  <h2 className="title">
                    We’re dedicated to excellent <br /> service and care
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
                    <span>Veterinary Technician</span>
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
                    <span>Medicine Specialist</span>
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
                    <span>Food Technician</span>
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
                    <span>Veterinary Technician</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="team__bottom-content">
              <p>Our Valuable Expert Doctors Team</p>
              <Link href={"team.html"} className="btn">
                See All Team{" "}
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
