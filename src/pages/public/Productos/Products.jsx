import { useState } from 'react';
import ProductFilter from '../../../components/products/ProductFilter';
import ProductGrid from '../../../components/products/ProductGrid';

const Products = () => {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  // const [activeCategory, setActiveCategory] = useState('');

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setFilters({ ...filters, search: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/img/BackgroundIndex1.jpg')] bg-cover bg-center bg-fixed"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-azul-oscuro/85 to-black/95"></div>

        {/* Animated accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-8 animate-float-slow text-5xl opacity-20">🎮</div>
          <div className="absolute top-28 right-16 animate-float-slower text-5xl opacity-20">🎯</div>
          <div className="absolute bottom-24 left-1/3 animate-float text-5xl opacity-20">🕹️</div>
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text font-orbitron">
              Catálogo de Productos
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mt-4">
              Descubre todo lo que necesitas para tu setup gaming
            </p>

            <div className="mt-6 max-w-2xl mx-auto">
              <div className="flex bg-gray-800 rounded-lg p-3 border border-gray-700 focus-within:border-blue-400 transition-colors shadow-lg">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg px-4 placeholder-gray-400"
                />
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  🔍
                </button>
              </div>

              {/* Category chips (gaming style) */}
              <div className="mt-6 flex items-center justify-center gap-4">
                {[
                  { key: 'perifericos', label: 'Periféricos', icon: '🎧' },
                  { key: 'componentes', label: 'Componentes', icon: '🧩' },
                  { key: 'laptops', label: 'Laptops', icon: '💻' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition transform select-none focus:outline-none focus:ring-2 focus:ring-blue-400/30 bg-gray-900/40 text-gray-200 border border-gray-700 hover:from-blue-700/40 hover:border-blue-500 hover:scale-105 hover:shadow-[0_8px_24px_rgba(99,102,241,0.12)]"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="uppercase tracking-wide text-xs font-orbitron">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Main content - filters & grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 -mt-12">
        <div className="space-y-8">
          <ProductFilter onFilterChange={handleFilterChange} />
          <ProductGrid filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default Products;