import React from "react";
export default function Dashboard(){
    return(
        <div className="container-fluid p-4">
  <div className="d-flex justify-content-between">
    <h3 className="mb-4">Dashboard</h3>
  </div>
  <div className="row">
    <div className="col-md-3 mb-4">
      <div className="card border-0 rounded-0 bg-primary-subtle text-primary">
        <div className="card-body text-end">
          <div className="display-6 d-flex justify-content-between">
            <i className="fal fa-file-invoice-dollar"></i>
            122
          </div>
          ORDERS
        </div>
      </div>
    </div>
    <div className="col-md-3 mb-4">
      <div className="card border-0 rounded-0 bg-warning-subtle text-warning">
        <div className="card-body text-end">
          <div className="display-6 d-flex justify-content-between">
            <i className="fal fa-boxes"></i>
            20
          </div>
          PRODUCTS
        </div>
      </div>
    </div>
    <div className="col-md-3 mb-4">
      <div className="card border-0 rounded-0 bg-danger-subtle text-danger">
        <div className="card-body text-end">
          <div className="display-6 d-flex justify-content-between">
            <i className="fal fa-users"></i>
            10,003
          </div>
          CUSTOMERS
        </div>
      </div>
    </div>
    <div className="col-md-3 mb-4">
      <div className="card border-0 rounded-0 bg-success-subtle text-success">
        <div className="card-body text-end">
          <div className="display-6 d-flex justify-content-between">
            <i className="fal fa-chart-line"></i>
            1.5 B
          </div>
          INCOMES
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-md-4 mb-3">
      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex border-bottom pb-2 justify-content-between">
            <h6 className="mb-0">
              <i className="fal fa-file-invoice-dollar fa-lg"></i>
              Recent Orders
            </h6>
            <small>
              <a href="#" className="text-decoration-none">All Orders</a>
            </small>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <div className="p-2 me-2 bg-warning text-white">
              <i className="fal fa-receipt"></i>
            </div>
            <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
              <strong className="d-flex justify-content-between">
                Đơn #122
                <div>
                  <span className="badge text-bg-warning">
                    <i className="far fa-box"></i> 20
                  </span>
                  <span className="badge bg-success-subtle text-success">
                    <i className="far fa-money-bill-wave"></i> 100,000,000
                  </span>
                </div>
              </strong>
              Đặt bởi <i>Khách vãng lai</i> lúc 18:00 04/06/2024
            </a>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <div className="p-2 me-2 bg-success text-white">
              <i className="fal fa-receipt"></i>
            </div>
            <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
              <strong className="d-flex justify-content-between">
                Đơn #122
                <div>
                  <span className="badge text-bg-warning">
                    <i className="far fa-box"></i> 5
                  </span>
                  <span className="badge bg-success-subtle text-success">
                    <i className="far fa-money-bill-wave"></i> 10,000,000
                  </span>
                </div>
              </strong>
              Đặt bởi <i>Khách vãng lai</i> lúc 18:00 04/06/2024
            </a>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <div className="p-2 me-2 bg-danger text-white">
              <i className="fal fa-receipt"></i>
            </div>
            <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
              <strong className="d-flex justify-content-between">
                Đơn #121
                <div>
                  <span className="badge text-bg-warning">
                    <i className="far fa-box"></i> 5
                  </span>
                  <span className="badge bg-success-subtle text-success">
                    <i className="far fa-money-bill-wave"></i> 10,000,000
                  </span>
                </div>
              </strong>
              Đặt bởi <i>Khách vãng lai</i> lúc 18:00 04/06/2024
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-3">
      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex border-bottom pb-2 justify-content-between">
            <h6 className="mb-0">
              <i className="fal fa-stars fa-lg"></i>
              Recent Ratings
            </h6>
            <small>
              <a href="#" className="text-decoration-none">All Ratings</a>
            </small>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <i className="far fa-comment-alt-smile"></i>
            <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
              <strong className="d-flex justify-content-between">
                iPhone 15 Pro Max 256GB Gold Rose
                <div className="text-warning">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </strong>
              Sản phẩm xịn, giá tốt!
            </a>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <i className="far fa-comment-alt-smile"></i>
            <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
              <strong className="d-flex justify-content-between">
                Samsung Galaxy S23 Ultra
                <div className="text-warning">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </strong>
              Giá mắc, chất lượng tầm trung!
            </a>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <i className="far fa-comment-alt-smile"></i>
            <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
              <strong className="d-flex justify-content-between">
                Samsung Galaxy S23 Ultra
                <div className="text-warning">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </strong>
              Giá mắc, chất lượng tầm trung!
            </a>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <i className="far fa-comment-alt-smile"></i>
            <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
              <strong className="d-flex justify-content-between">
                Samsung Galaxy S23 Ultra
                <div className="text-warning">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </strong>
              Giá mắc, chất lượng tầm trung!
            </a>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <i className="far fa-comment-alt-smile"></i>
            <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
              <strong className="d-flex justify-content-between">
                Samsung Galaxy S23 Ultra
                <div className="text-warning">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </strong>
              Giá mắc, chất lượng tầm trung!
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-3">
      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex border-bottom pb-2 justify-content-between">
            <h6 className="mb-0">
              <i className="fal fa-file-invoice-dollar fa-lg"></i>
              Recent Payments
            </h6>
            <small>
              <a href="#" className="text-decoration-none">All Payments</a>
            </small>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <div className="p-2 me-2 bg-success text-white">
              <i className="far fa-money-bill-wave"></i>
            </div>
            <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
              <strong className="d-flex justify-content-between">
                Đơn #122
                <div>
                  <span className="badge bg-success-subtle text-success">
                    <i className="far fa-money-bill-wave"></i> 100,000,000
                  </span>
                </div>
              </strong>
              Đặt bởi <i>Khách vãng lai</i> lúc 18:00 04/06/2024
            </a>
          </div>
          <div className="d-flex text-body-secondary pt-3">
            <div className="p-2 me-2 bg-danger text-white">
              <i className="far fa-money-bill-wave"></i>
            </div>
            <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
              <strong className="d-flex justify-content-between">
                Đơn #122
                <div>
                  <span className="badge bg-danger-subtle text-danger">
                    <i className="far fa-money-bill-wave"></i> 100,000,000
                  </span>
                </div>
              </strong>
              Đặt bởi <i>Khách vãng lai</i> lúc 18:00 04/06/2024
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    );
}
Dashboard.isAdmin = true;