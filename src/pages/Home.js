import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, searchProducts } from '../api';
import '../styles/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredProducts(products); // Nếu không có từ khóa, hiển thị tất cả
      return;
    }
    try {
      const response = await searchProducts(searchQuery); // Sử dụng API mới
      setFilteredProducts(response.data);
    } catch (err) {
      console.error('Error searching products:', err);
      setFilteredProducts([]); // Xóa kết quả nếu có lỗi
    }
  };

  return (
    <div className="container">
      <h1>Sản phẩm</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
        />
        <button type="submit">Tìm kiếm</button>
      </form>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} VND</p>
            <Link to={`/product/${product._id}`}>Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;