import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const EditarUsuario = () => {
  const { api, user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    rol: 'user',
    activo: true,
    telefono: '',
    rut: ''
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  // Cargar datos del usuario
  useEffect(() => {
    let mounted = true;

    const cargarUsuario = async () => {
      try {
        const res = await api.get(`/api/v1/usuarios/${id}`);
        if (mounted && res) {
          setFormData({
            nombre: res.nombre || '',
            apellido: res.apellido || '',
            email: res.email || '',
            rol: res.rol || 'user',
            activo: res.activo !== false,
            telefono: res.telefono || '',
            rut: res.rut || ''
          });
        }
      } catch (err) {
        console.error('Error al cargar usuario:', err);
        if (mounted) setError('No se pudo cargar el usuario');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    cargarUsuario();

    return () => { mounted = false; };
  }, [id, api]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Actualizar datos del usuario
      const payload = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        rol: formData.rol,
        activo: formData.activo,
        telefono: formData.telefono,
        rut: formData.rut
      };

      // Si se proporciona nueva contraseña, incluirla
      if (passwordData.newPassword) {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          setError('Las contraseñas no coinciden');
          setLoading(false);
          return;
        }
        if (passwordData.newPassword.length < 6) {
          setError('La contraseña debe tener al menos 6 caracteres');
          setLoading(false);
          return;
        }
        payload.password = passwordData.newPassword;
      }

      const updated = await api.put(`/api/v1/usuarios/${id}`, payload);

      if (updated) {
        alert('✅ Usuario actualizado exitosamente');
        navigate('/admin/usuarios');
      }
    } catch (err) {
      console.error('Error al actualizar usuario:', err);
      setError(err?.body?.message || 'Error al actualizar el usuario');
      alert('❌ ' + (err?.body?.message || err?.message || 'Error al actualizar el usuario'));
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
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center text-white">Cargando...</div>
          ) : (
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
                <label className="block text-gray-300 mb-2">RUT</label>
                <input
                  type="text"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Rol</label>
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                  <option value="seller">Vendedor</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Estado</label>
                <select
                  name="activo"
                  value={formData.activo ? 'activo' : 'inactivo'}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.value === 'activo' })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
            </div>

            {/* Sección de Seguridad */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-bold text-azul-claro mb-4">Cambiar Contraseña</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Nueva Contraseña</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Dejar en blanco para no cambiar"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Confirmar Contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar nueva contraseña"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default EditarUsuario;