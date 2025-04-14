export default function NotAuthorized() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>403 - Không có quyền truy cập</h1>
      <p>Bạn không có quyền truy cập vào trang này.</p>
      <a href="/">Quay về trang chủ</a>
    </div>
  );
}
