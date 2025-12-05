import { useProducts } from '../../hooks/useProducts';
import CardCarrusel from './../common/CardCarrusel';

const OffersLowStock = () => {
  const { products, loading } = useProducts();
  const lowThreshold = 5;

  const offers = products?.filter(p => p.oferta === true) || [];
  const lowStock = products?.filter(p => typeof p.stock === 'number' && p.stock > 0 && p.stock <= lowThreshold) || [];

  // merge unique products (offers first, then low stock)
  const mergedMap = new Map();
  offers.forEach(p => mergedMap.set(p.id, { ...p, isOffer: true, isLowStock: false }));
  lowStock.forEach(p => {
    if (mergedMap.has(p.id)) {
      const existing = mergedMap.get(p.id);
      mergedMap.set(p.id, { ...existing, isLowStock: true });
    } else {
      mergedMap.set(p.id, { ...p, isOffer: false, isLowStock: true });
    }
  });
  const merged = Array.from(mergedMap.values());

  return (
    <section className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-900/10 to-gray-900/30 backdrop-blur-[1px] pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="text-center mb-6">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text font-orbitron mb-2">
            Ofertas & Críticos
          </h3>
          <p className="text-gray-300 text-lg">Aprovecha ofertas y revisa productos que se están agotando</p>
        </div>

        <div className="text-center">
          {loading ? (
            <div className="py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-300 mt-4">Cargando productos...</p>
            </div>
          ) : merged.length > 0 ? (
            <>
              <CardCarrusel products={merged} size="large" />
              <div className="mt-4 text-xs text-gray-400 space-x-4">
                {offers.length > 0 && <span>🎯 {offers.length} Ofertas</span>}
                {lowStock.length > 0 && <span>⚠️ {lowStock.length} Stock Crítico (&lt;{lowThreshold} unidades)</span>}
              </div>
            </>
          ) : (
            <p className="text-gray-400">No hay ofertas ni productos con stock crítico</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OffersLowStock;