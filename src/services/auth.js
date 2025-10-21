import apiClient from "./apiClient";

let instance = null;

class AuthService {
  constructor() {
    if (instance) return instance;
    this.currentUser = null;
    this.loadUserFromStorage();
    instance = this;
  }

  loadUserFromStorage() {
    const userData = localStorage.getItem("userData");
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  saveUserToStorage(userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    this.currentUser = userData;
  }

  clearUserFromStorage() {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    this.currentUser = null;
  }

  async login(email, password) {
    const responseData = await apiClient.login(email, password);
    this.saveUserToStorage(responseData);
    return responseData;
  }

  async logout() {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error(
        "Fallo en el logout del backend. La sesión local se limpiará de todas formas.",
        error
      );
    } finally {
      this.clearUserFromStorage();
      window.location.href = "/saas-login";
    }
  }

  isAuthenticated() {
    return !!this.currentUser?.token;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getToken() {
    return this.currentUser?.token || null;
  }

  // ========== ROLES & PERMISSIONS ADAPTADOS ==========
  isSuperAdmin() {
    return this.currentUser?.rol === "superAdmin";
  }
  isAdmin() {
    return this.currentUser?.rol === "admin";
  }
  isVendedor() {
    return this.currentUser?.rol === "vendedor";
  }
  isCliente() {
    return this.currentUser?.rol === "cliente";
  }
}

const authService = new AuthService();
export default authService;
