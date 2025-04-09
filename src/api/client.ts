import axios from "axios";

// Create a base API client
const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication if needed
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors (401, 403, etc.)
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("authToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
