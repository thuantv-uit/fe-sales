import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../api';

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
    <div style={{ padding: '20px' }}>
      <h1>Đơn hàng của tôi</h1>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>Đơn hàng #{order._id}</h3>
            <p>Tổng: {order.total} VND</p>
            <p>Trạng thái: {order.status}</p>
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

export default MyOrders;