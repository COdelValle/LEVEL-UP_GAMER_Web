import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogGrid from '../../../components/blog/BlogGrid';
import blogPostsData from '../../../assets/data/blogs.json';

// Categorías hardcodeadas (o puedes crear un categories.json)
const categories = [
  { id: 'todas', name: 'Todas las Categorías' },
  { id: 'guias', name: 'Guías' },
  { id: 'reviews', name: 'Reviews' },
  { id: 'noticias', name: 'Noticias' },
  { id: 'tutoriales', name: 'Tutoriales' }
];


const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Simular una pequeña carga para la UX, aunque los datos son locales
    setTimeout(() => {
      setBlogPosts(blogPostsData);
      setIsLoading(false);
    }, 300);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        {/* Background handled globally in App.jsx */}
        <div className="relative pt-24 pb-12 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
            <p className="text-gray-300 text-xl">Cargando contenido gaming...</p>
          </div>
        </div>
      </div>
    );
  }

  // Estadísticas extendidas del blog
  // Ahora cargadas desde el JSON local a través de useBlog
  const totalPosts = blogPosts?.length || 0;
  const totalLikes = blogPosts?.reduce((sum, post) => sum + (post.likes || 0), 0) || 0;
  const totalViews = blogPosts?.reduce((sum, post) => sum + (post.views || 0), 0) || 0;
  const totalReadTime = blogPosts?.reduce((sum, post) => {
    const minutes = parseInt(post.readTime);
    return sum + (isNaN(minutes) ? 5 : minutes);
  }, 0) || 0;
  const featuredPosts = blogPosts?.filter(post => post.featured)?.length || 0;

  return (
    <div className="min-h-screen relative">
      {/* Background handled globally in App.jsx */}
      <div className="relative pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-orbitron">
              Blog Level-Up Gamer
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Descubre las últimas noticias, reviews y guías del mundo gaming. 
              Mantente actualizado con los mejores consejos y tendencias.
            </p>
            
            {/* Stats Extendidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{totalPosts}</div>
                <div className="text-gray-400 text-sm">Artículos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{totalLikes}+</div>
                <div className="text-gray-400 text-sm">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{totalViews}+</div>
                <div className="text-gray-400 text-sm">Visitas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{totalReadTime}+</div>
                <div className="text-gray-400 text-sm">Min lectura</div>
              </div>
            </div>
          </div>

          {/* Barra de Búsqueda y Filtros */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
              {/* Barra de Búsqueda */}
              <div className="flex-1 w-full lg:max-w-2xl">
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

              {/* Ordenar */}
              <div className="w-full lg:w-auto">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:border-green-400 outline-none"
                >
                  <option value="newest">Más Recientes</option>
                  <option value="oldest">Más Antiguos</option>
                  <option value="popular">Más Populares</option>
                  <option value="likes">Más Likes</option>
                </select>
              </div>
            </div>

            {/* Filtros de Categorías */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2 rounded-full font-bold transition-all ${
                    activeCategory === category.id 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-black shadow-lg shadow-green-500/25' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Destacados */}
          {activeCategory === 'todas' && featuredPosts > 0 && (
            <section className="mb-6">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-orbitron">
                ⭐ Artículos Destacados
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {blogPosts?.filter(post => post.featured)?.slice(0, 2)?.map(post =>  (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="bg-gray-800 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 border-2 border-yellow-500/50 hover:border-yellow-400 group"
                  >
                    <div className={`h-48 bg-gradient-to-br ${post.gradient} relative`}>
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-6xl mb-4 block group-hover:scale-110 transition-transform">{post.image}</span>
                          <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold absolute top-4 left-4">
                            ⭐ Destacado
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-3 py-1 rounded-full text-xs font-bold capitalize mb-3 inline-block">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>📅 {post.date}</span>
                        <span className="text-yellow-400 font-bold">Leer más →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Grid de Blogs con Paginación */}
          <BlogGrid 
            activeCategory={activeCategory}
            blogPosts={blogPosts}
            searchTerm={searchTerm}
            sortBy={sortBy}
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

          {/* CTA Final */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">
              ¿Tienes algún tema que te gustaría que cubramos?
            </p>
            <Link 
              to="/contacto" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              💌 Sugerir un artículo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
