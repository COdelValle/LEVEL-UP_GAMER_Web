import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

// DATOS DIRECTOS - elimina la importación
const blogPosts = [
  {
    id: 1,
    title: "Cómo Armar el Setup Gamer Perfecto en 2025",
    excerpt: "Descubre los componentes esenciales para crear tu estación de juego ideal, desde el hardware hasta los periféricos que marcarán la diferencia.",
    content: `
      <div style="margin-bottom: 2rem; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #3b82f6; background: rgba(59, 130, 246, 0.1);">
        <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem; color: #60a5fa;">🎯 Lo que aprenderás en esta guía:</h3>
        <ul style="color: #d1d5db; list-style-type: none; padding: 0;">
          <li style="margin-bottom: 0.5rem;">✅ Componentes esenciales para tu PC gaming</li>
          <li style="margin-bottom: 0.5rem;">✅ Periféricos que marcan la diferencia</li>
          <li style="margin-bottom: 0.5rem;">✅ Setup de escritorio y ergonomía</li>
          <li style="margin-bottom: 0.5rem;">✅ Presupuestos desde $500.000 hasta $2.000.000 CLP</li>
          <li>✅ Tips para comprar en Chile</li>
        </ul>
      </div>

      <h2 style="font-size: 1.875rem; font-weight: bold; color: #60a5fa; margin-top: 2rem; margin-bottom: 1rem;">🖥️ El Corazón: Tu PC Gaming</h2>
      <p style="color: #d1d5db; margin-bottom: 1.5rem; font-size: 1.125rem;">Un buen PC gaming es la base de todo. No necesitas gastar millones, pero sí elegir componentes que te den el mejor rendimiento por peso invertido.</p>

      <h3 style="font-size: 1.5rem; font-weight: bold; color: #34d399; margin-top: 1.5rem; margin-bottom: 0.75rem;">🧠 Procesador (CPU)</h3>
      <p style="color: #d1d5db; margin-bottom: 1rem;">El cerebro de tu PC. Para gaming en 2025, recomendamos:</p>
      <ul style="color: #d1d5db; list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem;">
        <li style="margin-bottom: 0.5rem;"><strong>Presupuesto básico:</strong> AMD Ryzen 5 7600 o Intel i5-13400</li>
        <li style="margin-bottom: 0.5rem;"><strong>Presupuesto medio:</strong> AMD Ryzen 7 7700X o Intel i7-13700</li>
        <li><strong>Presupuesto alto:</strong> AMD Ryzen 9 7900X o Intel i9-13900K</li>
      </ul>
    `,
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
    excerpt: "Análisis del panorama actual de los deportes electrónicos en Chile, torneos locales y cómo formar parte de esta creciente comunidad.",
    content: "<p>Contenido sobre esports en Chile...</p>",
    category: "noticias",
    author: "Level-Up Gamer Team",
    date: "2025-01-12",
    readTime: "6 min lectura",
    image: "🏆",
    gradient: "from-green-600 to-blue-600",
    featured: true,
    likes: 8
  },
  {
    id: 3,
    title: "Review: Los Mejores Mouse Gaming 2025",
    excerpt: "Comparativa completa de los mouse gaming más populares del mercado.",
    content: "<p>Review de mouse gaming...</p>",
    category: "reviews",
    author: "Level-Up Gamer Team",
    date: "2025-01-10",
    readTime: "5 min lectura",
    image: "🖱️",
    gradient: "from-purple-600 to-pink-600",
    featured: false,
    likes: 15
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));
  const [likes, setLikes] = useState(post?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post no encontrado</h1>
          <Link to="/blogs" className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Volver al Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-28 pb-12">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-gray-400">
        <Link to="/" className="hover:text-green-400 transition-colors">Inicio</Link>
        <span className="mx-2">/</span>
        <Link to="/blogs" className="hover:text-green-400 transition-colors">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-white">{post.title}</span>
      </nav>

      <article className="container mx-auto px-4 max-w-4xl">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-3 py-1 rounded-full text-sm font-bold capitalize">
              {post.category}
            </span>
            <span className="text-gray-400">{post.date}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">⏱️ {post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-orbitron">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            {post.excerpt}
          </p>

          <div className="mb-8 rounded-lg overflow-hidden">
            <div className={`h-96 bg-gradient-to-br ${post.gradient} relative`}>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl mb-4 block">{post.image}</span>
                  <h2 className="text-2xl font-bold text-white">{post.title}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8 p-4 rounded-lg bg-gray-800">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">LG</span>
              </div>
              <div>
                <p className="text-white font-semibold">{post.author}</p>
                <p className="text-gray-400 text-sm">Expertos en Gaming</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                📤 Compartir
              </button>
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-2 transition-colors ${
                  hasLiked ? 'text-red-500' : 'text-red-400 hover:text-red-300'
                }`}
              >
                ❤️ <span>{likes}</span>
              </button>
            </div>
          </div>
        </header>

        <div 
          className="prose prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="text-center mb-12">
          <Link to="/productos" className="bg-gradient-to-r from-blue-500 to-green-500 text-black text-lg px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Ver Productos Gaming 🛒
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;