'use client';
import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { removeFromCart, updateCartItemQuantity, setCartItems } from '@/redux/slices/cartslices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../lib/securitypage';
const CartPage = () => {
  const cartItems = useSelector((state) => state.cart?.items) || [];
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch('/api/web/product');
        if (!response.ok) throw new Error('Failed to fetch cart items');

        const data = await response.json();
        dispatch(setCartItems(data.items)); // Hợp nhất sản phẩm mới
      } catch (error) {
      }
    };

    fetchCartData();
  }, [dispatch]);

  const total = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleCheckout = () => {
    toast.success('Bạn sẽ được chuyển đến trang thanh toán');
useAuth();
    setTimeout(() => {
      router.push('/thanh-toan');
    }, 1000);
  };

  return (
    <div className="container mt-3">
      <h1>Giỏ Hàng</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Giá</th>
            <th scope="col">Thành tiền</th>
            <th scope="col">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.product_name}</td>
              <td>
                <input
                  min="1"
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(updateCartItemQuantity({ id: item.id, quantity: parseInt(e.target.value) }))
                  }
                />
              </td>
              <td>{item.price.toLocaleString()}</td>
              <td>{(item.price * item.quantity).toLocaleString()}</td>
              <td>
                <button className="btn btn-danger" onClick={() => dispatch(removeFromCart(item.id))}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          <tr className="table-primary">
            <td colSpan="3">Tổng cộng</td>
            <td>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            <td>
              <button className="btn btn-primary" onClick={handleCheckout}>
                Thanh toán
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default CartPage;
