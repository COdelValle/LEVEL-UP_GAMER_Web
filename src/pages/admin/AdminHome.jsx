import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../hooks/useProducts';
import { Navigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';

const AdminHome = () => {
  const { user } = useAuth();
  const { products } = useProducts();

  // Verificar si es admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const stats = {
    totalProducts: products.length,
    totalStock: products.reduce((sum, product) => sum + product.stock, 0),
    totalValue: products.reduce((sum, product) => sum + (product.precio * product.stock), 0),
    featuredProducts: products.filter(p => p.destacado).length
  };

  const recentProducts = products
    .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-300">
            Bienvenido, {user.username}. Gestiona tu tienda desde aquí.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-gaming p-6 text-center">
            <div className="text-3xl font-bold text-azul-claro mb-2">
              {stats.totalProducts}
            </div>
            <div className="text-gray-300">Productos Totales</div>
          </div>
          
          <div className="card-gaming p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {stats.totalStock}
            </div>
            <div className="text-gray-300">Unidades en Stock</div>
          </div>
          
          <div className="card-gaming p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {formatPrice(stats.totalValue)}
            </div>
            <div className="text-gray-300">Valor Total</div>
          </div>
          
          <div className="card-gaming p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {stats.featuredProducts}
            </div>
            <div className="text-gray-300">Productos Destacados</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card-gaming p-6">
            <h3 className="text-xl font-bold gradient-text mb-4">
              Acciones Rápidas
            </h3>
            <div className="space-y-3">
              <a
                href="/admin/nuevo-producto"
                className="block btn-primary text-center py-3"
              >
                ➕ Agregar Nuevo Producto
              </a>
              <a
                href="/admin/usuarios"
                className="block btn-secondary text-center py-3"
              >
                👥 Gestionar Usuarios
              </a>
              <button className="block btn-secondary w-full text-center py-3">
                📊 Generar Reporte
              </button>
            </div>
          </div>

          <div className="card-gaming p-6">
            <h3 className="text-xl font-bold gradient-text mb-4">
              Productos Recientes
            </h3>
            <div className="space-y-3">
              {recentProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{product.nombre}</div>
                    <div className="text-sm text-gray-400">{formatPrice(product.precio)}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {product.stock} stock
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="card-gaming p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold gradient-text">
              Todos los Productos
            </h3>
            <span className="text-gray-300">
              {products.length} productos
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 text-gray-300">Producto</th>
                  <th className="text-left py-3 text-gray-300">Categoría</th>
                  <th className="text-left py-3 text-gray-300">Precio</th>
                  <th className="text-left py-3 text-gray-300">Stock</th>
                  <th className="text-left py-3 text-gray-300">Estado</th>
                  <th className="text-left py-3 text-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.imagen}
                          alt={product.nombre}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium text-white">{product.nombre}</div>
                          <div className="text-sm text-gray-400 line-clamp-1">
                            {product.descripcion}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="category-badge text-xs">
                        {product.categoria}
                      </span>
                    </td>
                    <td className="py-4 text-white font-medium">
                      {formatPrice(product.precio)}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        product.stock > 10 ? 'bg-green-500' : 
                        product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-1">
                        {product.destacado && (
                          <span className="px-2 py-1 bg-yellow-500 text-black text-xs rounded">
                            Destacado
                          </span>
                        )}
                        {product.nuevo && (
                          <span className="px-2 py-1 bg-green-500 text-black text-xs rounded">
                            Nuevo
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-azul-claro hover:text-azul-electrico">
                          ✏️
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;