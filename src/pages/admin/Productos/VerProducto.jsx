import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const VerProducto = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    const cargarProducto = async () => {
      setLoading(true);
      try {
        // Simular API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const productoEjemplo = {
          id: id,
          nombre: 'Producto Ejemplo',
          descripcion: 'Esta es una descripción detallada del producto. Incluye todas las características y especificaciones técnicas.',
          precio: 99.99,
          categoria: 'Electrónicos',
          stock: 15,
          stockCritico: 5,
          imagen: 'https://via.placeholder.com/400x300',
          destacado: true,
          nuevo: true,
          fechaCreacion: '2024-01-15',
          fechaActualizacion: '2024-01-20'
        };
        
        setProducto(productoEjemplo);
      } catch (error) {
        console.error('Error al cargar producto:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando producto...</div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black flex items-center justify-center">
        <div className="text-white text-xl">Producto no encontrado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
              Detalle del Producto
            </h1>
            <p className="text-gray-300">Información completa del producto</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate(`/admin/productos/${id}/editar-producto`)}
              className="btn-primary"
            >
              ✏️ Editar Producto
            </button>
            <button
              onClick={() => navigate('/admin/productos')}
              className="btn-secondary"
            >
              ← Volver
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Imagen del Producto */}
          <div className="card-gaming p-6">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <div className="flex space-x-4">
              <button className="btn-primary flex-1">Cambiar Imagen</button>
              <button className="btn-secondary flex-1">Ver Galería</button>
            </div>
          </div>

          {/* Información del Producto */}
          <div className="card-gaming p-6">
            <h2 className="text-2xl font-bold text-white mb-4">{producto.nombre}</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Precio:</span>
                <span className="text-white font-bold text-xl">${producto.precio}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Categoría:</span>
                <span className="text-white">{producto.categoria}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Stock Actual:</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  producto.stock > 10 ? 'bg-green-500' : 
                  producto.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                  {producto.stock} unidades
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Stock Crítico:</span>
                <span className="text-white">{producto.stockCritico} unidades</span>
              </div>
            </div>

            {/* Estados */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-azul-claro mb-2">Estados</h3>
              <div className="flex flex-wrap gap-2">
                {producto.destacado && (
                  <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm">
                    ⭐ Destacado
                  </span>
                )}
                {producto.nuevo && (
                  <span className="px-3 py-1 bg-green-500 text-black rounded-full text-sm">
                    🆕 Nuevo
                  </span>
                )}
                <span className="px-3 py-1 bg-azul-claro text-black rounded-full text-sm">
                  📦 En Stock
                </span>
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-azul-claro mb-2">Descripción</h3>
              <p className="text-gray-300 leading-relaxed">{producto.descripcion}</p>
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Creado:</span>
                <div className="text-white">{producto.fechaCreacion}</div>
              </div>
              <div>
                <span className="text-gray-400">Actualizado:</span>
                <div className="text-white">{producto.fechaActualizacion}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="card-gaming p-6 mt-6">
          <h3 className="text-lg font-bold text-azul-claro mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="btn-secondary">📊 Ver Estadísticas</button>
            <button className="btn-secondary">📦 Ajustar Stock</button>
            <button className="btn-secondary">🎯 Destacar</button>
            <button className="btn-secondary">📋 Duplicar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerProducto;