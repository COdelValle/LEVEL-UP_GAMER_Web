import { useProducts } from '../../hooks/useProducts';
import CardCarrusel from './../common/CardCarrusel';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const { products } = useProducts();
  const featured = products.filter((p) => p.destacado);
  const newProducts = products.filter((p) => p.nuevo);

  return (
    <section className="py-16 relative">
      {/* Overlay de fondo sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/20 to-gray-900/40 backdrop-blur-[1px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Sección Destacados */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-3 gradient-text font-orbitron">
            Productos Destacados
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Lo mejor de nuestra tienda gaming
          </p>
          <Link 
            to="/productos" 
            className="inline-block px-20 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition-transform duration-300 mx-2"
          >
            Ver catálogo completo →
          </Link>
          
        </div>

        <div className="text-center">
          {featured.length > 0 ? (
            <CardCarrusel products={featured} size="large" />
          ) : (
            <p className="text-gray-400 text-lg">No hay productos destacados disponibles</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;