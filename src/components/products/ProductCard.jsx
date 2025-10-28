import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

const ProductCard = ({ product, className = "", compact = false, showAdd = true, variant = '' }) => {
  const { addToCart } = useCart();

  const resolveImage = (img) => {
    if (!img) return '';
    return (img.startsWith('http') || img.startsWith('/')) ? img : `/assets/img/${img}`;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    alert(`¡${product.nombre} agregado al carrito!`);
  };

  // If variant is 'catalog' render the larger, grid-like card used in ProductGrid
  if (variant === 'catalog') {
    return (
      <div className={`bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 h-full flex flex-col ${className}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={resolveImage(product.imagen)}
            alt={product.nombre}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          <div className="absolute top-2 left-2 flex gap-1">
            {product.destacado && (
              <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">⭐ Destacado</span>
            )}
            {product.nuevo && (
              <span className="bg-green-500 text-black text-xs px-2 py-1 rounded-full font-bold">🆕 Nuevo</span>
            )}
          </div>

          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              product.stock > 10 ? 'bg-green-500 text-white' : product.stock > 0 ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'
            }`}>
              {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
            </span>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{product.nombre}</h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.descripcion}</p>

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-blue-400">{formatPrice(product.precio)}</span>
            <span className="text-xs text-gray-500 capitalize">{product.categoria}</span>
          </div>

          <div className="mt-auto flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors font-medium text-sm ${
                product.stock === 0 ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-azul-electrico hover:bg-blue-700 text-white'
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
    );
  }

  return (
    <div className={`card-gaming p-6 group hover:scale-105 transition-all duration-300 h-full flex flex-col ${className}`}>
      <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
        <img
          src={resolveImage(product.imagen)}
          alt={product.nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.nuevo && (
          <span className="absolute top-2 left-2 bg-green-500 text-black px-2 py-1 rounded text-xs font-bold">
            NUEVO
          </span>
        )}
        {product.destacado && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
            DESTACADO
          </span>
        )}
      </div>

      <div className="mb-3">
        <span className="category-badge text-xs">
          {product.categoria}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-azul-claro transition-colors line-clamp-1">
        {product.nombre}
      </h3>

      {compact ? (
        <>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold gradient-text">
              {formatPrice(product.precio)}
            </span>
            <span className={`text-sm ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
            </span>
          </div>

          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {product.descripcion}
          </p>
        </>
      ) : (
        <>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
            {product.descripcion}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold gradient-text">
              {formatPrice(product.precio)}
            </span>
            <span className={`text-sm ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
            </span>
          </div>
        </>
      )}

      <div className="flex gap-2">
        <Link
          to={`/producto/${product.id}`}
          className="btn-primary flex-1 text-center py-2 text-sm"
        >
          Ver Detalles
        </Link>
        {showAdd && (
          <button
            onClick={handleAddToCart}
            className="btn-secondary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed min-w-[48px] hover:bg-azul-electrico hover:text-white transition-colors"
            disabled={product.stock === 0}
            title="Agregar al carrito"
          >
            🛒
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;