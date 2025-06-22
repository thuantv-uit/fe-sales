import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import '../styles/Auth.css'; // Import file CSS

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(form);
      localStorage.setItem('token', response.data.token);
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Error registering');
    }
  };

  return (
    <div className="auth-container">
      <h1>Đăng ký</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit">Đăng ký</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Đã có tài khoản?{' '}
        <p onClick={() => navigate('/login')} className="auth-link">
          Đăng nhập ngay
        </p>
      </p>
    </div>
  );
};

export default Register;