import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../api';
import '../styles/AdminOrder.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      const updatedOrders = orders.map(order =>
        order._id === orderId ? { ...order, status } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Quản lý đơn hàng</h1>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <h3>Đơn hàng #{order._id}</h3>
            <p><strong>Người dùng:</strong> {order.userId.email}</p>
            <p><strong>Tổng:</strong> <span className="price">{order.total} VND</span></p>
            <div>
              <strong>Trạng thái:</strong>
              <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
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

export default AdminOrders;