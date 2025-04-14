import Link from "next/link";
import Image from "next/image";
import moment from "moment";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchBlog = async () => {
  const response = await fetch(`${API_URL}/api/web/post`, {
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error("can not get data of post");
  }
  const post = await response.json();
  return post.data;
};
const Blog = async () => {
  let dataPost = [];
  try {
    dataPost = await fetchBlog();
  } catch (error) {
    console.error("loi roi kia cha noi", error);
  }
  const truncateContent = (content, maxLength = 100) => {
    // Nếu nội dung có thể dài, chúng ta sẽ cắt bớt văn bản, đảm bảo HTML không bị ảnh hưởng
    const textContent = content.replace(/<[^>]*>/g, ""); // Loại bỏ các thẻ HTML
    if (textContent.length > maxLength) {
      return content.slice(0, maxLength) + "...";
    }
    return content;
  };
  return (
    <>
      <main>
        <section className="breadcrumb__area fix">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="breadcrumb__content">
                  <h3 className="title">
                    Tin tức <i className="fa fa-newspaper"></i>
                  </h3>
                  <nav className="breadcrumb">
                    <span property="itemListElement" typeof="ListItem">
                      <Link href="/">Trang chủ</Link>
                    </span>
                    <span className="breadcrumb-separator">
                      <i className="flaticon-right-arrow-angle"></i>
                    </span>
                    <span property="itemListElement" typeof="ListItem">
                      Tin tức
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

        <section className="blog__area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-xl-9 col-lg-8 order-0 order-lg-2">
                <div className="row">
                  {/* render ra day */}
                  {dataPost.map((post) => (
                    <div className="col-md-6" key={post.id}>
                      <div className="blog__post-item-three blog__post-item-five shine-animate-item">
                        <div className="blog__post-thumb-three blog__post-thumb-five shine-animate">
                          <Link href={`chi-tiet-tin-tuc/${post.id}`}>
                            <img src={`${post.image}`} alt="img" />
                          </Link>
                          <ul className="list-wrap blog__post-tag blog__post-tag-two">
                            <li>
                              <Link href="blog.html">{post.tags}</Link>
                            </li>
                          </ul>
                        </div>
                        <div className="blog__post-content-three">
                          <div className="blog__post-meta">
                            <ul className="list-wrap">
                              <li>
                                <i className="flaticon-calendar"></i>
                                {moment(post.created_at).format("DD/MM/YYYY")}
                              </li>
                              <li>
                                <i className="flaticon-user"></i>by{" "}
                                <Link href="blog-details.html">admin</Link>
                              </li>
                            </ul>
                          </div>
                          <h2 className="title">
                            <Link href="blog-details.html">{post.title}</Link>
                          </h2>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: truncateContent(post.content, 150),
                            }}
                          ></p>{" "}
                          {/* Cắt bớt nội dung HTML */}
                          <Link
                            href={`chi-tiet-tin-tuc/${post.id}`}
                            className="btn"
                          >
                            Xem Thêm
                            <img
                              src="img/icon/right_arrow.svg"
                              alt=""
                              className="injectable"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <nav className="pagination__wrap mt-50">
                  <ul className="list-wrap">
                    <li className="link-arrow">
                      <Link href="#">
                        <img
                          src="img/icon/pagination_icon01.svg"
                          alt=""
                          className="injectable"
                        />
                      </Link>
                    </li>
                    <li className="active">
                      <Link href="#">1</Link>
                    </li>
                    <li>
                      <Link href="courses.html">2</Link>
                    </li>
                    <li>
                      <Link href="courses.html">3</Link>
                    </li>
                    <li>
                      <Link href="courses.html">4</Link>
                    </li>
                    <li className="link-arrow">
                      <Link href="#">
                        <img
                          src="img/icon/pagination_icon02.svg"
                          alt=""
                          className="injectable"
                        />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-xl-3 col-lg-4">
                <aside className="blog-sidebar">
                  <div className="blog-widget">
                    <h4 className="widget-title">Search</h4>
                    <div className="sidebar-search-form">
                      <form action="#">
                        <input type="text" placeholder="Type Keywords. . ." />
                        <button type="submit">
                          <i className="flaticon-loupe"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="blog-widget">
                    <h4 className="widget-title">Bài viết mới</h4>
                    <div className="rc-post-wrap">
                      {dataPost.map((post) => (
                        <div className="rc-post-item" key={post.id}>
                          <div className="thumb">
                            <Link href={`chi-tiet-tin-tuc/${post.id}`}>
                              <img src={`${post.image}`} alt="img" />
                            </Link>
                          </div>
                          <div className="content">
                            <h4 className="title">
                              <Link href={`chi-tiet-tin-tuc/${post.id}`}>
                                {post.title}
                              </Link>
                            </h4>
                            <span className="date">
                              <i className="flaticon-calendar"></i>
                              {moment(post.created_at).format("DD/MM/YYYY")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="blog-widget">
                    <h4 className="widget-title">Tags</h4>
                    <div className="sidebar-tag-list">
                      <ul className="list-wrap">
                        {dataPost.map((post) => (
                          <li>
                            <Link href="#" key={post.id}>
                              {post.tags}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default Blog;
