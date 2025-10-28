import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatters';
import { getStockStatus, getProductosCriticos } from '../../../utils/stockUtils';
import BackButton from '../../../components/common/BackButton';

const ProductosCriticos = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos'); // todos, agotados, criticos

  useEffect(() => {
    // Cargar productos del JSON
    fetch('/src/assets/data/productos.json')
      .then(res => res.json())
      .then(data => {
        const productosCriticos = getProductosCriticos(data);
        setProductos(productosCriticos);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error cargando productos:', error);
        setIsLoading(false);
      });
  }, []);

  const productosFiltrados = productos.filter(producto => {
    if (filtro === 'todos') return true;
    const status = getStockStatus(producto.stock, producto.stockMinimo || 5);
    if (filtro === 'agotados') return status.texto === 'Agotado';
    if (filtro === 'criticos') return status.texto === 'Stock Crítico';
    return true;
  });

  const handleRestock = (productoId, cantidad) => {
    setProductos(prevProductos => 
      prevProductos.map(prod => {
        if (prod.id === productoId) {
          return {
            ...prod,
            stock: prod.stock + cantidad
          };
        }
        return prod;
      })
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azul-electrico"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <BackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-4">Control de Stock</h1>
        
        {/* Filtros */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFiltro('todos')}
            className={`px-4 py-2 rounded-lg ${
              filtro === 'todos'
                ? 'bg-azul-electrico text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltro('agotados')}
            className={`px-4 py-2 rounded-lg ${
              filtro === 'agotados'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Agotados
          </button>
          <button
            onClick={() => setFiltro('criticos')}
            className={`px-4 py-2 rounded-lg ${
              filtro === 'criticos'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Stock Crítico
          </button>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosFiltrados.map(producto => {
            const stockStatus = getStockStatus(producto.stock, producto.stockMinimo || 5);
            
            return (
              <div key={producto.id} className="card-gaming p-4">
                <div className="flex gap-4">
                  {/* Imagen del producto */}
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{producto.nombre}</h3>
                    <p className="text-gray-400 text-sm mb-2">SKU: {producto.sku || 'N/A'}</p>
                    
                    {/* Estado del stock */}
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.bgColor} ${stockStatus.borderColor} border ${stockStatus.color}`}>
                      {stockStatus.texto}
                    </div>
                    
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-gray-300">Stock: {producto.stock}</span>
                      <span className="text-gray-300">Mín: {producto.stockMinimo || 5}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Precio:</span>
                    <span className="text-azul-electrico font-semibold">
                      {formatPrice(producto.precio)}
                    </span>
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRestock(producto.id, 1)}
                      className="flex-1 py-2 px-3 bg-azul-electrico/20 hover:bg-azul-electrico/30 text-azul-electrico rounded-lg transition-colors text-sm"
                    >
                      +1 Stock
                    </button>
                    <button
                      onClick={() => handleRestock(producto.id, 5)}
                      className="flex-1 py-2 px-3 bg-azul-electrico/20 hover:bg-azul-electrico/30 text-azul-electrico rounded-lg transition-colors text-sm"
                    >
                      +5 Stock
                    </button>
                    <Link
                      to={`/admin/productos/editar/${producto.id}`}
                      className="py-2 px-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensaje cuando no hay productos */}
        {productosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No hay productos {filtro !== 'todos' ? 'en esta categoría' : 'críticos'}
            </h3>
            <p className="text-gray-400">
              {filtro !== 'todos' 
                ? 'Intenta cambiar el filtro para ver más productos'
                : '¡Buen trabajo manteniendo el inventario!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductosCriticos;