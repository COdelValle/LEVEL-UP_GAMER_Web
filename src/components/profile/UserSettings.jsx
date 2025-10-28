import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const UserSettings = ({ user }) => {
  const { updatePassword } = useAuth();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    try {
      await updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      alert('Contraseña actualizada exitosamente');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error al actualizar la contraseña');
    }
  };

  return (
    <div className="space-y-8">
      {/* Cambio de Contraseña */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Cambiar Contraseña</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-gray-300 mb-2">Contraseña actual</label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Nueva contraseña</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Confirmar nueva contraseña</label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Actualizar Contraseña
          </button>
        </form>
      </div>

      {/* Preferencias */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Preferencias</h3>
        <div className="space-y-3 max-w-md">
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-400" />
            <span className="text-gray-300">Recibir notificaciones por email</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-400" />
            <span className="text-gray-300">Recibir ofertas especiales</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-400" />
            <span className="text-gray-300">Notificaciones de nuevos productos</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;