import { Navigate } from 'react-router-dom';
import authService from '../services/auth';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  if (user?.rol === 'cliente') {
    return <Navigate to="/" replace />;
  }

  // El superAdmin siempre accede
  if (user?.rol === 'superAdmin') {
    return children;
  }

  if (!isAuthenticated || !authService.canAccessSystem()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;