// pages/trang-cua-hang.js
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useProducts } from '../lib/api_product'; // Import the custom hook
import { useState } from 'react'; // Import useState

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Test = () => {
  const { products, loading, error } = useProducts(); // Use the custom hook
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [sortOrder, setSortOrder] = useState(''); // State for sort order

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter products by name
  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products by price
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price; // Từ thấp đến cao
    } else if (sortOrder === 'desc') {
      return b.price - a.price; // Từ cao đến thấp
    }
    return 0; // Không sắp xếp
  });

  return (
    <>
      <main>
        <section className="breadcrumb__area fix">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="breadcrumb__content">
                  <h3 className="title">Tất cả bài viết</h3>
                  <nav className="breadcrumb">
                    <span property="itemListElement" typeof="ListItem">
                      <Link href="index.html">Home</Link>
                    </span>
                    <span className="breadcrumb-separator"><i className="flaticon-right-arrow-angle"></i></span>
                    <span property="itemListElement" typeof="ListItem">All Blogs</span>
                  </nav>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="breadcrumb__img">
                  <img src="img/images/breadcrumb_img.png" alt="img" data-aos="fade-left" data-aos-delay="800" />
                </div>
              </div>
            </div>
          </div>
          <div className="breadcrumb__shape-wrap">
            <img src="img/images/breadcrumb_shape01.png" alt="img" data-aos="fade-down-right" data-aos-delay="400" />
            <img src="img/images/breadcrumb_shape02.png" alt="img" data-aos="fade-up-left" data-aos-delay="400" />
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
                    <h4 className="widget-title ">Sắp xếp theo giá</h4>
                    <select onChange={(e) => setSortOrder(e.target.value)} 
                    value={sortOrder}
                    style={{ backgroundColor: 'white', color: '#002169', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', width: '100%' , hover:'#002169'}}>
                      <option value="" style={{ backgroundColor: 'white', color: '#002169' ,}}>Chọn</option>
                      <option value="asc" style={{ backgroundColor: 'white', color: '#002169' }}>Giá: Thấp đến Cao</option>
                      <option value="desc" style={{ backgroundColor: 'white', color: '#002169' }}>Giá: Cao đến Thấp</option>
                    </select>
                    
                  </div>
                </aside>
              </div>

              <section className="product__area-four col-xl-9 col-lg-8">
                <div className="container">
                  <div className="row gutter-20 row-cols-1 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 justify-content-center">
                    {/* Render sorted products */}
                    {sortedProducts.map((product) => (
                      <div className="col" key={product.id}>
                        <div className="product__item">
                          <div className="product__thumb">
                            <Link href={`/chi-tiet-san-pham/${product.id}`}>
                              <img
                                src={`${API_URL}/storage/images/${product.image_url}`}
                                alt={product.product_name}
                              />
                            </Link>
                            <div className="product__action">
                              <Link href="#"><i className="flaticon-love"></i></Link>
                              <Link href="#"><i className="flaticon-loupe"></i></Link>
                              <Link href="#"><i className="flaticon-exchange"></i></Link>
                            </div>
                            <div className="sale-wrap">
                              <span>Mới</span>
                            </div>
                            <div className="product__add-cart">
                              <Link href="/gio-hang" className="btn">
                                <i className="flaticon-shopping-bag"></i>Thêm vào giỏ
                              </Link>
                            </div>
                            {/* Hiển thị danh sách hình ảnh sản phẩm */}
                            <div className="product__images">
                              {product.images && product.images.map((image) => (
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
                    ))}
                  </div>

                  {/* Pagination */}
                  <nav className="pagination__wrap mt-50">
                    <ul className="list-wrap">
                      <li className="link-arrow">
                        <Link href="#">
                          <img src="/img/icon/pagination_icon01.svg" alt="Previous Page" className="injectable" />
                        </Link>
                      </li>
                      <li className="active"><Link href="#">1</Link></li>
                      <li><Link href="#">2</Link></li>
                      <li><Link href="#">3</Link></li>
                      <li><Link href="#">4</Link></li>
                      <li className="link-arrow">
                        <Link href="#">
                          <img src="/img/icon/pagination_icon02.svg" alt="Next Page" className="injectable" />
                        </Link>
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
}

export default Test;