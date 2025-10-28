import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    telefono: ''
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

    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    // Guardar en localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = {
      ...formData,
      id: Date.now(),
      role: 'user'
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Iniciar sesión automáticamente
    login({ 
      username: formData.nickname, 
      email: formData.email,
      role: 'user' 
    });
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-azul-oscuro to-black py-12 px-4">
      {/* RECUADRO DE FONDO */}
      <div className="register-container max-w-md w-full bg-[#0f1e3a] border-2 border-azul-electrico rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">👤</span>
          <h2 className="text-3xl font-bold gradient-text font-orbitron mb-2">
            Crear Cuenta
          </h2>
          <p className="text-gray-300">Únete a la comunidad Level-Up Gamer</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico transition duration-300"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico transition duration-300"
                required
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              name="rut"
              placeholder="RUT (sin puntos y con guión)"
              value={formData.rut}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico transition duration-300"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="nickname"
              placeholder="Nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico transition duration-300"
              required
            />
          </div>

          <div>
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono (+56 9 XXXXXXXX)"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1a2d4a] text-white border border-azul-electrico focus:outline-none focus:ring-2 focus:ring-azul-electrico transition duration-300"
              required
            />
          </div>

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

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
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
            {loading ? 'Creando cuenta...' : '🚀 Crear Cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-azul-claro hover:text-azul-electrico">
              Inicia sesión aquí
            </Link>
          </p>
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

export default Register;