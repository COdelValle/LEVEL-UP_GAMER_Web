import Hero from '../../components/home/Hero';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import Ofertas from '../../components/home/Ofertas';

const Home = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background handled globally in App.jsx */}
      
      <div className="relative z-10">
        <Hero />
        <FeaturedProducts />
        <Ofertas />
      </div>
    </div>
  );
};

export default Home;