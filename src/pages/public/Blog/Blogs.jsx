import { useState } from 'react';
import BlogGrid from '../../../components/blog/BlogGrid';

// DATOS DIRECTOS - elimina la importación
const categories = [
  { id: 'todas', name: 'Todas las Categorías' },
  { id: 'guias', name: 'Guías' },
  { id: 'reviews', name: 'Reviews' },
  { id: 'noticias', name: 'Noticias' },
  { id: 'tutoriales', name: 'Tutoriales' }
];

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Hero Section */}
  <div className="relative text-center mb-12 pt-12 md:pt-20">
          <div className="absolute inset-0 -z-10 bg-[url('/assets/img/BackgroundIndex1.jpg')] bg-cover bg-center opacity-30 rounded-2xl"></div>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500 font-orbitron">
            Blog Level-Up Gamer
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre las últimas noticias, reviews y guías del mundo gaming.
            Mantente actualizado con los mejores consejos y tendencias.
          </p>
        </div>

        {/* Search & Filters Wrapper (neon border) */}
        <div className="relative mb-12 p-1 rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
            <div className="max-w-2xl mx-auto mb-6">
              <div className="flex bg-gray-800 rounded-lg p-2 border border-gray-700 focus-within:border-blue-400 transition-colors">
                <input
                  type="text"
                  placeholder="Buscar en el blog..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg px-4"
                />
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  🔍
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${
                    activeCategory === category.id 
                      ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-black shadow-[0_8px_30px_rgba(99,102,241,0.12)]' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de Blogs (wrapped) */}
        <div className="mb-12 p-1 rounded-2xl bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
            <BlogGrid 
              activeCategory={activeCategory}
              searchTerm={searchTerm}
            />
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 p-1 rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20">
          <div className="mt-6 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-center border border-gray-800">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500 mb-4 font-orbitron">
              📧 Suscríbete a nuestro Newsletter
            </h3>
            <p className="text-gray-300 mb-6">
              Recibe las últimas noticias gaming, ofertas exclusivas y guías directamente en tu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu.email@ejemplo.com"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
              />
              <button className="bg-gradient-to-r from-blue-500 to-pink-500 text-black px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;