import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Categories = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo
  const categories = [
    { id: 1, nombre: 'Electrónicos', descripcion: 'Dispositivos electrónicos', productos: 15, estado: 'Activa' },
    { id: 2, nombre: 'Ropa', descripcion: 'Prendas de vestir', productos: 25, estado: 'Activa' },
    { id: 3, nombre: 'Hogar', descripcion: 'Artículos para el hogar', productos: 10, estado: 'Inactiva' },
  ];

  const filteredCategories = categories.filter(cat =>
    cat.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
              Gestión de Categorías
            </h1>
            <p className="text-gray-300">Administra las categorías de productos</p>
          </div>
          <button
            onClick={() => navigate('/admin/categorias/nueva-categoria')}
            className="btn-primary"
          >
            ➕ Nueva Categoría
          </button>
        </div>

        {/* Búsqueda */}
        <div className="card-gaming p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar categorías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
              />
            </div>
          </div>
        </div>

        {/* Lista de Categorías */}
        <div className="card-gaming p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 text-gray-300">Nombre</th>
                  <th className="text-left py-3 text-gray-300">Descripción</th>
                  <th className="text-left py-3 text-gray-300">Productos</th>
                  <th className="text-left py-3 text-gray-300">Estado</th>
                  <th className="text-left py-3 text-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map(category => (
                  <tr key={category.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-4">
                      <div className="font-medium text-white">{category.nombre}</div>
                    </td>
                    <td className="py-4 text-gray-300">{category.descripcion}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-azul-oscuro text-azul-claro rounded text-sm">
                        {category.productos} productos
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        category.estado === 'Activa' ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {category.estado}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/admin/categorias/${category.id}/editar-categoria`)}
                          className="text-azul-claro hover:text-azul-electrico"
                        >
                          ✏️ Editar
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          🗑️ Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No se encontraron categorías
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;