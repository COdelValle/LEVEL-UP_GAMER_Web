import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { formatPrice } from '../../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import PayPalButton from '../../../components/payment/PayPalButton';
import BackButton from '../../../components/common/BackButton';
import { useLocation } from 'react-router-dom';
import { addOrder } from '../../../utils/ordersStorage';

const Payment = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const shippingInfo = location.state?.shippingInfo || {};
  const [paymentMethod, setPaymentMethod] = useState('transferencia');
  const [isProcessing, setIsProcessing] = useState(false);

  // Protección de ruta
  if (cartItems.length === 0) {
    navigate('/carrito');
    return null;
  }

  const convertToUSD = (clpAmount) => {
    const exchangeRate = 0.0011;
    return (clpAmount * exchangeRate).toFixed(2);
  };

  const handleTransferPayment = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Build order object
      const order = {
        id: `ORDER${Date.now()}`,
        fecha: new Date().toISOString(),
        items: cartItems,
        total: getCartTotal(),
        estado: 'pendiente',
        metodoPago: 'transferencia',
        shipping: shippingInfo,
        // attach user info for filtering in Profile
        userId: user?.id,
        user: user ? { id: user.id, username: user.username, email: user.email, nombre: user.nombre } : undefined
      };

      // Persist order to shared orders storage and save lastOrder for immediate display
      try {
        addOrder(order);
      } catch (err) {
        // fallback: still save lastOrder
        console.error('Could not add order to storage', err);
      }
      localStorage.setItem('lastOrder', JSON.stringify(order));

      clearCart();
      // Navigate to simulated receipt
      navigate('/boleta', { state: { order } });
    }, 1200);
  };



  if (cartItems.length === 0) {
    navigate('/carrito');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black py-12 pt-32 relative">
      {/* Botón Volver */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-24 left-6 flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        <span>Volver</span>
      </button>

      <div className="max-w-4xl mx-auto px-4">
        <div className="card-gaming p-8">
          <h2 className="text-3xl font-bold mb-8 gradient-text text-center">Método de Pago</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Columna izquierda - Métodos de pago */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Selecciona tu método de pago</h3>
              
              <div className="space-y-4">
                {/* Opción Transferencia */}
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'transferencia' 
                      ? 'border-azul-electrico bg-azul-electrico/10' 
                      : 'border-gray-700 hover:border-azul-electrico/50'
                  }`}
                  onClick={() => setPaymentMethod('transferencia')}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'transferencia' ? 'border-azul-electrico bg-azul-electrico' : 'border-gray-500'
                    }`}>
                      {paymentMethod === 'transferencia' && <div className="w-3 h-3 rounded-full bg-white"></div>}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Transferencia Bancaria</h4>
                      <p className="text-gray-300 text-sm">Paga directamente desde tu banco</p>
                    </div>
                  </div>
                </div>

                {/* Opción PayPal */}
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'paypal' 
                      ? 'border-azul-electrico bg-azul-electrico/10' 
                      : 'border-gray-700 hover:border-azul-electrico/50'
                  }`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'paypal' ? 'border-azul-electrico bg-azul-electrico' : 'border-gray-500'
                    }`}>
                      {paymentMethod === 'paypal' && <div className="w-3 h-3 rounded-full bg-white"></div>}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">PayPal</h4>
                      <p className="text-gray-300 text-sm">Paga de forma segura con PayPal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de transferencia */}
              {paymentMethod === 'transferencia' && (
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-white font-semibold mb-3">Datos para transferencia:</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><strong>Banco:</strong> Banco Estado</p>
                    <p><strong>Tipo de cuenta:</strong> Cuenta Corriente</p>
                    <p><strong>Número de cuenta:</strong> 1234567890</p>
                    <p><strong>RUT:</strong> 12.345.678-9</p>
                    <p><strong>Razón social:</strong> Level-Up Gamer SpA</p>
                    <p><strong>Email para comprobante:</strong> compras@levelupgamer.cl</p>
                  </div>

                  <button
                    onClick={handleTransferPayment}
                    disabled={isProcessing}
                    className="btn-primary w-full py-3 mt-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Procesando pago...</span>
                      </div>
                    ) : (
                      `Confirmar Transferencia ${formatPrice(getCartTotal())}`
                    )}
                  </button>
                </div>
              )}

              {/* Botón de PayPal */}
              {paymentMethod === 'paypal' && (
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-white font-semibold mb-3">Pago con PayPal:</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Total en USD: <strong>${convertToUSD(getCartTotal())} USD</strong> 
                    <span className="text-xs text-gray-400 ml-2">(Aproximado)</span>
                  </p>
                  
                  <PayPalButton
                    amount={convertToUSD(getCartTotal())}
                    onSuccess={(details) => {
                      // Build completed order
                      const order = {
                        id: `ORDER${Date.now()}`,
                        fecha: new Date().toISOString(),
                        items: cartItems,
                        total: getCartTotal(),
                        estado: 'completado',
                        metodoPago: 'paypal',
                        shipping: shippingInfo,
                        paypalDetails: details,
                        // attach user info for filtering in Profile
                        userId: user?.id,
                        user: user ? { id: user.id, username: user.username, email: user.email, nombre: user.nombre } : undefined
                      };

                      // Persist order to shared orders storage and save lastOrder for immediate display
                      try {
                        addOrder(order);
                      } catch (err) {
                        console.error('Could not add order to storage', err);
                      }
                      localStorage.setItem('lastOrder', JSON.stringify(order));

                      clearCart();
                      navigate('/boleta', { state: { order } });
                    }}
                    onError={() => {
                      alert('Hubo un error al procesar el pago. Por favor, intenta nuevamente.');
                    }}
                    onCancel={() => {
                      alert('Has cancelado el pago.');
                    }}
                  />
                  
                  <p className="text-gray-400 text-xs mt-3 text-center">
                    Serás redirigido a PayPal para completar tu pago de forma segura
                  </p>
                </div>
              )}
            </div>

            {/* Columna derecha - Resumen del pedido */}
            <div className="card-gaming p-6">
              <h3 className="text-xl font-bold mb-4 gradient-text">Resumen Final</h3>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <img
                        src={(item.imagen && (item.imagen.startsWith('http') || item.imagen.startsWith('/'))) ? item.imagen : `/assets/img/${item.imagen}`}
                        alt={item.nombre}
                        className="w-14 h-14 object-cover rounded"
                      />
                      <span className="text-gray-300">{item.nombre} x {item.quantity}</span>
                    </div>
                    <span className="text-white">{formatPrice(item.precio * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-700 pt-3">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span className="text-white">Total:</span>
                  <span className="gradient-text">{formatPrice(getCartTotal())}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-azul-oscuro/50 rounded-lg border border-azul-electrico/30">
                <h4 className="text-white font-semibold mb-2">Información importante:</h4>
                <p className="text-gray-300 text-sm">
                  • Los pedidos se procesan en 24-48 horas<br/>
                  • Envío gratis en compras sobre $50.000<br/>
                  • Soporte: soporte@levelupgamer.cl
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;