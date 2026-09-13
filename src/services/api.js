import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",

  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};

      config.headers.Authorization = `Bearer ${token}`;
    }

    // ==========================================
    // JSON
    // ==========================================

    if (!(config.data instanceof FormData)) {
      config.headers = config.headers || {};

      config.headers["Content-Type"] = "application/json";
    } else {
      // Let browser/Axios create multipart boundary
      if (config.headers) {
        delete config.headers["Content-Type"];
      }
    }

    return config;
  },

  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  },
);

export default api;
