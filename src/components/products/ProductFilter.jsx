import { useState } from 'react';

const ProductFilter = ({ onFilterChange, currentCategory }) => {
  const [filters, setFilters] = useState({
    category: currentCategory || '',
    priceRange: '',
    sortBy: 'name'
  });

  const categories = [
    { value: '', label: 'Todas las categorías' },
    { value: 'pc-gamers', label: 'PC Gamers' },
    { value: 'consolas', label: 'Consolas' },
    { value: 'perifericos', label: 'Periféricos' },
    { value: 'sillas', label: 'Sillas Gaming' },
    { value: 'accesorios', label: 'Accesorios' }
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
    { value: 'name', label: 'Nombre A-Z' },
    { value: 'name-desc', label: 'Nombre Z-A' },
    { value: 'price', label: 'Precio: Menor a Mayor' },
    { value: 'price-desc', label: 'Precio: Mayor a Menor' },
    { value: 'newest', label: 'Más Nuevos' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="card-gaming p-6 mb-8">
      <h3 className="text-lg font-bold mb-4 gradient-text">Filtrar Productos</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Categoría
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white focus:border-azul-electrico focus:ring-1 focus:ring-azul-electrico"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rango de Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Rango de Precio
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white focus:border-azul-electrico focus:ring-1 focus:ring-azul-electrico"
          >
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Ordenar por */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Ordenar por
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white focus:border-azul-electrico focus:ring-1 focus:ring-azul-electrico"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;