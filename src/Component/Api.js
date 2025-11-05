import axios from "axios";

// const BASE_URL = "https://staging-api.raihsuite.com/v1/"; // your backend base URL
const BASE_URL = "https://api.raihsuite.com/v1/"; // your backend base URL

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
// Add token automatically if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Common API methods
export const apiCall = {
  get: (endpoint, config = {}) =>
    api.get(endpoint, config).then((res) => res.data),
  post: (endpoint, data, config = {}) =>
    api.post(endpoint, data, config).then((res) => res.data),
  put: (endpoint, data, config = {}) =>
    api.put(endpoint, data, config).then((res) => res.data),
  patch: (endpoint, data, config = {}) =>
    api.patch(endpoint, data, config).then((res) => res.data),
  delete: (endpoint, config = {}) =>
    api.delete(endpoint, config).then((res) => res.data),
};

export default api;
