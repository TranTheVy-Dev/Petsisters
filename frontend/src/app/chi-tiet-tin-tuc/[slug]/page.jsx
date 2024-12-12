import Link from "next/link";
import moment from 'moment';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
async function getPostdetail(slug) {
    const dataPost = await fetch(`${API_URL}/api/web/post/${slug}`, {
        cache: 'no-cache'
    });
    
    const { data: postDetail } = await dataPost.json()
    return postDetail
}
async function getPost() {
    const response = await fetch(`${API_URL}/api/web/post`, {
        cache: 'no-cache',
    });
    if (!response.ok) {
        throw new Error("can not get data of post")
    }
    const post = await response.json();
    return post.data
}
export default async function BlogDetail({ params }) {
    const { slug } = await params
    const post = await getPostdetail(slug)
    let dataPost = []
    try {
        dataPost = await getPost()
    } catch (error) {
        console.error("loi roi kia cha noi oi", error)
        console.log("du lieu cua list post ne", dataPost);
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
                                        <img src={`${post.image}`} alt="img" />
                                    </div>
                                    <div className="blog__details-content">
                                        <h2 className="title">{post.title}</h2>
                                        <div className="blog__post-meta">
                                            <ul className="list-wrap">
                                                <li><i className="flaticon-user"></i>by <Link href="blog-details.html">admin</Link></li>
                                                {/* hàm format date sử dụng từ thư viện npm với tên là moment (nhớ import moment nha) */}
                                                <li><i className="flaticon-calendar"></i>{moment(post.created_at).format("DD/MM/YYYY")}</li>
                                                <li>
                                                    <i className="fas fa-tags"></i>
                                                    <Link href="blog.html">{post.tags}</Link>

                                                </li>
                                                <li><i className="far fa-comment-alt"></i><Link href="blog-details.html">05 Comments</Link></li>
                                            </ul>
                                        </div>
                                        {/* <p>dangerouslySetInnerHTML={{ __html: post.content }}</p> */}
                                        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
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
                                                            <li><Link href="#">{post.tags}</Link></li>

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
                                    <div className="blog-avatar-img">
                                        <Link href="team-details.html"><img src="/img/blog/avatar.png" alt="img" /></Link>
                                    </div>
                                    <div className="blog-avatar-info">
                                        <span className="designation">Author</span>
                                        <h4 className="name"><Link href="#">Parker Willy</Link></h4>
                                        <p>Finanappreciate your trust greatly Our clients choose dentace ducr emaining  essential yearl ow we are the best area Awaitingare really.</p>
                                    </div>
                                </div>
                                <div className="comments-wrap">
                                    <h3 className="comments-wrap-title">02 Comments</h3>
                                    <div className="latest-comments">
                                        <ul className="list-wrap">
                                            <li>
                                                <div className="comments-box">
                                                    <div className="comments-avatar">
                                                        <img src="/img/blog/comment01.png" alt="img" />
                                                    </div>
                                                    <div className="comments-text">
                                                        <div className="avatar-name">
                                                            <h6 className="name">Jessica Rose</h6>
                                                            <span className="date">December 27, 2023</span>
                                                        </div>
                                                        <p>Finanappreciate your trust greatly Our clients choose dentace ducts because know we are the best area Awaitingare really.</p>
                                                        <Link href="#" className="reply-btn">Reply</Link>
                                                    </div>
                                                </div>
                                                <ul className="children">
                                                    <li>
                                                        <div className="comments-box">
                                                            <div className="comments-avatar">
                                                                <img src="/img/blog/comment02.png" alt="img" />
                                                            </div>
                                                            <div className="comments-text">
                                                                <div className="avatar-name">
                                                                    <h6 className="name">Parker Willy</h6>
                                                                    <span className="date">December 28, 2023</span>
                                                                </div>
                                                                <p>Finanappreciate your trust greatly Our clients choose dentace ducts because know we are the best area Awaitingare really.</p>
                                                                <Link href="#" className="reply-btn">Reply</Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="comment-respond">
                                    <h3 className="comment-reply-title">Post a comment</h3>
                                    <form action="#" className="comment-form">
                                        <p className="comment-notes">Your email address will not be published. Required fields are marked *</p>
                                        <div className="form-grp">
                                            <textarea name="comment" placeholder="Comment"></textarea>
                                        </div>
                                        <div className="row gutter-20">
                                            <div className="col-md-4">
                                                <div className="form-grp">
                                                    <input type="text" placeholder="Name" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-grp">
                                                    <input type="email" placeholder="Email" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-grp">
                                                    <input type="url" placeholder="Website" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-grp checkbox-grp">
                                            <input type="checkbox" id="checkbox" />
                                            <label htmlFor="checkbox">
                                                Save my name, email, and website in this browser for the next time I comment.
                                            </label>
                                        </div>

                                        <button type="submit" className="btn">Read More <img src="/img/icon/right_arrow.svg" alt="" className="injectable" /></button>
                                    </form>
                                </div>
                            </div>
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
                                            {dataPost.map((listpost) => (
                                                <div className="rc-post-item" key={listpost.id}>
                                                    <div className="thumb">
                                                    <Link href={`../chi-tiet-tin-tuc/${listpost.slugs}`}><img src={`${listpost.image}`} alt="img" /></Link>

                                                    </div>
                                                    <div className="content">
                                                        <h4 className="title"><Link href={`../chi-tiet-tin-tuc/${listpost.slugs}`}>{listpost.title}</Link></h4>
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
                                                {dataPost.map((postTags) => (
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