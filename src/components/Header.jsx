import { LogOut, Menu } from "lucide-react";
import authService from "@/services/auth";

const Header = ({ toggleSidebar }) => {
  const currentUser = authService.getCurrentUser();
  const handleLogout = () => authService.logout();

  const getTitle = () => {
    if (currentUser?.rol === "superAdmin") return "Panel Global";
    if (currentUser?.tienda_id) return `Tienda: ${currentUser.tienda_id}`;
    return "Dashboard";
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-600 hover:text-gray-900"
        >
          <Menu size={24} />
        </button>
        {/* El título ahora se oculta en pantallas más pequeñas también */}
        <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
          {getTitle()}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <div className="font-semibold text-right text-gray-800">
            {currentUser?.nombre_completo}
          </div>
          <div className="text-xs text-right text-gray-500 capitalize">
            {currentUser?.rol}
          </div>
        </div>
        <button
          onClick={handleLogout}
          title="Cerrar Sesión"
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <LogOut size={22} />
        </button>
      </div>
    </header>
  );
};

export default Header;
