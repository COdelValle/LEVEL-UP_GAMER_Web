import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from '../products/ProductCard';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Se le da la lista de productos que quieres mostrar en el carrusel.
// size: 'compact' | 'large' -> render small cards (default) or larger catalog-like cards
const CardCarrusel = ({ products, size = 'compact' }) => {
  const isLarge = size === 'large';

  const breakpoints = isLarge
    ? {
        640: { slidesPerView: 1.2, spaceBetween: 16 },
        768: { slidesPerView: 1.5, spaceBetween: 20 },
        1024: { slidesPerView: 2, spaceBetween: 24 },
        1440: { slidesPerView: 3, spaceBetween: 30 },
      }
    : {
        640: { slidesPerView: 2, spaceBetween: 16 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1163: { slidesPerView: 3, spaceBetween: 24 },
        1440: { slidesPerView: 4, spaceBetween: 30 },
      };

  const wrapperHeight = isLarge ? 'h-[640px]' : 'h-[600px]';
  const cardStyle = isLarge ? { maxWidth: 'min(420px, 100%)' } : { maxWidth: 'min(220px, 100%)' };

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={breakpoints}
        className={`${wrapperHeight} py-8`}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="h-full">
            <div className="flex items-center justify-center h-full">
              <div className={`w-full ${isLarge ? 'h-[560px]' : 'h-[420px]'} flex items-stretch mx-auto`} style={cardStyle}>
                <ProductCard product={product} className="w-full p-4" compact={!isLarge} showAdd={true} variant={isLarge ? 'catalog' : ''} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardCarrusel;
