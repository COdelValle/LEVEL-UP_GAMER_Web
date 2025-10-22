const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text font-orbitron">
            Productos Destacados
          </h2>
          <p className="text-xl text-gray-300">
            Los favoritos de nuestra comunidad gaming
          </p>
        </div>

        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            Próximamente productos destacados
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;