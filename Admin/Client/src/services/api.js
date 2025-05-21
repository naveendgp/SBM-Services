import axios from "axios";

// Define API base URL based on environment
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach the auth token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

// Admin service object with API methods
export const adminService = {
  // Auth methods
  login: async (email, password) => {
    try {
      const response = await apiClient.post("/admin/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Authentication failed" };
    }
  },

  verifyToken: async () => {
    try {
      const response = await apiClient.get("/admin/auth/verify");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Token verification failed" };
    }
  },

  // Dashboard methods
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get("/admin/dashboard/stats");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch dashboard statistics",
        }
      );
    }
  },

  // Application methods
  getApplications: async (page = 1, limit = 10, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters,
      }).toString();

      const response = await apiClient.get(
        `/admin/applications?${queryParams}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch applications" };
    }
  },

  getApplicationById: async (id) => {
    try {
      const response = await apiClient.get(`/admin/applications/${id}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch application details",
        }
      );
    }
  },

  updateApplicationStatus: async (id, status, comment) => {
    try {
      const response = await apiClient.put(`/admin/applications/${id}/status`, {
        status,
        comment,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to update application status",
        }
      );
    }
  },

  addApplicationNote: async (id, text) => {
    try {
      const response = await apiClient.post(`/admin/applications/${id}/notes`, {
        text,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to add note" };
    }
  },

  // Document methods
  getDocument: async (applicationId, documentId) => {
    try {
      const response = await apiClient.get(
        `/admin/applications/${applicationId}/documents/${documentId}`,
        {
          responseType: "blob",
        }
      );
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch document" };
    }
  },

  updateDocumentStatus: async (
    applicationId,
    documentId,
    verificationStatus
  ) => {
    try {
      const response = await apiClient.put(
        `/admin/applications/${applicationId}/documents/${documentId}`,
        {
          verificationStatus,
        }
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to update document status" }
      );
    }
  },

  // User management methods
  getUsers: async (page = 1, limit = 10) => {
    try {
      const response = await apiClient.get(
        `/admin/users?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch users" };
    }
  },

  getUserById: async (id) => {
    try {
      const response = await apiClient.get(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch user details" };
    }
  },
};

export default apiClient;
