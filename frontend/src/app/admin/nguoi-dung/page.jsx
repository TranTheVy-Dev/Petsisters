"use client";

import "./nguoi_dung.css";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import {
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} from "@/app/lib/api_customer";
import ReactPaginate from "react-paginate";
import Modal from "./customer_modal";

const AdminCustomer = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customersPerPage = 10; // số lượng khách hàng mỗi trang

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const { customers, error } = await getAllCustomers();
        if (error) {
          setError(error);
        } else {
          setCustomers(customers);
        }
      } catch (err) {
        setError("Failed to fetch customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const offset = currentPage * customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    offset,
    offset + customersPerPage
  );

  const openEditModal = (customer) => {
    setErrors({});
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setErrors({});
    setSelectedCustomer(null);
    setIsEditModalOpen(false);
  };

  const handleEditSubmit = async (updatedCustomer) => {
    console.log(updatedCustomer);

    setErrors({});
    try {
      Swal.fire({
        title: "Đang cập nhật...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await updateCustomer(updatedCustomer);
      Swal.close();
      if (response.status === 200) {
        Swal.fire({
          title: "Cập nhật thành công!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        closeEditModal();
        const { customers, error } = await getAllCustomers();
        if (error) {
          setError(error);
        } else {
          setCustomers(customers);
        }
      }
    } catch (error) {
      console.log(error.response);
      if (error.response?.data?.error) {
        setErrors(error.response.data.error);
      }
      Swal.close();
    }
  };

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Bạn có chắc chắn xóa không?",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Chắc chắn",
    });

    if (confirmResult.isConfirmed) {
      try {
        Swal.fire({
          title: "Đang xóa...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const response = await deleteCustomer(id);
        Swal.close();
        if (response.status === 200) {
          Swal.fire({
            title: "Xóa thành công!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
          const { customers, error } = await getAllCustomers();
          if (error) {
            setError(error);
          } else {
            setCustomers(customers);
          }
        }
      } catch (error) {
        console.error(error.response);
        Swal.fire({
          title: "Lỗi khi xóa!",
          text:
            error.response?.data?.error || "Đã xảy ra lỗi không xác định.",
          icon: "error",
        });
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="admin-title">Quản lí tải khoản</h3>
        <div className="d-flex">
          <input
            type="text"
            className="ip-zapxje me-2 rounded-0"
            placeholder="Tìm kiếm theo tên..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="btn-zapxje btn-zapxje-go">
            <i className="far fa-plus me-2"></i>Thêm người dùng
          </button>
        </div>
      </div>
      <div className="card rounded-0 border-0 shadow-sm">
        <div className="card-body">
          <table className="table text-center">
            <thead>
              <tr>
                <th className="text-center" colSpan="2">
                  Ảnh đại diện
                </th>
                <th>Tên đầy đủ</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {currentCustomers.length > 0 ? (
                currentCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td
                      className="text-center"
                      style={{ width: "50px" }}
                      colSpan={2}
                    >
                      <img
                        src={
                          customer.avatar ||
                          "https://res.cloudinary.com/dmped9z6o/image/upload/v1734469527/petsisters/images/avatar/default_avatart.png"
                        }
                        className="w-25"
                        alt="Customer Avatar"
                      />
                    </td>
                    <td>
                      <strong>{customer.full_name}</strong>
                    </td>
                    <td>{customer.email}</td>
                    <td>
                      {customer.role === 0 ? "Người dùng" : "Quản trị viên"}
                    </td>
                    <td>
                      Ngày: {new Date(customer.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        onClick={() => openEditModal(customer)}
                        className="btn btn-outline-warning btn-sm me-2"
                      >
                        <i className="fas fa-pencil fa-fw"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        <i className="fas fa-times fa-fw"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Không tìm thấy kết quả
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={Math.ceil(filteredCustomers.length / customersPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />

      {isEditModalOpen && (
        <Modal
          customer={selectedCustomer}
          onClose={closeEditModal}
          onSubmit={handleEditSubmit}
          errors={errors}
        />
      )}
    </div>
  );
};

export default AdminCustomer;
