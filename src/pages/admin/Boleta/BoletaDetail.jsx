import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useOrders } from '../../../hooks/useOrders';

const BoletaDetail = () => {
  const { user, api } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrdersByUser, getOrderById } = useOrders();
  const [boleta, setBoleta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      // Try backend first
      if (api) {
        try {
          const res = await api.get(`/api/v1/ordenes/${id}`);
          const data = res?.data ?? res;
          if (mounted && data) {
            setBoleta(data);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn('BoletaDetail: backend fetch failed, falling back to local', err?.message || err);
        }
      }

      // Fallback: ensure orders loaded then get by id
      try {
        await getOrdersByUser(user?.id);
        const found = getOrderById(id);
        if (mounted && found) setBoleta(found);
      } catch (e) {
        console.warn('BoletaDetail fallback failed', e?.message || e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => { mounted = false; };
  }, [api, id, getOrdersByUser, getOrderById, user]);

  const downloadJSON = () => {
    if (!boleta) return;
    const blob = new Blob([JSON.stringify(boleta, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boleta_admin_${boleta.id || Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="p-8 text-center text-white">Cargando boleta...</div>;
  if (!boleta) return <div className="p-8 text-center text-gray-400">No se encontró la boleta.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-oscuro to-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text font-orbitron mb-2">
              Detalle de Boleta
            </h1>
            <p className="text-gray-300">Boleta #{boleta.numero}</p>
          </div>
          <button
            onClick={() => navigate('/admin/boletas')}
            className="btn-secondary"
          >
            ← Volver a Boletas
          </button>
        </div>

        <div className="card-gaming p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-bold text-azul-claro mb-2">Información de la Boleta</h3>
              <div className="space-y-2">
                <p><span className="text-gray-400">Número:</span> {boleta.numero}</p>
                <p><span className="text-gray-400">Fecha:</span> {boleta.fecha}</p>
                <p><span className="text-gray-400">Cliente:</span> {boleta.cliente}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-azul-claro mb-2">Resumen</h3>
              <div className="space-y-2">
                <p><span className="text-gray-400">Total:</span> ${boleta.total}</p>
                <p><span className="text-gray-400">Items:</span> {boleta.items.length}</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-azul-claro mb-4">Productos</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 text-gray-300">Producto</th>
                  <th className="text-left py-3 text-gray-300">Cantidad</th>
                  <th className="text-left py-3 text-gray-300">Precio Unit.</th>
                  <th className="text-left py-3 text-gray-300">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {boleta.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-4 text-white">{item.producto}</td>
                    <td className="py-4 text-gray-300">{item.cantidad}</td>
                    <td className="py-4 text-gray-300">${item.precio}</td>
                    <td className="py-4 text-white font-medium">
                      ${(item.cantidad * item.precio).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="py-4 text-right text-gray-300">Total:</td>
                  <td className="py-4 text-white font-bold text-lg">${boleta.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="btn-primary">Imprimir Boleta</button>
          <button className="btn-secondary">Descargar PDF</button>
        </div>
      </div>
    </div>
  );
};

export default BoletaDetail;