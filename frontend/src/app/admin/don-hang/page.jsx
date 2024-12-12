import Link from "next/link";
export default function AdminProduct() {
  return (
<div className="container-fluid p-4">
  <div className="d-flex justify-content-between">
    <h3 className="mb-4">Đơn Hàng</h3>
    <div>
      <a href="#" className="btn btn-outline-success rounded-0">Manage Categories</a>
      <a href="/admin/them-san-pham" className="btn btn-primary rounded-0">Add Product</a>
    </div>
  </div>
  <div className="row">
    <div className="col-md-3 mb-4">
      <div className="card border-0 rounded-0 bg-primary-subtle text-primary">
        <div className="card-body text-end">
          <div className="display-6 d-flex justify-content-between">
            <i className="fal fa-box"></i>
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
            <i className="fal fa-box-open"></i>
            3
          </div>
          RUNNING OUT
        </div>
      </div>
    </div>
    <div className="col-md-3 mb-4">
      <div className="card border-0 rounded-0 bg-success-subtle text-success">
        <div className="card-body text-end">
          <div className="display-6 d-flex justify-content-between">
            <i className="fal fa-boxes"></i>
            5
          </div>
          CATEGORIES
        </div>
      </div>
    </div>
    <div className="col-md-3 mb-4">
      <div className="card border-0 rounded-0 bg-dark-subtle text-dark">
        <div className="card-body text-end">
          <div className="display-6 d-flex justify-content-between">
            <i className="fal fa-archive"></i>
            0
          </div>
          ARCHIVE
        </div>
      </div>
    </div>
  </div>
  
  <div className="card rounded-0 border-0 shadow-sm">
    <div className="card-body">
      <table className="table text-center">
        <thead>
          <tr>
            <th className="text-start" colSpan="2">Đơn Hàng</th>
            <th>Giá</th>
            <th>Số Lượng</th>
            <th>Người dùng</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          <tr>
            <td style={{ width: "64px" }}>
              <img src="assets/img/products/iphone.webp" className="w-100" alt="iPhone 15 Pro Max" />
            </td>
            <td className="text-start">
              <strong>
                iPhone 15 Pro Max 256GB Gold Rose
              </strong>
              <br />
              <small>
                Id: <strong>1</strong> | 
                Category: <a href="#" className="text-decoration-none fw-bold">Điện thoại</a>
                <br/>
                Ghi Chú: ...
                <br/>
                Địa Chỉ: VietNam
              </small>
            </td>
            <td>
              24,000,000đ
              <br />
              <del>25,000,000đ</del>
            </td>
            <td>
              50
            </td>
            <td>
              <i>Tên Người Dùng:</i>
              <br />
              <i>SDT:</i>
            </td>
            <td>
              <a href="#" target="_blank" className="btn btn-primary btn-sm">
                <i className="fas fa-eye fa-fw"></i>
              </a>
              <a href="#" className="btn btn-outline-warning btn-sm">
                <i className="fas fa-pencil fa-fw"></i>
              </a>
              <a href="#" className="btn btn-outline-danger btn-sm">
                <i className="fas fa-times fa-fw"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
}
