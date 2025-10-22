import CardCarrusel from './../common/CardCarrusel';

const Ofertas = () => {
  const Products = [
    {
      id: 2,
      nombre: "Nintendo Switch Lite",
      precio: 249990,
      categoria: "consolas",
      imagen: "https://atlas-content-cdn.pixelsquid.com/assets_v2/248/2481325091011433942/jpeg-600/G03.jpg?modifiedAt=1",
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
      id: 4,
      nombre: "Audífonos HyperX Cloud II",
      precio: 89990,
      categoria: "perifericos",
      imagen: "https://media.spdigital.cl/thumbnails/products/r412a2ud_794ad640_thumbnail_4096.png",
      descripcion: "Audífonos gaming con sonido surround 7.1",
      stock: 30,
      destacado: false,
      nuevo: true,
      especificaciones: {
        "Conectividad": "USB y 3.5mm",
        "Micrófono": "Desmontable con cancelación de ruido",
        "Compatibilidad": "PC, PS4, PS5, Xbox, Switch"
      }
    }
  ];

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 gradient-text font-orbitron">
            Nuevos Ingresos
          </h2>
          <p className="text-xl text-gray-300">
            Descubre lo último en tecnología gaming
          </p>
        </div>

        <div className="text-center">
          <CardCarrusel products={Products} />
          {/*
          <p className="text-gray-400 text-lg">
            Próximamente nuevas ofertas
          </p>
          */}
        </div>
      </div>
    </section>
  );
};

export default Ofertas;