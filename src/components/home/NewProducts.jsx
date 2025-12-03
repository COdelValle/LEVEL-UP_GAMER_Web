import { useProducts } from '../../hooks/useProducts';
import CardCarrusel from '../common/CardCarrusel';
import { Link } from 'react-router-dom';

const NewProducts = () => {
  const { products, loading } = useProducts();
  
  // Productos marcados como "nuevo" O creados en los últimos 14 días
  // Si no hay suficientes nuevos, mostrar destacados como fallback
  const newProducts = products.filter((p) => {
    if (p.nuevo) return true;
    
    // Si tiene fecha de creación, revisar si es reciente (últimos 14 días)
    if (p.fechaCreacion) {
      const createdDate = new Date(p.fechaCreacion);
      const now = new Date();
      const daysOld = (now - createdDate) / (1000 * 60 * 60 * 24);
      return daysOld <= 14;
    }
    
    return false;
  });

  // Si no hay productos nuevos, usar destacados como fallback
  const displayProducts = newProducts.length > 0 ? newProducts : products.filter(p => p.destacado);

  return (
    <section className="py-16 relative">
      {/* Overlay de fondo sutil - igual a FeaturedProducts */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/20 to-gray-900/40 backdrop-blur-[1px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-3 gradient-text font-orbitron">
            ✨ Nuevos Ingresos
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Los últimos productos agregados a nuestro catálogo
          </p>
          <Link 
            to="/productos" 
            className="inline-block px-20 py-2 rounded-lg bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold hover:scale-105 transition-transform duration-300 mx-2"
          >
            Explorar todos →
          </Link>
        </div>

        <div className="text-center">
          {loading ? (
            <div className="py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-300 mt-4">Cargando nuevos ingresos...</p>
            </div>
          ) : displayProducts.length > 0 ? (
            <CardCarrusel products={displayProducts} size="large" />
          ) : (
            <p className="text-gray-400 text-lg">No hay nuevos productos disponibles</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;