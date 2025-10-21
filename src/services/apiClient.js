import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: { "Content-Type": "application/json" },
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Token ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          window.location.href = "/saas-login";
        }
        return Promise.reject(error);
      }
    );
  }

  // ========== AUTH ENDPOINTS ==========
  async login(email, password) {
    return this.client.post("/usuarios/users/login/", { email, password });
  }

  async logout() {
    return this.client.post("/usuarios/users/logout/");
  }

  // ========== MÉTODOS HTTP GENÉRICOS ==========
  get(url, config) {
    return this.client.get(url, config);
  }
  post(url, data, config) {
    return this.client.post(url, data, config);
  }
  put(url, data, config) {
    return this.client.put(url, data, config);
  }
  patch(url, data, config) {
    return this.client.patch(url, data, config);
  }
  delete(url, config) {
    return this.client.delete(url, config);
  }
}

const apiClient = new ApiClient();
export default apiClient;
