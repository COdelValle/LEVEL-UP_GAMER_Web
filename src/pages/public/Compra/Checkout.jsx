// /src/pages/Checkout.jsx
import { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import { formatPrice } from '../../../utils/formatters';
import { Link, useNavigate } from 'react-router-dom';
import { chileRegions, getComunasByRegion } from '../../../assets/data/chileRegions';
import BackButton from '../../../components/common/BackButton';

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    region: '',
    ciudad: '',
    comuna: ''
  });

  const [errors, setErrors] = useState({});
  const [comunas, setComunas] = useState([]);

  // Actualizar comunas cuando cambia la región
  useEffect(() => {
    if (shippingInfo.region) {
      const nuevasComunas = getComunasByRegion(shippingInfo.region);
      setComunas(nuevasComunas);
      
      // Resetear comuna si ya no está disponible en la nueva región
      if (shippingInfo.comuna && !nuevasComunas.includes(shippingInfo.comuna)) {
        setShippingInfo(prev => ({
          ...prev,
          comuna: ''
        }));
      }
    } else {
      setComunas([]);
    }
  }, [shippingInfo.region]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value
    });
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!shippingInfo.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!shippingInfo.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!shippingInfo.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }
    
    if (!shippingInfo.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    }
    
    if (!shippingInfo.region) {
      newErrors.region = 'La región es requerida';
    }
    
    if (!shippingInfo.ciudad.trim()) {
      newErrors.ciudad = 'La ciudad es requerida';
    }
    
    if (!shippingInfo.comuna) {
      newErrors.comuna = 'La comuna es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Navegar a payment pasando los datos de envío
      navigate('/payment', { 
        state: { shippingInfo } 
      });
    }
  };

  if (cartItems.length === 0) {
    navigate('/carrito');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black py-12 pt-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de envío */}
          <div className="card-gaming p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Información de Envío</h2>
            <form onSubmit={handleContinueToPayment} className="space-y-4">
              {/* Nombre completo */}
              <div>
                <label className="block text-gray-300 mb-2">Nombre completo *</label>
                <input
                  type="text"
                  name="nombre"
                  value={shippingInfo.nombre}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-azul-electrico ${
                    errors.nombre ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="Ingresa tu nombre completo"
                  required
                />
                {errors.nombre && (
                  <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>
                )}
              </div>

              {/* Email y Teléfono */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-azul-electrico ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="ejemplo@email.com"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={shippingInfo.telefono}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-azul-electrico ${
                      errors.telefono ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="+56 9 1234 5678"
                    required
                  />
                  {errors.telefono && (
                    <p className="text-red-400 text-sm mt-1">{errors.telefono}</p>
                  )}
                </div>
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-gray-300 mb-2">Dirección *</label>
                <input
                  type="text"
                  name="direccion"
                  value={shippingInfo.direccion}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-azul-electrico ${
                    errors.direccion ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="Calle, número, departamento"
                  required
                />
                {errors.direccion && (
                  <p className="text-red-400 text-sm mt-1">{errors.direccion}</p>
                )}
              </div>

              {/* Región, Ciudad y Comuna */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Región *</label>
                  <select
                    name="region"
                    value={shippingInfo.region}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-azul-electrico ${
                      errors.region ? 'border-red-500' : 'border-gray-700'
                    }`}
                    required
                  >
                    <option value="">Selecciona una región</option>
                    {chileRegions.map(region => (
                      <option key={region.id} value={region.id}>
                        {region.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.region && (
                    <p className="text-red-400 text-sm mt-1">{errors.region}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Ciudad *</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={shippingInfo.ciudad}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-azul-electrico ${
                      errors.ciudad ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Ej: Santiago"
                    required
                  />
                  {errors.ciudad && (
                    <p className="text-red-400 text-sm mt-1">{errors.ciudad}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Comuna *</label>
                  <select
                    name="comuna"
                    value={shippingInfo.comuna}
                    onChange={handleInputChange}
                    disabled={!shippingInfo.region}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-azul-electrico ${
                      errors.comuna ? 'border-red-500' : 'border-gray-700'
                    } ${!shippingInfo.region ? 'opacity-50 cursor-not-allowed' : ''}`}
                    required
                  >
                    <option value="">Selecciona una comuna</option>
                    {comunas.map(comuna => (
                      <option key={comuna} value={comuna}>
                        {comuna}
                      </option>
                    ))}
                  </select>
                  {errors.comuna && (
                    <p className="text-red-400 text-sm mt-1">{errors.comuna}</p>
                  )}
                </div>
              </div>

              {/* Botón de enviar */}
              <div className="pt-4">
                <button 
                  type="submit"
                  className="btn-primary w-full py-4 text-lg text-center block hover:scale-105 transition-transform"
                >
                  Continuar al Pago
                </button>
                <p className="text-gray-400 text-sm mt-2 text-center">
                  * Campos obligatorios
                </p>
              </div>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="card-gaming p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Resumen del Pedido</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                      <img
                        src={(item.imagen && (item.imagen.startsWith('http') || item.imagen.startsWith('/'))) ? item.imagen : `/assets/img/${item.imagen}`}
                        alt={item.nombre}
                        className="w-16 h-16 object-cover rounded"
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

            {/* Información de envío */}
            <div className="mt-6 p-4 bg-azul-oscuro/30 rounded-lg border border-azul-electrico/20">
              <h4 className="text-white font-semibold mb-2">Información de envío:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Envío gratis en compras sobre $50.000</li>
                <li>• Tiempo de entrega: 2-5 días hábiles</li>
                <li>• Zonas de cobertura: Todo Chile</li>
                <li>• Seguimiento incluido</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;