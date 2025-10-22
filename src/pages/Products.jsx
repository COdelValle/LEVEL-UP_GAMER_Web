import { useState } from 'react';
import ProductFilter from '../components/products/ProductFilter';
import ProductGrid from '../components/products/ProductGrid';

const Products = () => {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setFilters({ ...filters, search: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black pt-36 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Search Section */}
        <div className="text-center space-y-8 mb-12">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold gradient-text font-orbitron">
              Catálogo de Productos
            </h1>
            <p className="text-xl text-gray-300">
              Descubre todo lo que necesitas para tu setup gaming
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
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
          </div>
        </div>

        {/* Filters and Products Grid */}
        <div className="space-y-8">
          <ProductFilter onFilterChange={handleFilterChange} />
          <ProductGrid filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default Products;