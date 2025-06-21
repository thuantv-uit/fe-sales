import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, getCart, getMyOrders } from '../api';

const Checkout = () => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const [cart, setCart] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

  // Lấy dữ liệu giỏ hàng khi component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        setCart(response.data);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };
    fetchCart();
  }, []);

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart || !cart.items || cart.items.length === 0) { // Đảm bảo dùng 'cart'
      alert('Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.');
      return;
    }

    try {
      // Gửi cả customerInfo và dữ liệu giỏ hàng
      await createOrder({ customerInfo, items: cart.items });
      alert('Order placed successfully');

      // Cập nhật trạng thái đơn hàng mới nhất
      const response = await getMyOrders();
      const latestOrder = response.data[response.data.length - 1];
      setOrderStatus(latestOrder.status);

      // Xóa giỏ hàng sau khi đặt hàng thành công (tùy chọn)
      setCart({ ...cart, items: [] });
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Error placing order: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Thanh toán</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Họ tên:</label>
          <input type="text" name="name" value={customerInfo.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Địa chỉ:</label>
          <input type="text" name="address" value={customerInfo.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Số điện thoại:</label>
          <input type="text" name="phone" value={customerInfo.phone} onChange={handleChange} required />
        </div>
        <button type="submit">Xác nhận đơn hàng</button>
      </form>
      {orderStatus && (
        <div style={{ marginTop: '20px' }}>
          <h2>Trạng thái đơn hàng: {orderStatus}</h2>
        </div>
      )}
      {cart && cart.items && cart.items.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Giỏ hàng:</h3>
          <ul>
            {cart.items.map(item => (
              <li key={item.productId._id}>
                {item.productId.name} x {item.quantity} = {item.quantity * item.productId.price} VND
              </li>
            ))}
          </ul>
          <p>Tổng: {cart.items.reduce((sum, item) => sum + item.quantity * item.productId.price, 0)} VND</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;