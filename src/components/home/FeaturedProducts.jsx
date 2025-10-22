import CardCarrusel from './../common/CardCarrusel';

const FeaturedProducts = () => {
  const Products = [
    {
      id: 1,
      nombre: "PlayStation 5",
      precio: 699990,
      categoria: "consolas",
      imagen: "/assets/img/PlayStation5.png",
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
      id: 2,
      nombre: "Nintendo Switch Lite",
      precio: 249990,
      categoria: "consolas",
      imagen: "/assets/img/SwitchLite.png",
      descripcion: "Consola portátil perfecta para gaming on-the-go",
      stock: 25,
      destacado: false,
      nuevo: true,
      especificaciones: {
        "Pantalla": "5.5 pulgadas",
        "Batería": "3-7 horas",
        "Colores": "Disponible en múltiples colores"
      }
    },
    {
      id: 3,
      nombre: "PC Gamer ASUS ROG Strix",
      precio: 1299990,
      categoria: "pc-gamers",
      imagen: "/assets/img/AsusRogStrix.png",
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
      id: 4,
      nombre: "Audífonos HyperX Cloud II",
      precio: 89990,
      categoria: "perifericos",
      imagen: "/assets/img/HyperXCloud2.png",
      descripcion: "Audífonos gaming con sonido surround 7.1",
      stock: 30,
      destacado: false,
      nuevo: true,
      especificaciones: {
        "Conectividad": "USB y 3.5mm",
        "Micrófono": "Desmontable con cancelación de ruido",
        "Compatibilidad": "PC, PS4, PS5, Xbox, Switch"
      }
    },
    {
      id: 5,
      nombre: "Silla Gaming SecretLab Titan",
      precio: 499990,
      categoria: "sillas",
      imagen: "/assets/img/SecretLabTitan.png",
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
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text font-orbitron">
            Productos Destacados
          </h2>
          <p className="text-xl text-gray-300">
            Los favoritos de nuestra comunidad gaming
          </p>
        </div>

        <div className="text-center py-12">
          <CardCarrusel products={Products} />
          <p className="text-gray-400 text-lg">
            Próximamente productos destacados
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;