import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const EditarCategoria = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: 'Activa'
  });

  const [loading, setLoading] = useState(false);

  // Simular carga de datos de la categoría
  useEffect(() => {
    // En una app real, aquí harías una llamada a la API
    const categoriaEjemplo = {
      id: id,
      nombre: 'Electrónicos',
      descripcion: 'Dispositivos electrónicos y tecnología',
      estado: 'Activa'
    };
    
    setFormData(categoriaEjemplo);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Aquí iría la lógica para actualizar la categoría
      console.log('Actualizando categoría:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular API call
      
      navigate('/admin/categorias');
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
              Editar Categoría
            </h1>
            <p className="text-gray-300">Modifica los datos de la categoría</p>
          </div>
          <button
            onClick={() => navigate('/admin/categorias')}
            className="btn-secondary"
          >
            ← Volver
          </button>
        </div>

        <div className="card-gaming p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Nombre de la Categoría</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                placeholder="Nombre de la categoría"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
                placeholder="Descripción de la categoría"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
              >
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/categorias')}
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

export default EditarCategoria;