import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  const { user } = useAuth();

  // Verificar si es admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-azul-oscuro to-black">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;