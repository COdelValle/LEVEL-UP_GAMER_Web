import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlogs } from '../../hooks/useBlogs';

const BlogGrid = ({ activeCategory, searchTerm, sortBy }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const { posts: blogPosts } = useBlogs();

  // Filtrar posts por categoría y término de búsqueda
  const filteredPosts = (blogPosts || []).filter(post => {
    const matchesCategory = activeCategory === 'todas' || post.category === activeCategory;
    const matchesSearch = !searchTerm || 
                         post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Ordenar posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'popular':
        return (b.views || 0) - (a.views || 0);
      case 'likes':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  // Paginación
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  if (sortedPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-white mb-2">No se encontraron posts</h3>
        <p className="text-gray-400">Intenta con otros términos de búsqueda o categoría</p>
      </div>
    );
  }

  return (
    <div>
      {/* Info de resultados */}
      <div className="text-center mb-6">
        <p className="text-gray-400">
          Mostrando {currentPosts.length} de {sortedPosts.length} artículos
          {activeCategory !== 'todas' && ` en ${activeCategory}`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {currentPosts.map(post => (
          <Link 
            key={post.id}
            to={`/blog/${post.id}`}
            className="bg-gray-800 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-gray-700 hover:border-green-500/30 group"
          >
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

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-3 py-1 rounded-full text-xs font-bold capitalize">
                  {post.category}
                </span>
                <span className="text-gray-400 text-sm">📅 {post.date}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors">
                {post.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>⏱️ {post.readTime}</span>
                <span className="text-green-400 font-medium">Leer más →</span>
              </div>

              {/* Stats adicionales */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span>❤️ {post.likes}</span>
                  <span>👁️ {post.views}</span>
                </div>
                <span className="text-xs text-gray-500">{post.author}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            ← Anterior
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === index + 1
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-black font-bold'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;