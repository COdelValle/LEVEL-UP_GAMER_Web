import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Boletas = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo
  const boletas = [
    { id: 1, numero: 'B001-2024', fecha: '2024-01-15', cliente: 'Juan Pérez', total: 150.00 },
    { id: 2, numero: 'B002-2024', fecha: '2024-01-16', cliente: 'María García', total: 200.00 },
    { id: 3, numero: 'B003-2024', fecha: '2024-01-17', cliente: 'Carlos López', total: 75.50 },
  ];

  const filteredBoletas = boletas.filter(boleta =>
    boleta.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    boleta.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
              Gestión de Boletas
            </h1>
            <p className="text-gray-300">Administra todas las boletas del sistema</p>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="card-gaming p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar por número o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-claro"
              />
            </div>
            <div className="flex space-x-4">
              <button className="btn-secondary">Filtrar por Fecha</button>
              <button className="btn-primary">Exportar</button>
            </div>
          </div>
        </div>

        {/* Lista de Boletas */}
        <div className="card-gaming p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 text-gray-300">Número</th>
                  <th className="text-left py-3 text-gray-300">Fecha</th>
                  <th className="text-left py-3 text-gray-300">Cliente</th>
                  <th className="text-left py-3 text-gray-300">Total</th>
                  <th className="text-left py-3 text-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredBoletas.map(boleta => (
                  <tr key={boleta.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-4 text-white font-medium">{boleta.numero}</td>
                    <td className="py-4 text-gray-300">{boleta.fecha}</td>
                    <td className="py-4 text-gray-300">{boleta.cliente}</td>
                    <td className="py-4 text-white font-medium">${boleta.total}</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/admin/boletas/${boleta.id}`)}
                          className="text-azul-claro hover:text-azul-electrico"
                        >
                          👁️ Ver
                        </button>
                        <button className="text-green-400 hover:text-green-300">
                          📄 PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBoletas.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No se encontraron boletas
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Boletas;