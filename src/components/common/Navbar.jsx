import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar-deepblue fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[rgba(0,0,30,0.95)] shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8"> {/* Aumentado el padding horizontal */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
            <img 
              src="/assets/img/LevelUpGamer.png" 
              alt="Level-Up Gamer" 
              className="h-8 lg:h-10"
            />
            <span className="logo-gradient text-lg lg:text-2xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 animate-gradient-x hidden sm:inline">
              Level-Up Gamer
            </span>
          </Link>

          {/* Menú Desktop - Centrado con más espacio */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8 xl:mx-12"> {/* Más margen horizontal */}
            <div className="flex items-center space-x-6 xl:space-x-10"> {/* Más espacio entre enlaces */}
              <Link 
                to="/" 
                className={`nav-link text-sm xl:text-base px-3 py-2 ${location.pathname === '/' ? 'active' : ''}`}
              >
                Inicio
              </Link>
              <Link 
                to="/productos" 
                className={`nav-link text-sm xl:text-base px-3 py-2 ${location.pathname === '/productos' ? 'active' : ''}`}
              >
                Productos
              </Link>
              <Link 
                to="/blogs" 
                className={`nav-link text-sm xl:text-base px-3 py-2 ${location.pathname === '/blogs' ? 'active' : ''}`}
              >
                Blog
              </Link>
              <Link 
                to="/nosotros" 
                className={`nav-link text-sm xl:text-base px-3 py-2 ${location.pathname === '/nosotros' ? 'active' : ''}`}
              >
                Nosotros
              </Link>
            </div>
          </div>

          {/* Botones Desktop - Más espacio entre elementos */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-shrink-0"> {/* Más espacio */}
            {/* Cart Icon */}
            <Link to="/carrito" className="relative p-3 hover:bg-blue-500/10 rounded-lg transition-colors"> {/* Más padding */}
              <span className="text-xl xl:text-2xl">🛒</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 xl:space-x-6"> {/* Más espacio entre botones */}
                {/* Enlace al perfil del usuario */}
                <Link 
                  to="/perfil" 
                  className={`nav-link text-sm xl:text-base px-4 py-2 ${location.pathname === '/perfil' ? 'active' : ''}`}
                >
                  Mi Perfil
                </Link>
                
                {user?.role === 'admin' && (
                  <Link to="/admin" className="btn-secondary text-sm xl:text-base py-2 px-4 xl:px-5">
                    Panel Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="btn-secondary text-sm xl:text-base py-2 px-4 xl:px-5">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 xl:space-x-6"> {/* Más espacio entre botones */}
                <Link to="/login" className="btn-secondary text-sm xl:text-base py-2 px-4 xl:px-5">
                  Iniciar Sesión
                </Link>
                <Link to="/registro" className="btn-primary text-sm xl:text-base py-2 px-4 xl:px-5">
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Menú Mobile */}
          <div className="flex items-center lg:hidden">
            <Link to="/carrito" className="relative p-3 mr-2 hover:bg-blue-500/10 rounded-lg transition-colors">
              <span className="text-xl">🛒</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            </Link>
            <button 
              className="text-white p-3 hover:bg-blue-500/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>

        {/* Menú Mobile Expandido - Más espacio interno */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[rgba(0,0,30,0.98)] border-t border-azul-electrico/30">
            <div className="px-6 py-6 space-y-4"> {/* Más padding y espacio */}
              <Link 
                to="/" 
                className="block text-white hover:text-azul-claro py-3 text-lg font-medium border-b border-gray-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/productos" 
                className="block text-white hover:text-azul-claro py-3 text-lg border-b border-gray-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                to="/blogs" 
                className="block text-white hover:text-azul-claro py-3 text-lg border-b border-gray-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/nosotros" 
                className="block text-white hover:text-azul-claro py-3 text-lg border-b border-gray-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>

              {/* Enlace al perfil en mobile (solo si está autenticado) */}
              {isAuthenticated && (
                  <Link
                    to="/perfil"
                    className="block relative group text-white hover:text-azul-claro py-3 text-lg border-b border-gray-700/50"
                    onClick={() => setIsMenuOpen(false)}
                    title="Perfil"
                  >
                    {/* Solo icono en mobile, con texto accesible (sr-only) */}
                    <span className="text-lg inline-block" aria-hidden="true">👤</span>
                    <span className="sr-only">Perfil</span>
                    {/* Tooltip for hover */}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
                      Perfil
                    </span>
                  </Link>
              )}

              {/* Cart Icon en Mobile */}
              <div className="flex justify-center py-4 border-b border-gray-700/50">
                <Link 
                  to="/carrito" 
                  className="relative flex items-center text-white hover:text-azul-claro text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-2xl mr-3">🛒</span>
                  Carrito
                  <span className="absolute -top-2 -right-8 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                </Link>
              </div>
              
              {isAuthenticated ? (
                <div className="space-y-3 pt-2">
                  {user?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="block btn-secondary w-full text-center py-3 text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Panel Admin
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="block btn-secondary w-full text-center py-3 text-lg"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <Link 
                    to="/login" 
                    className="block btn-secondary w-full text-center py-3 text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link 
                    to="/registro" 
                    className="block btn-primary w-full text-center py-3 text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;