import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <article className="blog-card p-0 shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
      <div className={`h-48 bg-gradient-to-br ${post.gradient} relative`}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg">
          <span className="text-4xl">{post.image}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="category-badge capitalize">{post.category}</span>
          <span className="text-gray-400 text-sm">
            {new Date(post.date).toLocaleDateString('es-CL')}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-white font-orbitron">
          {post.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <Link 
            to={`/blog/${post.id}`}
            className="bg-gradient-to-r from-azul-electrico to-verde-neon text-black px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            Leer Más →
          </Link>
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>⏱️ {post.readTime}</span>
            <span>❤️ {post.likes}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;