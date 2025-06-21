import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../api';
import '../styles/AdminOrder.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getOrders();
        console.log('Fetched orders data:', response.data); // Debug dữ liệu từ API
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(`Failed to fetch orders: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      console.log(`Attempting to update order ${orderId} to status: ${status}`);
      const response = await updateOrderStatus(orderId, status);
      console.log('Update response:', response.data);
      const updatedOrders = orders.map(order =>
        order._id === orderId ? { ...order, status } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      console.error('Error updating order status:', err);
      alert(`Failed to update order status: ${err.message}`);
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container" style={{ color: '#e74c3c' }}>{error}</div>;

  return (
    <div className="container">
      <h1>Quản lý đơn hàng</h1>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <h3>Đơn hàng #{order._id}</h3>
            <p><strong>Người dùng:</strong> {order.userId?.email || 'Unknown User'}</p>
            <p><strong>Tổng:</strong> <span className="price">{order.total} VND</span></p>
            <div>
              <strong>Trạng thái:</strong>
              <select
                value={order.status || 'pending'} // Giá trị mặc định nếu status undefined
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="status-select"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <p><strong>Thông tin khách hàng:</strong> {order.customerInfo?.name || 'N/A'}, {order.customerInfo?.address || 'N/A'}, {order.customerInfo?.phone || 'N/A'}</p>
            <h4>Sản phẩm:</h4>
            <ul>
              {order.items?.map(item => (
                <li key={item._id}>
                  <span>{item.productId?.name || 'Unknown Product'} x {item.quantity}</span>
                  <span>{(item.quantity * (item.productId?.price || 0)) || 'N/A'} VND</span>
                </li>
              )) || <li>No items</li>}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;