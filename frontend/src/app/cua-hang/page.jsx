"use client";
import Link from "next/link";
import { useProducts } from "../lib/api_product"; // Import custom hook for products
import { useCategories } from "../lib/api_category"; // Import custom hook for categories
import { useState } from "react"; // Import useState
import "./cua-hang.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ITEMS_PER_PAGE = 6; // Set the number of items per page

const Test = () => {
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const [searchTerm, setSearchTerm] = useState(""); // searchTerm được khởi tạo với giá trị ban đầu là một chuỗi rỗng Khi gọi setSearchTerm(newValue), React sẽ cập nhật trạng thái và render lại component với giá trị mới của searchTerm
  const [sortOrder, setSortOrder] = useState(""); // giá giảm tăng
  const [selectedCategory, setSelectedCategory] = useState(null); // lọc sản phẩm theo danh mục
  const [currentPage, setCurrentPage] = useState(1); // phân trang

  if (productsLoading || categoriesLoading) return <div>Loading...</div>;
  if (productsError) return <div>Error loading products: {productsError}</div>;
  if (categoriesError)
    return <div>Error loading categories: {categoriesError}</div>;

  // Filter products by search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.product_name
      .toLowerCase() //  biến tên sp thành chữ thường
      .includes(searchTerm.toLowerCase());   
    const matchesCategory =
      !selectedCategory || product.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products by price
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price; 
    if (sortOrder === "desc") return b.price - a.price;
    return 0; // No sorting
  });

  // Calculate total pages
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  // Paginate products
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };


  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to page 1 when category changes
  };
  const filteredCategories = categories.filter(
    (category) => category.category_type === "product"
  );
  
  return (
    <>
      <main>
        <section className="breadcrumb__area fix">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="breadcrumb__content">
                  <h3 className="title">Tất cả sản phẩm</h3>
                  <nav className="breadcrumb">
                    <span property="itemListElement" typeof="ListItem">
                      <Link href="index.html">Trang chủ</Link>
                    </span>
                    <span className="breadcrumb-separator"><i className="flaticon-right-arrow-angle"></i></span>
                    <span property="itemListElement" typeof="ListItem">Sản phẩm</span>
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

        <section className="blog__area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4">
                <aside className="blog-sidebar">
                  <div className="blog-widget">
                    <h4 className="widget-title">Tìm kiếm</h4>
                    <div className="sidebar-search-form">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input
                          type="text"
                          placeholder="Nhập tên sản phẩm..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </form>
                    </div>
                  </div>
                  <div className="store-widget">
                    <h4 className="widget-title">Sắp xếp theo giá</h4>
                    <select
                      onChange={(e) => setSortOrder(e.target.value)}
                      value={sortOrder}
                      style={{
                        backgroundColor: "white",
                        color: "#002169",
                        border: "1px solid #ccc",
                        padding: "10px",
                        borderRadius: "4px",
                        width: "100%",
                      }}
                    >
                      <option value="">Chọn</option>
                      <option value="asc">Giá: Thấp đến Cao</option>
                      <option value="desc">Giá: Cao đến Thấp</option>
                    </select>
                  </div>
                  <div className="store-widget">
                    <h4 className="widget-title">Danh mục</h4>
                    <ul>
                      <li
                        className={!selectedCategory ? "active" : ""}
                        onClick={() => handleCategorySelect(null)}
                      >
                        Tất cả
                      </li>
                      {filteredCategories.map((category) => (
                        <li
                          key={category.id}
                          className={
                            selectedCategory === category.id ? "active" : ""
                          }
                          onClick={() => handleCategorySelect(category.id)}
                        >
                          {category.category_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </div>

              <section className="product__area-four col-xl-9 col-lg-8">
                <div className="container">
                  <div className="row gutter-20 row-cols-1 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 justify-content-center">
                    {/* Render paginated products */}
                    {paginatedProducts.length === 0 ? (
                      <div className="col-12 text-center">
                        <div className="no-products">
                          <p>Không tìm thấy sản phẩm</p>
                        </div>
                      </div>):(
                    paginatedProducts.map((product) => (
                      <div className="col-lg-4 col-md-6" key={product.id}>
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
                                <i className="flaticon-shopping-bag"></i>Thêm
                                vào giỏ
                              </Link>
                            </div>
                            <div className="product__images">
                              {product.images &&
                                product.images.map((image) => (
                                  <img
                                    key={image.id}
                                    src={`/img/products/${image.image_url}`}
                                    alt={`Image ${image.id}`}
                                    className="product__image"
                                  />
                                ))}
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
                    )))}
                  </div>
                        
                  {/* Pagination */}
                  <nav className="pagination__wrap mt-50">
                    <ul className="pagination justify-content-center">
                      {/* Previous page */}
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          aria-label="Previous"
                        >
                          <img
                            src="/img/icon/pagination_icon01.svg"
                            alt="Previous Page"
                            className="injectable"
                          />
                        </button>
                      </li>

                      {/* Display page numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <li
                            key={page}
                            className={`page-item ${
                              currentPage === page ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          </li>
                        )
                      )}

                      {/* Next page */}
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          aria-label="Next"
                        >
                          <img
                            src="/img/icon/pagination_icon02.svg"
                            alt="Next Page"
                            className="injectable"
                          />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Test;
