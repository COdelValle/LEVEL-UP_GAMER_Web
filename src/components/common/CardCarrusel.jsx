import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from '../products/ProductCard';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Se le da la lista de productos que quieres mostrar en el carrusel.
const CardCarrusel = ({ products }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1163: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="h-[600px] py-8"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="h-full">
            <div className="flex items-center justify-center h-full">
              <div className="w-full h-[500px] flex items-stretch mx-auto" style={{ maxWidth: 'min(280px, 100%)' }}>
                <ProductCard product={product} className="w-full p-4 lg:p-5" compact={true} showAdd={true} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardCarrusel;
