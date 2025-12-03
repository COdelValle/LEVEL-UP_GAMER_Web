// /src/pages/admin/Productos/NuevoProducto.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import BackButton from '../../../components/common/BackButton';

const NuevoProducto = () => {
  const { api } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    descripcion: '',
    stock: '',
    imagen: '',
    nuevo: true,
    destacado: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        nombre: formData.nombre,
        precio: parseFloat(formData.precio),
        categoria: formData.categoria,
        descripcion: formData.descripcion,
        stock: parseInt(formData.stock),
        imagen: formData.imagen,
        nuevo: formData.nuevo,
        destacado: formData.destacado,
        fechaCreacion: new Date().toISOString()
      };

      console.log('📤 Enviando producto:', payload);
      const created = await api.post('/api/v1/productos', payload);
      console.log('✅ Producto creado:', created);

      navigate('/admin/productos');
    } catch (err) {
      console.error('❌ Error completo:', err);
      const errorMsg = err?.body?.message || err?.message || 'Error al crear el producto';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
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
            <BackButton to="/admin/productos" text="Volver a Productos" />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

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

            {/* Opciones adicionales */}
            <div className="grid md:grid-cols-2 gap-6 bg-gray-800/30 p-4 rounded-lg">
              <label className="flex items-center gap-3 text-white cursor-pointer">
                <input
                  type="checkbox"
                  name="nuevo"
                  checked={formData.nuevo}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-azul-electrico accent-green-500"
                />
                <span>✨ Marcar como Nuevo</span>
              </label>

              <label className="flex items-center gap-3 text-white cursor-pointer">
                <input
                  type="checkbox"
                  name="destacado"
                  checked={formData.destacado}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-azul-electrico accent-yellow-500"
                />
                <span>⭐ Destacado en inicio</span>
              </label>
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
                onClick={() => navigate('/admin/productos')}
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