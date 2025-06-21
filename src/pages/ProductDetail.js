import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, addToCart } from '../api';

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

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.name}</h1>
      <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} style={{ width: '200px' }} />
      <p>Giá: {product.price} VND</p>
      <p>Mô tả: {product.description || 'Không có mô tả'}</p>
      <p>Kho: {product.stock}</p>
      <button onClick={handleAddToCart} disabled={product.stock === 0}>Thêm vào giỏ hàng</button>
    </div>
  );
};

export default ProductDetail;