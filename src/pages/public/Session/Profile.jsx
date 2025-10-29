import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useOrders } from '../../../hooks/useOrders';
import UserProfile from '../../../components/profile/UserProfile';
import OrderHistory from '../../../components/profile/OrderHistory';
import UserSettings from '../../../components/profile/UserSettings';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const { orders, loading: ordersLoading, getOrdersByUser } = useOrders();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (isAuthenticated && user) {
      getOrdersByUser(user.id);
    }
  }, [isAuthenticated, user, getOrdersByUser]);

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userTabs = [
    { id: 'profile', label: '👤 Perfil', component: <UserProfile user={user} /> },
    { id: 'orders', label: '📦 Pedidos', component: <OrderHistory orders={orders} loading={ordersLoading} /> },
    { id: 'settings', label: '⚙️ Configuración', component: <UserSettings user={user} /> },
  ];

  // Si es admin, agregar enlace al panel de administración
  if (user?.role === 'admin') {
    userTabs.push({ 
      id: 'admin', 
      label: '👑 Panel Admin', 
      component: (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">👑</div>
          <h3 className="text-2xl font-bold text-white mb-4">Panel de Administración</h3>
          <p className="text-gray-300 mb-6">
            Accede al panel completo de administración para gestionar productos, usuarios y pedidos.
          </p>
          <a 
            href="/admin" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block"
          >
            Ir al Panel Admin →
          </a>
        </div>
      ) 
    });
  }

  return (
    <div className="min-h-screen relative bg-[url('/assets/img/background2.jpg')] bg-cover bg-center pt-24 pb-12">
      {/* Superposición rosada sutil sobre el background global */}
      <div className="absolute inset-0 bg-pink-600/20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/15 via-gray-900/50 to-gray-900/40 backdrop-blur-[1px] pointer-events-none"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
            Mi Perfil
          </h1>
          <p className="text-gray-300 text-lg">
            Bienvenido de vuelta, {user?.nombre || user?.username || 'Usuario'}
          </p>
          {user?.role === 'admin' && (
            <span className="inline-block mt-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
              👑 Administrador
            </span>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {userTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-inner'
                  : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          {userTabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default Profile;