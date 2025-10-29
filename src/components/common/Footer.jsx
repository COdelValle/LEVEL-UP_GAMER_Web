const Footer = () => {
  return (
  <footer className="relative bg-black/30 backdrop-blur-sm text-white py-12 z-20">
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-azul-electrico to-azul-claro rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎮</span>
              </div>
              <h3 className="text-xl font-bold gradient-text">Level-Up Gamer</h3>
            </div>
            <p className="text-gray-300">
              La tienda online líder para gamers en Chile. 
              ¡Sube de nivel con nosotros!
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Tienda</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/productos" className="hover:text-azul-claro">Productos</a></li>
              <li><a href="#" className="hover:text-azul-claro">Ofertas</a></li>
              <li><a href="#" className="hover:text-azul-claro">Nuevos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Comunidad</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/blogs" className="hover:text-azul-claro">Blog</a></li>
              <li><a href="#" className="hover:text-azul-claro">Eventos</a></li>
              <li><a href="#" className="hover:text-azul-claro">Discord</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-azul-claro">Contacto</a></li>
              <li><a href="#" className="hover:text-azul-claro">FAQ</a></li>
              <li><a href="#" className="hover:text-azul-claro">Envíos</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Level-Up Gamer. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;