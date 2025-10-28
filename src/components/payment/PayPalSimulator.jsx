// /src/components/PayPalSimulator.jsx
import { useState, useEffect } from 'react';

const PayPalSimulator = ({ amount, onSuccess, onClose }) => {
  const [step, setStep] = useState(1); // 1: login, 2: payment, 3: processing, 4: success
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Credenciales de prueba predefinidas
  const testCredentials = {
    email: 'comprador-test@levelup.com',
    password: 'test123'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email === testCredentials.email && password === testCredentials.password) {
      setLoginError('');
      setIsLoggedIn(true);
      setStep(2); // Ir a paso de pago
    } else {
      setLoginError('Email o contraseña incorrectos. Usa: comprador-test@levelup.com / test123');
    }
  };

  const handlePayment = () => {
    setStep(3); // Procesando pago
    
    // Simular procesamiento con cuenta regresiva
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setStep(4); // Éxito
          setTimeout(() => {
            onSuccess(); // Llamar al callback de éxito
          }, 1500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetSimulator = () => {
    setStep(1);
    setEmail('');
    setPassword('');
    setLoginError('');
    setCountdown(5);
    setIsLoggedIn(false);
  };

  // Resetear cuando se cierra
  useEffect(() => {
    return () => resetSimulator();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header PayPal */}
        <div className="bg-blue-700 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-blue-700 font-bold text-lg">P</span>
              </div>
              <span className="text-white font-bold text-2xl">PayPal</span>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Contenido dinámico por paso */}
        <div className="p-6">
          {/* PASO 1: Login */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-800 text-center">Iniciar sesión en PayPal</h3>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {loginError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{loginError}</p>
                  </div>
                )}

                {/* Credenciales de ayuda */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm font-semibold mb-2">💡 Para probar usa:</p>
                  <p className="text-blue-700 text-xs">Email: <strong>comprador-test@levelup.com</strong></p>
                  <p className="text-blue-700 text-xs">Contraseña: <strong>test123</strong></p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors"
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>
          )}

          {/* PASO 2: Confirmación de pago */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Revisa tu información de pago</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Importe:</span>
                  <span className="font-bold text-lg text-gray-800">${amount} USD</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Para:</span>
                  <span className="font-semibold text-gray-800">Level-Up Gamer</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-sm text-gray-700">{email}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Volver
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Pagar Ahora
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: Procesando */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Procesando tu pago</h3>
              <p className="text-gray-600 mb-2">Estamos completando tu pago de <strong>${amount} USD</strong></p>
              <p className="text-sm text-gray-500">Tiempo restante: <span className="font-bold">{countdown}s</span></p>
            </div>
          )}

          {/* PASO 4: Éxito */}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">✓</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">¡Pago Completado!</h3>
              <p className="text-gray-600 mb-4">
                Has pagado <strong>${amount} USD</strong> a Level-Up Gamer
              </p>
              <p className="text-sm text-gray-500">
                Serás redirigido automáticamente...
              </p>
            </div>
          )}
        </div>

        {/* Footer informativo */}
        <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Este es un simulador de PayPal para pruebas. No se realizan cargos reales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayPalSimulator;