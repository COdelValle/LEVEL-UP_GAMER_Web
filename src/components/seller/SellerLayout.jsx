import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import BackButton from '../common/BackButton';

const SellerLayout = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== 'seller') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-azul-oscuro to-black">
      <aside className="w-64 p-6 border-r border-gray-800">
        <div className="mb-6">
          <h3 className="text-white text-lg font-bold">Panel Vendedor</h3>
          <p className="text-sm text-gray-300 mt-1">Hola, {user?.nombre || user?.username}</p>
        </div>
        <div className="space-y-3">
          <BackButton />
          <a href="/seller" className="block text-sm text-gray-200 hover:text-white">Dashboard</a>
          <a href="/seller/productos" className="block text-sm text-gray-200 hover:text-white">Mis Productos</a>
          <a href="/seller/pedidos" className="block text-sm text-gray-200 hover:text-white">Pedidos</a>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default SellerLayout;
