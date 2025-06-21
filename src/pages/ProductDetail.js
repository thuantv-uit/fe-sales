import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, addToCart } from '../api';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
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
    try {
      await addToCart({ productId: id, quantity: 1 });
      alert('Added to cart');
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