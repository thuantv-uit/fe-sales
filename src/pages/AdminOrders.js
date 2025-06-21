import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../api';

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
    <div style={{ padding: '20px' }}>
      <h1>Quản lý đơn hàng</h1>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>Đơn hàng #{order._id}</h3>
            <p>Người dùng: {order.userId.email}</p>
            <p>Tổng: {order.total} VND</p>
            <p>Trạng thái: {order.status}</p>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <p>Thông tin khách hàng: {order.customerInfo.name}, {order.customerInfo.address}, {order.customerInfo.phone}</p>
            <h4>Sản phẩm:</h4>
            <ul>
              {order.items.map(item => (
                <li key={item._id}>
                  {item.productId.name} x {item.quantity} = {item.quantity * item.productId.price} VND
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