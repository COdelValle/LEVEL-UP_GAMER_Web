import { useProducts } from '../../hooks/useProducts';
import CardCarrusel from './../common/CardCarrusel';

const Ofertas = () => {
  const { products, loading} = useProducts();
  const nuevos = products?.filter((p) => p.nuevo);

  return (
    <section className="py-16 relative">
      {/* Overlay de fondo sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-900/10 to-gray-900/30 backdrop-blur-[1px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 gradient-text font-orbitron">
            Nuevos Ingresos
          </h2>
          <p className="text-xl text-gray-300">
            Descubre lo último en tecnología gaming
          </p>
        </div>

        <div className="text-center">
          <CardCarrusel products={nuevos} />
          {/*
          <p className="text-gray-400 text-lg">
            Próximamente nuevas ofertas
          </p>
          */}
        </div>
      </div>
    </section>
  );
};

export default Ofertas;