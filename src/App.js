import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import AdminOrders from './pages/AdminOrders';
import MyOrders from './pages/MyOrders';
import { getUser } from './api';
import './styles/App.css';

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
        <nav className="nav-bar">
          <div>
            <Link to="/">Home</Link>
            {user && user.role === 'admin' && (
              <>
                <Link to="/admin">Admin</Link>
                <Link to="/admin-orders">Admin Orders</Link>
              </>
            )}
            {user && user.role === 'user' && (
              <>
                <Link to="/cart">Cart</Link>
                <Link to="/my-orders">My Orders</Link>
              </>
            )}
          </div>
          <div>
            {user ? (
              <>
                <span>Hello, {user.email}</span>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
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