import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

const ProductCard = ({ product, className = "", compact = false, showAdd = true }) => {
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