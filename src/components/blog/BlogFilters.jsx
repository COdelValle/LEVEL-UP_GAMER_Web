const BlogFilters = () => {
  return (
    <div className="mb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filtros */}
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <button className="px-6 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-white transition-colors">
            Todos
          </button>
          <button className="px-6 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-white transition-colors">
            🎮 Gaming
          </button>
          <button className="px-6 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-white transition-colors">
            💻 Hardware
          </button>
          <button className="px-6 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-white transition-colors">
            📱 Periféricos
          </button>
          <button className="px-6 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-white transition-colors">
            🎯 Guías
          </button>
          <button className="px-6 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-white transition-colors">
            📰 Noticias
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFilters;