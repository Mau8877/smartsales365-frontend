import React, { useState, useRef } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { 
  UserPlus, 
  ShoppingCart, 
  User, 
  LogOut, 
  Settings, 
  CreditCard, 
  ArrowLeft 
} from 'lucide-react';
import { useCustomerAuth } from '@/contexts/CustomerAuthContext';

const StoreHeader = ({ store }) => {
  const { isAuthenticated, customer, logout } = useCustomerAuth();
  const { slug } = useParams();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const storeHomeUrl = `/tienda/${slug}`;

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  if (!store) {
    return (
      <header className="bg-gradient-to-r from-orange-500 to-red-600 shadow-lg">
        <nav className="container mx-auto px-4 lg:px-6 py-3 flex justify-between items-center h-[65px]">
          <div className="h-8 bg-white/20 rounded w-1/3 animate-pulse"></div>
          <div className="flex items-center gap-2">
            <div className="h-8 bg-white/20 rounded w-20 animate-pulse"></div>
            <div className="h-8 bg-white/20 rounded w-24 animate-pulse"></div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-600 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">
        
        <div className="flex items-center gap-4">
          <Link
            to="/tiendas"
            title="Volver al directorio de tiendas"
            className="p-2 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <Link to={storeHomeUrl} className="flex items-center gap-3 group">
            <img 
              src={store.logo_url}
              alt={`Logo de ${store.nombre}`}
              className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-white transition-all shadow-lg"
              onError={(e) => e.target.src = 'https://placehold.co/40x40/ffffff/000000?text=L'}
            />
            <span className="text-xl font-bold text-white group-hover:text-orange-100 transition-colors hidden sm:block">
              {store.nombre}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button 
                title="Mi Carrito"
                className="p-2 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <User className="w-5 h-5 text-white" />
                  <span className="text-sm font-medium text-white hidden md:block">
                    Hola, {customer?.nombre_completo?.split(' ')[0] || 'Cliente'}
                  </span>
                  <Settings className="w-4 h-4 text-white" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                    <Link
                      to="/perfil"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Editar Perfil
                    </Link>
                    <Link
                      to="/historial-pagos"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <CreditCard className="w-4 h-4" />
                      Historial de Pagos
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/tiendas/login"
                state={{ from: location.pathname }}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-white/20 transition-colors border border-white/30"
              >
                Iniciar Sesión
              </Link>
              <Link 
                to="/tiendas/register"
                state={{ from: location.pathname }}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-700 rounded-lg hover:bg-orange-800 transition-colors flex items-center gap-2 shadow-lg"
              >
                <UserPlus className="w-4 h-4" />
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default StoreHeader;