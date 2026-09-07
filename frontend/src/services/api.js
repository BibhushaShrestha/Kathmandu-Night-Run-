/**
 * API Service for Kathmandu Night Run Frontend
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

export const adminAuthService = {
  login: async (email, password) => {
    // Simulated authentication check (fallback)
    if (email === 'admin@kathmandunightrun.com' && password === 'admin123') {
      const mockToken = 'mock_jwt_token_knr_2026';
      const mockUser = {
        name: 'Bibhusha Shrestha',
        role: 'Administrator',
        email,
      };
      localStorage.setItem('admin_token', mockToken);
      localStorage.setItem('admin_user', JSON.stringify(mockUser));
      return { token: mockToken, user: mockUser };
    }

    // Attempt real API fetch
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (res.token) {
        localStorage.setItem('admin_token', res.token);
        localStorage.setItem('admin_user', JSON.stringify(res.user));
      }
      return res;
    } catch (err) {
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('admin_user');
    if (!userStr) return { name: 'Bibhusha Shrestha', role: 'Administrator' };
    try {
      return JSON.parse(userStr);
    } catch {
      return { name: 'Bibhusha Shrestha', role: 'Administrator' };
    }
  },
};
