import axios from 'axios';

// Configuration de base pour Axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://e-backend-production.up.railway.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour les requêtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && token.length < 2000) { // Vérifier la taille du token
      try {
        // Vérifier que le token est valide
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && payload.exp * 1000 > Date.now()) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          // Token expiré, le supprimer
          localStorage.removeItem('token');
          localStorage.removeItem('utilisateur');
        }
      } catch (error) {
        // Token invalide, le supprimer
        console.warn('Token invalide détecté, suppression...');
        localStorage.removeItem('token');
        localStorage.removeItem('utilisateur');
      }
    } else if (token && token.length >= 2000) {
      // Token trop volumineux, le supprimer
      console.warn('Token trop volumineux détecté, suppression...');
      localStorage.removeItem('token');
      localStorage.removeItem('utilisateur');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gestion des erreurs de connexion
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.error('Erreur de connexion au serveur');
      return Promise.reject({
        response: {
          data: {
            message: 'Impossible de se connecter au serveur. Vérifiez que le backend est démarré.'
          }
        }
      });
    }

    // Gestion des erreurs d'authentification
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('utilisateur');
      window.location.href = '/connexion';
    }

    return Promise.reject(error);
  }
);
const apiService = {
  // ============================
  // AUTHENTIFICATION
  // ============================
  login: (data) => axiosInstance.post('/api/auth/login', data),
  register: (data) => axiosInstance.post('/api/auth/register', data),
  logout: () => axiosInstance.post('/api/auth/logout'),
  me: () => axiosInstance.get('/api/auth/me'),
  refresh: () => axiosInstance.post('/api/auth/refresh'),

  // ============================
  // UTILISATEURS
  // ============================
  getUsers: () => axiosInstance.get('/api/users'),
  getUser: (id) => axiosInstance.get(`/api/users/${id}`),
  updateUser: (id, data) => axiosInstance.put(`/api/users/${id}`, data),
  deleteUser: (id) => axiosInstance.delete(`/api/users/${id}`),
  toggleUserStatus: (id) => axiosInstance.put(`/api/users/${id}/toggle-status`),
  getProfile: () => axiosInstance.get('/api/users/profile'),
  updateProfile: (data) => axiosInstance.put('/api/users/profile', data),
  uploadAvatar: (data) => axiosInstance.post('/api/users/avatar', data),

  // ============================
  // PRODUITS
  // ============================
  getProducts: (params = {}) => axiosInstance.get('/api/products', { params }),
  getProduct: (id) => axiosInstance.get(`/api/products/${id}`),
  createProduct: (data) => axiosInstance.post('/api/products', data),
  updateProduct: (id, data) => axiosInstance.put(`/api/products/${id}`, data),
  deleteProduct: (id) => axiosInstance.delete(`/api/products/${id}`),
  toggleProductStatus: (id) => axiosInstance.put(`/api/products/${id}/toggle-status`),
  updateProductStock: (id, stock) => axiosInstance.put(`/api/products/${id}/stock`, { stock }),
  uploadProductImages: (id, data) => axiosInstance.post(`/api/products/${id}/images`, data),
  deleteProductImage: (id, index) => axiosInstance.delete(`/api/products/${id}/images/${index}`),

  // ============================
  // CATEGORIES
  // ============================
  getCategories: () => axiosInstance.get('/api/categories'),
  getCategory: (id) => axiosInstance.get(`/api/categories/${id}`),
  createCategory: (data) => axiosInstance.post('/api/categories', data),
  updateCategory: (id, data) => axiosInstance.put(`/api/categories/${id}`, data),
  deleteCategory: (id) => axiosInstance.delete(`/api/categories/${id}`),
  uploadCategoryImage: (id, data) => axiosInstance.post(`/api/categories/${id}/image`, data),
  toggleCategoryStatus: (id) => axiosInstance.put(`/api/categories/${id}/toggle-status`),

  // ============================
  // REVIEWS
  // ============================
  getProductReviews: (productId) => axiosInstance.get(`/api/products/${productId}/reviews`),
  createReview: (productId, data) => axiosInstance.post(`/api/products/${productId}/reviews`, data),
  markReviewHelpful: (reviewId) => axiosInstance.post(`/api/reviews/${reviewId}/helpful`),
  moderateReview: (reviewId, data) => axiosInstance.put(`/api/reviews/${reviewId}/moderate`, data),

  // ============================
  // WISHLIST
  // ============================
  getWishlist: () => axiosInstance.get('/api/wishlist'),
  addToWishlist: (productId) => axiosInstance.post(`/api/wishlist/${productId}`),
  removeFromWishlist: (productId) => axiosInstance.delete(`/api/wishlist/${productId}`),
  clearWishlist: () => axiosInstance.delete('/api/wishlist'),
  checkWishlist: (productId) => axiosInstance.get(`/api/wishlist/${productId}/check`),

  // ============================
  // COMMANDES
  // ============================
  createOrder: (data) => axiosInstance.post('/api/orders', data),
  getOrders: () => axiosInstance.get('/api/orders'),
  getMyOrders: () => axiosInstance.get('/api/orders/my-orders'),
  getOrder: (id) => axiosInstance.get(`/api/orders/${id}`),
  downloadInvoice: (id) => axiosInstance.get(`/api/orders/${id}/invoice`, { responseType: 'blob' }),
  updateOrderPayment: (id, data) => axiosInstance.put(`/api/orders/${id}/payment`, data),
  updateOrderStatus: (id, data) => axiosInstance.put(`/api/orders/${id}/status`, data),

  // ============================
  // DASHBOARD
  // ============================
  getDashboardStats: () => axiosInstance.get('/api/dashboard/stats'),
  getLowStock: () => axiosInstance.get('/api/dashboard/low-stock'),
  getTopProducts: () => axiosInstance.get('/api/dashboard/top-products'),
  getRecentOrders: () => axiosInstance.get('/api/dashboard/recent-orders'),

  // ============================
  // AUTRES
  // ============================
  getConfig: () => axiosInstance.get('/api/config'),
  healthCheck: () => axiosInstance.get('/api/health'),
};
export default {axiosInstance, apiService};