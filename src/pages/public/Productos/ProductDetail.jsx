import { useParams, Navigate } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';
import { formatPrice } from '../../../utils/formatters';

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById, loading } = useProducts();
  const product = getProductById(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="card-gaming p-8 animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-700 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                <div className="h-6 bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/productos" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="card-gaming p-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Imagen del producto */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.nuevo && (
                  <span className="absolute top-4 left-4 bg-green-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    NUEVO
                  </span>
                )}
                {product.destacado && (
                  <span className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    DESTACADO
                  </span>
                )}
              </div>
            </div>

            {/* Información del producto */}
            <div className="space-y-6">
              <div>
                <span className="category-badge text-sm">
                  {product.categoria}
                </span>
                <h1 className="text-3xl font-bold text-white mt-2 mb-4">
                  {product.nombre}
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {product.descripcion}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold gradient-text">
                    {formatPrice(product.precio)}
                  </span>
                  <span className={`text-lg font-semibold ${
                    product.stock > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    className="btn-primary flex-1 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={product.stock === 0}
                  >
                    🛒 Agregar al Carrito
                  </button>
                  <button className="btn-secondary px-6 py-4 text-lg">
                    ❤️
                  </button>
                </div>
              </div>

              {/* Especificaciones */}
              {product.especificaciones && (
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-xl font-bold mb-4 gradient-text">
                    Especificaciones
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(product.especificaciones).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-800">
                        <span className="text-gray-300">{key}:</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;