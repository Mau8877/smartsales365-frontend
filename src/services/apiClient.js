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
          const isLoginRequest = error.config?.url?.includes("/usuarios/users/login/");
          
          if (!isLoginRequest) {
            // Solo redirige si NO estamos en el login
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            window.location.href = "/saas-login";
          }
        }

        // Aseguramos que el error mantenga su estructura original
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

  // ========== (NUEVO) USER PROFILE ENDPOINTS (/me) ==========

  /**
   * Obtiene los datos completos del usuario autenticado
   */
  async getMe() {
    return this.client.get("/usuarios/users/me/");
  }

  /**
   * Actualiza los datos del perfil (email, nombre, etc.)
   */
  async updateMe(data) {
    // data = { email: "...", profile: { nombre: "..." } }
    return this.client.patch("/usuarios/users/me/", data);
  }

  /**
   * Cambia la contraseña del propio usuario
   */
  async changeMyPassword(data) {
    // data = { old_password: "...", new_password: "..." }
    return this.client.post("/usuarios/users/me/change-password/", data);
  }

  /**
   * Sube la foto de perfil del usuario
   */
  async uploadMyPhoto(formData) {
    // formData es un objeto FormData
    return this.client.post("/usuarios/users/me/upload-photo/", formData, {
    headers: {
      // Anulamos el 'Content-Type: application/json'
      // El navegador lo pondrá como 'multipart/form-data' automáticamente
        "Content-Type": "multipart/form-data",
      },
    });
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