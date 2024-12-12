import Link from "next/link";
export default function contact() {
  return (
    <>
      <main className="fix">
        <section className="breadcrumb__area fix">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="breadcrumb__content">
                  <h3 className="title">Contact Page</h3>
                  <nav className="breadcrumb">
                    <span property="itemListElement" typeof="ListItem">
                      <Link href={"index.html"}>Home</Link>
                    </span>
                    <span className="breadcrumb-separator">
                      <i className="flaticon-right-arrow-angle"></i>
                    </span>
                    <span property="itemListElement" typeof="ListItem">
                      Contact
                    </span>
                  </nav>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="breadcrumb__img">
                  <img
                    src="assets/img/images/breadcrumb_img.png"
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
              src="assets/img/images/breadcrumb_shape01.png"
              alt="img"
              data-aos="fade-down-right"
              data-aos-delay="400"
            />
            <img
              src="assets/img/images/breadcrumb_shape02.png"
              alt="img"
              data-aos="fade-up-left"
              data-aos-delay="400"
            />
          </div>
        </section>

        <section className="contact__area">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="contact__content">
                  <div className="section__title mb-30">
                    <h2 className="title">
                      We Are Always Available For You & Your Pets
                    </h2>
                    <p>
                      Maecenas quis viverra metus, et efficitur ligula. Nam
                      coueaugue congue sed luctus lectus conIn onondimentum .
                    </p>
                  </div>
                  <div className="contact__info-wrap">
                    <h6 className="title">Information:</h6>
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
                        256 Avenue, Newyork City
                      </li>
                      <li>
                        <div className="icon">
                          <i className="flaticon-mail"></i>
                        </div>
                        <Link href={"mailto:info@gmail.com"}>
                          info@gmail.com
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
                  <form
                    action="assets/mail.php"
                    method="POST"
                    id="contact-form"
                    className="contact__form"
                  >
                    <h2 className="title">Post a comment</h2>
                    <span>
                      Your email address will not be published. Required fields
                      are marked *
                    </span>
                    <div className="row gutter-20">
                      <div className="col-md-6">
                        <div className="form-grp">
                          <input name="name" type="text" placeholder="Name" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-grp">
                          <input
                            name="email"
                            type="email"
                            placeholder="E-mail"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-grp">
                          <input
                            name="website"
                            type="url"
                            placeholder="Website"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-grp">
                          <textarea
                            name="message"
                            placeholder="Message"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn">
                      Send Us Message{" "}
                      <img
                        src="assets/img/icon/right_arrow.svg"
                        alt=""
                        className="injectable"
                      />
                    </button>
                  </form>
                  <p className="ajax-response mb-0"></p>
                </div>
              </div>
            </div>

            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48409.69813174607!2d-74.05163325136718!3d40.68264649999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25bae694479a3%3A0xb9949385da52e69e!2sBarclays%20Center!5e0!3m2!1sen!2sbd!4v1684309529719!5m2!1sen!2sbd"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
