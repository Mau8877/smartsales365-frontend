import { Outlet, useParams } from "react-router-dom";

// Este es el "cascarón" o plantilla que todas las tiendas usarán.
function StoreLayout() {
  // useParams nos permite leer los parámetros de la URL.
  // En este caso, estamos leyendo el "storeName" de la ruta "/tienda/:storeName"
  const { storeName } = useParams();

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de Navegación de la Tienda */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">
            Tienda: <span className="text-blue-600">{storeName}</span>
          </h1>
          {/* Aquí podrías añadir enlaces de navegación de la tienda */}
        </div>
      </header>

      {/* El <Outlet /> es el espacio donde se mostrará el contenido de cada página de la tienda */}
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default StoreLayout;
