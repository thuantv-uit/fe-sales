import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeFromCart } from '../api';

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        setCart(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      const response = await removeFromCart(productId);
      setCart(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!cart) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Giỏ hàng</h1>
      {cart.items.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          {cart.items.map(item => (
            <div key={item.productId._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{item.productId.name}</h3>
              <p>Số lượng: {item.quantity}</p>
              <p>Giá: {item.productId.price * item.quantity} VND</p>
              <button onClick={() => handleRemove(item.productId._id)}>Xóa</button>
            </div>
          ))}
          <Link to="/checkout">Thanh toán</Link>
        </>
      )}
    </div>
  );
};

export default Cart;