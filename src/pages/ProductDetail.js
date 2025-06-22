import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, addToCart } from '../api';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      navigate('/login'); // Điều hướng đến trang login
      return;
    }
    try {
      await addToCart({ productId: id, quantity: 1 });
      alert('Đã thêm vào giỏ hàng');
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="product-detail">
        <div>
          <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
        </div>
        <div>
          <h1>{product.name}</h1>
          <p className="price">Giá: {product.price} VND</p>
          <p className="description">Mô tả: {product.description || 'Không có mô tả'}</p>
          <p className={`stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>
            Kho: {product.stock > 0 ? `${product.stock} sản phẩm` : 'Hết hàng'}
          </p>
          <button onClick={handleAddToCart} disabled={product.stock === 0}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;