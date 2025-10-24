// /src/pages/Payment.jsx
import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { formatPrice } from '../../../utils/formatters';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('transferencia');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      alert('¡Pago procesado exitosamente! Tu pedido está en camino.');
      navigate('/');
    }, 3000);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black py-12 pt-32"> {/* Cambiado pt-24 por pt-32 */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="card-gaming p-8">
          <h2 className="text-3xl font-bold mb-8 gradient-text text-center">Método de Pago</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Métodos de pago */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Selecciona tu método de pago</h3>
              
              <div className="space-y-4">
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
                </div>
              )}

              {/* Información PayPal */}
              {paymentMethod === 'paypal' && (
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-white font-semibold mb-3">Pago con PayPal:</h4>
                  <p className="text-gray-300 text-sm">
                    Serás redirigido a la plataforma segura de PayPal para completar tu pago.
                  </p>
                </div>
              )}
            </div>

            {/* Resumen del pedido */}
            <div className="card-gaming p-6">
              <h3 className="text-xl font-bold mb-4 gradient-text">Resumen Final</h3>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.nombre} x {item.quantity}</span>
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

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="btn-primary w-full py-4 mt-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Procesando pago...</span>
                  </div>
                ) : (
                  `Pagar ${formatPrice(getCartTotal())}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;