import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  ShoppingCart, 
  User, 
  LogOut, 
  Settings, 
  CreditCard, 
  ArrowLeft,
  Menu,
  X
} from 'lucide-react';
import { useCustomerAuth } from '@/contexts/CustomerAuthContext';

const StoreHeader = ({ store }) => {
  const { isAuthenticated, customer, logout } = useCustomerAuth();
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const storeHomeUrl = `/tienda/${slug}`;

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    navigate(`/tienda/${slug}/carrito`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!store) {
    return (
      <header className="bg-gradient-to-r from-orange-500 to-red-600 shadow-lg">
        <nav className="container mx-auto px-4 lg:px-6 py-3 flex justify-between items-center h-16">
          <div className="h-8 bg-white/20 rounded w-32 animate-pulse"></div>
          <div className="flex items-center gap-2">
            <div className="h-8 bg-white/20 rounded w-20 animate-pulse"></div>
            <div className="h-8 bg-white/20 rounded w-8 animate-pulse md:hidden"></div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-600 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              to="/tiendas"
              className="p-2 text-white rounded-lg hover:bg-white/20 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <Link to={storeHomeUrl} className="flex items-center gap-3 group flex-shrink-0">
              <img 
                src={store.logo_url}
                alt={`Logo de ${store.nombre}`}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-transparent group-hover:border-white transition-all shadow-lg"
                onError={(e) => e.target.src = 'https://placehold.co/40x40/ffffff/000000?text=L'}
              />
              <span className="text-lg md:text-xl font-bold text-white group-hover:text-orange-100 transition-colors hidden sm:block">
                {store.nombre}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button 
                  onClick={handleCartClick}
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
                    <span className="text-sm font-medium text-white">
                      Hola, {customer?.nombre_completo?.split(' ')[0] || 'Cliente'}
                    </span>
                    <Settings className="w-4 h-4 text-white" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                      <Link
                        to="/perfil"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Editar Perfil
                      </Link>
                      <Link
                        to="/historial-pagos"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <CreditCard className="w-4 h-4" />
                        Historial de Pagos
                      </Link>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
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
                  className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-white/20 transition-colors border border-white/30 hover:border-white/50"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/tiendas/register"
                  state={{ from: location.pathname }}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-700 rounded-lg hover:bg-orange-800 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <UserPlus className="w-4 h-4" />
                  Registrarse
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden mt-4 pb-2 border-t border-white/20 pt-4">
            {isAuthenticated ? (
              <div className="space-y-3">
                <button 
                  onClick={handleCartClick}
                  className="flex items-center gap-3 w-full p-3 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Mi Carrito
                </button>
                
                <Link
                  to="/perfil"
                  className="flex items-center gap-3 w-full p-3 text-white rounded-lg hover:bg-white/20 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  Mi Perfil
                </Link>
                
                <Link
                  to="/historial-pagos"
                  className="flex items-center gap-3 w-full p-3 text-white rounded-lg hover:bg-white/20 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <CreditCard className="w-5 h-5" />
                  Historial
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full p-3 text-red-300 rounded-lg hover:bg-white/20 transition-colors border border-red-300/30"
                >
                  <LogOut className="w-5 h-5" />
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link 
                  to="/tiendas/login"
                  state={{ from: location.pathname }}
                  className="flex items-center justify-center gap-2 w-full p-3 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/tiendas/register"
                  state={{ from: location.pathname }}
                  className="flex items-center justify-center gap-2 w-full p-3 text-white bg-orange-700 rounded-lg hover:bg-orange-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus className="w-4 h-4" />
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default StoreHeader;