import {
  LayoutDashboard,
  Store,
  Users,
  UserCog,
  UserCheck,
  ShoppingCart,
  BarChart,
  Settings, // Aún se usa para SaaS, así que lo mantenemos
  ClipboardList,
  ShieldCheck,
  Database,
  BookCopy,
  Briefcase,
  DollarSign,
  LayoutGrid, // <-- 1. ÍCONO NUEVO para Categorías
  Sparkles,   // <-- 2. ÍCONO NUEVO para Predicciones (IA)
} from "lucide-react";

const iconSize = 20;

export const generateMenuItems = (currentUser) => {
  const rol = currentUser?.rol?.toLowerCase();

  const menuConfig = {
    // Principal
    dashboard: {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={iconSize} />,
    },

    auditoriaSeguridad: {
      label: "Auditoria y Seguridad",
      icon: <ShieldCheck size={iconSize} />,
      subItems: [
        {
          label: "Bitácora del Sistema",
          path: "bitacora",
          icon: <ClipboardList size={iconSize} />,
        },
      ],
    },

    // Paquete Gestion de Usuarios
    gestionarUsuarios: {
      label: "Gestión de Usuarios",
      icon: <Users size={iconSize} />,
      subItems: [
        {
          label: "Gestionar Usuarios de Tienda",
          path: "usuarios/tienda",
          icon: <UserCog size={iconSize} />,
        },
        {
          label: "Gestionar Clientes",
          path: "usuarios/clientes",
          icon: <UserCheck size={iconSize} />,
        },
      ],
    },

    // Paquete Gestion Comercial
    gestionComercial: {
      label: "Gestión Comercial",
      icon: <Briefcase size={iconSize} />,
      subItems: [
        {
          label: "Gestionar Categoria de Productos",
          path: "comercial/categorias",
          // --- ¡CAMBIO 1! ---
          icon: <LayoutGrid size={iconSize} />, // <-- Ícono de "tuerquita" reemplazado
        },
        {
          label: "Gestionar Productos",
          path: "comercial/productos",
          icon: <Store size={iconSize} />,
        },
      ],
    },

    // Paquete Gestion de Ventas
    gestionarVentas: {
      label: "Gestión de Ventas",
      icon: <ShoppingCart size={iconSize} />,
      subItems: [
        {
          label: "Realizar Pago de Productos",
          path: "ventas/productos",
          icon: <DollarSign size={iconSize} />,
        },
        {
          label: "Generar Nota de Venta",
          path: "ventas/nota-venta",
          icon: <ClipboardList size={iconSize} />,
        },
        {
          label: "Historial de Ventas",
          path: "ventas/historial-ventas",
          icon: <UserCheck size={iconSize} />,
        },
      ],
    },

    // Paquete Reportes
    reportes: {
      label: "Reportes",
      icon: <BarChart size={iconSize} />,
      subItems: [
        {
          label: "Generar Reporte",
          path: "reporte/generar",
          icon: <BookCopy size={iconSize} />,
        },
      ],
    },

    // Paquete Prediccion
    prediccion: {
      label: "Predicciones",
      icon: <Database size={iconSize} />,
      subItems: [
        {
          label: "Generar Predicción",
          path: "prediccion/generar",
          // --- ¡CAMBIO 2! ---
          icon: <Sparkles size={iconSize} />, // <-- Ícono de "tuerquita" reemplazado
        },
      ],
    },
    
    // (SUPERADMIN)
    // Paquete SaaS
    saas: {
      label: "SaaS",
      icon: <DollarSign size={iconSize} />,
      subItems: [
        {
          label: "Gestionar Planes de Suscripción",
          path: "saas/planes-suscripcion",
          icon: <Settings size={iconSize} />, // <-- 'Settings' se mantiene aquí
        },
        {
          label: "Registrar Tienda",
          path: "saas/registrar-tienda",
          icon: <Store size={iconSize} />,
        },
        {
          label: "Realizar Pago de Suscripcion",
          path: "saas/pago-suscripcion",
          icon: <DollarSign size={iconSize} />, 
        },
      ], 
    },
    
  };

  // --- CONSTRUCCIÓN DE LOS MENÚS POR ROL (Sin cambios) ---
  
  const baseMenu = { name: "Principal", items: [menuConfig.dashboard] };
  const auditoriaMenu = { name: "Seguridad", items: [menuConfig.auditoriaSeguridad] };
  const usuariosMenu = { name: "Usuarios", items: [menuConfig.gestionarUsuarios] };
  const comercialMenu = { name: "Comercial", items: [menuConfig.gestionComercial] };
  const ventasMenu = { name: "Ventas", items: [menuConfig.gestionarVentas] };
  const reportesMenu = { name: "Reportes", items: [menuConfig.reportes] };
  const prediccionMenu = { name: "Análisis", items: [menuConfig.prediccion] };
  const saasMenu = { name: "SaaS", items: [menuConfig.saas] };

  switch (rol) {
    case "superadmin":
      // Regla: Auditoria, Gestionar usuarios, saas, reportes
      return [
        baseMenu,
        auditoriaMenu,
        usuariosMenu,
        saasMenu,
        reportesMenu,
      ];

    case "admin":
      // Regla: Auditoria, Gestionar usuarios, Gestionar Ventas, Gestion Comercial, reportes y prediccion
      return [
        baseMenu,
        auditoriaMenu,
        usuariosMenu,
        comercialMenu,
        ventasMenu,
        reportesMenu,
        prediccionMenu,
      ];

    case "vendedor":
      // Regla: Gestionar Ventas
      return [baseMenu, ventasMenu];

    default:
      // Por defecto, solo el dashboard
      return [baseMenu];
  }
};