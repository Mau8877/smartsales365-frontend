import axios from "axios";

// Usar variable de entorno con valor por defecto
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptor para agregar token automáticamente
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

    // Interceptor para manejar respuestas de error
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // ========== AUTH ENDPOINTS ==========
  async login(email, password) {
    try {
      const response = await this.client.post("/usuarios/users/login/", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Error de autenticación"
      );
    }
  }

  async logout() {
    try {
      const response = await this.client.post("/usuarios/users/logout/");
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Error al cerrar sesión"
      );
    }
  }

  // ========== MÉTODOS HTTP GENÉRICOS ==========
  async get(url) {
    try {
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          error.message ||
          "Error en la petición"
      );
    }
  }

  async post(url, data) {
    try {
      const response = await this.client.post(url, data);
      return response.data;
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData) {
        if (typeof errorData === "object" && !errorData.detail) {
          const firstField = Object.keys(errorData)[0];
          const firstError = errorData[firstField];
          if (Array.isArray(firstError)) {
            throw new Error(`${firstField}: ${firstError[0]}`);
          }
          throw new Error(`${firstField}: ${firstError}`);
        }
        throw new Error(
          errorData.detail ||
            errorData.error ||
            errorData.message ||
            "Error en la petición"
        );
      }
      throw new Error("Error de conexión");
    }
  }

  async put(url, data) {
    try {
      const response = await this.client.put(url, data);
      return response.data;
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData) {
        if (typeof errorData === "object" && !errorData.detail) {
          const firstField = Object.keys(errorData)[0];
          const firstError = errorData[firstField];
          if (Array.isArray(firstError)) {
            throw new Error(`${firstField}: ${firstError[0]}`);
          }
          throw new Error(`${firstField}: ${firstError}`);
        }
        throw new Error(
          errorData.detail ||
            errorData.error ||
            errorData.message ||
            "Error en la petición"
        );
      }
      throw new Error("Error de conexión");
    }
  }

  async patch(url, data) {
    try {
      const response = await this.client.patch(url, data);
      return response.data;
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData) {
        if (typeof errorData === "object" && !errorData.detail) {
          const firstField = Object.keys(errorData)[0];
          const firstError = errorData[firstField];
          if (Array.isArray(firstError)) {
            throw new Error(`${firstField}: ${firstError[0]}`);
          }
          throw new Error(`${firstField}: ${firstError}`);
        }
        throw new Error(
          errorData.detail ||
            errorData.error ||
            errorData.message ||
            "Error en la petición"
        );
      }
      throw new Error("Error de conexión");
    }
  }

  async delete(url) {
    try {
      const response = await this.client.delete(url);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          error.message ||
          "Error al eliminar"
      );
    }
  }
}

// Crear una instancia única
const apiClient = new ApiClient();

// Exportar tanto la instancia como la clase
export { apiClient as api };
export default apiClient;
