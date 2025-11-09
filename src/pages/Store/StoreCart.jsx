import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStoreData } from '@/layouts/StoreLayout';
import { ShoppingCart } from 'lucide-react';

const StoreCart = () => {
  const store = useStoreData();
  const { slug } = useParams();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="w-8 h-8 text-orange-600" />
        <h1 className="text-2xl font-bold">Mi Carrito</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600 mb-4">
          Carrito de compras de {store.nombre}
        </p>
        
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tu carrito está vacío</h3>
          <p className="text-gray-500 mb-6">
            Agrega algunos productos increíbles de {store.nombre}
          </p>
          <Link 
            to={`/tienda/${slug}`}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 inline-block"
          >
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreCart;