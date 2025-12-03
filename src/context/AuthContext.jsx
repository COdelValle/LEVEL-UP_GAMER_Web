import { createContext, useContext, useState, useEffect } from 'react';
import createAPI from '../lib/APIHelper';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

const api = createAPI(import.meta.env.VITE_API_URL || 'http://localhost:8080');

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedSession = localStorage.getItem('adminSession');
    const storedToken = localStorage.getItem('token');

    console.log('🔍 AuthContext init - localStorage:', { storedUser: !!storedUser, storedToken: !!storedToken, storedSession: !!storedSession });

    if (storedToken) {
      api.setToken(storedToken);
      console.log('✓ Token restaurado desde localStorage');
    }

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log('✓ User restaurado:', parsedUser);
    } else if (storedSession) {
      const session = JSON.parse(storedSession);
      if (session.isAuthenticated && new Date().getTime() < session.expiresAt) {
        setUser({ username: session.username, role: 'admin' });
        console.log('✓ Admin session restaurada');
      }
    } else {
      console.log('ℹ No hay sesión guardada');
    }

    setLoading(false);
  }, []);

  // Mantener la función `login` para flujos locales existentes
  const login = (userData) => {
    // Normalizar 'rol' a 'role' si es necesario
    const normalizedUser = {
      ...userData,
      role: userData.role || userData.rol
    };
    
    setUser(normalizedUser);
    localStorage.setItem('user', JSON.stringify(normalizedUser));

    // Si es admin, crear una sesión con expiración
    if (normalizedUser.role === 'admin' || normalizedUser.role === 'ADMIN') {
      const expirationTime = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 días
      const adminSession = {
        isAuthenticated: true,
        username: normalizedUser.username || normalizedUser.nombre,
        role: normalizedUser.role,
        expiresAt: expirationTime
      };
      localStorage.setItem('adminSession', JSON.stringify(adminSession));
    }

    // Si nos pasan token en userData, usarlo
    if (normalizedUser?.token) {
      api.setToken(normalizedUser.token);
      localStorage.setItem('token', normalizedUser.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('adminSession');
    localStorage.removeItem('token');
    api.setToken(null);
  };

  // Update profile locally and via API if available
  const updateProfile = async (profileData) => {
    try {
      // If backend API exposes update endpoint, call it
      if (api && typeof api.updateProfile === 'function') {
        await api.updateProfile(profileData);
      }

      // Merge and persist locally
      setUser(prev => {
        const merged = { ...(prev || {}), ...profileData };
        try { localStorage.setItem('user', JSON.stringify(merged)); } catch (e) { /* ignore */ }
        return merged;
      });

      return true;
    } catch (err) {
      console.error('✗ Error en updateProfile:', err);
      throw err;
    }
  };

  // Update password via API if available; otherwise simulate success
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      if (api && typeof api.updatePassword === 'function') {
        await api.updatePassword(currentPassword, newPassword);
      } else {
        // No backend endpoint available locally; just resolve
        console.info('ℹ updatePassword: no backend endpoint, simulated success');
      }
      return true;
    } catch (err) {
      console.error('✗ Error en updatePassword:', err);
      throw err;
    }
  };

  // Nueva función que llama al backend para autenticar
  const authenticate = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.login(email, password);

      if (data?.token) {
        api.setToken(data.token);
        localStorage.setItem('token', data.token);
      }

      // Intentar extraer user de varias estructuras posibles:
      // 1. data.user (estructura estándar)
      // 2. data.usuario (variante)
      // 3. Directamente en data si tiene usuarioId, nombre, email, rol (estructura actual del backend)
      let userFromApi = data?.user || data?.usuario;
      
      if (!userFromApi && data?.usuarioId) {
        // Tu backend devuelve la info del usuario directamente en el objeto
        userFromApi = {
          id: data.usuarioId,
          nombre: data.nombre,
          email: data.email,
          rol: data.rol,
          role: (data.rol || '').toLowerCase() // normalizar a minúsculas para consistencia
        };
      }

      if (userFromApi) {
        setUser(userFromApi);
        localStorage.setItem('user', JSON.stringify(userFromApi));
        console.log('✓ User guardado:', userFromApi);
      } else {
        console.warn('⚠ Backend no devolvió user en la respuesta:', data);
      }

      return data;
    } catch (err) {
      console.error('✗ Error en authenticate:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    api, // exponer la instancia API para llamadas desde componentes
    authenticate,
    updateProfile,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};