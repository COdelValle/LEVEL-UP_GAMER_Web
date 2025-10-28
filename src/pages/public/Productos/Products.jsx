import { useState, useMemo } from 'react';
import ProductFilter from '../../../components/products/ProductFilter';
import ProductGrid from '../../../components/products/ProductGrid';
import productsData from '../../../assets/data/productos.json';

const Products = () => {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Función para normalizar categorías - SOLO LAS PRINCIPALES
  const normalizeCategory = (category) => {
    const categoryMap = {
      'pc-gamers': 'pc-gaming',
      'laptops': 'pc-gaming',
      'mouse': 'perifericos',
      'mousepad': 'perifericos',
      'sillas': 'sillas-gaming',
      'juegos-de-mesa': 'juegos-mesa',
      'juegos-mesa': 'juegos-mesa',
      'streaming': 'audio',
      'creativo': 'accesorios',
      'ropa': 'accesorios'
    };
    
    return categoryMap[category] || category;
  };

  // Limpiar y normalizar los datos
  const normalizedProducts = useMemo(() => {
    // Eliminar duplicados por ID
    const uniqueProducts = productsData.filter((product, index, self) =>
      index === self.findIndex(p => p.id === product.id)
    );

    // Normalizar categorías
    return uniqueProducts.map(product => ({
      ...product,
      categoria: normalizeCategory(product.categoria)
    }));
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim() === '') {
      const { search: _, ...restFilters } = filters;
      setFilters(restFilters);
    } else {
      setFilters({ ...filters, search: value });
    }
  };

  const handleCategoryClick = (category) => {
    if (filters.category === category) {
      const { category: removed, ...newFilters } = filters;
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, category });
    }
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  // Filtrar y ordenar productos
  const filteredProducts = normalizedProducts.filter(product => {
    if (filters.search && 
        !product.nombre.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.descripcion.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    if (filters.category && product.categoria !== filters.category) {
      return false;
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (product.precio < min || product.precio > max) {
        return false;
      }
    }

    if (filters.inStock && product.stock === 0) {
      return false;
    }

    if (filters.featured && !product.destacado) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.precio - b.precio;
      case 'price-desc':
        return b.precio - a.precio;
      case 'name-asc':
        return a.nombre.localeCompare(b.nombre);
      case 'name-desc':
        return b.nombre.localeCompare(a.nombre);
      case 'newest':
        return (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0);
      default:
        return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0);
    }
  });

  // SOLO 3 CATEGORÍAS PRINCIPALES
  const getMainCategories = () => {
    const mainCategories = {
      'consolas': { icon: '🎮', label: 'Consolas' },
      'pc-gaming': { icon: '💻', label: 'PC Gaming' },
      'perifericos': { icon: '⌨️', label: 'Periféricos' }
    };

    return Object.entries(mainCategories).map(([value, data]) => ({
      value,
      ...data,
      count: normalizedProducts.filter(p => p.categoria === value).length
    }));
  };

  const mainCategories = getMainCategories();

  return (
    <div className="min-h-screen relative">
      {/* Nota: usamos el fondo global en App.jsx (background2.jpg). Se removió el fondo por página para evitar duplicados. */}
      {/* Contenido principal */}
      <div className="relative pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4"> {/* Cambiado a max-w-4xl para más centrado */}
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
              Catálogo de productos
            </h1>
          </div>

          {/* Barra de Búsqueda CENTRADA */}
          <div className="flex justify-center mb-8"> {/* Contenedor centrado */}
            <div className="w-full max-w-2xl"> {/* Ancho máximo */}
              <div className="flex bg-gray-800 rounded-lg p-2 border border-gray-700 focus-within:border-green-400 transition-colors">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg px-4 placeholder-gray-400"
                />
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  🔍
                </button>
              </div>
            </div>
          </div>

          {/* Controles Simples */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
            {/* Botón Filtros ÚNICO */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors border ${
                showFilters 
                  ? 'bg-green-500 text-black border-green-400' 
                  : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
              }`}
            >
              <span>⚙️</span>
              Filtros {Object.keys(filters).length > 0 && `(${Object.keys(filters).length})`}
            </button>

            {/* Ordenar */}
            <select 
              value={filters.sortBy || ''}
              onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
              className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:border-green-400 outline-none"
            >
              <option value="">Ordenar por</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name-asc">Nombre A-Z</option>
              <option value="newest">Más Nuevos</option>
            </select>

            {/* Limpiar Filtros - solo si hay filtros activos */}
            {(filters.category || filters.search || filters.sortBy || filters.featured || filters.inStock || filters.priceRange) && (
              <button
                onClick={clearFilters}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Limpiar Filtros
              </button>
            )}
          </div>

          {/* SOLO 3 CATEGORÍAS PRINCIPALES */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {mainCategories.map(category => (
              <button
                key={category.value}
                onClick={() => handleCategoryClick(category.value)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${
                  filters.category === category.value 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-black shadow-lg shadow-green-500/25' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <div className="text-left">
                  <div>{category.label}</div>
                  <div className="text-xs opacity-70">{category.count} productos</div>
                </div>
              </button>
            ))}
          </div>

          {/* Filtros Directos - sin menús anidados */}
          {showFilters && (
            <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Filtros</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              {/* Filtros directos y simples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Precio */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Rango de Precio</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Menos de $100k', value: '0-100000' },
                      { label: '$100k - $300k', value: '100000-300000' },
                      { label: '$300k - $500k', value: '300000-500000' },
                      { label: 'Más de $500k', value: '500000-10000000' }
                    ].map(range => (
                      <button
                        key={range.value}
                        onClick={() => handleFilterChange({ 
                          ...filters, 
                          priceRange: filters.priceRange === range.value ? undefined : range.value 
                        })}
                        className={`px-3 py-2 rounded-lg text-sm ${
                          filters.priceRange === range.value
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Disponibilidad */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Disponibilidad</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-300">
                      <input
                        type="checkbox"
                        checked={!!filters.inStock}
                        onChange={(e) => handleFilterChange({ 
                          ...filters, 
                          inStock: e.target.checked ? true : undefined 
                        })}
                        className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-400"
                      />
                      Solo en stock
                    </label>
                    <label className="flex items-center gap-2 text-gray-300">
                      <input
                        type="checkbox"
                        checked={!!filters.featured}
                        onChange={(e) => handleFilterChange({ 
                          ...filters, 
                          featured: e.target.checked ? true : undefined 
                        })}
                        className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-400"
                      />
                      Solo destacados
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Información de Resultados */}
          <div className="mb-6 text-center">
            <p className="text-gray-400 text-lg">
              Mostrando <span className="text-white font-bold">{filteredProducts.length}</span> de{" "}
              <span className="text-white font-bold">{normalizedProducts.length}</span> productos
              {filters.category && (
                <span> en <span className="text-green-400 font-bold">
                  {mainCategories.find(c => c.value === filters.category)?.label}
                </span></span>
              )}
            </p>
          </div>

          {/* Grid de Productos */}
          <ProductGrid 
            products={filteredProducts} 
            filters={filters}
          />

          {/* Mensaje si no hay resultados */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No se encontraron productos</h3>
              <p className="text-gray-400 mb-4">Intenta con otros términos de búsqueda o categoría</p>
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Mostrar todos los productos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;