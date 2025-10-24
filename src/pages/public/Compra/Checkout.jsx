// /src/pages/Checkout.jsx
import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { formatPrice } from '../../../utils/formatters';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    region: ''
  });

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black py-12 pt-32"> {/* Cambiado pt-24 por pt-32 */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de envío */}
          <div className="card-gaming p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Información de Envío</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={shippingInfo.nombre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-electrico"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-electrico"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={shippingInfo.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-electrico"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={shippingInfo.direccion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-electrico"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Ciudad</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={shippingInfo.ciudad}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-electrico"
                  required
                />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Región</label>
                  <input
                    type="text"
                    name="region"
                    value={shippingInfo.region}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-azul-electrico"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <Link to="/payment" className="btn-primary w-full py-4 text-lg text-center block">
                  Continuar al Pago
                </Link>
              </div>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="card-gaming p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Resumen del Pedido</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`/assets/img/${item.imagen}`}
                      alt={item.nombre}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-white font-medium">{item.nombre}</p>
                      <p className="text-gray-300 text-sm">Cantidad: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-white font-bold">
                    {formatPrice(item.precio * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-white">Total:</span>
                <span className="gradient-text">{formatPrice(getCartTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;