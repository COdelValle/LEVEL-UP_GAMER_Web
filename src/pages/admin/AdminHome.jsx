import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../hooks/useProducts';
import { Navigate, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';

const AdminHome = () => {
  const { user } = useAuth();
  const { products, deleteProduct } = useProducts();
  const navigate = useNavigate();

  // Verificar si es admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const stats = {
    totalProducts: products.length,
    totalStock: products.reduce((sum, product) => sum + product.stock, 0),
    totalValue: products.reduce((sum, product) => sum + (product.precio * product.stock), 0),
    featuredProducts: products.filter(p => p.destacado).length,
    lowStockProducts: products.filter(p => p.stock < 10).length
  };

  const recentProducts = products
    .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
    .slice(0, 5);

  // ✅ FUNCIONES DE NAVEGACIÓN PARA TODAS LAS PÁGINAS
  const handleAddProduct = () => {
    navigate('/admin/productos/nuevo-producto');
  };

  const handleManageUsers = () => {
    navigate('/admin/usuarios');
  };

  const handleGenerateReport = () => {
    navigate('/admin/reportes');
  };

  const handleViewBoletas = () => {
    navigate('/admin/boletas');
  };

  const handleManageCategories = () => {
    navigate('/admin/categorias');
  };

  const handleCriticalProducts = () => {
    navigate('/admin/productos/criticos');
  };

  const handleProductReports = () => {
    navigate('/admin/productos/reportes');
  };

  const handleEditProduct = (productId) => {
    navigate(`/admin/productos/${productId}/editar-producto`);
  };

  const handleViewProduct = (productId) => {
    navigate(`/admin/productos/${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      // Lógica para eliminar producto usando el hook (que llama a backend)
      (async () => {
        try {
          await deleteProduct(productId);
          alert('Producto eliminado');
        } catch (err) {
          console.error('Error eliminando producto:', err);
          alert('Error eliminando producto. Revisa la consola.');
        }
      })();
    }
  };

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

        {/* Quick Actions - CON TODOS LOS BOTONES FUNCIONALES */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card-gaming p-6">
            <h3 className="text-xl font-bold gradient-text mb-4">
              Acciones Rápidas
            </h3>
            <div className="space-y-3">
              <button
                onClick={handleViewBoletas}
                className="w-full btn-secondary text-center py-3 hover:scale-105 transition-transform"
              >
                🧾 Ver Boletas
              </button>
              <button
                onClick={handleAddProduct}
                className="w-full btn-primary text-center py-3 hover:scale-105 transition-transform"
              >
                ➕ Agregar Nuevo Producto
              </button>
              <button
                onClick={handleCriticalProducts}
                className="w-full btn-secondary text-center py-3 hover:scale-105 transition-transform"
              >
                ⚠️ Productos Críticos
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

            {/* Alerta de productos con stock crítico */}
            {stats.lowStockProducts > 0 && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
                <div className="flex items-center">
                  <span className="text-red-400 text-lg mr-2">⚠️</span>
                  <div>
                    <div className="text-white font-medium">
                      {stats.lowStockProducts} producto(s) con stock bajo
                    </div>
                    <div className="text-red-300 text-sm">
                      Revisa la sección de productos críticos
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                        <button 
                          onClick={() => handleViewProduct(product.id)}
                          className="text-azul-claro hover:text-azul-electrico"
                          title="Ver detalles"
                        >
                          👁️
                        </button>
                        <button 
                          onClick={() => handleEditProduct(product.id)}
                          className="text-yellow-400 hover:text-yellow-300"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-400 hover:text-red-300"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No hay productos registrados
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;