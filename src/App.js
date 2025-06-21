import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import MyOrders from './pages/MyOrders';
import AdminOrders from './pages/AdminOrders';
import { getUser } from './api';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUser(response.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <div>
        <nav style={{ padding: '10px', background: '#f0f0f0' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" style={{ marginRight: '10px' }}>Admin</Link>}
              {user.role === 'admin' && <Link to="/admin-orders" style={{ marginRight: '10px' }}>Admin Orders</Link>}
              {user.role === 'user' && <Link to="/cart" style={{ marginRight: '10px' }}>Cart</Link>}
              {user.role === 'user' && <Link to="/my-orders" style={{ marginRight: '10px' }}>My Orders</Link>}
              <span style={{ marginRight: '10px' }}>Hello, {user.email}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
              <Link to="/register">Register</Link>
            </>
            
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/admin-orders" element={<AdminOrders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;