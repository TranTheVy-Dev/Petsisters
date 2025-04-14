"use client"
import Link from "next/link";
import moment from 'moment';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
async function getPostdetail(id) {
    const dataPost = await fetch(`${API_URL}/api/web/post/${id}`, {
        cache: 'no-cache'
    });
    const { data : postDetail } = await dataPost.json()
    return postDetail
}
async function getPost() {
    const response = await fetch(`${API_URL}/api/web/post`, {
        cache: 'no-cache',
    });
    const {data : datapost} = await response.json();
    return datapost
}
async function getComment(id) {
    const response = await axios.get(`${API_URL}/api/web/comment/${id}`)
    const datacomment = await response.data.data;
    return datacomment;
}
export default function BlogDetail({ params }) {
    const [comment, setComment] = useState("");

    const [datapost, setpost] = useState(null);
    const [postDetail, setPostdetail] = useState(null);
    const [datacomment, setDatacomment] = useState(null);
    const [loading, setLoading] = useState(true);
    const customer = localStorage.getItem("customer");
    const customerdata = JSON.parse(customer);


    const router = useRouter();

    useEffect(() => {
        const fetchdata = async () => {
           const dataParams = await params;
           const id = dataParams.id;

            const getdataposts = await getPost()
            const getonepost = await getPostdetail(id)
            const getdatacomment = await getComment(id)

      
            setpost(getdataposts)
            setPostdetail(getonepost)
            setDatacomment(getdatacomment)
            setLoading(false);

        }
        fetchdata()
    }, [params]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        //reset lai cmt sau khi submit
        const customer = localStorage.getItem("customer");
        try {
            if (!customer) {
              localStorage.setItem('redirectURL', window.location.href)
              Swal.fire({
                title: 'Thông báo',
                text: 'Bạn Phải đăng nhập mới sử dụng được dịch vụ này ',
                icon: 'info',
                confirmButtonColor: 'YES',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showCancelButton: false,
                focusConfirm: true,
                focusCancel: false,
                didClose: () => {
                  router.push('/dang-nhap')
                }
              })
              return false //chưa đăng nhập
            }
          } catch (error) {
            console.log('lỗi rồi cha ơi', error);
          }
        let email, full_name;
        try {
            const customerdata = JSON.parse(customer);
            email = customerdata.email
            full_name = customerdata.full_name
        } catch (error) {
            console.log('không tìm thấy người dùng');
        };
        const commentdata = {
            blog_id: postDetail.id,
            email,
            comment,
            full_name
        }
        try {
            const response = await axios.post(`${API_URL}/api/web/comment`, commentdata)
            if (response) {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Cảm ơi về Bình Luận của bạn',
                    didClose: () => {
                        router.replace(`/chi-tiet-tin-tuc/${commentdata.blog_id}`)
                    }
                })
            }
        } catch (error) {
            Swal.fire({
                title: 'Có gì đó sai sai',
                text: "Vui Lòng kiểm tra mạng hoặc kiểm tra lại mình đã nhập đầy đủ from chưa !",
                icon: 'error'
            })
        }
        setComment("");
    }
    if (loading) {
        return <div>Loading...</div>;
      }
    return (
        <>
            <main>
                <section className="breadcrumb__area fix">
                    <div className="container">
                        <div className="row align-items-end">
                            <div className="col-lg-8">
                                <div className="breadcrumb__content">
                                    <h3 className="title">Chi tiết bài viết</h3>
                                    <nav className="breadcrumb">
                                        <span property="itemListElement" typeof="ListItem">
                                            <Link href="index.html">Home</Link>
                                        </span>
                                        <span className="breadcrumb-separator"><i className="flaticon-right-arrow-angle"></i></span>
                                        <span property="itemListElement" typeof="ListItem">Blog Details</span>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="breadcrumb__img">
                                    <img src="./img/images/breadcrumb_img.png" alt="img" data-aos="fade-left" data-aos-delay="800" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="breadcrumb__shape-wrap">x
                        <img src="./img/images/breadcrumb_shape01.png" alt="img" data-aos="fade-down-right" data-aos-delay="500" />
                        <img src="./img/images/breadcrumb_shape02.png" alt="img" data-aos="fade-up-left" data-aos-delay="500" />
                    </div>
                </section>

                <section className="blog__details-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            {/* render chi tiet biet ra day nha bro */}
                            <div className="col-xl-9 col-lg-8 order-0 order-lg-2">
                                <div className="blog__details-wrap">
                                    <div className="blog__details-thumb">
                                        <img src={`${postDetail.image}`} alt="img" />
                                    </div>
                                    <div className="blog__details-content">
                                        <h2 className="title">{postDetail.title}</h2>
                                        <div className="blog__post-meta">
                                            <ul className="list-wrap">
                                                <li><i className="flaticon-user"></i>by <Link href="blog-details.html">admin</Link></li>
                                                {/* hàm format date sử dụng từ thư viện npm với tên là moment (nhớ import moment nha) */}
                                                <li><i className="flaticon-calendar"></i>{moment(postDetail.created_at).format("DD/MM/YYYY")}</li>
                                                <li>
                                                    <i className="fas fa-tags"></i>
                                                    <Link href="blog.html">{postDetail.tags}</Link>
                                                </li>
                                                <li><i className="far fa-comment-alt"></i><Link href="blog-details.html">{datacomment.length} Comment</Link></li>
                                            </ul>
                                        </div>
                                        {/* <p>dangerouslySetInnerHTML={{ __html: post.content }}</p> */}
                                        <p dangerouslySetInnerHTML={{ __html: postDetail.content }}></p>
                                        {/* <blockquote>
                                            <p>“ urabitur varius eros rutrum consequat Mauris aewa sollicitudin enim condimentum luctus enim justo non molestie nisl ”</p>
                                        </blockquote>
                                        <h4 className="title-two">Rediscovering The Joy Of Design</h4>
                                        <p>When an unknown printer took a galley of type and scrambled it to make a type specimen bookhas a not awertolw only five centuries, but also the leap into electronic typesetting, remaining essentially unchan galley of type and scrambled it to make a type specimen book.</p>
                                        <div className="blog__details-inner-wrap">
                                            <div className="row align-items-center">
                                                <div className="col-54">
                                                    <div className="content">
                                                        <h3 className="title-two">Revealing Images With CSS Mask Animations</h3>
                                                        <p>When an unknown printer took a galley type remaining essentially unchan galley of type and scrambled it to make a type specimen book.</p>
                                                        <ul className="list-wrap">
                                                            <li><i className="fas fa-arrow-right"></i>Medicare Advantage Plans</li>
                                                            <li><i className="fas fa-arrow-right"></i>Analysis & Research</li>
                                                            <li><i className="fas fa-arrow-right"></i>100% Secure Money Back</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-46">
                                                    <div className="thumb">
                                                        <img src="/img/blog/blog_details_img02.jpg" alt="" />
                                                        <Link href="https://www.youtube.com/watch?v=XdFfCPK5ycw" className="play-btn popup-video"><i className="fas fa-play"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p>When an unknown printer took a galley of type and scrambled it to make a type specimen bookhas a not only five centuries, but also the leap into electronic typesetting, remaining essentially unchan galley of type and scrambled it to make a type specimen book.</p> */}
                                        <div className="blog__details-content-bottom">
                                            <div className="row align-items-center">
                                                <div className="col-md-7">
                                                    <div className="post-tags">
                                                        <h5 className="title">Tags:</h5>
                                                        <ul className="list-wrap">
                                                            <li><Link href="#">{postDetail.tags}</Link></li>

                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="blog-post-share">
                                                        <h5 className="title">Share:</h5>
                                                        <ul className="list-wrap">
                                                            <li><Link href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></Link></li>
                                                            <li><Link href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i></Link></li>
                                                            <li><Link href="https://www.whatsapp.com/" target="_blank"><i className="fab fa-whatsapp"></i></Link></li>
                                                            <li><Link href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></Link></li>
                                                            <li><Link href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube"></i></Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog-avatar-wrap">
                                </div>
                                <div className="comments-wrap">
                                    <h3 className="comments-wrap-title">Bình Luận bài viết</h3>
                                    <div className="latest-comments">
                                        <ul className="list-wrap">
                                        <li>
                                                {
                                                datacomment.length === 0 ? (
                                                    <div className="left-rc">
                                                      <p>No Comment</p>
                                                    </div>
                                                  ) : (
                                                datacomment.map((comment) => (
                                                <div className="comments-box" key={datacomment.id}>
                                                    <div className="comments-avatar">
                                                        <img src={ customerdata?.avatar || "/img/blog/comment01.png"} alt="img" />
                                                    </div>
                                                    <div className="comments-text">
                                                        <div className="avatar-name">
                                                            <h6 className="name">{comment.full_name} ( {comment.email} )</h6>
                                                            <span className="date">{moment(comment.created_at).format("DD/MM/YYYY")}</span>
                                                        </div>
                                                        <p>{comment.comment}</p>
                                                    </div>
                                                </div>
                                            ))
                                            )}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <form className="comment-form mt-4" onSubmit={handleSubmit}>
                                    <h3 className="comment-reply-title">Bình Luận về Bài viết này  này</h3>
                                    <p className="comment-notes">
                                        Email của bạn sẽ không được công khai. Các trường bắt buộc được đánh dấu *
                                    </p>
                                    <div className="form-group mb-3">
                                        <textarea
                                            name="comment"
                                            className="form-control"
                                            rows="5"
                                            placeholder="Viết nhận xét của bạn *"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Gửi Bình Luận
                                    </button>
                                </form>
                            </div>

                            {/* from post comment */}

                            {/* render chi tiet biet ra day nha bro */}
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
                                            {datapost.map((listpost) => (
                                                <div className="rc-post-item" key={listpost.id}>
                                                    <div className="thumb">
                                                        <Link href={`../chi-tiet-tin-tuc/${listpost.id}`}><img src={`${listpost.image}`} alt="img" /></Link>

                                                    </div>
                                                    <div className="content">
                                                        <h4 className="title"><Link href={`../chi-tiet-tin-tuc/${listpost.id}`}>{listpost.title}</Link></h4>
                                                        <span className="date"><i className="flaticon-calendar"></i>{moment(listpost.created_at).format("DD/MM/YYYY")}</span>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="blog-widget">
                                        <h4 className="widget-title">Tags</h4>
                                        <div className="sidebar-tag-list">
                                            <ul className="list-wrap">
                                                {datapost.map((postTags) => (
                                                    <li><Link href="#">{postTags.tags}</Link></li>
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
}