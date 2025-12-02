import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSMSAuth, setShowSMSAuth] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [smsCode, setSmsCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState('email'); // 'email' o 'sms'
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryPhone, setRecoveryPhone] = useState('');
  const { login, authenticate } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Intentar autenticación contra el backend primero
    try {
      const data = await authenticate(formData.email, formData.password);

      // Si la API indica que se requiere 2FA (nombres comunes: requires2FA, requires_sms)
      if (data?.requires2FA || data?.requires_sms) {
        setShowSMSAuth(true);
        setLoading(false);
        return;
      }

      // Si la API devolvió el usuario en la respuesta, navegar según su rol
      const userFromApi = data?.user || data?.usuario || null;
      if (userFromApi && userFromApi.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
      setLoading(false);
      return;
    } catch (err) {
      // Si falla la llamada al backend, mantener el comportamiento local como fallback
      console.warn('Backend auth failed, falling back to local:', err.message || err);
    }

    // Fallback local: verificar credenciales en localStorage
    try {
      // Verificar credenciales básicas primero (local dev admin)
      if (formData.email === 'admin@gmail.com' && formData.password === 'levelup2024') {
        setShowSMSAuth(true);
        setLoading(false);
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);

      if (user) {
        setShowSMSAuth(true);
      } else {
        alert('Credenciales incorrectas');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSMSVerification = () => {
    if (smsCode === '123456') { // Código simulado
      // Si llegamos aquí, significa que authenticate() ya pasó en handleSubmit
      // Simplemente navegar según el role guardado en localStorage
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      
      if (storedUser && (storedUser.role === 'admin' || storedUser.role === 'ADMIN')) {
        navigate('/admin');
        return;
      }
      
      if (storedUser) {
        navigate('/');
        return;
      }
      
      // Si no hay user guardado, hacer fallback local
      if (formData.email === 'admin@gmail.com' && formData.password === 'levelup2024') {
        login({
          username: 'Admin',
          role: 'admin',
          email: formData.email,
          lastLogin: new Date().toISOString()
        });
        navigate('/admin');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        login({ 
          username: user.nickname,
          email: user.email,
          role: user.role,
          lastLogin: new Date().toISOString()
        });
        navigate('/');
      } else {
        alert('Usuario no encontrado. Intenta de nuevo.');
      }
    } else {
      alert('Código incorrecto. Intenta con 123456');
    }
  };

  const sendSMSCode = () => {
    // Simular envío de código SMS
    alert('📱 Se ha enviado un código de verificación a tu teléfono registrado\n🔢 Código de prueba: 123456');
    setCodeSent(true);
  };

  const handleForgotPassword = () => {
    if (recoveryMethod === 'email' && !recoveryEmail) {
      alert('Por favor ingresa tu correo electrónico');
      return;
    }
    if (recoveryMethod === 'sms' && !recoveryPhone) {
      alert('Por favor ingresa tu número de teléfono');
      return;
    }

    // Simular envío de código de recuperación
    setTimeout(() => {
      alert(`✅ Se ha enviado un código de recuperación a tu ${recoveryMethod === 'email' ? 'correo electrónico' : 'teléfono'}\n🔢 Código de prueba: 654321`);
      setCodeSent(true);
    }, 1500);
  };

  const verifyRecoveryCode = () => {
    if (smsCode === '654321') {
      alert('✅ Código verificado correctamente. Tu contraseña ha sido restablecida y enviada a tu correo.');
      setShowForgotPassword(false);
      setCodeSent(false);
      setSmsCode('');
    } else {
      alert('❌ Código incorrecto. Intenta con 654321');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-azul-oscuro to-black py-12 px-4">
      {/* RECUADRO DE FONDO */}
      <div className="login-container max-w-md w-full bg-[#0f1e3a] border-2 border-azul-electrico rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🔐</span>
          <h2 className="text-3xl font-bold gradient-text font-orbitron mb-2">
            Login de LEVEL-UP
          </h2>
          <p className="text-gray-300">Accede con tus credenciales</p>
        </div>

        {!showSMSAuth && !showForgotPassword ? (
          // FORMULARIO PRINCIPAL DE LOGIN
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico transition duration-300"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico transition duration-300"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-azul-electrico hover:bg-azul-claro py-3 rounded-lg font-bold text-black transition duration-300 font-orbitron disabled:opacity-50"
            >
              {loading ? 'Verificando...' : '🚀 Continuar'}
            </button>

            {/* BOTÓN OLVIDÉ CONTRASEÑA */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-azul-claro hover:text-azul-electrico text-sm underline transition duration-300"
              >
                🔓 ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        ) : showForgotPassword ? (
          // FORMULARIO DE RECUPERACIÓN DE CONTRASEÑA
          <div className="space-y-4">
            <div className="text-center mb-4">
              <span className="text-3xl mb-2 block">🔓</span>
              <h3 className="text-xl font-bold text-white">Recuperar Contraseña</h3>
              <p className="text-gray-300 text-sm">Elige cómo quieres recuperar tu acceso</p>
            </div>

            {!codeSent ? (
              <>
                {/* SELECTOR DE MÉTODO */}
                <div className="flex space-x-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setRecoveryMethod('email')}
                    className={`flex-1 py-2 rounded-lg border-2 transition duration-300 ${
                      recoveryMethod === 'email' 
                        ? 'border-azul-electrico bg-azul-electrico/20 text-white' 
                        : 'border-gray-600 text-gray-400 hover:border-azul-electrico'
                    }`}
                  >
                    📧 Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecoveryMethod('sms')}
                    className={`flex-1 py-2 rounded-lg border-2 transition duration-300 ${
                      recoveryMethod === 'sms' 
                        ? 'border-azul-electrico bg-azul-electrico/20 text-white' 
                        : 'border-gray-600 text-gray-400 hover:border-azul-electrico'
                    }`}
                  >
                    📱 SMS
                  </button>
                </div>

                {/* CAMPO DE EMAIL O TELÉFONO */}
                <div>
                  <input
                    type={recoveryMethod === 'email' ? 'email' : 'tel'}
                    placeholder={
                      recoveryMethod === 'email' 
                        ? 'Ingresa tu correo electrónico' 
                        : 'Ingresa tu número de teléfono'
                    }
                    value={recoveryMethod === 'email' ? recoveryEmail : recoveryPhone}
                    onChange={(e) => 
                      recoveryMethod === 'email' 
                        ? setRecoveryEmail(e.target.value)
                        : setRecoveryPhone(e.target.value)
                    }
                    className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico transition duration-300"
                    required
                  />
                </div>

                <button
                  onClick={handleForgotPassword}
                  className="w-full bg-azul-electrico hover:bg-azul-claro py-3 rounded-lg font-bold text-black transition duration-300"
                >
                  Enviar Código de Recuperación
                </button>
              </>
            ) : (
              // VERIFICACIÓN DE CÓDIGO DE RECUPERACIÓN
              <>
                <div className="text-center mb-4">
                  <p className="text-gray-300 text-sm">
                    Ingresa el código enviado a tu {recoveryMethod === 'email' ? 'correo' : 'teléfono'}
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Código de 6 dígitos"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico text-center text-lg"
                    maxLength={6}
                  />
                </div>

                <button
                  onClick={verifyRecoveryCode}
                  className="w-full bg-green-500 hover:bg-green-400 py-3 rounded-lg font-bold text-black transition duration-300"
                >
                  ✅ Verificar Código
                </button>

                <p className="text-center text-gray-400 text-sm">
                  💡 Código de prueba: <strong>654321</strong>
                </p>

                <button
                  onClick={() => {
                    setCodeSent(false);
                    setSmsCode('');
                  }}
                  className="w-full bg-gray-600 hover:bg-gray-500 py-2 rounded-lg text-white transition duration-300"
                >
                  ↩ Reenviar Código
                </button>
              </>
            )}

            <button
              onClick={() => {
                setShowForgotPassword(false);
                setCodeSent(false);
                setSmsCode('');
              }}
              className="w-full bg-transparent border border-gray-600 hover:border-azul-electrico py-2 rounded-lg text-gray-400 hover:text-white transition duration-300"
            >
              ← Volver al Login
            </button>
          </div>
        ) : (
          // FORMULARIO DE AUTENTICACIÓN SMS (LOGIN NORMAL)
          <div className="space-y-4">
            <div className="text-center mb-4">
              <span className="text-3xl mb-2 block">📱</span>
              <h3 className="text-xl font-bold text-white">Verificación en Dos Pasos</h3>
              <p className="text-gray-300 text-sm">Hemos enviado un código a tu teléfono</p>
            </div>

            {!codeSent ? (
              <button
                onClick={sendSMSCode}
                className="w-full bg-azul-electrico hover:bg-azul-claro py-3 rounded-lg font-bold text-black transition duration-300"
              >
                Enviar Código SMS
              </button>
            ) : (
              <>
                <div>
                  <input
                    type="text"
                    placeholder="Ingresa el código de 6 dígitos"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico text-center text-lg"
                    maxLength={6}
                  />
                </div>
                <button
                  onClick={handleSMSVerification}
                  className="w-full bg-green-500 hover:bg-green-400 py-3 rounded-lg font-bold text-black transition duration-300"
                >
                  ✅ Verificar Código
                </button>
                <p className="text-center text-gray-400 text-sm">
                  💡 Código de prueba: <strong>123456</strong>
                </p>
              </>
            )}

            <button
              onClick={() => setShowSMSAuth(false)}
              className="w-full bg-gray-600 hover:bg-gray-500 py-2 rounded-lg text-white transition duration-300"
            >
              ← Volver
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-400">
          <p><strong>Demo Admin:</strong> admin@gmail.com / levelup2024</p>
          <p className="mt-2"><strong>Código Login:</strong> 123456 | <strong>Código Recuperación:</strong> 654321</p>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-azul-claro hover:text-azul-electrico text-sm">
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;