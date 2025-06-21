import React, { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '', stock: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProduct(editingId, form);
        setEditingId(null);
      } else {
        await addProduct(form);
      }
      setForm({ name: '', price: '', description: '', image: '', stock: '' });
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quản lý sản phẩm</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Tên sản phẩm" required />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Giá" required />
        <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" />
        <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="URL hình ảnh" />
        <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Số lượng tồn kho" required />
        <button type="submit">{editingId ? 'Cập nhật' : 'Thêm'} sản phẩm</button>
      </form>
      <h2>Danh sách sản phẩm</h2>
      {products.map(product => (
        <div key={product._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{product.name}</h3>
          <p>Giá: {product.price} VND</p>
          <p>Kho: {product.stock}</p>
          <button onClick={() => handleEdit(product)}>Sửa</button>
          <button onClick={() => handleDelete(product._id)}>Xóa</button>
        </div>
      ))}
    </div>
  );
};

export default Admin;