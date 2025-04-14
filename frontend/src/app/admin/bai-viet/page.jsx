import Link from "next/link";
export default function AdminProduct() {
  return (
<div className="container-fluid p-4">
  <div className="d-flex justify-content-between">
    <h3 className="mb-4">Products</h3>
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
            <th className="text-start" colSpan="">Bài Viết</th>
            <th>Người Đăng</th>
            <th>Thời Gian</th>
            <th>Đánh Giá    </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          <tr>
            
            <td className="text-start">
              <strong>
                Tiêu Đề: Cách nuôi...
              </strong>
              <br />
              <small>
                Nội Dung:...
              </small>
            </td>
            <td>
            Tên Người Dùng:
            </td>
            <td>
              Ngày: 11/11/2024
            </td>
            <td>
              4.6<br />
              <i className="fas fa-star fa-xs text-warning"></i>
              <i className="fas fa-star fa-xs text-warning"></i>
              <i className="fas fa-star fa-xs text-warning"></i>
              <i className="fas fa-star fa-xs text-warning"></i>
              <i className="far fa-star fa-xs text-warning"></i>
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
