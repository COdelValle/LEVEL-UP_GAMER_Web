// src/components/blog/BlogGrid.jsx
import { Link } from 'react-router-dom';

// Datos de ejemplo para los blogs
const blogPosts = [
  {
    id: 1,
    title: "Cómo Armar el Setup Gamer Perfecto en 2025",
    excerpt: "Descubre los componentes esenciales para crear tu estación de juego ideal, desde el hardware hasta los periféricos que marcarán la diferencia.",
    category: "guias",
    author: "Level-Up Gamer Team",
    date: "2025-01-15",
    readTime: "15 min lectura",
    image: "🎮",
    gradient: "from-blue-600 to-purple-600",
    featured: true,
    likes: 124
  },
  {
    id: 2,
    title: "Los Esports en Chile: Crecimiento y Oportunidades 2025",
    excerpt: "Análisis completo del panorama actual de los deportes electrónicos en Chile, torneos locales y cómo formar parte de esta creciente comunidad profesional.",
    category: "noticias",
    author: "María Fernández - Esports Analyst",
    date: "2025-01-12",
    readTime: "18 min lectura",
    image: "🏆",
    gradient: "from-green-600 to-blue-600",
    featured: true,
    likes: 89
  },
  {
    id: 3,
    title: "Review: Los Mejores Mouse Gaming 2025",
    excerpt: "Comparativa completa de los mouse gaming más populares del mercado, análisis de sensores, ergonomía y relación calidad-precio.",
    category: "reviews",
    author: "Level-Up Gamer Team",
    date: "2025-01-10",
    readTime: "10 min lectura",
    image: "🖱️",
    gradient: "from-purple-600 to-pink-600",
    featured: false,
    likes: 156
  },
  {
    id: 4,
    title: "Guía Definitiva: Optimización de FPS en Juegos",
    excerpt: "Aprende a maximizar el rendimiento de tu PC gaming con estos tips y configuraciones avanzadas.",
    category: "tutoriales",
    author: "Level-Up Gamer Team",
    date: "2025-01-08",
    readTime: "12 min lectura",
    image: "⚡",
    gradient: "from-yellow-600 to-red-600",
    featured: false,
    likes: 203
  },
  {
    id: 5,
    title: "NVIDIA RTX 5000: La Revolución Gráfica",
    excerpt: "Todo lo que necesitas saber sobre las nuevas tarjetas gráficas que llegarán al mercado en 2025.",
    category: "noticias",
    author: "Level-Up Gamer Team",
    date: "2025-01-05",
    readTime: "8 min lectura",
    image: "💻",
    gradient: "from-indigo-600 to-blue-600",
    featured: true,
    likes: 178
  },
  {
    id: 6,
    title: "Streaming Profesional: Configuración Paso a Paso",
    excerpt: "Convierte tu setup gaming en un estudio de streaming profesional con esta guía completa.",
    category: "tutoriales",
    author: "Level-Up Gamer Team",
    date: "2025-01-03",
    readTime: "14 min lectura",
    image: "🎥",
    gradient: "from-pink-600 to-purple-600",
    featured: false,
    likes: 95
  }
];

const BlogGrid = ({ activeCategory, searchTerm }) => {
  // Filtrar posts por categoría y término de búsqueda
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'todas' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-white mb-2">No se encontraron posts</h3>
        <p className="text-gray-400">Intenta con otros términos de búsqueda o categorías</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredPosts.map(post => (
        <Link 
          key={post.id}
          to={`/blog/${post.id}`}
          className="bg-gray-800 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-gray-700 hover:border-green-500/30 group"
        >
          {/* Header con imagen/gradiente */}
          <div className={`h-48 bg-gradient-to-br ${post.gradient} relative`}>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                {post.image}
              </span>
            </div>
            {post.featured && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                ⭐ Destacado
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-3 py-1 rounded-full text-xs font-bold capitalize">
                {post.category}
              </span>
              <span className="text-gray-400 text-sm">❤️ {post.likes}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors">
              {post.title}
            </h3>

            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>

            <div className="flex items-center mt-4 pt-4 border-t border-gray-700">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xs font-bold">LG</span>
              </div>
              <span className="text-gray-400 text-sm">{post.author}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogGrid;