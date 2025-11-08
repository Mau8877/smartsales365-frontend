import React, { useState, useEffect, createContext, useContext } from 'react';
import { Outlet, useParams, Link } from 'react-router-dom';
// --- CORRECCIÓN ---
// Cambiamos el alias '@/' por una ruta relativa
import publicApiClient from "@/services/publicApiClient"; // Asumo que tienes tu cliente de API
import StoreHeader from "@/components/StoreHeader"; // El header que acabamos de crear
// --- FIN CORRECCIÓN ---
import { Loader, AlertCircle } from 'lucide-react';

// 1. Creamos un Context para pasar los datos de la tienda
// a todos los componentes hijos (Header, Outlet, Footer)
const StoreDataContext = createContext(null);

/**
 * Este es el "cascarón" o plantilla que todas las tiendas usarán.
 * AHORA: Carga los datos de la tienda (logo, nombre, etc.) desde la API
 * usando el 'slug' de la URL.
 */
function StoreLayout() {
  const { slug } = useParams(); // Asegúrate que tu router use ':slug'
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        // Usamos el endpoint público de 'retrieve' que creamos en el backend
        // (GET /api/saas/public/tiendas/:slug/)
        const response = await publicApiClient.get(`/saas/public/tiendas/${slug}/`);
        setStore(response);
      } catch (err) {
        console.error("Error fetching store data:", err);
        setError("No se pudo encontrar la tienda. ¿La dirección es correcta?");
      } finally {
        setLoading(false);
      }
    };
    fetchStoreData();
  }, [slug]); // Se ejecuta cada vez que el slug de la URL cambia

  // Estado de Carga
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  // Estado de Error
  if (error || !store) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-red-600">
        <AlertCircle className="w-16 h-16" />
        <p className="mt-4 text-xl font-medium">{error || "Tienda no encontrada."}</p>
        <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Volver al directorio
        </Link>
      </div>
    );
  }

  // Estado Exitoso
  return (
    // 2. Proveemos la data de la tienda a todos los componentes hijos
    <StoreDataContext.Provider value={store}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        
        {/* 3. Usamos nuestro nuevo Header y le pasamos la data */}
        <StoreHeader store={store} />

        {/* El <Outlet /> es el espacio donde se mostrará el contenido */}
        <main className="container mx-auto p-4 md:p-6 lg:p-8 flex-grow">
          <Outlet /> {/* Aquí se renderiza la página de productos, etc. */}
        </main>

        {/* 4. (Opcional) Un pie de página que también usa la data */}
        <footer className="border-t border-gray-200 mt-12 py-8 bg-white">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} {store.nombre}. Todos los derechos reservados.</p>
            <p className="mt-2">
              Potenciado por <span className="font-semibold text-blue-600">SmartSales365</span>
            </p>
          </div>
        </footer>
      </div>
    </StoreDataContext.Provider>
  );
}

// 5. (Opcional pero recomendado) Un hook para que los hijos
// (ej. la página de productos) puedan acceder a la data de la tienda fácilmente.
export const useStoreData = () => {
  const context = useContext(StoreDataContext);
  if (!context) {
    throw new Error("useStoreData debe ser usado dentro de un StoreLayout");
  }
  return context;
};

export default StoreLayout;