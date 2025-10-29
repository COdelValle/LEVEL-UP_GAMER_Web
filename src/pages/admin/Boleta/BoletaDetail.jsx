import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const BoletaDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  // Datos de ejemplo - reemplazar con datos reales
  const boleta = {
    id: id,
    numero: 'B001-2024',
    fecha: '2024-01-15',
    cliente: 'Juan Pérez',
    total: 150.00,
    items: [
      { producto: 'Producto 1', cantidad: 2, precio: 50.00 },
      { producto: 'Producto 2', cantidad: 1, precio: 50.00 }
    ]
  };

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