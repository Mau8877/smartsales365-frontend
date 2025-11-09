import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStoreData } from '@/layouts/StoreLayout';

const StoreProductsPage = () => {
  const store = useStoreData();
  const { slug } = useParams();

  const productosEjemplo = [
    { id: 1, nombre: "Lavadora Samsung", precio: 599.99 },
    { id: 2, nombre: "Refrigeradora LG", precio: 899.99 },
    { id: 3, nombre: "Microondas Panasonic", precio: 149.99 },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Productos de {store.nombre}
        </h1>
        <p className="text-gray-600">{store.descripcion_corta}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Nuestros Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productosEjemplo.map((producto) => (
            <Link 
              key={producto.id}
              to={`/tienda/${slug}/producto/${producto.id}`}
              className="border rounded-lg p-4 text-center hover:shadow-md transition-shadow block"
            >
              <div className="h-40 bg-gray-200 rounded mb-3 flex items-center justify-center">
                <span className="text-gray-500">Imagen de {producto.nombre}</span>
              </div>
              <h3 className="font-medium text-gray-900">{producto.nombre}</h3>
              <p className="text-green-600 font-semibold mt-1">${producto.precio}</p>
              <button 
                className="mt-3 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 text-sm"
                onClick={(e) => e.preventDefault()}
              >
                Ver Detalles
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreProductsPage;