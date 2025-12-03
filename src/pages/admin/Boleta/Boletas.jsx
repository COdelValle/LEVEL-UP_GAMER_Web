import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Boletas = () => {
  const { api, user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [boletas, setBoletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar boletas desde el backend
  useEffect(() => {
    let mounted = true;

    const cargarBoletas = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/v1/ordenes');
        if (mounted && Array.isArray(res)) {
          setBoletas(res);
        }
      } catch (err) {
        console.warn('Error al cargar boletas del backend, usando vacío', err?.message || err);
        if (mounted) {
          setBoletas([]);
          setError('No se pudieron cargar las boletas');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    cargarBoletas();
    cargarBoletas();

    return () => { mounted = false; };
  }, [api]);

  const handleReject = async (orderId) => {
    if (!window.confirm('¿Confirmas que quieres rechazar este pago?')) return;
    
    try {
      const updated = await api.put(`/api/v1/ordenes/${orderId}`, { estado: 'rechazado' });
      if (updated) {
        setBoletas(prev => prev.map(b => b.id === orderId ? { ...b, estado: 'rechazado' } : b));
        alert('✅ Pago marcado como rechazado.');
      }
    } catch (err) {
      console.error('Error al rechazar pago:', err);
      alert('❌ No se pudo actualizar la boleta.');
    }
  };

  const handleApprove = async (orderId) => {
    if (!window.confirm('¿Confirmas que quieres aprobar este pago?')) return;
    
    try {
      const updated = await api.put(`/api/v1/ordenes/${orderId}`, { estado: 'aprobado' });
      if (updated) {
        setBoletas(prev => prev.map(b => b.id === orderId ? { ...b, estado: 'aprobado' } : b));
        alert('✅ Pago aprobado correctamente.');
      }
    } catch (err) {
      console.error('Error al aprobar pago:', err);
      alert('❌ No se pudo actualizar la boleta.');
    }
  };

  const filteredBoletas = boletas.filter(boleta =>
    (String(boleta.id || boleta.numero || '')).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (String(boleta.usuario?.nombre || boleta.cliente || boleta.user?.nombre || '')).toLowerCase().includes(searchTerm.toLowerCase())
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

        {error && (
          <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-300 p-4 rounded-lg mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Lista de Boletas */}
        <div className="card-gaming p-6">
          {loading ? (
            <div className="text-center text-white py-8">⏳ Cargando boletas...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 text-gray-300">Número</th>
                    <th className="text-left py-3 text-gray-300">Fecha</th>
                    <th className="text-left py-3 text-gray-300">Cliente</th>
                    <th className="text-left py-3 text-gray-300">Total</th>
                    <th className="text-left py-3 text-gray-300">Estado</th>
                    <th className="text-left py-3 text-gray-300">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBoletas.map(boleta => (
                    <tr key={boleta.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="py-4 text-white font-medium">{boleta.id}</td>
                      <td className="py-4 text-gray-300">{boleta.fechaCreacion ? new Date(boleta.fechaCreacion).toLocaleDateString() : '-'}</td>
                      <td className="py-4 text-gray-300">{boleta.usuario?.nombre || boleta.user?.nombre || boleta.cliente || '-'}</td>
                      <td className="py-4 text-white font-medium">${Number(boleta.total || 0).toLocaleString()}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          boleta.estado === 'aprobado' ? 'bg-green-500/30 text-green-300' :
                          boleta.estado === 'rechazado' ? 'bg-red-500/30 text-red-300' :
                          'bg-yellow-500/30 text-yellow-300'
                        }`}>
                          {boleta.estado || 'Pendiente'}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/admin/boletas/${boleta.id}`)}
                            className="text-azul-claro hover:text-azul-electrico text-sm"
                          >
                            👁️ Ver
                          </button>
                          {boleta.estado !== 'aprobado' && (
                            <button
                              onClick={() => handleApprove(boleta.id)}
                              className="text-green-400 hover:text-green-300 text-sm"
                            >
                              ✅ Aprobar
                            </button>
                          )}
                          {boleta.estado !== 'rechazado' && (
                            <button
                              onClick={() => handleReject(boleta.id)}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              ❌ Rechazar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredBoletas.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No se encontraron boletas
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Boletas;