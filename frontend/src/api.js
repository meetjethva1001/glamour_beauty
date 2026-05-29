import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('glamour_user') || 'null')
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('glamour_user')
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login?expired=true'
      }
    }
    return Promise.reject(error)
  }
)

export const servicesApi = {
  getAll: (params) => api.get('/services', { params }),
  getOne: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
}

export const packagesApi = {
  getAll: () => api.get('/packages'),
  create: (data) => api.post('/packages', data),
  update: (id, data) => api.put(`/packages/${id}`, data),
  delete: (id) => api.delete(`/packages/${id}`),
}

export const inquiriesApi = {
  getAll: () => api.get('/inquiries'),
  create: (data) => api.post('/inquiries', data),
  updateStatus: (id, status) => api.put(`/inquiries/${id}`, { status }),
}

export const bookingsApi = {
  getAll: () => api.get('/bookings'),
  getMy: () => api.get('/bookings/my'),
  create: (data) => api.post('/bookings', data),
  updateStatus: (id, status) => api.patch(`/bookings/${id}`, { status }),
  cancel: (id) => api.patch(`/bookings/${id}`, { status: 'cancelled' }),
}

export const usersApi = {
  getAll: () => api.get('/users'),
  delete: (id) => api.delete(`/users/${id}`),
}

export default api
