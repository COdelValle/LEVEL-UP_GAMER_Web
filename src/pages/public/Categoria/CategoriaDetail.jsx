import { useParams } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';
import ProductCard from '../../../components/products/ProductCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const categoryInfo = {
  'consolas': {
    title: 'Consolas Gaming',
    description: 'Las mejores consolas para tu experiencia gaming',
    gradient: 'from-blue-500 to-purple-500'
  },
  'pc-gamers': {
    title: 'PC Gamers',
    description: 'Equipos de alto rendimiento para gaming',
    gradient: 'from-green-500 to-blue-500'
  },
  'perifericos': {
    title: 'Periféricos Gaming',
    description: 'Mejora tu setup con nuestros periféricos',
    gradient: 'from-purple-500 to-pink-500'
  },
  'sillas': {
    title: 'Sillas Gaming',
    description: 'El mejor confort para largas sesiones',
    gradient: 'from-red-500 to-orange-500'
  },
  'nuevos': {
    title: 'Nuevos Ingresos',
    description: 'Los últimos productos en nuestra tienda',
    gradient: 'from-yellow-500 to-green-500'
  }
};

export const CategoriaDetail = () => {
  const { categoryId } = useParams();
  const { products, loading } = useProducts();
  
  const categoryData = categoryInfo[categoryId] || {
    title: 'Categoría',
    description: 'Productos',
    gradient: 'from-gray-500 to-gray-700'
  };

  const filteredProducts = products.filter(product => {
    if (categoryId === 'nuevos') {
      // Ordenar por fecha y tomar los más recientes
      return true; // Aquí deberías implementar la lógica para nuevos productos
    }
    return product.categoria === categoryId;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Background handled globally in App.jsx */}

      <div className="relative pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`text-5xl font-bold mb-6 bg-gradient-to-r ${categoryData.gradient} bg-clip-text text-transparent font-orbitron`}>
              {categoryData.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {categoryData.description}
            </p>
          </div>

          {/* Grid de Productos */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">
                No hay productos disponibles en esta categoría por el momento.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};