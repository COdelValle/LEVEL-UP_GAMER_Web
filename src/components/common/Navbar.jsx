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
      scrolled ? 'bg-[rgba(0,0,30,0.95)] shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/assets/img/LevelUpGamer.png" 
              alt="Level-Up Gamer" 
              className="h-10"
            />
            <span className="logo-gradient text-2xl font-bold font-orbitron">
              Level-Up Gamer
            </span>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
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
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="btn-secondary">
                    Panel Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="btn-secondary">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">
                  Iniciar Sesión
                </Link>
                <Link to="/registro" className="btn-primary">
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Menú Mobile */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Menú Mobile Expandido */}
        {isMenuOpen && (
          <div className="md:hidden bg-[rgba(0,0,30,0.98)] border-t border-azul-electrico/30">
            <div className="px-4 py-4 space-y-4">
              <Link 
                to="/" 
                className="block text-white hover:text-azul-claro"
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