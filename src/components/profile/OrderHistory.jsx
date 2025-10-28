import { useNavigate } from 'react-router-dom';

const OrderHistory = ({ orders, loading }) => {
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-gray-300 mt-4">Cargando pedidos...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-2xl font-bold text-white mb-2">No hay pedidos</h3>
        <p className="text-gray-400">Aún no has realizado ningún pedido</p>
        <a 
          href="/productos" 
          className="inline-block mt-4 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Explorar Productos
        </a>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Historial de Pedidos</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-white font-semibold">Pedido #{order.id}</h3>
                <p className="text-gray-400 text-sm">
                  {new Date(order.fecha).toLocaleDateString('es-CL')}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                order.estado === 'completado' ? 'bg-green-500/20 text-green-400' :
                order.estado === 'pendiente' ? 'bg-yellow-500/20 text-yellow-400' :
                order.estado === 'cancelado' ? 'bg-red-500/20 text-red-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {order.estado}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div>
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-white font-semibold">${order.total?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Productos</p>
                <p className="text-white">{order.items?.length || 0} items</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Método de pago</p>
                <p className="text-white capitalize">{order.metodoPago || 'No especificado'}</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/boleta', { state: { order } })}
              className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
            >
              Ver detalles del pedido →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;