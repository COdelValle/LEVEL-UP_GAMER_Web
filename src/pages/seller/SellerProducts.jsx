import { useEffect, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/formatters';

const SellerProducts = () => {
  const { getProducts } = useProducts();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const all = await getProducts();
        // Try to filter by seller id if available in product object
        const filtered = Array.isArray(all) ? all.filter(p => {
          return (p.sellerId && String(p.sellerId) === String(user?.id)) ||
                 (p.userId && String(p.userId) === String(user?.id)) ||
                 (p.vendedorId && String(p.vendedorId) === String(user?.id)) ||
                 // If no seller field, skip filtering so sellers can still see all products
                 !p.sellerId && !p.userId && !p.vendedorId;
        }) : [];
        if (mounted) setProducts(filtered);
      } catch (e) {
        console.warn('SellerProducts: error loading products', e?.message || e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [getProducts, user]);

  if (loading) return <div className="p-6 text-center text-white">Cargando productos...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold gradient-text mb-6">Mis Productos</h1>
      {products.length === 0 ? (
        <div className="card-gaming p-6 text-gray-300">No se encontraron productos para mostrar.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {products.map(p => (
            <div key={p.id} className="card-gaming p-4 flex items-center space-x-4">
              <img src={(p.imagen && (p.imagen.startsWith('http') || p.imagen.startsWith('/'))) ? p.imagen : `/assets/img/${p.imagen}`} alt={p.nombre} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="text-white font-semibold">{p.nombre}</h3>
                <p className="text-gray-300 text-sm">{p.descripcion?.slice(0, 80)}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-white font-bold">{formatPrice(p.precio)}</div>
                  <div className={`text-sm px-2 py-1 rounded ${p.stock <= 5 ? 'bg-red-600/30 text-red-300' : 'bg-green-600/20 text-green-200'}`}>
                    Stock: {p.stock ?? p.cantidad ?? 0}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
