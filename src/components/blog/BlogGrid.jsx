import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';

// DATOS DIRECTOS aquí también
const blogPosts = [
  {
    id: 1,
    title: "Cómo Armar el Setup Gamer Perfecto en 2025",
    excerpt: "Descubre los componentes esenciales para crear tu estación de juego ideal...",
    content: "<p>Contenido...</p>",
    category: "guias",
    author: "Level-Up Gamer Team",
    date: "2025-01-15",
    readTime: "8 min lectura",
    image: "🎮",
    gradient: "from-blue-600 to-purple-600",
    featured: true,
    likes: 12
  },
  {
    id: 2,
    title: "Los Esports en Chile: Crecimiento y Oportunidades",
    excerpt: "Análisis del panorama actual de los deportes electrónicos en Chile...",
    content: "<p>Contenido...</p>",
    category: "noticias", 
    author: "Level-Up Gamer Team",
    date: "2025-01-12",
    readTime: "6 min lectura",
    image: "🏆",
    gradient: "from-green-600 to-blue-600",
    featured: true,
    likes: 8
  }
  // ... agrega más posts si quieres
];

const BlogGrid = ({ activeCategory = 'todas', searchTerm = '' }) => {
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    let filtered = blogPosts;

    if (activeCategory !== 'todas') {
      filtered = filtered.filter(post => 
        post.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [activeCategory, searchTerm]);

  const loadMore = () => {
    setVisiblePosts(prev => prev + 6);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredPosts.slice(0, visiblePosts).map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {visiblePosts < filteredPosts.length && (
        <div className="text-center">
          <button 
            onClick={loadMore}
            className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            Cargar más posts
          </button>
        </div>
      )}

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-300">No se encontraron posts.</p>
        </div>
      )}
    </>
  );
};

export default BlogGrid;