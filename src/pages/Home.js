import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api';

const Home = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sản phẩm</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
            <img src={product.image || 'https://via.placeholder.com/100'} alt={product.name} style={{ width: '100px' }} />
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