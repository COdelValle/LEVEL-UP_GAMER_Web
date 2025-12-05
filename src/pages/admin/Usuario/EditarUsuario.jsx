import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const EditarUsuario = () => {
  const { user, api } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'user',
    estado: 'activo',
    nombre: '',
    apellido: '',
    telefono: ''
  });

  const [loading, setLoading] = useState(false);

  // Cargar datos reales desde backend
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        if (!api) return;
        const data = await api.get(`/api/v1/usuarios/${id}`);
        if (!mounted) return;
        if (data) {
          setFormData({
            username: data.username || data.usuario || data.email || '',
            email: data.email || '',
            role: (data.rol || data.role || 'user').toString().toLowerCase(),
            estado: data.estado || 'activo',
            nombre: data.nombre || '',
            apellido: data.apellido || '',
            telefono: data.telefono || ''
          });
        }
      } catch (err) {
        console.warn('EditarUsuario: no se pudo cargar usuario desde backend, usando valores por defecto', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id, api]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Preparar payload según UpdateUsuarioRequest del backend
      const payload = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        rol: (formData.role || 'user').toString().toUpperCase()
      };

      // Si hay cambios de contraseña, agregarlos (campo opcional no incluido en este formulario por ahora)

      // Enviar al backend usando la instancia `api` (debe incluir token)
      if (!api) throw new Error('No hay instancia API disponible (no autenticado)');
      await api.put(`/api/v1/usuarios/${id}`, payload);
      navigate('/admin/usuarios');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Error al actualizar usuario: ' + (error?.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
              Editar Usuario
            </h1>
            <p className="text-gray-300">Modifica los datos del usuario</p>
          </div>
          <button
            onClick={() => navigate('/admin/usuarios')}
            className="btn-secondary"
          >
            ← Volver
          </button>
        </div>

        <div className="card-gaming p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Rol</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                  <option value="moderator">Moderador</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Estado</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="suspendido">Suspendido</option>
                </select>
              </div>
            </div>

            {/* Sección de Seguridad */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-bold text-azul-claro mb-4">Seguridad</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Nueva Contraseña</label>
                  <input
                    type="password"
                    placeholder="Dejar en blanco para no cambiar"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Confirmar Contraseña</label>
                  <input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/usuarios')}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuario;