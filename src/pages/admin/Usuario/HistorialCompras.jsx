import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const HistoriaCompras = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [filtroEstado, setFiltroEstado] = useState('todos');

  // Datos de ejemplo del historial de compras
  const historialCompras = [
    {
      id: 1,
      numero: 'ORD-001',
      fecha: '2024-01-15',
      total: 150.00,
      estado: 'completado',
      productos: 3,
      metodoPago: 'Tarjeta Crédito'
    },
    {
      id: 2,
      numero: 'ORD-002',
      fecha: '2024-01-10',
      total: 75.50,
      estado: 'completado',
      productos: 2,
      metodoPago: 'PayPal'
    },
    {
      id: 3,
      numero: 'ORD-003',
      fecha: '2024-01-05',
      total: 200.00,
      estado: 'pendiente',
      productos: 4,
      metodoPago: 'Transferencia'
    },
    {
      id: 4,
      numero: 'ORD-004',
      fecha: '2023-12-28',
      total: 89.99,
      estado: 'cancelado',
      productos: 1,
      metodoPago: 'Tarjeta Débito'
    }
  ];

  // Información del usuario (en una app real, esto vendría de la API)
  const usuarioInfo = {
    id: id,
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    totalCompras: historialCompras.length,
    totalGastado: historialCompras.reduce((sum, compra) => sum + compra.total, 0)
  };

  const comprasFiltradas = filtroEstado === 'todos' 
    ? historialCompras 
    : historialCompras.filter(compra => compra.estado === filtroEstado);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'completado': return 'bg-green-500';
      case 'pendiente': return 'bg-yellow-500';
      case 'cancelado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
              Historial de Compras
            </h1>
            <p className="text-gray-300">
              Compras realizadas por {usuarioInfo.nombre}
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/usuarios')}
            className="btn-secondary"
          >
            ← Volver a Usuarios
          </button>
        </div>

        {/* Información del Usuario */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-gaming p-6 text-center">
            <div className="text-2xl font-bold text-azul-claro mb-2">
              {usuarioInfo.totalCompras}
            </div>
            <div className="text-gray-300">Total Compras</div>
          </div>
          
          <div className="card-gaming p-6 text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">
              ${usuarioInfo.totalGastado}
            </div>
            <div className="text-gray-300">Total Gastado</div>
          </div>
          
          <div className="card-gaming p-6 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-2">
              ${(usuarioInfo.totalGastado / usuarioInfo.totalCompras).toFixed(2)}
            </div>
            <div className="text-gray-300">Promedio por Compra</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="card-gaming p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFiltroEstado('todos')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filtroEstado === 'todos' ? 'bg-azul-claro text-black' : 'bg-gray-800 text-white'
                }`}
              >
                Todas las Compras
              </button>
              <button
                onClick={() => setFiltroEstado('completado')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filtroEstado === 'completado' ? 'bg-green-500 text-black' : 'bg-gray-800 text-white'
                }`}
              >
                Completadas
              </button>
              <button
                onClick={() => setFiltroEstado('pendiente')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filtroEstado === 'pendiente' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'
                }`}
              >
                Pendientes
              </button>
              <button
                onClick={() => setFiltroEstado('cancelado')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filtroEstado === 'cancelado' ? 'bg-red-500 text-black' : 'bg-gray-800 text-white'
                }`}
              >
                Canceladas
              </button>
            </div>
            
            <div className="flex space-x-4">
              <button className="btn-secondary">Exportar Reporte</button>
            </div>
          </div>
        </div>

        {/* Lista de Compras */}
        <div className="card-gaming p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 text-gray-300">Orden #</th>
                  <th className="text-left py-3 text-gray-300">Fecha</th>
                  <th className="text-left py-3 text-gray-300">Productos</th>
                  <th className="text-left py-3 text-gray-300">Método Pago</th>
                  <th className="text-left py-3 text-gray-300">Total</th>
                  <th className="text-left py-3 text-gray-300">Estado</th>
                  <th className="text-left py-3 text-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {comprasFiltradas.map(compra => (
                  <tr key={compra.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-4">
                      <div className="font-medium text-white">{compra.numero}</div>
                    </td>
                    <td className="py-4 text-gray-300">{compra.fecha}</td>
                    <td className="py-4 text-gray-300">{compra.productos} productos</td>
                    <td className="py-4 text-gray-300">{compra.metodoPago}</td>
                    <td className="py-4 text-white font-medium">${compra.total}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs ${getEstadoColor(compra.estado)}`}>
                        {compra.estado}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/admin/boletas/${compra.id}`)}
                          className="text-azul-claro hover:text-azul-electrico"
                        >
                          👁️ Ver
                        </button>
                        <button className="text-green-400 hover:text-green-300">
                          📄 Factura
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {comprasFiltradas.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No se encontraron compras con los filtros seleccionados
            </div>
          )}
        </div>

        {/* Resumen de Compras por Mes */}
        <div className="card-gaming p-6 mt-6">
          <h3 className="text-xl font-bold gradient-text mb-4">Resumen por Mes</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-lg font-bold text-azul-claro">Enero 2024</div>
              <div className="text-gray-300">3 compras</div>
              <div className="text-green-400 font-bold">$425.50</div>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-lg font-bold text-azul-claro">Diciembre 2023</div>
              <div className="text-gray-300">1 compra</div>
              <div className="text-green-400 font-bold">$89.99</div>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-lg font-bold text-azul-claro">Noviembre 2023</div>
              <div className="text-gray-300">2 compras</div>
              <div className="text-green-400 font-bold">$175.25</div>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-lg font-bold text-azul-claro">Total General</div>
              <div className="text-gray-300">6 compras</div>
              <div className="text-green-400 font-bold">$690.74</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoriaCompras;