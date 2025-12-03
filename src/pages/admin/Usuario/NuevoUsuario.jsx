import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const NuevoUsuario = () => {
  const { api, user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol: 'user',
    activo: true,
    telefono: '',
    rut: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';

    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    else if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.rut.trim()) newErrors.rut = 'El RUT es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Crear usuario en el backend
      const payload = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        password: formData.password,
        rol: formData.rol,
        activo: formData.activo,
        telefono: formData.telefono,
        rut: formData.rut
      };

      const created = await api.post('/api/v1/usuarios', payload);

      if (created) {
        alert('✅ Usuario creado exitosamente');
        navigate('/admin/usuarios');
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setErrors({ submit: error?.body?.message || 'Error al crear el usuario. Intente nuevamente.' });
      alert('❌ ' + (error?.body?.message || 'Error al crear el usuario'));
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
              Nuevo Usuario
            </h1>
            <p className="text-gray-300">Agrega un nuevo usuario al sistema</p>
          </div>
          <button
            onClick={() => navigate('/admin/usuarios')}
            className="btn-secondary"
          >
            ← Volver
          </button>
        </div>

        <div className="card-gaming p-6">
          {errors.submit && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Personal */}
            <div>
              <h3 className="text-lg font-bold text-azul-claro mb-4">Información Personal</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                      errors.nombre ? 'border-red-500' : 'border-gray-700 focus:border-azul-claro'
                    }`}
                  />
                  {errors.nombre && <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Apellido *</label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                      errors.apellido ? 'border-red-500' : 'border-gray-700 focus:border-azul-claro'
                    }`}
                  />
                  {errors.apellido && <p className="text-red-400 text-sm mt-1">{errors.apellido}</p>}
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
                  <label className="block text-gray-300 mb-2">Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                  />
                </div>
              </div>
            </div>

            {/* Cuenta y Acceso */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-bold text-azul-claro mb-4">Cuenta y Acceso</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Username *</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                      errors.username ? 'border-red-500' : 'border-gray-700 focus:border-azul-claro'
                    }`}
                  />
                  {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-700 focus:border-azul-claro'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Contraseña *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                      errors.password ? 'border-red-500' : 'border-gray-700 focus:border-azul-claro'
                    }`}
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Confirmar Contraseña *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-700 focus:border-azul-claro'
                    }`}
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
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
                  </select>
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
                {loading ? 'Creando Usuario...' : 'Crear Usuario'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NuevoUsuario;