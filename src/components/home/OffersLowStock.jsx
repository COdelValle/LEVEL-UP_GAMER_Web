import { useProducts } from '../../hooks/useProducts';
import CardCarrusel from './../common/CardCarrusel';

const OffersLowStock = () => {
  const { products, loading } = useProducts();
  const lowThreshold = 5;

  const offers = products?.filter(p => p.oferta === true) || [];
  const lowStock = products?.filter(p => typeof p.stock === 'number' && p.stock <= lowThreshold) || [];

  // merge unique products (offers first)
  const mergedMap = new Map();
  offers.forEach(p => mergedMap.set(p.id, p));
  lowStock.forEach(p => mergedMap.set(p.id, p));
  const merged = Array.from(mergedMap.values());

  return (
    <section className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-900/10 to-gray-900/30 backdrop-blur-[1px] pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="text-center mb-6">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text font-orbitron">
            Ofertas
          </h3>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text font-orbitron mb-4">
            y productos con poco stock
          </h3>
          <p className="text-gray-300">Aprovecha las ofertas y revisa los productos que se están agotando</p>
        </div>

        <div className="text-center">
          {loading ? (
            <div className="py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-300 mt-4">Cargando productos...</p>
            </div>
          ) : merged.length > 0 ? (
            <CardCarrusel products={merged} size="large" />
          ) : (
            <p className="text-gray-400">No hay ofertas ni productos con poco stock</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OffersLowStock;