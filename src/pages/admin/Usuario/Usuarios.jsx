import { useAuth } from '../../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Usuarios = () => {
  const { user, api } = useAuth();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!user || (user.role !== 'admin' && user.role !== 'ADMIN')) {
    return <Navigate to="/login" replace />;
  }

  // Cargar usuarios desde el backend
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        console.log('🔍 Iniciando fetch de usuarios...');
        console.log('🔐 Token disponible:', !!api);
        
        // Ajusta la ruta si tu endpoint es diferente
        const data = await api.get('/api/v1/usuarios');
        console.log('✓ Usuarios obtenidos:', data);
        setUsuarios(Array.isArray(data) ? data : (data?.content || []));
        setError(null);
      } catch (err) {
        console.error('✗ Error al obtener usuarios:', err);
        console.error('Status:', err.status);
        console.error('Body:', err.body);
        setError(err.message || 'Error al cargar usuarios');
        setUsuarios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [api]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-300">
            Administra los usuarios registrados en la plataforma
          </p>
        </div>

        {loading && (
          <div className="card-gaming p-6 text-center">
            <p className="text-gray-300">Cargando usuarios...</p>
          </div>
        )}

        {error && (
          <div className="card-gaming p-6 border border-red-500 bg-red-500/10">
            <p className="text-red-400">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="card-gaming p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold gradient-text">
                Lista de Usuarios
              </h2>
              <span className="text-gray-300">
                {usuarios.length} usuarios registrados
              </span>
            </div>

            {usuarios.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No hay usuarios registrados</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 text-gray-300">ID</th>
                      <th className="text-left py-3 text-gray-300">Nombre</th>
                      <th className="text-left py-3 text-gray-300">Email</th>
                      <th className="text-left py-3 text-gray-300">RUT</th>
                      <th className="text-left py-3 text-gray-300">Rol</th>
                      <th className="text-left py-3 text-gray-300">Fecha Registro</th>
                      <th className="text-left py-3 text-gray-300">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map(usuario => (
                      <tr key={usuario.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                        <td className="py-4 text-white font-mono text-sm">
                          {usuario.id || usuario.usuarioId || '-'}
                        </td>
                        <td className="py-4 text-white">
                          {usuario.nombre || '-'}
                        </td>
                        <td className="py-4 text-gray-300">
                          {usuario.email || '-'}
                        </td>
                        <td className="py-4 text-white font-mono text-sm">
                          {usuario.rut || '-'}
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            (usuario.rol || usuario.role || '').toUpperCase() === 'ADMIN' 
                              ? 'bg-red-500/30 text-red-300' 
                              : 'bg-blue-500/30 text-blue-300'
                          }`}>
                            {usuario.rol || usuario.role || 'USER'}
                          </span>
                        </td>
                        <td className="py-4 text-gray-300 text-sm">
                          {usuario.fechaRegistro 
                            ? new Date(usuario.fechaRegistro).toLocaleDateString('es-CL')
                            : usuario.createdAt
                            ? new Date(usuario.createdAt).toLocaleDateString('es-CL')
                            : '-'
                          }
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(`/admin/usuario/${usuario.id || usuario.usuarioId}`)}
                              className="text-azul-claro hover:text-azul-electrico text-sm"
                              title="Ver detalles"
                            >
                              👁️
                            </button>
                            <button
                              onClick={() => navigate(`/admin/usuarios/${usuario.id || usuario.usuarioId}/editar-usuario`)}
                              className="text-green-400 hover:text-green-300 text-sm"
                              title="Editar usuario"
                            >
                              ✏️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuarios;