import {
  LayoutDashboard,
  Store,
  Users,
  UserCog,
  UserCheck,
  ShoppingCart,
  BarChart,
  Settings,
  ClipboardList,
} from "lucide-react";

const iconSize = 20;

export const generateMenuItems = (currentUser) => {
  const rol = currentUser?.rol;

  // --- DEFINICIÓN DE TODOS LOS ENLACES POSIBLES ---
  const menuConfig = {
    // Principal
    dashboard: {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={iconSize} />,
    },

    // Grupo Ventas
    registrarVenta: {
      label: "Registrar Venta",
      path: "ventas/nueva",
      icon: <ShoppingCart size={iconSize} />,
    },
    misVentas: {
      label: "Historial de Ventas",
      path: "ventas",
      icon: <ClipboardList size={iconSize} />,
    },

    // Grupo Gestión de Tienda
    gestionarUsuarios: {
      label: "Gestión de Usuarios",
      icon: <Users size={iconSize} />,
      subItems: [
        {
          label: "Administradores",
          path: "usuarios/admins",
          icon: <UserCog size={iconSize} />,
        },
        {
          label: "Vendedores",
          path: "usuarios/vendedores",
          icon: <UserCheck size={iconSize} />,
        },
        {
          label: "Clientes",
          path: "usuarios/clientes",
          icon: <Users size={iconSize} />,
        },
      ],
    },
    reportesTienda: {
      label: "Reportes de Tienda",
      path: "reportes",
      icon: <BarChart size={iconSize} />,
    },

    // Grupo SuperAdmin
    gestionarTiendas: {
      label: "Gestionar Tiendas",
      path: "gestion-tiendas",
      icon: <Store size={iconSize} />,
    },
    configGlobal: {
      label: "Configuración Global",
      path: "configuracion",
      icon: <Settings size={iconSize} />,
    },
  };

  // --- CONSTRUCCIÓN DE LOS MENÚS POR ROL ---
  const baseMenu = { name: "Principal", items: [menuConfig.dashboard] };

  const vendedorMenu = {
    name: "Ventas",
    items: [menuConfig.registrarVenta, menuConfig.misVentas],
  };

  const adminMenu = {
    name: "Gestión de Tienda",
    items: [
      menuConfig.gestionarUsuarios, // Este ahora tiene sub-items
      menuConfig.reportesTienda,
    ],
  };

  const superAdminMenu = {
    name: "Administración Global",
    items: [menuConfig.gestionarTiendas, menuConfig.configGlobal],
  };

  if (rol === "superAdmin") {
    return [baseMenu, adminMenu, vendedorMenu, superAdminMenu];
  }
  if (rol === "admin") {
    return [baseMenu, adminMenu, vendedorMenu];
  }
  if (rol === "vendedor") {
    return [baseMenu, vendedorMenu];
  }

  return [baseMenu];
};
