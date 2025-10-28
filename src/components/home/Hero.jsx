import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section 
      className="hero min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text font-orbitron animate-pulse">
          LEVEL-UP GAMER
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Descubre el siguiente nivel en gaming. 
          <span className="block text-blue-400 font-semibold">
            Tecnología, rendimiento y estilo en un solo lugar.
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link 
            to="/productos" 
            className="btn-primary text-lg px-8 py-4 font-orbitron"
          >
            🎮 Explorar Productos
          </Link>
          <Link 
            to="/blogs" 
            className="btn-secondary text-lg px-8 py-4 font-orbitron"
          >
            📖 Ver Blog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;