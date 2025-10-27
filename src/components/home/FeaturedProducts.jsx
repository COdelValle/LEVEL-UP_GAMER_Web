import { useProducts } from '../../hooks/useProducts';
import CardCarrusel from './../common/CardCarrusel';

const FeaturedProducts = () => {
  const { products, loading} = useProducts();
  const featured = products?.filter((p) => p.destacado);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 gradient-text font-orbitron">
            Productos Destacados
          </h2>
          <p className="text-xl text-gray-300">
            Los favoritos de nuestra comunidad gaming
          </p>
        </div>

        <div className="text-center">
          <CardCarrusel products={featured} />
          {/*
          <p className="text-gray-400 text-lg">
            Próximamente productos destacados
          </p>
          */}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;