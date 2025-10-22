import { useProducts } from '../../hooks/useProducts';
import ProductCard from './ProductCard';

const ProductGrid = ({ filters = {} }) => {
  const { products, loading, searchProducts } = useProducts();

  const applyFilters = (products) => {
    let filtered = [...products];

    // Filtrar por búsqueda
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product => 
        product.nombre.toLowerCase().includes(searchTerm) ||
        product.descripcion.toLowerCase().includes(searchTerm) ||
        product.categoria.toLowerCase().includes(searchTerm)
      );
    }

    // Filtrar por categoría
    if (filters.category) {
      filtered = filtered.filter(product => product.categoria === filters.category);
    }

    // Filtrar por rango de precio
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => 
        product.precio >= min && product.precio <= max
      );
    }

    // Ordenar
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'name':
          filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
          break;
        case 'price':
          filtered.sort((a, b) => a.precio - b.precio);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.precio - a.precio);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
          break;
        default:
          break;
      }
    }

    return filtered;
  };

  const filteredProducts = applyFilters(products);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card-gaming p-6 animate-pulse">
            <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-300">
          Mostrando {filteredProducts.length} de {products.length} productos
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-bold text-gray-300 mb-2">
            No se encontraron productos
          </h3>
          <p className="text-gray-400">
            Intenta ajustar los filtros para ver más resultados
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;