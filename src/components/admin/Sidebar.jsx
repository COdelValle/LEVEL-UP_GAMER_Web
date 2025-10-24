import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/admin', icon: '📊', label: 'Dashboard' },
    { path: '/admin/productos/nuevo-producto', icon: '➕', label: 'Nuevo Producto' },
    { path: '/admin/reportes', icon: '📈', label: 'Reportes' },
    { path: '/admin/productos/reportes', icon: '📋', label: 'Reportes Productos' },
    { path: '/admin/usuarios', icon: '👥', label: 'Usuarios' },
    { path: '/admin/productos/criticos', icon: '⚠️', label: 'Productos Críticos' },
    { path: '/admin/boletas', icon: '🧾', label: 'Boletas' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="bg-[#0a1429] text-white w-64 min-h-screen p-6 border-r border-azul-electrico/30">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-azul-electrico to-azul-claro rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">⚡</span>
          </div>
          <div>
            <h2 className="font-bold text-xl gradient-text font-orbitron">Level-Up Admin</h2>
            <p className="text-gray-400 text-sm">Panel de Control</p>
          </div>
        </div>
        <div className="text-xs text-gray-400 bg-gray-800/50 p-2 rounded">
          👋 Hola, <strong>{user?.username || 'Admin'}</strong>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              isActive(item.path)
                ? 'bg-azul-electrico text-white shadow-lg shadow-azul-electrico/25'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="bg-gray-800/30 rounded-lg p-4 mb-6 border border-gray-700">
        <h3 className="font-semibold text-gray-300 mb-3 text-sm">Vista Rápida</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Online</span>
            <span className="text-green-400">● Activo</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Sesión</span>
            <span className="text-azul-claro">Admin</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-3">
        <Link
          to="/"
          className="flex items-center space-x-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition duration-300"
        >
          <span>🏠</span>
          <span>Volver a Tienda</span>
        </Link>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition duration-300"
        >
          <span>🚪</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>

      {/* Version */}
      <div className="mt-8 pt-4 border-t border-gray-700/50">
        <p className="text-xs text-gray-500 text-center">v1.0.0 • Level-Up Gamer</p>
      </div>
    </aside>
  );
}

export default Sidebar;