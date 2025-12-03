import { useEffect, useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { useProducts } from '../../hooks/useProducts';

const SellerDashboard = () => {
  const { getOrdersByUser } = useOrders();
  const { getProducts } = useProducts();
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        // Try to fetch all products (filtering by seller should be backend-side; here we count all)
        const prods = await getProducts();
        if (mounted) setProductsCount(Array.isArray(prods) ? prods.length : 0);
      } catch (e) {
        // ignore
      }
    })();

    return () => { mounted = false; };
  }, [getProducts]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // If backend provides seller-specific orders, the hook may support filtering.
        // Here we fetch all orders and use length as sample metric.
        const all = await getOrdersByUser();
        if (mounted) setOrdersCount(Array.isArray(all) ? all.length : 0);
      } catch (e) {
        // ignore
      }
    })();

    return () => { mounted = false; };
  }, [getOrdersByUser]);

  return (
    <div>
      <h1 className="text-3xl font-bold gradient-text mb-6">Dashboard Vendedor</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-gaming p-6">
          <h3 className="text-lg font-semibold text-white">Productos</h3>
          <p className="text-gray-300 mt-2">Total de productos: <strong className="text-white">{productsCount}</strong></p>
        </div>

        <div className="card-gaming p-6">
          <h3 className="text-lg font-semibold text-white">Pedidos</h3>
          <p className="text-gray-300 mt-2">Total de pedidos: <strong className="text-white">{ordersCount}</strong></p>
        </div>
      </div>

      <div className="mt-6">
        <div className="card-gaming p-6">
          <h3 className="text-lg font-semibold text-white">Acciones rápidas</h3>
          <ul className="mt-3 text-gray-300 list-disc list-inside">
            <li>Ver y administrar tus productos (cuando esté disponible)</li>
            <li>Ver pedidos recibidos</li>
            <li>Editar perfil y métodos de pago</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
