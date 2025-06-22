import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export const getProducts = () => API.get('/products');
export const getProduct = (id) => API.get(`/products/${id}`);
export const addProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const register = (user) => API.post('/users/register', user);
export const login = (user) => API.post('/users/login', user);
export const getUser = () => API.get('/users/me');
export const getCart = () => API.get('/cart');
export const addToCart = (item) => API.post('/cart', item);
export const removeFromCart = (productId) => API.delete(`/cart/${productId}`);
export const createOrder = (orderData) => API.post('/orders', orderData);
export const getOrders = () => API.get('/orders');
export const getMyOrders = () => API.get('/orders/my-orders');
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });
export const searchProducts = (query) => API.get(`/products/search?q=${encodeURIComponent(query)}`);