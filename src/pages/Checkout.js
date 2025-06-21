import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, getCart, getMyOrders } from '../api';
import '../styles/Checkout.css';

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
    if (!cart || !cart.items || cart.items.length === 0) {
      alert('Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.');
      return;
    }

    try {
      await createOrder({ customerInfo, items: cart.items });
      alert('Order placed successfully');
      const response = await getMyOrders();
      const latestOrder = response.data[response.data.length - 1];
      setOrderStatus(latestOrder.status);
      setCart({ ...cart, items: [] });
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Error placing order: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container">
      <h1>Thanh toán</h1>
      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="checkout-form">
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
        {cart && cart.items && cart.items.length > 0 && (
          <div className="cart-summary">
            <h3>Giỏ hàng:</h3>
            <ul>
              {cart.items.map(item => (
                <li key={item.productId._id}>
                  <img src={item.productId.image || 'https://via.placeholder.com/50'} alt={item.productId.name} style={{ width: '50px', marginRight: '10px' }} />
                  <span>{item.productId.name} x {item.quantity}</span>
                  <span>{item.quantity * item.productId.price} VND</span>
                </li>
              ))}
            </ul>
            <p className="total">
              Tổng: {cart.items.reduce((sum, item) => sum + item.quantity * item.productId.price, 0)} VND
            </p>
          </div>
        )}
      </div>
      {orderStatus && (
        <div className="order-status">
          <h2>Trạng thái đơn hàng: {orderStatus}</h2>
        </div>
      )}
    </div>
  );
};

export default Checkout;