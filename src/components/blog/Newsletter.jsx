const Newsletter = () => {
  return (
    <section className="py-12 relative z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-500/20 relative">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4 font-orbitron">
              🎮 ¡Únete a nuestra comunidad gaming!
            </h3>
            <p className="text-gray-300">
              Recibe las últimas noticias, ofertas exclusivas y guías gaming directamente en tu correo.
            </p>
          </div>

          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-6 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold hover:opacity-90 transition-opacity"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;