import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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

    // Simular autenticación
    setTimeout(() => {
      if (formData.email === 'admin' && formData.password === 'levelup2024') {
        login({ username: 'Admin', role: 'admin' });
        navigate('/admin');
      } else {
        // Lógica para usuarios normales
        login({ username: formData.email, role: 'user' });
        navigate('/');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-azul-oscuro to-black py-12 px-4">
      <div className="login-container max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🔐</span>
          <h2 className="text-3xl font-bold gradient-text font-orbitron mb-2">
            Login de LEVEL-UP
          </h2>
          <p className="text-gray-300">Accede con tus credenciales</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#0f1e3a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico transition duration-300"
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
              className="w-full p-3 rounded bg-[#0f1e3a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico transition duration-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-azul-electrico hover:bg-azul-claro py-3 rounded-lg font-bold text-black transition duration-300 font-orbitron disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : '🚀 Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p><strong>Demo Admin:</strong> admin / levelup2024</p>
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