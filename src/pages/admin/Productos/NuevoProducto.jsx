// /src/pages/admin/Productos/NuevoProducto.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../components/common/BackButton';

const NuevoProducto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    descripcion: '',
    stock: '',
    imagen: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simular guardado
    setTimeout(() => {
      // Guardar en localStorage
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const newProduct = {
        ...formData,
        id: Date.now(),
        precio: parseInt(formData.precio),
        stock: parseInt(formData.stock),
        fechaCreacion: new Date().toISOString()
      };
      products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(products));

      setLoading(false);
      alert('✅ Producto creado exitosamente');
      navigate('/admin'); // Redirección correcta
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black py-12 pt-32">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[#0f1e3a] border-2 border-azul-electrico rounded-xl p-8 shadow-2xl">
          {/* Header con botón de retroceso */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Nuevo Producto</h1>
              <p className="text-gray-300">Agrega un nuevo producto al catálogo</p>
            </div>
            <BackButton to="/admin" text="Volver al Panel" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">Nombre del Producto</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Precio ($)</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Categoría</label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Consolas">Consolas</option>
                  <option value="Accesorios">Accesorios</option>
                  <option value="Juegos">Juegos</option>
                  <option value="PC Gaming">PC Gaming</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-white mb-2">URL de Imagen</label>
              <input
                type="url"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico"
                required
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-azul-electrico hover:bg-azul-claro py-3 rounded-lg font-bold text-black transition duration-300 disabled:opacity-50"
              >
                {loading ? 'Creando Producto...' : '🚀 Crear Producto'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="px-6 bg-gray-600 hover:bg-gray-500 py-3 rounded-lg text-white transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;