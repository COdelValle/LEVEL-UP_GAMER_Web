import { useProducts } from '../../hooks/useProducts';
import CardCarrusel from '../common/CardCarrusel';
import { Link } from 'react-router-dom';

const NewProducts = () => {
  const { products } = useProducts();
  const newProducts = products.filter((p) => p.nuevo);

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 relative">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 gradient-text font-orbitron">
            Nuevos Ingresos
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Las últimas incorporaciones a nuestra tienda
          </p>
          <Link 
            to="/productos" 
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold hover:scale-105 transition-transform duration-300"
          >
            Explorar novedades →
          </Link>
        </div>

        <div className="text-center">
          {newProducts.length > 0 ? (
            <CardCarrusel products={newProducts} />
          ) : (
            <p className="text-gray-400 text-lg">No hay nuevos productos disponibles</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;