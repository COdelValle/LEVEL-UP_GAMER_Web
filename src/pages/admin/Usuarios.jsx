import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Usuarios = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const usuarios = [
    {
      id: 1,
      nombre: 'Juan Carlos Pérez García',
      email: 'juan.perez@email.com',
      run: '12.345.678-9',
      tipo: 'Cliente',
      fechaRegistro: '2024-01-15',
      estado: 'Activo'
    },
    {
      id: 2,
      nombre: 'María Fernanda González López',
      email: 'maria.gonzalez@email.com',
      run: '98.765.432-1',
      tipo: 'Cliente',
      fechaRegistro: '2024-01-10',
      estado: 'Activo'
    },
    {
      id: 3,
      nombre: 'Carlos Andrés Martínez Rojas',
      email: 'carlos.martinez@email.com',
      run: '11.223.344-5',
      tipo: 'Cliente',
      fechaRegistro: '2024-01-08',
      estado: 'Inactivo'
    }
  ];

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

        <div className="card-gaming p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold gradient-text">
              Lista de Usuarios
            </h2>
            <span className="text-gray-300">
              {usuarios.length} usuarios registrados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 text-gray-300">RUN</th>
                  <th className="text-left py-3 text-gray-300">Nombre</th>
                  <th className="text-left py-3 text-gray-300">Email</th>
                  <th className="text-left py-3 text-gray-300">Tipo</th>
                  <th className="text-left py-3 text-gray-300">Fecha Registro</th>
                  <th className="text-left py-3 text-gray-300">Estado</th>
                  <th className="text-left py-3 text-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(usuario => (
                  <tr key={usuario.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-4 text-white font-mono">
                      {usuario.run}
                    </td>
                    <td className="py-4 text-white">
                      {usuario.nombre}
                    </td>
                    <td className="py-4 text-gray-300">
                      {usuario.email}
                    </td>
                    <td className="py-4">
                      <span className="category-badge text-xs">
                        {usuario.tipo}
                      </span>
                    </td>
                    <td className="py-4 text-gray-300">
                      {new Date(usuario.fechaRegistro).toLocaleDateString('es-CL')}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        usuario.estado === 'Activo' ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {usuario.estado}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-azul-claro hover:text-azul-electrico text-sm">
                          👁️ Ver
                        </button>
                        <button className="text-green-400 hover:text-green-300 text-sm">
                          ✏️ Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuarios;