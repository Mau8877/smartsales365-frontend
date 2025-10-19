import { createBrowserRouter } from "react-router-dom";

// Importamos los componentes que actuarán como "plantillas" y páginas
import SaaSHomePage from "@/home/SaaSHomePage.jsx"; // La página de marketing
import ListaTiendas from "@/home/components/ListaTiendas.jsx"; // La lista de tiendas
import StoreLayout from "@/layouts/StoreLayout.jsx"; // El layout para cada tienda
import StoreHomePage from "@/home/StoreHomePage.jsx"; // La página de inicio de una tienda

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <SaaSHomePage />,
      },
      {
        path: "tiendas",
        element: <ListaTiendas />,
      },
      {
        path: "tienda/:storeName",
        element: <StoreLayout />,
        children: [
          {
            index: true,
            element: <StoreHomePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
