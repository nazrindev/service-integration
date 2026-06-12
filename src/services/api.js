import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  (config) => {
    const isAuthRequest = config.url?.toLowerCase().includes("/api/account");

    if (!isAuthRequest) {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
      const isAuthRequest = error.config?.url
        ?.toLowerCase()
        .includes("/api/account");

      if (!isAuthRequest) {
        localStorage.removeItem("token");
        sessionStorage.setItem("sessionExpired", "true");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
