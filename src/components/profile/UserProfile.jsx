import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { chileRegions, getComunasByRegion } from '../../assets/data/chileRegions';

const UserProfile = ({ user }) => {
  const { updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || user?.username || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    direccion: user?.direccion || '',
    region: user?.region || '',
    ciudad: user?.ciudad || '',
    comuna: user?.comuna || ''
  });

  const [comunas, setComunas] = useState([]);

  useEffect(() => {
    if (formData.region) {
      setComunas(getComunasByRegion(formData.region));
      if (formData.comuna && !getComunasByRegion(formData.region).includes(formData.comuna)) {
        setFormData(prev => ({ ...prev, comuna: '' }));
      }
    } else {
      setComunas([]);
    }
  }, [formData.region]);

  // Sync form when `user` prop changes (e.g., after updateProfile)
  useEffect(() => {
    setFormData({
      nombre: user?.nombre || user?.username || '',
      email: user?.email || '',
      telefono: user?.telefono || '',
      direccion: user?.direccion || '',
      region: user?.region || '',
      ciudad: user?.ciudad || '',
      comuna: user?.comuna || ''
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Información Personal</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {isEditing ? 'Cancelar' : 'Editar Perfil'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Nombre completo</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Región</label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
              >
                <option value="">Selecciona una región</option>
                {chileRegions.map(r => (
                  <option key={r.id} value={r.id}>{r.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Ciudad</label>
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Comuna</label>
              <select
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                disabled={!formData.region}
              >
                <option value="">Selecciona una comuna</option>
                {comunas.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Guardar Cambios
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm">Nombre completo</label>
              <p className="text-white text-lg">{user?.nombre || user?.username || 'No especificado'}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Email</label>
              <p className="text-white text-lg">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm">Teléfono</label>
              <p className="text-white text-lg">{user?.telefono || 'No especificado'}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Dirección</label>
              <p className="text-white text-lg">{user?.direccion || 'No especificada'}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Región</label>
              <p className="text-white text-lg">{(user?.region && chileRegions.find(r => r.id === user.region)?.nombre) || 'No especificada'}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Comuna</label>
              <p className="text-white text-lg">{user?.comuna || 'No especificada'}</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-gray-400 text-sm">Rol</label>
            <p className="text-white text-lg capitalize">{user?.role || 'usuario'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;