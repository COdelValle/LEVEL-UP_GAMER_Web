import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatters';

const Boleta = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order || JSON.parse(localStorage.getItem('lastOrder') || 'null');

  useEffect(() => {
    if (!order) {
      // No order data — redirect to home or cart
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen py-12 pt-24 bg-gradient-to-b from-azul-oscuro to-black">
      <div className="max-w-4xl mx-auto px-4">
        <div className="card-gaming p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              {order.estado === 'rechazado' ? (
                <>
                  <h1 className="text-3xl font-bold text-red-400">Tu compra ha sido rechazada</h1>
                  <p className="text-sm text-gray-300 mt-1">Se ha detectado un problema con el comprobante de transferencia. Si crees que esto es un error, contacta a soporte: soporte@levelupgamer.cl</p>
                </>
              ) : order.estado === 'pendiente' ? (
                <>
                  <h1 className="text-3xl font-bold text-yellow-400">Pedido pendiente - nro #{order.id}</h1>
                  <p className="text-sm text-gray-400 mt-1">Tu pago está en revisión. Pronto te notificaremos el estado.</p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-green-400">Se ha realizado la compra. nro #{order.id}</h1>
                  <p className="text-sm text-gray-400 mt-1">Gracias por tu compra. A continuación encontrarás los detalles.</p>
                </>
              )}
            </div>
            <div className="text-right text-xs text-gray-400">Código orden: {order.id}</div>
          </div>

          {/* Shipping info */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm text-gray-300">Nombre*</label>
              <div className="mt-1 bg-gray-800/50 rounded px-3 py-2 text-gray-200">{order.shipping?.nombre || '-'}</div>
            </div>
            <div>
              <label className="text-sm text-gray-300">Apellidos*</label>
              <div className="mt-1 bg-gray-800/50 rounded px-3 py-2 text-gray-200">{order.shipping?.apellido || '-'}</div>
            </div>
            <div>
              <label className="text-sm text-gray-300">Correo*</label>
              <div className="mt-1 bg-gray-800/50 rounded px-3 py-2 text-gray-200">{order.shipping?.email || '-'}</div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-white font-semibold mb-2">Dirección de entrega de los productos</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300">Calle*</label>
                <div className="mt-1 bg-gray-800/50 rounded px-3 py-2 text-gray-200">{order.shipping?.direccion || '-'}</div>
              </div>
              <div>
                <label className="text-sm text-gray-300">Departamento (opcional)</label>
                <div className="mt-1 bg-gray-800/50 rounded px-3 py-2 text-gray-200">{order.shipping?.departamento || '-'}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="text-sm text-gray-300">Región*</label>
                <div className="mt-1 bg-gray-800/50 rounded px-3 py-2 text-gray-200">{order.shipping?.region || '-'}</div>
              </div>
              <div>
                <label className="text-sm text-gray-300">Ciudad*</label>
                <div className="mt-1 bg-gray-800/50 rounded px-3 py-2 text-gray-200">{order.shipping?.ciudad || '-'}</div>
              </div>
              <div>
                <label className="text-sm text-gray-300">Comuna*</label>
                <div className="mt-1 bg-gray-800/50 rounded px-3 py-2 text-gray-200">{order.shipping?.comuna || '-'}</div>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-300">Indicaciones para la entrega (opcional)</label>
              <div className="mt-1 bg-gray-800/50 rounded px-3 py-3 text-gray-200">{order.shipping?.instrucciones || '-'}</div>
            </div>
          </div>

          {/* Items table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-300 border-b border-gray-700">
                  <th className="py-2">Imagen</th>
                  <th className="py-2">Nombre</th>
                  <th className="py-2">Precio</th>
                  <th className="py-2">Cantidad</th>
                  <th className="py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it, idx) => (
                  <tr key={it.id ?? it.productoId ?? `${it.nombre ?? 'item'}-${idx}`} className="border-b border-gray-700">
                    <td className="py-3 w-20">
                      <img src={(it.imagen && (it.imagen.startsWith('http') || it.imagen.startsWith('/'))) ? it.imagen : `/assets/img/${it.imagen}`} alt={it.nombre} className="w-16 h-12 object-cover rounded" />
                    </td>
                    <td className="py-3">{it.nombre}</td>
                    <td className="py-3">{formatPrice(it.precio)}</td>
                    <td className="py-3">{it.quantity ?? it.cantidad ?? 1}</td>
                    <td className="py-3">{formatPrice((it.precio ?? 0) * (it.quantity ?? it.cantidad ?? 1))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-lg text-center">
            <div className="text-xl text-gray-300 mb-2">Total pagado: <span className="text-2xl font-bold text-white"> {formatPrice(order.total)}</span></div>
            <div className="mt-4">
              <button onClick={() => navigate('/')} className="btn-primary px-6 py-3 mr-3">Volver al inicio</button>
              <button onClick={() => window.print()} className="px-6 py-3 bg-gray-700 text-white rounded-lg">Imprimir / Descargar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boleta;
