import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('perfil');
  const [loading, setLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    direccion: user?.direccion || '',
    bio: user?.bio || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateProfile(profileData);
      // Mostrar mensaje de éxito
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Lógica para cambiar contraseña
      console.log('Cambiando contraseña...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Mostrar mensaje de éxito
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
            Mi Perfil
          </h1>
          <p className="text-gray-300">
            Gestiona tu información personal y configuración de cuenta
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar de Navegación */}
          <div className="card-gaming p-6">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('perfil')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'perfil' 
                    ? 'bg-azul-claro text-black' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                👤 Información Personal
              </button>
              <button
                onClick={() => setActiveTab('seguridad')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'seguridad' 
                    ? 'bg-azul-claro text-black' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                🔒 Seguridad
              </button>
              <button
                onClick={() => setActiveTab('preferencias')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'preferencias' 
                    ? 'bg-azul-claro text-black' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                ⚙️ Preferencias
              </button>
            </div>

            {/* Información de la cuenta */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h4 className="text-lg font-bold text-azul-claro mb-3">Tu Cuenta</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Rol:</span>
                  <span className="text-white capitalize">{user?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Miembro desde:</span>
                  <span className="text-white">Ene 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estado:</span>
                  <span className="text-green-400">Activo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="md:col-span-3">
            {activeTab === 'perfil' && (
              <div className="card-gaming p-6">
                <h2 className="text-2xl font-bold gradient-text mb-6">Información Personal</h2>
                
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        value={profileData.nombre}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">Apellido</label>
                      <input
                        type="text"
                        name="apellido"
                        value={profileData.apellido}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={profileData.telefono}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      value={profileData.direccion}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Biografía</label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                      placeholder="Cuéntanos algo sobre ti..."
                    />
                  </div>

                  <div className="flex justify-end">
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
            )}

            {activeTab === 'seguridad' && (
              <div className="card-gaming p-6">
                <h2 className="text-2xl font-bold gradient-text mb-6">Seguridad y Contraseña</h2>
                
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Contraseña Actual</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Nueva Contraseña</label>
                      <input
                        type="password"
                        name="newPassword"
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
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary disabled:opacity-50"
                    >
                      {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                    </button>
                  </div>
                </form>

                {/* Sesiones Activas */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-bold text-azul-claro mb-4">Sesiones Activas</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                      <div>
                        <div className="text-white">Chrome - Windows</div>
                        <div className="text-sm text-gray-400">Última actividad: hace 2 horas</div>
                      </div>
                      <button className="text-red-400 hover:text-red-300 text-sm">
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferencias' && (
              <div className="card-gaming p-6">
                <h2 className="text-2xl font-bold gradient-text mb-6">Preferencias</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Notificaciones por Email</div>
                      <div className="text-sm text-gray-400">Recibir notificaciones importantes por correo</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azul-claro"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Modo Oscuro</div>
                      <div className="text-sm text-gray-400">Usar tema oscuro en el sistema</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azul-claro"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Idioma</div>
                      <div className="text-sm text-gray-400">Selecciona tu idioma preferido</div>
                    </div>
                    <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                      <option>Español</option>
                      <option>English</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;