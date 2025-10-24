import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// DATOS DIRECTOS EXPANDIDOS
const blogPosts = [
  {
    id: 1,
    title: "Cómo Armar el Setup Gamer Perfecto en 2025",
    excerpt: "Descubre los componentes esenciales para crear tu estación de juego ideal, desde el hardware hasta los periféricos que marcarán la diferencia.",
    content: `
      <div class="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-xl border-l-4 border-blue-500 mb-8">
        <h3 class="text-xl font-bold text-blue-400 mb-4">🎯 Lo que aprenderás en esta guía:</h3>
        <ul class="text-gray-300 space-y-2">
          <li class="flex items-center"><span class="text-green-400 mr-2">✅</span> Componentes esenciales para tu PC gaming</li>
          <li class="flex items-center"><span class="text-green-400 mr-2">✅</span> Periféricos que marcan la diferencia</li>
          <li class="flex items-center"><span class="text-green-400 mr-2">✅</span> Setup de escritorio y ergonomía</li>
          <li class="flex items-center"><span class="text-green-400 mr-2">✅</span> Presupuestos desde $500.000 hasta $2.000.000 CLP</li>
          <li class="flex items-center"><span class="text-green-400 mr-2">✅</span> Tips para comprar en Chile</li>
        </ul>
      </div>

      <h2 class="text-3xl font-bold text-blue-400 mt-8 mb-6">🖥️ El Corazón: Tu PC Gaming</h2>
      <p class="text-gray-300 text-lg mb-6">Un buen PC gaming es la base de todo. No necesitas gastar millones, pero sí elegir componentes que te den el mejor rendimiento por peso invertido.</p>

      <h3 class="text-2xl font-bold text-green-400 mt-8 mb-4">🧠 Procesador (CPU)</h3>
      <p class="text-gray-300 mb-4">El cerebro de tu PC. Para gaming en 2025, recomendamos:</p>
      <ul class="text-gray-300 list-disc list-inside mb-6 space-y-2">
        <li><strong class="text-blue-400">Presupuesto básico ($500.000 - $800.000):</strong> AMD Ryzen 5 7600 o Intel i5-13400</li>
        <li><strong class="text-blue-400">Presupuesto medio ($800.000 - $1.500.000):</strong> AMD Ryzen 7 7700X o Intel i7-13700</li>
        <li><strong class="text-blue-400">Presupuesto alto ($1.500.000+):</strong> AMD Ryzen 9 7900X o Intel i9-13900K</li>
      </ul>

      <h3 class="text-2xl font-bold text-green-400 mt-8 mb-4">🎮 Tarjeta Gráfica (GPU)</h3>
      <p class="text-gray-300 mb-4">La GPU es crucial para el rendimiento en juegos. Aquí nuestras recomendaciones:</p>
      <div class="grid md:grid-cols-3 gap-4 mb-8">
        <div class="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
          <h4 class="text-blue-400 font-bold mb-2">NVIDIA RTX 4060</h4>
          <p class="text-gray-300 text-sm">Perfecta para 1080p, DLSS 3, 8GB VRAM</p>
          <p class="text-green-400 font-bold mt-2">$450.000 - $600.000</p>
        </div>
        <div class="bg-gray-800 p-4 rounded-lg border border-purple-500/30">
          <h4 class="text-purple-400 font-bold mb-2">AMD RX 7700 XT</h4>
          <p class="text-gray-300 text-sm">Excelente relación precio/rendimiento, 12GB VRAM</p>
          <p class="text-green-400 font-bold mt-2">$500.000 - $650.000</p>
        </div>
        <div class="bg-gray-800 p-4 rounded-lg border border-green-500/30">
          <h4 class="text-green-400 font-bold mb-2">NVIDIA RTX 4070</h4>
          <p class="text-gray-300 text-sm">Ideal para 1440p, Ray Tracing, 12GB VRAM</p>
          <p class="text-green-400 font-bold mt-2">$800.000 - $1.000.000</p>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-blue-400 mt-12 mb-6">⌨️ Periféricos Esenciales</h2>
      
      <h3 class="text-2xl font-bold text-green-400 mt-8 mb-4">Teclados Mecánicos</h3>
      <p class="text-gray-300 mb-4">Los switches mecánicos ofrecen mejor respuesta táctil y durabilidad:</p>
      <div class="bg-gray-800 p-6 rounded-lg mb-6">
        <h4 class="text-yellow-400 font-bold mb-3">Tipos de Switches:</h4>
        <ul class="text-gray-300 space-y-2">
          <li><strong class="text-red-400">Red Lineal:</strong> Suaves, sin feedback táctil - ideal para gaming rápido</li>
          <li><strong class="text-blue-400">Blue Clicky:</strong> Feedback auditivo y táctil - perfecto para typing</li>
          <li><strong class="text-green-400">Brown Táctil:</strong> Feedback táctil sin click - balance perfecto</li>
        </ul>
      </div>

      <h3 class="text-2xl font-bold text-green-400 mt-8 mb-4">🖱️ Mouse Gaming</h3>
      <p class="text-gray-300 mb-4">Características a considerar:</p>
      <ul class="text-gray-300 list-disc list-inside mb-6 space-y-2">
        <li><strong>Sensor óptico de alta precisión</strong> (PixArt PMW3389 recomendado)</li>
        <li><strong>Polling rate de 1000Hz</strong> para máxima respuesta</li>
        <li><strong>Peso entre 60-80 gramos</strong> para mejor control</li>
        <li><strong>Forma ergonómica</strong> que se adapte a tu estilo de agarre</li>
      </ul>

      <h2 class="text-3xl font-bold text-blue-400 mt-12 mb-6">🎧 Audio Inmersivo</h2>
      <p class="text-gray-300 mb-6">El audio es el 50% de la experiencia gaming. Recomendaciones:</p>
      
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-gray-800 p-6 rounded-lg border border-blue-500/30">
          <h4 class="text-blue-400 font-bold mb-3">Auriculares Gaming</h4>
          <ul class="text-gray-300 text-sm space-y-1">
            <li>• Sonido surround 7.1 virtual</li>
            <li>• Micrófono con cancelación de ruido</li>
            <li>• Almohadillas memory foam</li>
            <li>• Compatibilidad multiplataforma</li>
          </ul>
        </div>
        <div class="bg-gray-800 p-6 rounded-lg border border-green-500/30">
          <h4 class="text-green-400 font-bold mb-3">Altavoces de Escritorio</h4>
          <ul class="text-gray-300 text-sm space-y-1">
            <li>• Sistema 2.1 con subwoofer</li>
            <li>• Conexión Bluetooth y auxiliar</li>
            <li>• Control de graves y agudos</li>
            <li>• Iluminación RGB opcional</li>
          </ul>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-blue-400 mt-12 mb-6">💡 Setup y Ergonomía</h2>
      
      <h3 class="text-2xl font-bold text-green-400 mt-8 mb-4">Escritorio Gaming</h3>
      <p class="text-gray-300 mb-4">Características ideales para tu espacio de juego:</p>
      <ul class="text-gray-300 list-disc list-inside mb-6 space-y-2">
        <li><strong>Superficie mínima de 140x80cm</strong> para comodidad</li>
        <li><strong>Altura regulable</strong> (entre 70-120cm)</li>
        <li><strong>Cable management integrado</strong> para mantener el orden</li>
        <li><strong>Resistencia de 80+ kg</strong> para todo tu equipo</li>
      </ul>

      <h3 class="text-2xl font-bold text-green-400 mt-8 mb-4">Silla Ergonómica</h3>
      <p class="text-gray-300 mb-4">Invertir en una buena silla es invertir en tu salud:</p>
      <div class="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-6 rounded-lg mb-6">
        <h4 class="text-yellow-400 font-bold mb-3">Características esenciales:</h4>
        <ul class="text-gray-300 space-y-2">
          <li>✅ Soporte lumbar ajustable</li>
          <li>✅ Reposacabezas regulable</li>
          <li>✅ Material transpirable (malla o cuero sintético)</li>
          <li>✅ Base de 5 patas con ruedas suaves</li>
          <li>✅ Inclinación de 135° para descanso</li>
        </ul>
      </div>

      <div class="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-xl border-l-4 border-purple-500 mt-12">
        <h3 class="text-2xl font-bold text-purple-400 mb-4">💎 Conclusión Final</h3>
        <p class="text-gray-300 text-lg">
          Armar el setup gaming perfecto es un proceso que combina investigación, presupuesto y preferencias personales. 
          Recuerda que lo más importante es que tu setup se adapte a tus necesidades específicas y te brinde comodidad 
          durante largas sesiones de juego. ¡Empieza con lo esencial y ve mejorando gradualmente!
        </p>
      </div>
    `,
    category: "guias",
    author: "Level-Up Gamer Team",
    date: "2025-01-15",
    readTime: "15 min lectura",
    image: "🎮",
    gradient: "from-blue-600 to-purple-600",
    featured: true,
    likes: 124,
    tags: ["PC Gaming", "Hardware", "Setup", "Periféricos", "Ergonomía"]
  },
  {
    id: 2,
    title: "Los Esports en Chile: Crecimiento y Oportunidades 2025",
    excerpt: "Análisis completo del panorama actual de los deportes electrónicos en Chile, torneos locales y cómo formar parte de esta creciente comunidad profesional.",
    content: `
      <div class="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-6 rounded-xl border-l-4 border-green-500 mb-8">
        <h3 class="text-xl font-bold text-green-400 mb-4">🏆 Panorama General 2025</h3>
        <p class="text-gray-300">
          Chile se posiciona como uno de los mercados de esports más prometedores de Latinoamérica, 
          con un crecimiento del 35% en audiencia y una inversión récord en infraestructura gaming.
        </p>
      </div>

      <h2 class="text-3xl font-bold text-green-400 mt-8 mb-6">📊 Estadísticas del Mercado Chileno</h2>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-gray-800 p-4 rounded-lg text-center border border-green-500/30">
          <div class="text-3xl font-bold text-green-400">2.3M</div>
          <div class="text-gray-300 text-sm">Espectadores Regulares</div>
        </div>
        <div class="bg-gray-800 p-4 rounded-lg text-center border border-blue-500/30">
          <div class="text-3xl font-bold text-blue-400">$4.2B</div>
          <div class="text-gray-300 text-sm">CLP en Inversiones 2024</div>
        </div>
        <div class="bg-gray-800 p-4 rounded-lg text-center border border-purple-500/30">
          <div class="text-3xl font-bold text-purple-400">45%</div>
          <div class="text-gray-300 text-sm">Crecimiento Anual</div>
        </div>
        <div class="bg-gray-800 p-4 rounded-lg text-center border border-yellow-500/30">
          <div class="text-3xl font-bold text-yellow-400">120+</div>
          <div class="text-gray-300 text-sm">Equipos Profesionales</div>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-green-400 mt-12 mb-6">🎮 Juegos Más Populares en Chile</h2>
      
      <div class="space-y-6 mb-8">
        <div class="bg-gray-800 p-6 rounded-lg border border-red-500/30">
          <h3 class="text-2xl font-bold text-red-400 mb-3">Valorant</h3>
          <p class="text-gray-300 mb-3">El shooter táctico de Riot Games domina la escena competitiva chilena:</p>
          <ul class="text-gray-300 list-disc list-inside space-y-1">
            <li><strong>Liga Chilena de Valorant:</strong> 32 equipos profesionales</li>
            <li><strong>Premio total:</strong> $120.000.000 CLP por temporada</li>
            <li><strong>Equipos destacados:</strong> KRÜ Esports, Leviatán Gaming</li>
            <li><strong>Audiencia peak:</strong> 85,000 espectadores simultáneos</li>
          </ul>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg border border-blue-500/30">
          <h3 class="text-2xl font-bold text-blue-400 mb-3">League of Legends</h3>
          <p class="text-gray-300 mb-3">El MOBA que sigue siendo referencia en la región:</p>
          <ul class="text-gray-300 list-disc list-inside space-y-1">
            <li><strong>Circuito Chileno:</strong> 4 splits anuales</li>
            <li><strong>Camino a Worlds:</strong> Clasificación directa desde 2024</li>
            <li><strong>Desarrollo juvenil:</strong> Academias para menores de 18 años</li>
            <li><strong>Infraestructura:</strong> 3 gaming houses profesionales</li>
          </ul>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg border border-orange-500/30">
          <h3 class="text-2xl font-bold text-orange-400 mb-3">Counter-Strike 2</h3>
          <p class="text-gray-300 mb-3">El clásico que renace con la nueva generación:</p>
          <ul class="text-gray-300 list-disc list-inside space-y-1">
            <li><strong>Torneos locales:</strong> Copa Chile CS2 mensual</li>
            <li><strong>Inversión internacional:</strong> Equipos europeos scouteando talento chileno</li>
            <li><strong>Infraestructura:</strong> 2 arenas dedicadas en Santiago</li>
            <li><strong>Proyección:</strong> Posible Major en Chile para 2026</li>
          </ul>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-green-400 mt-12 mb-6">💼 Oportunidades Profesionales</h2>

      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-6 rounded-lg">
          <h4 class="text-xl font-bold text-blue-400 mb-3">🎯 Carreras como Jugador</h4>
          <ul class="text-gray-300 space-y-2 text-sm">
            <li>• <strong>Salario promedio:</strong> $800.000 - $2.500.000 CLP/mes</li>
            <li>• <strong>Contratos:</strong> 1-2 años con equipos establecidos</li>
            <li>• <strong>Beneficios:</strong> Seguro médico, psicólogo, entrenador físico</li>
            <li>• <strong>Requisitos:</strong> Top ranking + tryouts + mental coach</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-green-900/20 to-yellow-900/20 p-6 rounded-lg">
          <h4 class="text-xl font-bold text-green-400 mb-3">📹 Carreras detrás de Escena</h4>
          <ul class="text-gray-300 space-y-2 text-sm">
            <li>• <strong>Coach/Analista:</strong> $600.000 - $1.500.000 CLP/mes</li>
            <li>• <strong>Manager:</strong> $700.000 - $1.800.000 CLP/mes</li>
            <li>• <strong>Content Creator:</strong> Ingresos variables por plataformas</li>
            <li>• <strong>Shoutcaster:</strong> $50.000 - $200.000 CLP por evento</li>
          </ul>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-green-400 mt-12 mb-6">🏟️ Torneos y Eventos Destacados 2025</h2>

      <div class="space-y-4 mb-8">
        <div class="bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-500">
          <h4 class="text-yellow-400 font-bold mb-2">Chile Games Show - Abril 2025</h4>
          <p class="text-gray-300 text-sm">El evento gaming más grande de Sudamérica, esperando 50,000+ asistentes</p>
        </div>
        <div class="bg-gray-800 p-4 rounded-lg border-l-4 border-purple-500">
          <h4 class="text-purple-400 font-bold mb-2">Latam Masters - Julio 2025</h4>
          <p class="text-gray-300 text-sm">Torneo regional con $300.000.000 CLP en premios</p>
        </div>
        <div class="bg-gray-800 p-4 rounded-lg border-l-4 border-red-500">
          <h4 class="text-red-400 font-bold mb-2">Valorant Champions Tour - Octubre 2025</h4>
          <p class="text-gray-300 text-sm">Chile como sede de la etapa latinoamericana</p>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-green-400 mt-12 mb-6">🚀 Cómo Empezar en los Esports</h2>

      <div class="bg-gradient-to-r from-yellow-900/20 to-red-900/20 p-6 rounded-xl mb-8">
        <h3 class="text-xl font-bold text-yellow-400 mb-4">Guía Paso a Paso</h3>
        <div class="space-y-4">
          <div class="flex items-start">
            <span class="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold mr-4">1</span>
            <div>
              <h4 class="text-white font-bold">Domina un Juego</h4>
              <p class="text-gray-300 text-sm">Elige un juego y alcanza el top 1% del ranking competitivo</p>
            </div>
          </div>
          <div class="flex items-start">
            <span class="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold mr-4">2</span>
            <div>
              <h4 class="text-white font-bold">Crea Contenido</h4>
              <p class="text-gray-300 text-sm">Twitch, YouTube y redes sociales para mostrar tu talento</p>
            </div>
          </div>
          <div class="flex items-start">
            <span class="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold mr-4">3</span>
            <div>
              <h4 class="text-white font-bold">Participa en Torneos</h4>
              <p class="text-gray-300 text-sm">Compite en eventos locales y online para ganar experiencia</p>
            </div>
          </div>
          <div class="flex items-start">
            <span class="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold mr-4">4</span>
            <div>
              <h4 class="text-white font-bold">Networking</h4>
              <p class="text-gray-300 text-sm">Conecta con jugadores, coaches y organizaciones</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-blue-900/30 to-green-900/30 p-6 rounded-xl border-l-4 border-blue-500 mt-12">
        <h3 class="text-2xl font-bold text-blue-400 mb-4">🌟 El Futuro de los Esports en Chile</h3>
        <p class="text-gray-300 text-lg">
          Con el apoyo de marcas internacionales, desarrollo de infraestructura y el talento natural de los gamers chilenos, 
          el país está destinado a convertirse en un hub esports líder en Latinoamérica. 
          Las oportunidades son reales y el momento para involucrarse es ahora.
        </p>
      </div>
    `,
    category: "noticias",
    author: "María Fernández - Esports Analyst",
    date: "2025-01-12",
    readTime: "18 min lectura",
    image: "🏆",
    gradient: "from-green-600 to-blue-600",
    featured: true,
    likes: 89,
    tags: ["Esports", "Chile", "Torneos", "Profesional", "Gaming"]
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === parseInt(id));
  const [likes, setLikes] = useState(post?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  // Scroll al principio cuando cambia el ID del post
  useEffect(() => {
    // Scroll suave al principio de la página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]); // Se ejecuta cada vez que cambia el ID

  // Encontrar el post actual y los posts relacionados
  const currentIndex = blogPosts.findIndex(p => p.id === parseInt(id));
  const nextPost = blogPosts[currentIndex + 1];
  const prevPost = blogPosts[currentIndex - 1];
  const relatedPosts = blogPosts.filter(p => p.id !== parseInt(id)).slice(0, 3);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleNavigation = (newId) => {
    // Navegar al nuevo post
    navigate(`/blog/${newId}`);
    // El useEffect se encargará del scroll automáticamente
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post no encontrado</h1>
          <Link to="/blogs" className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Volver al Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-12">
      {/* Breadcrumb Navigation */}
      <nav className="container mx-auto px-4 mb-8 text-gray-400">
        <Link to="/" className="hover:text-green-400 transition-colors">Inicio</Link>
        <span className="mx-2">/</span>
        <Link to="/blogs" className="hover:text-green-400 transition-colors">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-white">{post.title}</span>
      </nav>

      <article className="container mx-auto px-4 max-w-6xl">
        {/* Header del Post */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-4 py-2 rounded-full text-sm font-bold capitalize">
              {post.category}
            </span>
            <span className="text-gray-400">📅 {post.date}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">⏱️ {post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-orbitron leading-tight">
            {post.title}
          </h1>
          
          <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Hero Image */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <div className={`h-96 bg-gradient-to-br ${post.gradient} relative`}>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-9xl mb-6 block">{post.image}</span>
                  <h2 className="text-4xl font-bold text-white max-w-4xl mx-auto leading-tight">
                    {post.title}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Author Info y Stats */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">LG</span>
              </div>
              <div>
                <p className="text-white font-bold text-xl">{post.author}</p>
                <p className="text-gray-400">Especialista en Gaming & Tecnología</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-lg">
                <span>📤</span>
                <span>Compartir</span>
              </button>
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-3 transition-all ${
                  hasLiked 
                    ? 'text-red-500 bg-red-500/10' 
                    : 'text-red-400 hover:text-red-300 bg-red-500/5'
                } px-4 py-2 rounded-lg`}
              >
                <span className="text-xl">❤️</span>
                <span className="font-bold text-lg">{likes}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar con tabla de contenidos */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-4">📑 En este artículo</h3>
              <nav className="space-y-2">
                <a href="#introduccion" className="block text-gray-300 hover:text-green-400 transition-colors py-1">
                  • Introducción
                </a>
                <a href="#componentes" className="block text-gray-300 hover:text-green-400 transition-colors py-1">
                  • Componentes Principales
                </a>
                <a href="#perifericos" className="block text-gray-300 hover:text-green-400 transition-colors py-1">
                  • Periféricos
                </a>
                <a href="#setup" className="block text-gray-300 hover:text-green-400 transition-colors py-1">
                  • Setup y Ergonomía
                </a>
                <a href="#conclusion" className="block text-gray-300 hover:text-green-400 transition-colors py-1">
                  • Conclusión
                </a>
              </nav>
              
              {/* Tags */}
              <div className="mt-8">
                <h4 className="text-lg font-bold text-blue-400 mb-3">🏷️ Etiquetas</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Contenido del artículo */}
          <main className="lg:col-span-3">
            <div 
              className="prose prose-invert max-w-none mb-12 text-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Call to Action */}
            <div className="text-center mb-12">
              <Link to="/productos" className="bg-gradient-to-r from-blue-500 to-green-500 text-black text-xl px-10 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-2xl inline-flex items-center gap-3">
                🛒 Ver Productos Gaming Recomendados
              </Link>
            </div>
          </main>
        </div>

        {/* Navegación entre posts - NUEVA SECCIÓN */}
        <div className="flex justify-between items-center mt-16 mb-8 p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
          {/* Post Anterior */}
          <div className="flex-1">
            {prevPost && (
              <button
                onClick={() => handleNavigation(prevPost.id)}
                className="flex items-center gap-4 text-left hover:scale-105 transition-transform group w-full"
              >
                <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
                  <span className="text-2xl">⬅️</span>
                </div>
                <div className="flex-1">
                  <span className="text-gray-400 text-sm block mb-1">Post anterior</span>
                  <h3 className="text-white font-bold group-hover:text-green-400 transition-colors line-clamp-2">
                    {prevPost.title}
                  </h3>
                </div>
              </button>
            )}
          </div>

          {/* Botón Volver al Blog */}
          <div className="mx-8">
            <Link
              to="/blogs"
              className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              📚 Todos los Posts
            </Link>
          </div>

          {/* Post Siguiente */}
          <div className="flex-1">
            {nextPost && (
              <button
                onClick={() => handleNavigation(nextPost.id)}
                className="flex items-center gap-4 text-right hover:scale-105 transition-transform group w-full ml-auto"
              >
                <div className="flex-1">
                  <span className="text-gray-400 text-sm block mb-1">Siguiente post</span>
                  <h3 className="text-white font-bold group-hover:text-green-400 transition-colors line-clamp-2">
                    {nextPost.title}
                  </h3>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-lg group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all">
                  <span className="text-2xl">➡️</span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Posts Relacionados */}
        {relatedPosts.length > 0 && (
          <section className="mt-8">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-orbitron">
              📚 Artículos Relacionados
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link 
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="bg-gray-800 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-gray-700 hover:border-green-500/30"
                >
                  <div className={`h-32 bg-gradient-to-br ${relatedPost.gradient} relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <span className="text-4xl">{relatedPost.image}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="bg-gradient-to-r from-blue-500 to-green-500 text-black px-3 py-1 rounded-full text-xs font-bold capitalize mb-3 inline-block">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{relatedPost.date}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};

export default BlogDetail;