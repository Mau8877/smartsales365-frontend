import { createBrowserRouter } from "react-router-dom";

// Importamos los componentes que actuarán como "plantillas" y páginas
import SaaSHomePage from "@/home/SaaSHomePage.jsx"; // La página de marketing
import StoreLayout from "@/layouts/StoreLayout.jsx"; // El layout para cada tienda
import StoreHomePage from "@/home/StoreHomePage.jsx"; // La página de inicio de una tienda

const router = createBrowserRouter([
  {
    // Usamos App.jsx como el "cascarón" principal de toda la aplicación.
    // Todas las rutas vivirán dentro de él.
    children: [
      // --- RUTA 1: La página de marketing de tu SaaS ---
      {
        path: "/", // Cuando la URL es la raíz
        element: <SaaSHomePage />, // Muestra la página de bienvenida de SmartSales365
      },

      // --- RUTA 2: La estructura para las tiendas de los clientes ---
      {
        path: "tienda/:storeName",
        element: <StoreLayout />, // Usa la plantilla específica para tiendas
        children: [
          {
            // 'index: true' significa que esta es la página por defecto para la ruta padre.
            // Se mostrará cuando visites "/tienda/nombre-de-la-tienda".
            index: true,
            element: <StoreHomePage />,
          },
          // En el futuro, podrías añadir más páginas aquí, como:
          // { path: "productos", element: <PaginaDeProductos /> }
        ],
      },
    ],
  },
]);

export default router;
