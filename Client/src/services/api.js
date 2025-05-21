import axios from "axios";

const API_URL = import.meta.env.API_URL || "http://localhost:3000/api";

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Loan application services
export const loanService = {
  // Submit loan application
  submitApplication: async (formData) => {
    try {
      const response = await apiClient.post("/loans/apply", formData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Network error occurred" };
    }
  },

  // Upload documents
  uploadDocuments: async (applicationId, files) => {
    try {
      const formData = new FormData();

      // Attach each file to the form data with correct field names
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file);
        }
      });

      const response = await axios.post(
        `${API_URL}/loans/${applicationId}/documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Upload error details:", error);
      throw error.response?.data || { message: "Failed to upload documents" };
    }
  },

  // Get application status
  getApplicationStatus: async (referenceNumber) => {
    try {
      const response = await apiClient.get(
        `/loans/reference/${referenceNumber}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Network error occurred" };
    }
  },
};

// Auth services
export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      // Also store user data
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Network error occurred" };
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await apiClient.post("/auth/signup", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Network error occurred" };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem("token") ? true : false;
  },

  // Get current user data
  getMe: async () => {
    try {
      const response = await apiClient.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch user data" };
    }
  },
};
