import { useAuth } from '../../../context/AuthContext';
import { Navigate, useParams } from 'react-router-dom';

const VerUsuario = () => {
  const { user } = useAuth();
  const { id } = useParams();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  // Datos de ejemplo del usuario
  const usuario = {
    id: 1,
    nombre: 'Juan Carlos',
    apellidos: 'Pérez García',
    run: '12.345.678-9',
    email: 'juan.perez@email.com',
    fechaNacimiento: '1990-03-15',
    tipoUsuario: 'Cliente',
    region: 'Región Metropolitana',
    comuna: 'Santiago',
    direccion: 'Av. Libertador Bernardo O\'Higgins 1234',
    fechaRegistro: '2024-01-15',
    estado: 'Activo'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
            Información del Usuario
          </h1>
          <p className="text-gray-300">
            Detalles completos del perfil de usuario
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Información Principal */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-gaming p-6">
              <h2 className="text-2xl font-bold gradient-text mb-4">
                {usuario.nombre} {usuario.apellidos}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">RUN</label>
                    <p className="text-white font-mono">{usuario.run}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Correo</label>
                    <p className="text-white">{usuario.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Fecha de Nacimiento</label>
                    <p className="text-white">
                      {new Date(usuario.fechaNacimiento).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Fecha de Registro</label>
                    <p className="text-white">
                      {new Date(usuario.fechaRegistro).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Tipo de Usuario</label>
                    <span className="category-badge">
                      {usuario.tipoUsuario}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Región</label>
                    <p className="text-white">{usuario.region}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Comuna</label>
                    <p className="text-white">{usuario.comuna}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Dirección</label>
                    <p className="text-white">{usuario.direccion}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-4">
              <div className="card-gaming p-4 text-center">
                <div className="text-2xl font-bold text-azul-claro mb-1">5</div>
                <div className="text-xs text-gray-400">Pedidos Realizados</div>
              </div>
              <div className="card-gaming p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">$450.000</div>
                <div className="text-xs text-gray-400">Total Gastado</div>
              </div>
              <div className="card-gaming p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">92%</div>
                <div className="text-xs text-gray-400">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card-gaming p-6">
              <h3 className="text-lg font-bold gradient-text mb-4">
                Acciones
              </h3>
              <div className="space-y-3">
                <button className="btn-primary w-full text-center py-2">
                  ✏️ Editar Usuario
                </button>
                <button className="btn-secondary w-full text-center py-2">
                  📧 Enviar Email
                </button>
                <button className="btn-secondary w-full text-center py-2 text-red-400 border-red-400 hover:bg-red-400 hover:text-white">
                  🚫 Desactivar
                </button>
              </div>
            </div>

            <div className="card-gaming p-6">
              <h3 className="text-lg font-bold gradient-text mb-4">
                Actividad Reciente
              </h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-white">Compra realizada</p>
                  <p className="text-gray-400 text-xs">Hace 2 días</p>
                </div>
                <div className="text-sm">
                  <p className="text-white">Perfil actualizado</p>
                  <p className="text-gray-400 text-xs">Hace 1 semana</p>
                </div>
                <div className="text-sm">
                  <p className="text-white">Sesión iniciada</p>
                  <p className="text-gray-400 text-xs">Hace 3 horas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerUsuario;