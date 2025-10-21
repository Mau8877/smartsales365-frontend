import { Navigate } from "react-router-dom";
import authService from "../services/auth"; // Asegúrate que la ruta sea correcta

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  // Si el usuario NO está autenticado, lo mandamos al login.
  if (!isAuthenticated) {
    return <Navigate to="/saas-login" replace />;
  }

  // Si el usuario es un 'cliente', no puede acceder al panel de administración.
  // Lo mandamos a su propia página (o a la página principal, si no tiene una).
  if (user?.rol === "cliente") {
    return <Navigate to="/tiendas" replace />; // O a la ruta que corresponda para clientes
  }

  // Si es superAdmin, admin, o vendedor, tiene acceso.
  return children;
};

export default ProtectedRoute;
