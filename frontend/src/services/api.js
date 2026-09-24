/**
 * API Service for Off Route Frontend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `API error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error);
    throw error;
  }
}

// ---------- AUTH ----------
export const adminAuthService = {
  login: async (email, password) => {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.token) {
      localStorage.setItem('admin_token', res.token);
      localStorage.setItem('admin_user', JSON.stringify(res.user));
    }
    return res;
  },

  logout: () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  isLoggedIn: () => !!localStorage.getItem('admin_token'),

  getCurrentUser: () => {
    const userStr = localStorage.getItem('admin_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
};

// ---------- EVENTS ----------
export const eventService = {
  getAll: () => apiFetch('/events'),
  getById: (id) => apiFetch(`/events/${id}`),
  create: (data) => apiFetch('/events', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => apiFetch(`/events/${id}`, { method: 'DELETE' }),
};

// ---------- GALLERY ----------
export const galleryService = {
  getAll: () => apiFetch('/gallery'),
  create: (data) => apiFetch('/gallery', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/gallery/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => apiFetch(`/gallery/${id}`, { method: 'DELETE' }),
};

// ---------- ROUTES ----------
export const routeService = {
  getAll: () => apiFetch('/routes'),
  create: (data) => apiFetch('/routes', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/routes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => apiFetch(`/routes/${id}`, { method: 'DELETE' }),
};
