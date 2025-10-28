import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BackButton from '../../../components/common/BackButton';
import { blogPosts } from '../../../assets/data/blogData.js';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Convertir id a número y buscar el post
  const postId = parseInt(id);
  const post = blogPosts.find(p => p.id === postId);
  
  const [likes, setLikes] = useState(post?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [views, setViews] = useState(post?.views || 0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll al principio cuando cambia el ID del post
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Simular incremento de vistas
    setViews(prev => prev + 1);
    
    // Configurar scroll listener para progress bar
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / documentHeight) * 100;
      setReadingProgress(progress);
      setShowScrollTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  // Encontrar el post actual y los posts relacionados
  const currentIndex = blogPosts.findIndex(p => p.id === postId);
  const nextPost = blogPosts[currentIndex + 1];
  const prevPost = blogPosts[currentIndex - 1];
  const relatedPosts = blogPosts
    .filter(p => p.id !== postId && p.category === post?.category)
    .slice(0, 3);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleNavigation = (newId) => {
    navigate(`/blog/${newId}`);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback para copiar enlace
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <h1 className="text-4xl font-bold text-white mb-4">Post no encontrado</h1>
          <p className="text-gray-400 mb-8">El artículo que buscas no existe o ha sido movido.</p>
          <Link to="/blogs" className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Volver al Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-12">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-green-500 text-black p-3 rounded-full shadow-2xl hover:scale-110 transition-transform z-40"
        >
          <span className="text-xl">⬆️</span>
        </button>
      )}

      <div className="container mx-auto px-4">
        <BackButton />
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 text-gray-400 text-sm">
          <Link to="/" className="hover:text-green-400 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link to="/blogs" className="hover:text-green-400 transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{post.title}</span>
        </nav>

        <article className="container mx-auto px-4 max-w-6xl">
          {/* Header del Post */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-4 py-2 rounded-full text-sm font-bold capitalize">
                {post.category}
              </span>
              {post.featured && (
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  ⭐ Destacado
                </span>
              )}
              <span className="text-gray-400">📅 {post.date}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">⏱️ {post.readTime}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">👁️ {views} vistas</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-orbitron leading-tight">
              {post.title}
            </h1>
            
            <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Hero Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <div className={`h-96 bg-gradient-to-br ${post.gradient} relative`}>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-9xl mb-6 block">{post.image}</span>
                    <h2 className="text-4xl font-bold text-white max-w-4xl mx-auto leading-tight">
                      {post.title}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Info y Stats */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">LG</span>
                </div>
                <div>
                  <p className="text-white font-bold text-xl">{post.author}</p>
                  <p className="text-gray-400">Especialista en Gaming & Tecnología</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={sharePost}
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-lg hover:bg-blue-500/20"
                >
                  <span>📤</span>
                  <span>Compartir</span>
                </button>
                <button 
                  onClick={handleLike}
                  className={`flex items-center space-x-3 transition-all ${
                    hasLiked 
                      ? 'text-red-500 bg-red-500/20 border border-red-500/30' 
                      : 'text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/10'
                  } px-4 py-2 rounded-lg hover:scale-105`}
                >
                  <span className="text-xl">{hasLiked ? '❤️' : '🤍'}</span>
                  <span className="font-bold text-lg">{likes}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Contenido Principal */}
          <div className="grid grid-cols-1 gap-8">
            {/* Contenido del artículo (primero para ocupar todo el ancho) */}
            <main>
              <div 
                className="prose prose-invert max-w-none mb-12 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Call to Action */}
              <div className="text-center mb-12">
                <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">¿Te gustó este artículo?</h3>
                  <p className="text-gray-300 mb-6">Descubre más contenido gaming y mantente actualizado con las últimas tendencias.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/productos" className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-2xl inline-flex items-center gap-3">
                      🛒 Ver Productos Recomendados
                    </Link>
                    <Link to="/blogs" className="bg-gray-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-600 transition-colors inline-flex items-center gap-3">
                      📚 Más Artículos
                    </Link>
                  </div>
                </div>
              </div>
            </main>

            {/* Sidebar con tabla de contenidos (aparece después del artículo) */}
            <aside>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <span>📑</span> En este artículo
                </h3>
                <nav className="space-y-2">
                  <a href="#introduccion" className="block text-gray-300 hover:text-green-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-700/50">
                    • Introducción
                  </a>
                  <a href="#componentes" className="block text-gray-300 hover:text-green-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-700/50">
                    • Componentes Principales
                  </a>
                  <a href="#perifericos" className="block text-gray-300 hover:text-green-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-700/50">
                    • Periféricos
                  </a>
                  <a href="#setup" className="block text-gray-300 hover:text-green-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-700/50">
                    • Setup y Ergonomía
                  </a>
                  <a href="#conclusion" className="block text-gray-300 hover:text-green-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-700/50">
                    • Conclusión
                  </a>
                </nav>
                
                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h4 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
                    <span>🏷️</span> Etiquetas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-600 hover:border-green-400 transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats del Post */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h4 className="text-lg font-bold text-purple-400 mb-3 flex items-center gap-2">
                    <span>📊</span> Estadísticas
                  </h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Publicado:</span>
                      <span className="text-green-400">{post.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tiempo lectura:</span>
                      <span className="text-blue-400">{post.readTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Likes:</span>
                      <span className="text-red-400">{likes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vistas:</span>
                      <span className="text-yellow-400">{views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Navegación entre posts */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mt-16 mb-8 p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            {/* Post Anterior */}
            <div className="flex-1 w-full">
              {prevPost && (
                <button
                  onClick={() => handleNavigation(prevPost.id)}
                  className="flex items-center gap-4 text-left hover:scale-105 transition-transform group w-full"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
                    <span className="text-2xl">⬅️</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-400 text-sm block mb-1">Post anterior</span>
                    <h3 className="text-white font-bold group-hover:text-green-400 transition-colors line-clamp-2">
                      {prevPost.title}
                    </h3>
                  </div>
                </button>
              )}
            </div>

            {/* Botón Volver al Blog */}
            <div className="lg:mx-8">
              <Link
                to="/blogs"
                className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2 hover:scale-105"
              >
                📚 Todos los Posts
              </Link>
            </div>

            {/* Post Siguiente */}
            <div className="flex-1 w-full">
              {nextPost && (
                <button
                  onClick={() => handleNavigation(nextPost.id)}
                  className="flex items-center gap-4 text-right hover:scale-105 transition-transform group w-full ml-auto"
                >
                  <div className="flex-1">
                    <span className="text-gray-400 text-sm block mb-1">Siguiente post</span>
                    <h3 className="text-white font-bold group-hover:text-green-400 transition-colors line-clamp-2">
                      {nextPost.title}
                    </h3>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-lg group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all">
                    <span className="text-2xl">➡️</span>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Posts Relacionados */}
          {relatedPosts.length > 0 && (
            <section className="mt-8">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-orbitron">
                📚 Artículos Relacionados
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="bg-gray-800 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-gray-700 hover:border-green-500/30 group"
                  >
                    <div className={`h-32 bg-gradient-to-br ${relatedPost.gradient} relative`}>
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <span className="text-4xl group-hover:scale-110 transition-transform">{relatedPost.image}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-3 py-1 rounded-full text-xs font-bold capitalize mb-3 inline-block">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-green-400 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{relatedPost.date}</span>
                        <span className="text-green-400 font-medium">Leer más →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;