const Nosotros = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black pt-28 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 gradient-text font-orbitron">
            Sobre Level-Up Gamer
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Somos más que una tienda, somos una comunidad apasionada por el gaming 
            y comprometida con llevar la mejor experiencia a cada jugador.
          </p>
        </div>

        {/* Misión, Visión, Valores */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card-gaming p-6 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold gradient-text mb-4">Nuestra Misión</h3>
            <p className="text-gray-300">
              Proporcionar los mejores productos gaming con servicio excepcional, 
              ayudando a cada jugador a alcanzar su máximo potencial.
            </p>
          </div>

          <div className="card-gaming p-6 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold gradient-text mb-4">Nuestra Visión</h3>
            <p className="text-gray-300">
              Ser la tienda gaming de referencia en Chile, reconocida por nuestra 
              calidad, innovación y compromiso con la comunidad.
            </p>
          </div>

          <div className="card-gaming p-6 text-center">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-bold gradient-text mb-4">Nuestros Valores</h3>
            <p className="text-gray-300">
              Pasión por el gaming, honestidad en cada transacción, 
              innovación constante y comunidad por encima de todo.
            </p>
          </div>
        </div>

        {/* Historia */}
        <div className="card-gaming p-8 mb-16">
          <h2 className="text-3xl font-bold gradient-text mb-6 text-center font-orbitron">
            Nuestra Historia
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 mb-4">
                Fundada en 2020 por un grupo de amigos apasionados por los videojuegos, 
                Level-Up Gamer nació de una simple idea: crear un espacio donde los gamers 
                pudieran encontrar todo lo que necesitan en un solo lugar.
              </p>
              <p className="text-gray-300 mb-4">
                Lo que comenzó como un pequeño emprendimiento entre gamers, hoy se ha 
                convertido en una de las tiendas más confiables del país, manteniendo 
                siempre nuestro espíritu inicial: entender las necesidades reales de 
                los jugadores.
              </p>
              <p className="text-gray-300">
                Cada producto en nuestro catálogo es probado y seleccionado cuidadosamente 
                por nuestro equipo, asegurando que solo ofrezcamos lo mejor a nuestra comunidad.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-azul-electrico to-azul-claro rounded-full flex items-center justify-center text-6xl">
                🎮
              </div>
            </div>
          </div>
        </div>

        {/* Equipo */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center font-orbitron">
            Nuestro Equipo
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Carlos Martínez', role: 'Fundador & CEO', emoji: '👨‍💼' },
              { name: 'Ana Rodríguez', role: 'Directora de Marketing', emoji: '👩‍💻' },
              { name: 'Miguel Torres', role: 'Especialista Gaming', emoji: '🎮' },
              { name: 'Laura González', role: 'Atención al Cliente', emoji: '💬' }
            ].map((member, index) => (
              <div key={index} className="card-gaming p-6 text-center">
                <div className="text-4xl mb-4">{member.emoji}</div>
                <h3 className="font-bold text-white mb-2">{member.name}</h3>
                <p className="text-azul-claro text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contacto */}
        <div className="card-gaming p-8 text-center">
          <h2 className="text-3xl font-bold gradient-text mb-4 font-orbitron">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-gray-300 mb-6">
            Estamos aquí para ayudarte. Contáctanos y te responderemos a la brevedad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              📧 Contactar por Email
            </button>
            <button className="btn-secondary">
              💬 Chat en Vivo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;