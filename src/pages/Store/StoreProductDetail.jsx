import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStoreData } from '@/layouts/StoreLayout';
import publicApiClient from '@/services/publicApiClient';
import { ArrowLeft, ShoppingCart, Share2, ZoomIn, Check } from 'lucide-react';

const StoreProductDetail = () => {
  const { productId, slug } = useParams();
  const navigate = useNavigate();
  const store = useStoreData();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [copied, setCopied] = useState(false);
  const autoPlayRef = useRef(null);

  // Ordenar fotos: principal primero, luego las demás
  const fotos = producto?.fotos ? [...producto.fotos].sort((a, b) => 
    b.principal - a.principal
  ) : [];
  
  const currentImage = fotos[selectedImageIndex]?.foto || null;

  // Auto-play de imágenes cada 10 segundos
  useEffect(() => {
    if (fotos.length > 1 && isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setSelectedImageIndex((prev) => (prev + 1) % fotos.length);
      }, 10000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [fotos.length, isAutoPlaying]);

  // Pausar auto-play cuando el usuario interactúa
  const handleManualImageSelect = (index) => {
    setSelectedImageIndex(index);
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  // Efecto de zoom al hacer hover
  const handleImageHover = (e) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  // Función para copiar URL al portapapeles
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Oculta el mensaje después de 2 segundos
    } catch (err) {
      console.error('Error al copiar URL:', err);
      // Fallback para navegadores más antiguos
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fetchProducto = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await publicApiClient.get(
        `/comercial/productos/${productId}/public-detail/`
      );
      
      setProducto(data);
      
    } catch (err) {
      console.error('Error al cargar producto:', err);
      setError('No se pudo cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProducto();
    }
  }, [productId]);

  // Resetear selectedImageIndex cuando cambian las fotos para mostrar la principal primero
  useEffect(() => {
    if (fotos.length > 0) {
      setSelectedImageIndex(0); // Siempre empezar con la primera foto (que será la principal)
    }
  }, [fotos.length]);

  const handleAddToCart = () => {
    console.log(`Producto ${productId} agregado al carrito`);
    alert(`¡${producto.nombre} agregado al carrito!`);
  };

  const handleBuyNow = () => {
    navigate(`/tienda/${slug}/carrito`);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-200 h-96 rounded-xl"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link 
          to={`/tienda/${slug}`}
          className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a productos
        </Link>
        
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {error || 'Producto no encontrado'}
          </h3>
          <p className="text-gray-500 mb-4">
            El producto que buscas no está disponible.
          </p>
          <Link
            to={`/tienda/${slug}`}
            className="bg-orange-600 text-white px-6 py-2.5 rounded-xl hover:bg-orange-700 transition-colors font-medium inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const displayDescription = showFullDescription 
    ? producto.descripcion 
    : producto.descripcion?.slice(0, 500);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Link 
        to={`/tienda/${slug}`}
        className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-6 font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a productos
      </Link>

      <div className="bg-white rounded-xl shadow-sm p-6 border">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Galería de imágenes mejorada */}
          <div className="space-y-4">
            {/* Imagen principal con zoom aumentado */}
            <div 
              className="relative bg-gray-100 h-80 md:h-96 rounded-xl overflow-hidden cursor-zoom-in group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleImageHover}
            >
              {currentImage ? (
                <>
                  <img
                    src={currentImage}
                    alt={producto.nombre}
                    className={`w-full h-full object-cover transition-transform duration-200 ${
                      isZoomed ? 'scale-150' : 'scale-100'
                    }`}
                    style={{
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                    }}
                  />
                  
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ZoomIn className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Imagen no disponible</span>
                </div>
              )}
            </div>
            
            {/* Miniaturas mejoradas */}
            {fotos.length > 1 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-700">
                    Imágenes ({selectedImageIndex + 1}/{fotos.length})
                    {fotos[selectedImageIndex]?.principal && (
                      <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        Principal
                      </span>
                    )}
                  </h4>
                  {!isAutoPlaying && (
                    <button
                      onClick={() => setIsAutoPlaying(true)}
                      className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Reanudar auto-play
                    </button>
                  )}
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {fotos.map((foto, index) => (
                    <button
                      key={index}
                      onClick={() => handleManualImageSelect(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
                        selectedImageIndex === index
                          ? 'border-orange-500 shadow-md scale-105'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <img
                        src={foto.foto}
                        alt={`${producto.nombre} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {foto.principal && (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Información del producto - Botones más arriba */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {producto.nombre}
              </h1>
              
              <div className="space-y-2 mb-6">
                {producto.marca && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Marca:</span>{' '}
                    <span className="text-gray-800">{producto.marca.nombre}</span>
                  </p>
                )}
                
                {producto.categorias && producto.categorias.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Categoría:</span>{' '}
                    <span className="text-gray-800">
                      {producto.categorias.map(cat => cat.nombre).join(', ')}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Precio y acciones */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-4xl font-bold text-green-600">
                ${producto.precio}
              </p>
              <div className="flex gap-3 items-center">
                {/* Mensaje de URL copiada */}
                {copied && (
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    <Check className="w-4 h-4" />
                    URL copiada
                  </div>
                )}
                <button 
                  onClick={handleShare}
                  className="p-3 text-gray-400 hover:text-blue-500 transition-colors rounded-full hover:bg-blue-50 relative group"
                  title="Compartir producto"
                >
                  <Share2 className="w-5 h-5" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Copiar enlace
                  </div>
                </button>
              </div>
            </div>

            {/* Botones de acción - MOVIDOS MÁS ARRIBA */}
            <div className="flex gap-4 mb-6">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-orange-600 text-white px-6 py-4 rounded-xl hover:bg-orange-700 transition-all duration-200 flex items-center justify-center gap-3 font-medium text-lg shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                Agregar al Carrito
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 border-2 border-orange-600 text-orange-600 px-6 py-4 rounded-xl hover:bg-orange-600 hover:text-white transition-all duration-200 font-medium text-lg shadow-md hover:shadow-lg"
              >
                Comprar Ahora
              </button>
            </div>

            {/* Información adicional - SIN STOCK */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700 mb-1">Disponibilidad</span>
                  <span className={`font-semibold ${producto.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {producto.stock > 0 ? 'En stock' : 'Sin stock'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700 mb-1">SKU</span>
                  <span className="text-gray-600 font-mono">{producto.id}</span>
                </div>
                {producto.codigo_referencia && (
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 mb-1">Código de referencia</span>
                    <span className="text-gray-600">{producto.codigo_referencia}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Descripción en ancho completo - ABAJO DE TODO */}
        {producto.descripcion && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="font-semibold text-gray-800 mb-4 text-xl">Descripción del Producto</h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                {displayDescription}
                {producto.descripcion.length > 500 && (
                  <button
                    onClick={toggleDescription}
                    className="ml-2 text-orange-600 hover:text-orange-700 font-medium text-lg"
                  >
                    {showFullDescription ? ' ... ver menos' : ' ... ver más'}
                  </button>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreProductDetail;