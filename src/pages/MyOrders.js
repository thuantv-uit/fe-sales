import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../api';
import '../styles/MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getMyOrders();
        setOrders(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h1>Đơn hàng của tôi</h1>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <h3>Đơn hàng #{order._id}</h3>
            <p><strong>Tổng:</strong> <span className="price">{order.total} VND</span></p>
            <p>
              <strong>Trạng thái:</strong>
              <span className={`status-${order.status}`}>{order.status}</span>
            </p>
            <p><strong>Thông tin khách hàng:</strong> {order.customerInfo.name}, {order.customerInfo.address}, {order.customerInfo.phone}</p>
            <h4>Sản phẩm:</h4>
            <ul>
              {order.items.map(item => (
                <li key={item._id}>
                  <span>{item.productId.name} x {item.quantity}</span>
                  <span>{item.quantity * item.productId.price} VND</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;