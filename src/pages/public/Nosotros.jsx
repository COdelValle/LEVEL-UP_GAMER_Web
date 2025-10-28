const Nosotros = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black">
      {/* Hero Section with Parallax Effect (background handled globally) */}
      <div className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-azul-oscuro/80 to-black/90"></div>
        
        {/* Animated Gaming Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 animate-float-slow text-6xl opacity-20">🎮</div>
          <div className="absolute top-40 right-20 animate-float-slower text-6xl opacity-20">🎯</div>
          <div className="absolute bottom-40 left-1/4 animate-float text-6xl opacity-20">💻</div>
          <div className="absolute top-1/3 right-1/3 animate-float-slow text-6xl opacity-20">🕹️</div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center space-y-6 px-4 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold font-orbitron">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
                Sobre Level-Up Gamer
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Somos más que una tienda, somos una comunidad apasionada por el gaming 
              y comprometida con llevar la mejor experiencia a cada jugador.
            </p>
            <div className="pt-4">
              <button className="btn-primary text-lg px-8 py-3 font-orbitron animate-pulse">
                Únete a la Comunidad
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
  {/* Misión, Visión, Valores Cards */}
  <div className="grid md:grid-cols-3 gap-8 mt-8 relative z-10 mb-24">
          <div className="card-gaming p-8 text-center transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-blue-500/20">
            <div className="text-5xl mb-6 animate-bounce-slow">🎯</div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Nuestra Misión</h3>
            <p className="text-gray-300 leading-relaxed">
              Proporcionar los mejores productos gaming con servicio excepcional, 
              ayudando a cada jugador a alcanzar su máximo potencial.
            </p>
          </div>

          <div className="card-gaming p-8 text-center transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-purple-500/20">
            <div className="text-5xl mb-6 animate-bounce-slow">🚀</div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Nuestra Visión</h3>
            <p className="text-gray-300 leading-relaxed">
              Ser la tienda gaming de referencia en Chile, reconocida por nuestra 
              calidad, innovación y compromiso con la comunidad.
            </p>
          </div>

          <div className="card-gaming p-8 text-center transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-pink-500/20">
            <div className="text-5xl mb-6 animate-bounce-slow">💎</div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Nuestros Valores</h3>
            <p className="text-gray-300 leading-relaxed">
              Pasión por el gaming, honestidad en cada transacción, 
              innovación constante y comunidad por encima de todo.
            </p>
          </div>
        </div>

        {/* Historia Section with Glowing Border */}
        <div className="relative p-1 rounded-2xl mb-24 mt-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          <div className="card-gaming p-8 rounded-xl bg-gradient-to-br from-gray-900 to-black">
            <h2 className="text-4xl font-bold gradient-text mb-8 text-center font-orbitron">
              Nuestra Historia
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  Fundada en 2020 por un grupo de amigos apasionados por los videojuegos, 
                  Level-Up Gamer nació de una simple idea: crear un espacio donde los gamers 
                  pudieran encontrar todo lo que necesitan en un solo lugar.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Lo que comenzó como un pequeño emprendimiento entre gamers, hoy se ha 
                  convertido en una de las tiendas más confiables del país, manteniendo 
                  siempre nuestro espíritu inicial: entender las necesidades reales de 
                  los jugadores.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse-slow opacity-20"></div>
                <div className="relative z-10 w-full h-64 bg-gradient-to-br from-azul-electrico to-azul-claro rounded-full flex items-center justify-center text-8xl">
                  🎮
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section with Hover Effects */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold gradient-text mb-12 text-center font-orbitron">
            Nuestro Equipo
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Ignacio Gutierrez', role: 'Fundador & CEO', emoji: '👨‍💼', gradient: 'from-blue-500 to-cyan-500' },
              { name: 'Catalina Ormeño', role: 'Directora de Marketing', emoji: '👩‍💻', gradient: 'from-purple-500 to-pink-500' },
              { name: 'Benjamín Meneses', role: 'Especialista Gaming', emoji: '🎮', gradient: 'from-green-500 to-blue-500' },
              
            ].map((member, index) => (
              <div 
                key={index} 
                className="group relative p-1 rounded-xl bg-gradient-to-r hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
              >
                <div className="card-gaming p-8 text-center rounded-lg bg-gray-900 relative z-10">
                  <div className="text-5xl mb-6 group-hover:animate-bounce-slow">{member.emoji}</div>
                  <h3 className="font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-azul-claro text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section with Animated Border */}
        <div className="relative p-1 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
          <div className="card-gaming p-12 text-center rounded-xl bg-gray-900">
            <h2 className="text-4xl font-bold gradient-text mb-6 font-orbitron">
              ¿Tienes alguna pregunta?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Estamos aquí para ayudarte. Contáctanos y te responderemos a la brevedad.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="https://wa.me/+56912345678?text=Hola%20Level-Up%20Gamer%2C%20me%20gustaría%20obtener%20más%20información" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 text-lg transform hover:scale-105 transition-transform duration-300 inline-block">
                <span className="flex items-center justify-center">
                  <span className="text-2xl mr-2">📱</span>
                  Contactar por WhatsApp
                </span>
              </a>
              <button className="btn-secondary px-8 py-4 text-lg transform hover:scale-105 transition-transform duration-300">
                💬 Chat en Vivo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;