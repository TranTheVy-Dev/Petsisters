"use client";
import Link from "next/link";
import Image from "next/image";
import useFetchService from "../lib/api_service"; // Import custom hook

const TrangService = () => {
  const { services, loading, error } = useFetchService(); // Sử dụng custom hook
  console.log(services);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="fix">
      <section className="breadcrumb__area fix">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-8">
              <div className="breadcrumb__content">
                <h3 className="title">
                  Dịch vụ thú cưng <i className="fa fa-wallet"></i>
                </h3>
                <nav className="breadcrumb">
                  <span property="itemListElement" typeof="ListItem">
                    <Link href="/">Trang chủ</Link>
                  </span>
                  <span className="breadcrumb-separator">
                    <i className="flaticon-right-arrow-angle"></i>
                  </span>
                  <span property="itemListElement" typeof="ListItem">
                    Dịch vụ thú cưng
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
      <section className="services__area">
        <div className="container">
          <div className="section__title mb-40">
            <span className="sub-title">
              Cung cấp dịch vụ chăm sóc
              {/* <strong className="shake">
                <Image
                  src="/img/icon/pet_icon02.svg"
                  alt="Pet Icon"
                  width={50}
                  height={50}
                  className="injectable"
                />
              </strong> */}
            </span>
            <h2 className="title">
              Cung cấp dịch vụ thú cưng và thú y tốt nhất của chúng tôi
            </h2>
          </div>
          <div className="row justify-content-center mt-5">
            {services.map((service) => (
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-sm-8 mt-5"
                key={service.id}
              >
                <div className="services__item">
                  <div className="services__icon">
                    <div className="services__icon-shape">
                      <img
                        width={300}
                        height={120}
                        src={service.image_url}
                        alt={service.name}
                        style={{
                          borderRadius: "12px",
                          objectFit: "cover",
                        }}
                      />
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
                    <p>{/* <b>{service.price.toLocaleString()} VNĐ</b> */}</p>
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
      </section>
    </main>
  );
};

export default TrangService;
