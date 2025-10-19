import apiClient from "./apiClient";

class AuthService {
  constructor() {
    this.currentUser = null;
    this.loadUserFromStorage();
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
    const response = await apiClient.login(email, password);
    const userData = {
      user_id: response.user_id,
      token: response.token,
      rol: response.rol,
      tienda_id: response.tienda_id,
      nombre_completo: response.nombre_completo,
      email: email,
    };
    this.saveUserToStorage(userData);
    return userData;
  }

  async logout() {
    await apiClient.logout();
    this.clearUserFromStorage();
    window.location.href = "/login";
  }

  isAuthenticated() {
    return !!this.currentUser && !!localStorage.getItem("token");
  }

  // ========== ROLES & PERMISSIONS ==========
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

  canAccessSystem() {
    const user = this.getCurrentUser();
    // El superAdmin siempre puede acceder
    if (user?.rol === "superAdmin") return true;
    // Otros roles dependen de que estén activos
    return this.isAuthenticated() && user?.rol;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  // ========== PERMISSION METHODS ==========
  canManageUsers() {
    return this.isSuperAdmin() || this.isAdmin();
  }

  canManageTiendas() {
    return this.isSuperAdmin();
  }

  canManageRoles() {
    return this.isSuperAdmin();
  }

  canViewReports() {
    return this.isSuperAdmin() || this.isAdmin();
  }

  canManageInventory() {
    return this.isSuperAdmin() || this.isAdmin() || this.isVendedor();
  }

  belongsToTienda() {
    return !!this.currentUser?.tienda_id;
  }
}

export default new AuthService();
