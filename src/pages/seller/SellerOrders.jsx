import { useEffect, useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { useAuth } from '../../context/AuthContext';

const SellerOrders = () => {
  const { getOrdersByUser } = useOrders();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        // If backend supports seller-specific filter, update this call
        await getOrdersByUser(user?.id);
        // useOrders exposes shared orders state; we can't directly read it here so fetch again via the hook pattern
        // instead we'll read from window (ordersUpdated event triggers reloads in other hooks). Simpler: call getOrdersByUser and rely on the hook consumer to show them.
        // For now, we attempt to call getOrdersByUser and then rely on localStorage fallback
        const stored = JSON.parse(localStorage.getItem('orders') || '[]');
        const filtered = (stored || []).filter(o => {
          // orders that contain items for this seller (if item has sellerId)
          if (!o.items) return false;
          return o.items.some(it => it.sellerId && String(it.sellerId) === String(user?.id));
        });
        if (mounted) setOrders(filtered);
      } catch (e) {
        console.warn('SellerOrders load error', e?.message || e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [getOrdersByUser, user]);

  if (loading) return <div className="p-6 text-center text-white">Cargando pedidos...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold gradient-text mb-6">Pedidos Recibidos</h1>
      {orders.length === 0 ? (
        <div className="card-gaming p-6 text-gray-300">No hay pedidos para tus productos.</div>
      ) : (
        <div className="space-y-4">
          {orders.map(o => (
            <div key={o.id} className="card-gaming p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-semibold">Pedido #{o.id}</h3>
                  <p className="text-gray-400 text-sm">{new Date(o.fecha).toLocaleString()}</p>
                </div>
                <div className="text-white font-bold">Total: ${Number(o.total || 0).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
