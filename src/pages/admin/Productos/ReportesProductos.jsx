import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useProducts } from '../../../hooks/useProducts';

const ReportesProductos = () => {
  const { user } = useAuth();
  const { products } = useProducts();
  const [filtro, setFiltro] = useState('todos');

  // Estadísticas
  const stats = {
    total: products.length,
    bajoStock: products.filter(p => p.stock < 10).length,
    sinStock: products.filter(p => p.stock === 0).length,
    destacados: products.filter(p => p.destacado).length
  };

  const productosFiltrados = products.filter(producto => {
    switch (filtro) {
      case 'bajo-stock':
        return producto.stock < 10;
      case 'sin-stock':
        return producto.stock === 0;
      case 'destacados':
        return producto.destacado;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
            Reportes de Productos
          </h1>
          <p className="text-gray-300">
            Análisis y estadísticas del inventario
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-gaming p-6 text-center">
            <div className="text-3xl font-bold text-azul-claro mb-2">
              {stats.total}
            </div>
            <div className="text-gray-300">Total Productos</div>
          </div>
          
          <div className="card-gaming p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {stats.bajoStock}
            </div>
            <div className="text-gray-300">Stock Bajo</div>
          </div>
          
          <div className="card-gaming p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {stats.sinStock}
            </div>
            <div className="text-gray-300">Sin Stock</div>
          </div>
          
          <div className="card-gaming p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {stats.destacados}
            </div>
            <div className="text-gray-300">Destacados</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="card-gaming p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFiltro('todos')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filtro === 'todos' ? 'bg-azul-claro text-black' : 'bg-gray-800 text-white'
              }`}
            >
              Todos los Productos
            </button>
            <button
              onClick={() => setFiltro('bajo-stock')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filtro === 'bajo-stock' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'
              }`}
            >
              Stock Bajo
            </button>
            <button
              onClick={() => setFiltro('sin-stock')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filtro === 'sin-stock' ? 'bg-red-500 text-black' : 'bg-gray-800 text-white'
              }`}
            >
              Sin Stock
            </button>
            <button
              onClick={() => setFiltro('destacados')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filtro === 'destacados' ? 'bg-purple-500 text-black' : 'bg-gray-800 text-white'
              }`}
            >
              Destacados
            </button>
          </div>
        </div>

        {/* Tabla de Reportes */}
        <div className="card-gaming p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold gradient-text">
              Productos {filtro !== 'todos' && `- ${filtro.replace('-', ' ')}`}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  // Export filtered products as CSV
                  const rows = productosFiltrados.map(p => ({
                    id: p.id,
                    nombre: p.nombre,
                    categoria: p.categoria,
                    precio: p.precio,
                    stock: p.stock,
                    destacado: p.destacado ? 'sí' : 'no',
                    nuevo: p.nuevo ? 'sí' : 'no',
                    valor_total: (p.precio * p.stock).toFixed(2)
                  }));

                  if (rows.length === 0) {
                    alert('No hay productos para exportar con el filtro actual.');
                    return;
                  }

                  const header = Object.keys(rows[0]);
                  const csv = [header.join(',')].concat(
                    rows.map(r => header.map(h => `"${String(r[h]).replace(/"/g, '""')}"`).join(','))
                  ).join('\n');

                  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  const fileName = `report_productos_${filtro}_${new Date().toISOString().slice(0,10)}.csv`;
                  link.setAttribute('download', fileName);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
                className="btn-primary"
              >
                Exportar CSV
              </button>
              <button className="btn-secondary" onClick={() => window.print()}>Imprimir</button>
            </div>
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
                  <th className="text-left py-3 text-gray-300">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map(producto => (
                  <tr key={producto.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium text-white">{producto.nombre}</div>
                          <div className="text-sm text-gray-400 line-clamp-1">
                            {producto.descripcion}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="category-badge text-xs">
                        {producto.categoria}
                      </span>
                    </td>
                    <td className="py-4 text-white font-medium">
                      ${producto.precio}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        producto.stock > 10 ? 'bg-green-500' : 
                        producto.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                        {producto.stock}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-1">
                        {producto.destacado && (
                          <span className="px-2 py-1 bg-yellow-500 text-black text-xs rounded">
                            Destacado
                          </span>
                        )}
                        {producto.nuevo && (
                          <span className="px-2 py-1 bg-green-500 text-black text-xs rounded">
                            Nuevo
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 text-white font-medium">
                      ${(producto.precio * producto.stock).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {productosFiltrados.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No se encontraron productos con los filtros seleccionados
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportesProductos;