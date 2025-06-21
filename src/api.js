import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Thêm token vào header nếu có
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// export const getProducts = () => API.get('/products');
// export const getProduct = (id) => API.get(`/products/${id}`);
// export const addProduct = (product) => API.post('/products', product);
// export const updateProduct = (id, product) => API.put(`/products/${id}`, product);
// export const deleteProduct = (id) => API.delete(`/products/${id}`);
// export const register = (user) => API.post('/users/register', user);
// export const login = (user) => API.post('/users/login', user);
// export const getUser = () => API.get('/users/me');
// export const getCart = () => API.get('/cart');
// export const addToCart = (item) => API.post('/cart', item);
// export const removeFromCart = (productId) => API.delete(`/cart/${productId}`);
// export const createOrder = (order) => API.post('/orders', order);
// export const getOrders = () => API.get('/orders');

export const getProducts = () => API.get('/products');
export const getProduct = (id) => API.get(`/products/${id}`);
export const addProduct = (product) => API.post('/products', product);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const register = (user) => API.post('/users/register', user);
export const login = (user) => API.post('/users/login', user);
export const getUser = () => API.get('/users/me');
export const getCart = () => API.get('/cart');
export const addToCart = (item) => API.post('/cart', item);
export const removeFromCart = (productId) => API.delete(`/cart/${productId}`);
export const createOrder = (orderData) => API.post('/orders', orderData);
export const getOrders = () => API.get('/orders'); // Cho admin
export const getMyOrders = () => API.get('/orders/my-orders'); // Cho user
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });