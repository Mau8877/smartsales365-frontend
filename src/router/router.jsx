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
import AdminDashboard from "@/pages/Administrative/AdminDashboard.jsx";
import AdministrativeLayout from "@/layouts/AdministrativeLayout.jsx";

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
      // Aquí irán tus otras páginas, por ejemplo:
      // { path: "productos", element: <PaginaDeProductos /> },
      // { path: "usuarios", element: <PaginaDeUsuarios /> },
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
