import { createBrowserRouter } from "react-router-dom";

// Páginas Publicas
import SaaSHomePage from "@/home/SaaSHomePage.jsx";
import SaaSLogin from "@/home/SaaSLogin.jsx";
import SaaSRegister from "@/home/SaaSRegister.jsx";
import ReturnStripe from "@/home/components/SaaS/ReturnStripe.jsx";


// Paginas para clientes
import StoreHomePage from "@/home/StoreHomePage.jsx";
import StoreLayout from "@/layouts/StoreLayout.jsx";

// Componentes de protección de rutas
import PublicRoute from "@/components/PublicRoute.jsx"; // Asegúrate de que la ruta sea correcta
import ProtectedRoute from "@/components/ProtectedRoute.jsx"; // Asegúrate de que la ruta sea correcta

// Paginas para administradores
import AdminDashboard from "@/pages/Admin/AdminDashboard.jsx";
import AdministrativeLayout from "@/layouts/AdministrativeLayout.jsx";
import EditProfile from "@/pages/Admin/EditProfile.jsx";
import GestionarUsuariosClientes from "@/pages/Admin/GestionarUsuariosClientes/index.jsx"
import GestionarUsuariosTienda from "@/pages/Admin/GestionarUsuariosTienda/index.jsx"
import Bitacora from "@/pages/Admin/Bitacora/index.jsx"
import GestionarCategoriaProductos from "@/pages/Admin/GestionarCategoriaProductos/index.jsx"
import GestionarProductos from "@/pages/Admin/GestionarProductos/index.jsx"
import PagoProductos from "@/pages/Admin/PagoProductos/index.jsx"
import GenerarNotaVenta from "@/pages/Admin/GenerarNotaVenta/index.jsx"
import HistorialVentas from "@/pages/Admin/HistorialVentas/index.jsx"
import GenerarReportes from "@/pages/Admin/GenerarReportes/index.jsx"
import GenerarPrediccion from "@/pages/Admin/GenerarPrediccion/index.jsx"
import GestionarUsuariosAll from "@/pages/Admin/GestionarUsuariosAll/index.jsx"
import GestionarPlanesSuscripcion from "@/pages/Admin/GestionarPlanesSuscripcion/index.jsx"
import RegistrarTienda from "@/pages/Admin/RegistrarTienda/index.jsx"

// Una página para rutas no encontradas
import NotFoundPage from "@/components/NotFoundPage.jsx";

const router = createBrowserRouter([
  // --- RUTAS PÚBLICAS ---
  // Estas rutas solo son accesibles si el usuario NO está autenticado.
  {
    path: "/",
    element: (
      <PublicRoute>
        <SaaSHomePage />
      </PublicRoute>
    ),
  },
  
  {
    path: "/saas-login",
    element: (
      <PublicRoute>
        <SaaSLogin />
      </PublicRoute>
    ),
  },
  {
    path: "/saas-register",
    element: (
      <PublicRoute>
        <SaaSRegister />
      </PublicRoute>
    ),
  },
  {
    // Esta página es especial: maneja la creación de la sesión,
    // por lo que no debe estar protegida por PublicRoute.
    path: "/saas-register/return",
    element: <ReturnStripe />,
  },

  // --- RUTAS PRIVADAS PARA ADMINISTRADORES / VENDEDORES ---
  // Protegidas por <ProtectedRoute>. Si no estás logueado, te redirige a /saas-login.
  // Si eres un 'cliente', también te redirige.
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <AdministrativeLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path:"profile",
        element:<EditProfile />
      },
      {
        path:"bitacora/index",
        element:<Bitacora />
      },
      {
        path:"usuarios/tienda",
        element:<GestionarUsuariosTienda />
      },
      {
        path:"usuarios/clientes",
        element:<GestionarUsuariosClientes />
      },
      {
        path:"comercial/categorias",
        element:<GestionarCategoriaProductos />
      },
      {
        path:"comercial/productos",
        element:<GestionarProductos />
      },
      {
        path:"ventas/productos",
        element:<PagoProductos />
      },
      {
        path:"ventas/nota-venta",
        element:<GenerarNotaVenta />
      },
      {
        path:"ventas/historial-ventas",
        element:<HistorialVentas />
      },
      {
        path:"reporte/generar",
        element:<GenerarReportes />
      },
      {
        path:"prediccion/generar",
        element:<GenerarPrediccion />
      },
      {
        path:"usuarios/all",
        element:<GestionarUsuariosAll />
      },
      {
        path:"saas/planes-suscripcion",
        element:<GestionarPlanesSuscripcion />
      },
      {
        path:"saas/registrar-tienda",
        element:<RegistrarTienda />
      },
    ],
  },

  // --- RUTAS PRIVADAS PARA CLIENTES ---
  // También protegidas. El componente ProtectedRoute se encargará de
  // permitir el paso si el rol es 'cliente' (o cualquier otro rol autenticado).
  {
    path: "/tiendas",
    element: (
      <PublicRoute>
        <StoreHomePage />
      </PublicRoute>
    ),
  },
  {
    path: "/tienda/:storeName",
    element: (
      <ProtectedRoute>
        <StoreLayout />
      </ProtectedRoute>
    ),
    children: [
      // ... rutas específicas de la tienda de un cliente
    ],
  },

  //Atrapa cualquier otra ruta que no coincida.
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
