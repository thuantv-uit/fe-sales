import React, { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api';
import '../styles/Admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '', image: null, stock: '' });
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

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    if (form.image) formData.append('image', form.image);
    formData.append('stock', form.stock);

    try {
      if (editingId) {
        await updateProduct(editingId, formData);
        setEditingId(null);
      } else {
        await addProduct(formData);
      }
      setForm({ name: '', price: '', description: '', image: null, stock: '' });
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      console.error('Error submitting product:', err);
    }
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price, description: product.description, image: null, stock: product.stock });
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
    <div className="container">
      <h1>Quản lý sản phẩm</h1>
      <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Tên sản phẩm" required />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Giá" required />
        <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" />
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
        <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Số lượng tồn kho" required />
        <button type="submit" className={editingId ? 'update' : ''}>{editingId ? 'Cập nhật' : 'Thêm'} sản phẩm</button>
      </form>
      <h2>Danh sách sản phẩm</h2>
      {products.map(product => (
        <div key={product._id} className="product-item">
          <div>
            <h3>{product.name}</h3>
            <p>Giá: {product.price} VND</p>
            <p className="stock">Kho: {product.stock}</p>
          </div>
          <div>
            <button onClick={() => handleEdit(product)} className="edit">Sửa</button>
            <button onClick={() => handleDelete(product._id)} className="delete">Xóa</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin;