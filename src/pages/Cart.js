import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeFromCart } from '../api';
import '../styles/Cart.css';

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

  if (!cart) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1>Giỏ hàng</h1>
      {cart.items.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <div>
            {cart.items.map(item => (
              <div key={item.productId._id} className="cart-item">
                <div>
                  <h3>{item.productId.name}</h3>
                  <p>Số lượng: {item.quantity}</p>
                  <p className="price">Giá: {item.productId.price * item.quantity} VND</p>
                </div>
                <button onClick={() => handleRemove(item.productId._id)}>Xóa</button>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/checkout" className="checkout-button">Thanh toán</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;