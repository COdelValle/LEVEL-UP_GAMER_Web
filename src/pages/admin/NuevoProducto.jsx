import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../hooks/useProducts';
import { Navigate, useNavigate } from 'react-router-dom';

const NuevoProducto = () => {
  const { user } = useAuth();
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    descripcion: '',
    stock: '',
    imagen: '',
    destacado: false,
    nuevo: false
  });

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      ...formData,
      precio: parseInt(formData.precio),
      stock: parseInt(formData.stock),
      especificaciones: {}
    };

    // Simular guardado
    setTimeout(() => {
      addProduct(productData);
      setLoading(false);
      navigate('/admin');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
            Crear Nuevo Producto
          </h1>
          <p className="text-gray-300">
            Completa la información del producto para agregarlo al catálogo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-gaming p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:border-azul-electrico focus:ring-1 focus:ring-azul-electrico outline-none"
                required
                placeholder="Ej: PC Gamer ASUS ROG Strix"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Categoría *
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:border-azul-electrico focus:ring-1 focus:ring-azul-electrico outline-none"
                required
              >
                <option value="">Seleccionar categoría</option>
                <option value="pc-gamers">PC Gamers</option>
                <option value="consolas">Consolas</option>
                <option value="perifericos">Periféricos</option>
                <option value="sillas">Sillas Gaming</option>
                <option value="accesorios">Accesorios</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Precio (CLP) *
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:border-azul-electrico focus:ring-1 focus:ring-azul-electrico outline-none"
                required
                placeholder="999990"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stock Disponible *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:border-azul-electrico focus:ring-1 focus:ring-azul-electrico outline-none"
                required
                placeholder="10"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descripción *
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:border-azul-electrico focus:ring-1 focus:ring-azul-electrico outline-none"
              required
              placeholder="Descripción del producto..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL de la Imagen
            </label>
            <input
              type="url"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:border-azul-electrico focus:ring-1 focus:ring-azul-electrico outline-none"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="destacado"
                checked={formData.destacado}
                onChange={handleChange}
                className="rounded border-gray-600 bg-gray-800 text-azul-electrico focus:ring-azul-electrico"
              />
              <span className="text-gray-300">Producto destacado</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="nuevo"
                checked={formData.nuevo}
                onChange={handleChange}
                className="rounded border-gray-600 bg-gray-800 text-azul-electrico focus:ring-azul-electrico"
              />
              <span className="text-gray-300">Producto nuevo</span>
            </label>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 py-3 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : '💾 Guardar Producto'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="btn-secondary px-6 py-3"
            >
              ← Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoProducto;