import React, { useState } from 'react';
import { useCart } from "../../context/CartContext";
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, filters }) => {
  const { addToCart } = useCart();
  const [notification, setNotification] = useState('');

  // Filtrar productos basado en los filtros
  const filteredProducts = products.filter(product => {
    if (filters.categoria && product.categoria !== filters.categoria) {
      return false;
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return (
        product.nombre.toLowerCase().includes(searchTerm) ||
        product.descripcion.toLowerCase().includes(searchTerm)
      );
    }
    
    return true;
  });

  // Función para agregar al carrito
  const handleAddToCart = (product) => {
    try {
      addToCart({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        imagen: product.imagen,
        categoria: product.categoria,
        quantity: 1
      });
      
      // Mostrar notificación
      setNotification(`✅ ${product.nombre} agregado al carrito`);
      setTimeout(() => setNotification(''), 3000);
      
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      setNotification('❌ Error al agregar al carrito');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  return (
    <div>
      {/* Notificación */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {notification}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {filteredProducts.length} productos encontrados
        </h2>
        {filters.categoria && (
          <span className="text-gray-300 capitalize">
            Categoría: {filters.categoria}
          </span>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl text-white mb-2">No se encontraron productos</h3>
          <p className="text-gray-400">Intenta con otros filtros o términos de búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 h-full flex flex-col"
            >
              {/* Imagen del producto */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={(product.imagen && (product.imagen.startsWith('http') || product.imagen.startsWith('/'))) ? product.imagen : `/assets/img/${product.imagen}`}
                  alt={product.nombre}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {product.destacado && (
                    <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                      ⭐ Destacado
                    </span>
                  )}
                  {product.nuevo && (
                    <span className="bg-green-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                      🆕 Nuevo
                    </span>
                  )}
                </div>
                
                {/* Stock */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    product.stock > 10 
                      ? 'bg-green-500 text-white' 
                      : product.stock > 0 
                      ? 'bg-yellow-500 text-black' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                  {product.nombre}
                </h3>
                
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {product.descripcion}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-blue-400">
                    {formatPrice(product.precio)}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {product.categoria}
                  </span>
                </div>

                {/* Botones de acción */}
                <div className="mt-auto flex items-center gap-3">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors font-medium text-sm ${
                      product.stock === 0
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-azul-electrico hover:bg-blue-700 text-white'
                    }`}
                  >
                    <span className="text-lg">🛒</span>
                    <span>{product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}</span>
                  </button>

                  <Link to={`/producto/${product.id}`} className="w-32 h-12 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center text-sm font-medium">
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;