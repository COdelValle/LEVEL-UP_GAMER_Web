import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedSession = localStorage.getItem('adminSession');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (storedSession) {
      const session = JSON.parse(storedSession);
      if (session.isAuthenticated && new Date().getTime() < session.expiresAt) {
        setUser({ username: session.username, role: 'admin' });
      }
    }
    
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Si es admin, crear una sesión con expiración
    if (userData.role === 'admin') {
      const expirationTime = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 días
      const adminSession = {
        isAuthenticated: true,
        username: userData.username,
        role: userData.role,
        expiresAt: expirationTime
      };
      localStorage.setItem('adminSession', JSON.stringify(adminSession));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('adminSession');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};