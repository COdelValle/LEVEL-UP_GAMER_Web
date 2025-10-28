import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'consolas',
    name: 'Consolas Gaming',
    icon: '🎮',
    description: 'Explora nuestra selección de consolas de última generación',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    id: 'pc-gamers',
    name: 'PC Gamers',
    icon: '💻',
    description: 'Equipos de alto rendimiento para gaming profesional',
    gradient: 'from-green-500 to-blue-500'
  },
  {
    id: 'perifericos',
    name: 'Periféricos',
    icon: '🎧',
    description: 'Accesorios y periféricos para mejorar tu experiencia',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'sillas',
    name: 'Sillas Gaming',
    icon: '🪑',
    description: 'Máximo confort para tus sesiones de juego',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: 'nuevos',
    name: 'Nuevos Ingresos',
    icon: '⭐',
    description: 'Los últimos productos añadidos a nuestra tienda',
    gradient: 'from-yellow-500 to-green-500'
  }
];

export const Categorias = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background handled globally in App.jsx */}

      <div className="relative pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-orbitron">
              Categorías Gaming
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Encuentra todo lo que necesitas para tu setup gaming perfecto
            </p>
          </div>

          {/* Grid de Categorías */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categorias/${category.id}`}
                className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-gray-700 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                <div className="p-8">
                  <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform">{category.icon}</span>
                  <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">{category.name}</h3>
                  <p className="text-gray-400 mb-4">{category.description}</p>
                  <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                    Ver productos →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};