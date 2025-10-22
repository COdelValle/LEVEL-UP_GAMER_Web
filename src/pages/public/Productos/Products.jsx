import { useState } from 'react';
import ProductFilter from '../../../components/products/ProductFilter';
import ProductGrid from '../../../components/products/ProductGrid';

const Products = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text font-orbitron">
            Catálogo de Productos
          </h1>
          <p className="text-xl text-gray-300">
            Descubre todo lo que necesitas para tu setup gaming
          </p>
        </div>

        <ProductFilter onFilterChange={handleFilterChange} />
        <ProductGrid filters={filters} />
      </div>
    </div>
  );
};

export default Products;