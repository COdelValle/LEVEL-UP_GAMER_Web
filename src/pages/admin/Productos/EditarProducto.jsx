import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const EditarProducto = () => {
  const { api, user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    stock: '',
    imagen: '',
    destacado: false
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos del producto
  useEffect(() => {
    let mounted = true;

    const cargarProducto = async () => {
      try {
        const res = await api.get(`/api/v1/productos/${id}`);
        if (mounted && res) {
          setFormData({
            nombre: res.nombre || '',
            descripcion: res.descripcion || '',
            precio: res.precio || '',
            categoria: res.categoria || '',
            stock: res.stock || '',
            imagen: res.imagen || '',
            destacado: res.destacado || false
          });
        }
      } catch (err) {
        console.error('Error al cargar producto:', err);
        if (mounted) setError('No se pudo cargar el producto');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    cargarProducto();

    return () => { mounted = false; };
  }, [id, api]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
      // Actualizar en el backend
      const payload = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        categoria: formData.categoria,
        stock: parseInt(formData.stock),
        imagen: formData.imagen,
        destacado: formData.destacado
      };

      const updated = await api.put(`/api/v1/productos/${id}`, payload);

      if (updated) {
        alert('✅ Producto actualizado exitosamente');
        navigate('/admin/productos');
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      setError(error?.body?.message || 'Error al actualizar el producto');
      alert('❌ ' + (error?.body?.message || error?.message || 'Error al actualizar el producto'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
              Editar Producto
            </h1>
            <p className="text-gray-300">Modifica los datos del producto</p>
          </div>
          <button
            onClick={() => navigate('/admin/productos')}
            className="btn-secondary"
          >
            ← Volver
          </button>
        </div>

        <div className="card-gaming p-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Categoría</label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Electrónicos">Electrónicos</option>
                  <option value="Ropa">Ropa</option>
                  <option value="Hogar">Hogar</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                  step="0.01"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Stock Crítico</label>
                <input
                  type="number"
                  name="stockCritico"
                  value={formData.stockCritico}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Imagen URL</label>
                <input
                  type="url"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="destacado"
                checked={formData.destacado}
                onChange={handleChange}
                className="w-4 h-4 text-azul-claro bg-gray-800 border-gray-700 rounded focus:ring-azul-claro"
              />
              <label className="ml-2 text-gray-300">Producto Destacado</label>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/productos')}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;