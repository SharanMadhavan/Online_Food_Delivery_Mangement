import apiClient from './axios';

// Auth endpoints
export const authAPI = {
  signup: (data: { name: string; email: string; password: string }) =>
    apiClient.post('/auth/signup', data),
  
  login: (data: { email: string; password: string }) =>
    apiClient.post('/auth/login', data),
};

// Restaurant endpoints
export const restaurantAPI = {
  getAll: () => apiClient.get('/api/restaurants'),
  
  getById: (id: number) => apiClient.get(`/api/restaurants/${id}`),
  
  create: (data: any) => apiClient.post('/api/restaurants', data),
  
  update: (id: number, data: any) => apiClient.put(`/api/restaurants/${id}`, data),
  
  delete: (id: number) => apiClient.delete(`/api/restaurants/${id}`),
};

// Menu endpoints
export const menuAPI = {
  getByRestaurant: (restaurantId: number) =>
    apiClient.get(`/api/menus/restaurant/${restaurantId}`),
  
  create: (data: any) => apiClient.post('/api/menus', data),
  
  update: (id: number, data: any) => apiClient.put(`/api/menus/${id}`, data),
  
  delete: (id: number) => apiClient.delete(`/api/menus/${id}`),
};

// Order endpoints
export const orderAPI = {
  create: (data: any) => apiClient.post('/api/orders', data),
  
  getByUser: (userId: number) => apiClient.get(`/orders/user/${userId}`),
  
  getById: (id: number) => apiClient.get(`/orders/${id}`),
};

// Payment endpoints
export const paymentAPI = {
  process: (data: any) => apiClient.post('/api/payments', data),
};

// Delivery endpoints
export const deliveryAPI = {
  getByOrder: (orderId: number) => apiClient.get(`/deliveries/order/${orderId}`),
  
  updateStatus: (id: number, status: string) =>
    apiClient.put(`/deliveries/${id}/status`, { status }),
};
