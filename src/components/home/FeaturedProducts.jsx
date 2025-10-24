import CardCarrusel from './../common/CardCarrusel';

const FeaturedProducts = () => {
  const Products = [
    {
      id: 1,
      nombre: "PlayStation 5",
      precio: 699990,
      categoria: "consolas",
      imagen: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",
      descripcion: "La última consola de Sony con tecnología de vanguardia",
      stock: 15,
      destacado: true,
      nuevo: false,
      especificaciones: {
        "Almacenamiento": "825GB SSD",
        "Resolución": "4K",
        "Características": "Ray Tracing, 120Hz"
      }
    },
    {
      id: 3,
      nombre: "PC Gamer ASUS ROG Strix",
      precio: 1299990,
      categoria: "pc-gamers",
      imagen: "https://dlcdnwebimgs.asus.com/gain/3C22B609-1A38-4660-ADF5-8DEB93CA5F3D",
      descripcion: "Potente PC gaming para los más exigentes",
      stock: 8,
      destacado: true,
      nuevo: false,
      especificaciones: {
        "Procesador": "Intel i7-13700K",
        "GPU": "RTX 4070",
        "RAM": "32GB DDR5"
      }
    },
    {
      id: 5,
      nombre: "Silla Gaming SecretLab Titan",
      precio: 499990,
      categoria: "sillas",
      imagen: "https://images.secretlab.co/turntable/tr:n-w_750/R22PU-Stealth_02.jpg",
      descripcion: "Silla gaming ergonómica de alta gama",
      stock: 12,
      destacado: true,
      nuevo: false,
      especificaciones: {
        "Material": "Cuero sintético premium",
        "Ajustes": "Altura, inclinación, apoyabrazos 4D",
        "Garantía": "5 años"
      }
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 gradient-text font-orbitron">
            Productos Destacados
          </h2>
          <p className="text-xl text-gray-300">
            Los favoritos de nuestra comunidad gaming
          </p>
        </div>

        <div className="text-center">
          <CardCarrusel products={Products} />
          {/*
          <p className="text-gray-400 text-lg">
            Próximamente productos destacados
          </p>
          */}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;