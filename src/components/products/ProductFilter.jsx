import { useState, useEffect } from 'react';

const ProductFilter = ({ onFilterChange, currentCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: currentCategory || '',
    priceRange: '',
    sortBy: 'featured'
  });

  useEffect(() => {
    if (currentCategory) {
      handleFilterChange('category', currentCategory);
    }
  }, [currentCategory]);

  const categories = [
    { value: '', label: 'Todas las categorías', icon: '🎮' },
    { value: 'pc-gamers', label: 'PC Gamers', icon: '💻' },
    { value: 'consolas', label: 'Consolas', icon: '🎮' },
    { value: 'perifericos', label: 'Periféricos', icon: '🎧' },
    { value: 'sillas', label: 'Sillas Gaming', icon: '🪑' },
    { value: 'accesorios', label: 'Accesorios', icon: '🎯' }
  ];

  const priceRanges = [
    { value: '', label: 'Todos los precios' },
    { value: '0-100000', label: 'Hasta $100.000' },
    { value: '100000-300000', label: '$100.000 - $300.000' },
    { value: '300000-600000', label: '$300.000 - $600.000' },
    { value: '600000-1000000', label: '$600.000 - $1.000.000' },
    { value: '1000000-9999999', label: 'Más de $1.000.000' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Destacados' },
    { value: 'price-asc', label: 'Precio: Menor a Mayor' },
    { value: 'price-desc', label: 'Precio: Mayor a Menor' },
    { value: 'name-asc', label: 'Nombre A-Z' },
    { value: 'name-desc', label: 'Nombre Z-A' },
    { value: 'newest', label: 'Más Nuevos' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative z-20">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-lg shadow-lg transition-all duration-300
          bg-gradient-to-r from-azul-electrico to-blue-600 hover:from-blue-600 hover:to-azul-electrico
          border border-azul-electrico/30 backdrop-blur-sm
          group hover:scale-105 hover:shadow-azul-electrico/20"
        aria-label="Toggle filters"
      >
        <div className="flex flex-col gap-1.5 items-center justify-center w-6 h-6">
          <span className={`w-full h-0.5 bg-white rounded-full transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-0.5 bg-white rounded-full transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
        <span className="sr-only">Filtros</span>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Filter Panel */}
      <div 
        className={`fixed right-0 top-0 h-screen w-80 bg-gray-900/95 shadow-xl backdrop-blur-sm
          transform transition-all duration-300 ease-in-out z-30
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:transform-none lg:relative lg:h-auto lg:w-auto lg:bg-transparent lg:shadow-none`}
      >
        <div className={`p-6 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-azul-electrico">
              Filtrar Productos
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white lg:hidden"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Categorías */}
            <div className="transform transition-all duration-300 delay-100">
              <h4 className="font-semibold text-white mb-3">Categorías</h4>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={category.value}
                    onClick={() => handleFilterChange('category', category.value)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all transform
                      ${filters.category === category.value
                        ? 'bg-gradient-to-r from-azul-electrico to-blue-600 text-white scale-102'
                        : 'text-gray-300 hover:bg-gray-800/60'}
                      ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                    `}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rango de Precios */}
            <div className={`transform transition-all duration-300 delay-200 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
              <h4 className="font-semibold text-white mb-3">Rango de Precio</h4>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full bg-gray-800/80 text-white border border-gray-700 rounded-lg p-2 backdrop-blur-sm
                  focus:border-azul-electrico focus:ring-1 focus:ring-azul-electrico transition-all"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Ordenar por */}
            <div className={`transform transition-all duration-300 delay-300 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
              <h4 className="font-semibold text-white mb-3">Ordenar por</h4>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full bg-gray-800/80 text-white border border-gray-700 rounded-lg p-2 backdrop-blur-sm
                  focus:border-azul-electrico focus:ring-1 focus:ring-azul-electrico transition-all"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters Button */}
            <button
              onClick={() => {
                setFilters({
                  category: '',
                  priceRange: '',
                  sortBy: 'featured'
                });
                onFilterChange({
                  category: '',
                  priceRange: '',
                  sortBy: 'featured'
                });
              }}
              className={`w-full py-2 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
                text-white rounded-lg transition-all transform duration-300 delay-400
                ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                hover:scale-102 hover:shadow-lg hover:shadow-red-500/20`}
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;