import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import '../styles/Auth.css';

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
    </div>
  );
};

export default Register;