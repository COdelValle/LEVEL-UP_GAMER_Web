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
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 lg:space-x-3">
            <img 
              src="/assets/img/LevelUpGamer.png" 
              alt="Level-Up Gamer" 
              className="h-8 lg:h-10"
            />
            <span className="logo-gradient text-lg lg:text-2xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 animate-gradient-x hidden sm:inline">
              Level-Up Gamer
            </span>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            <Link 
              to="/" 
              className={`nav-link text-sm xl:text-base ${location.pathname === '/' ? 'active' : ''}`}
            >
              Inicio
            </Link>
            <Link 
              to="/productos" 
              className={`nav-link ${location.pathname === '/productos' ? 'active' : ''}`}
            >
              Productos
            </Link>
            <Link 
              to="/blogs" 
              className={`nav-link ${location.pathname === '/blogs' ? 'active' : ''}`}
            >
              Blog
            </Link>
            <Link 
              to="/nosotros" 
              className={`nav-link ${location.pathname === '/nosotros' ? 'active' : ''}`}
            >
              Nosotros
            </Link>
          </div>

          {/* Botones Desktop */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {/* Cart Icon */}
            <Link to="/carrito" className="relative p-2">
              <span className="text-xl xl:text-2xl">🛒</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            </Link>
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="btn-secondary text-sm xl:text-base py-1.5 px-3 xl:px-4">
                    Panel Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="btn-secondary text-sm xl:text-base py-1.5 px-3 xl:px-4">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm xl:text-base py-1.5 px-3 xl:px-4">
                  Iniciar Sesión
                </Link>
                <Link to="/registro" className="btn-primary text-sm xl:text-base py-1.5 px-3 xl:px-4">
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Menú Mobile */}
          <div className="flex items-center lg:hidden">
            <Link to="/carrito" className="relative mr-4">
              <span className="text-xl">🛒</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            </Link>
            <button 
              className="text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>

        {/* Menú Mobile Expandido */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[rgba(0,0,30,0.98)] border-t border-azul-electrico/30">
            <div className="px-4 py-4 space-y-3">
              <Link 
                to="/" 
                className="block text-white hover:text-azul-claro py-2 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/productos" 
                className="block text-white hover:text-azul-claro"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                to="/blogs" 
                className="block text-white hover:text-azul-claro"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/nosotros" 
                className="block text-white hover:text-azul-claro"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>

              {/* Cart Icon en Mobile */}
              <div className="flex justify-center py-2">
                <Link 
                  to="/cart" 
                  className="relative flex items-center text-white hover:text-azul-claro"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-2xl">🛒</span>
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                </Link>
              </div>
              
              {isAuthenticated ? (
                <>
                  {user?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="block btn-secondary w-full text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Panel Admin
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="block btn-secondary w-full text-center"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block btn-secondary w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link 
                    to="/registro" 
                    className="block btn-primary w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;