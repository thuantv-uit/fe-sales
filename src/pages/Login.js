import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thay useHistory bằng useNavigate
import { login } from '../api';
import '../styles/Auth.css'; // Import your CSS file for styling

const Login = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(form);
      localStorage.setItem('token', response.data.token);
      navigate('/'); // Thay history.push bằng navigate
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  return (
    <div className='auth-container'>
      <h1>Đăng nhập</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;