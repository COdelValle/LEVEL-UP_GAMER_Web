import { useState } from 'react';
import BlogGrid from '../components/blog/BlogGrid';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-orbitron">
            Blog Level-Up Gamer
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre las últimas noticias, reviews y guías del mundo gaming. 
            Mantente actualizado con los mejores consejos y tendencias.
          </p>
        </div>

        {/* Barra de Búsqueda */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex bg-gray-800 rounded-lg p-2 border border-gray-700 focus-within:border-green-400 transition-colors">
            <input
              type="text"
              placeholder="Buscar en el blog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white text-lg px-4"
            />
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
              🔍
            </button>
          </div>
        </div>

        {/* Filtros de Categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                activeCategory === category.id 
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Grid de Blogs */}
        <BlogGrid 
          activeCategory={activeCategory}
          searchTerm={searchTerm}
        />

        {/* Newsletter */}
        <div className="mt-16 bg-gray-800 rounded-2xl p-8 text-center border border-gray-700">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4 font-orbitron">
            📧 Suscríbete a nuestro Newsletter
          </h3>
          <p className="text-gray-300 mb-6">
            Recibe las últimas noticias gaming, ofertas exclusivas y guías directamente en tu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu.email@ejemplo.com"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none"
            />
            <button className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;