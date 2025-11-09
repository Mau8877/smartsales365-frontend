import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStoreData } from '@/layouts/StoreLayout';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const StoreProductDetail = () => {
  const { productId, slug } = useParams();
  const navigate = useNavigate();
  const store = useStoreData();

  const producto = {
    id: productId,
    nombre: `Producto ${productId}`,
    precio: 99.99 * parseInt(productId),
    descripcion: `Este es un producto increíble de ${store.nombre}. Características premium y calidad garantizada.`,
    categoria: 'Electrodomésticos'
  };

  const handleAddToCart = () => {
    console.log(`Producto ${productId} agregado al carrito`);
    alert(`¡${producto.nombre} agregado al carrito!`);
  };

  const handleBuyNow = () => {
    navigate(`/tienda/${slug}/carrito`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        to={`/tienda/${slug}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a productos
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Imagen del Producto</span>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold mb-2">{producto.nombre}</h1>
            <p className="text-gray-500 mb-4">Categoría: {producto.categoria}</p>
            <p className="text-3xl font-bold text-green-600 mb-4">${producto.precio}</p>
            
            <p className="text-gray-600 mb-6">{producto.descripcion}</p>
            
            <div className="flex gap-3">
              <button 
                onClick={handleAddToCart}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </button>
              <button 
                onClick={handleBuyNow}
                className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductDetail;