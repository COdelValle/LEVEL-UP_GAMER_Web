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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, api, authenticate } = useAuth();
  const navigate = useNavigate();

  // Función para validar RUT chileno
  const validateRUT = (rut) => {
    if (!rut) return false;
    
    // Limpiar RUT
    const cleanRUT = rut.replace(/[^0-9kK]/g, '');
    if (cleanRUT.length < 2) return false;

    const body = cleanRUT.slice(0, -1);
    const dv = cleanRUT.slice(-1).toUpperCase();

    // Calcular dígito verificador
    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body.charAt(i)) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const calculatedDV = 11 - (sum % 11);
    const expectedDV = calculatedDV === 11 ? '0' : calculatedDV === 10 ? 'K' : calculatedDV.toString();

    return dv === expectedDV;
  };

  // Función para formatear RUT
  const formatRUT = (rut) => {
    // Eliminar todo excepto números y K
    let cleanRUT = rut.replace(/[^0-9kK]/g, '');
    
    if (cleanRUT.length === 0) return '';
    
    // Separar cuerpo y dígito verificador
    let body = cleanRUT.slice(0, -1);
    const dv = cleanRUT.slice(-1).toUpperCase();
    
    // Formatear cuerpo con puntos
    if (body.length > 0) {
      body = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    
    return body + '-' + dv;
  };

  // Función para formatear teléfono
  const formatPhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length === 0) return '';
    
    if (cleanPhone.length <= 4) {
      return cleanPhone;
    } else if (cleanPhone.length <= 8) {
      return `${cleanPhone.slice(0, 4)} ${cleanPhone.slice(4)}`;
    } else {
      return `+56 9 ${cleanPhone.slice(0, 4)} ${cleanPhone.slice(4, 8)}`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Aplicar formato según el campo
    if (name === 'rut') {
      formattedValue = formatRUT(value);
    } else if (name === 'telefono') {
      formattedValue = formatPhone(value);
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue
    });

    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validar campos al perder el foco
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Email inválido';
        } else {
          delete newErrors.email;
        }
        break;

      case 'rut':
        if (!value) {
          newErrors.rut = 'El RUT es requerido';
        } else if (!validateRUT(value)) {
          newErrors.rut = 'RUT inválido';
        } else {
          delete newErrors.rut;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'La contraseña es requerida';
        } else if (value.length < 6) {
          newErrors.password = 'Mínimo 6 caracteres';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case 'telefono':
        if (!value) {
          newErrors.telefono = 'El teléfono es requerido';
        } else if (value.replace(/\D/g, '').length < 9) {
          newErrors.telefono = 'Teléfono inválido';
        } else {
          delete newErrors.telefono;
        }
        break;

      default:
        if (!value) {
          newErrors[name] = 'Este campo es requerido';
        } else {
          delete newErrors[name];
        }
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validaciones requeridas
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!formData.nickname.trim()) newErrors.nickname = 'El nickname es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.rut.trim()) newErrors.rut = 'El RUT es requerido';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirma tu contraseña';

    // Validaciones específicas
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.rut && !validateRUT(formData.rut)) {
      newErrors.rut = 'RUT inválido';
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (formData.telefono && formData.telefono.replace(/\D/g, '').length < 9) {
      newErrors.telefono = 'Teléfono inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Intentar registrar en el backend primero
      try {
        const newUserPayload = {
          nombre: formData.nombre,
          rut: formData.rut,
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.confirmPassword
        };

        // Endpoint: /api/v1/auth/register
        const res = await api.post('/api/v1/auth/register', newUserPayload);

        // Si el registro fue exitoso, intentar autenticar (obtener token)
        await authenticate(formData.email, formData.password);

        navigate('/');
        return;
      } catch (err) {
        console.warn('Backend register failed, falling back to local:', err.message || err);
      }

      // Fallback local: verificar si el email ya existe
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(user => 
        user.email === formData.email || user.rut === formData.rut
      );

      if (existingUser) {
        if (existingUser.email === formData.email) {
          setErrors({ email: 'Este email ya está registrado' });
        } else {
          setErrors({ rut: 'Este RUT ya está registrado' });
        }
        setLoading(false);
        return;
      }

      // Crear nuevo usuario localmente
      const newUser = {
        ...formData,
        id: Date.now(),
        role: 'user',
        fechaRegistro: new Date().toISOString(),
        activo: true
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Iniciar sesión automáticamente (local)
      login({ 
        id: newUser.id,
        nombre: formData.nombre,
        apellido: formData.apellido,
        username: formData.nickname, 
        email: formData.email,
        role: 'user',
        rut: formData.rut,
        telefono: formData.telefono
      });

      navigate('/');
      
    } catch (error) {
      console.error('Error en el registro:', error);
      setErrors({ general: 'Error al crear la cuenta. Intenta nuevamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-azul-oscuro to-black py-12 px-4">
      <div className="register-container max-w-md w-full bg-[#0f1e3a] border-2 border-azul-electrico rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">👤</span>
          <h2 className="text-3xl font-bold gradient-text font-orbitron mb-2">
            Crear Cuenta
          </h2>
          <p className="text-gray-300">Únete a la comunidad Level-Up Gamer</p>
        </div>

        {errors.general && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg mb-4 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 rounded bg-[#1a2d4a] text-white border transition duration-300 ${
                  errors.nombre ? 'border-red-500' : 'border-azul-electrico focus:ring-2 focus:ring-azul-electrico'
                } focus:outline-none`}
                required
              />
              {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
            </div>
            <div>
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 rounded bg-[#1a2d4a] text-white border transition duration-300 ${
                  errors.apellido ? 'border-red-500' : 'border-azul-electrico focus:ring-2 focus:ring-azul-electrico'
                } focus:outline-none`}
                required
              />
              {errors.apellido && <p className="text-red-400 text-xs mt-1">{errors.apellido}</p>}
            </div>
          </div>

          <div>
            <input
              type="text"
              name="rut"
              placeholder="RUT (se formatea automáticamente)"
              value={formData.rut}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 rounded bg-[#1a2d4a] text-white border transition duration-300 ${
                errors.rut ? 'border-red-500' : 'border-azul-electrico focus:ring-2 focus:ring-azul-electrico'
              } focus:outline-none`}
              required
            />
            {errors.rut && <p className="text-red-400 text-xs mt-1">{errors.rut}</p>}
          </div>

          <div>
            <input
              type="text"
              name="nickname"
              placeholder="Nickname"
              value={formData.nickname}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 rounded bg-[#1a2d4a] text-white border transition duration-300 ${
                errors.nickname ? 'border-red-500' : 'border-azul-electrico focus:ring-2 focus:ring-azul-electrico'
              } focus:outline-none`}
              required
            />
            {errors.nickname && <p className="text-red-400 text-xs mt-1">{errors.nickname}</p>}
          </div>

          <div>
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono (se formatea automáticamente)"
              value={formData.telefono}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 rounded bg-[#1a2d4a] text-white border transition duration-300 ${
                errors.telefono ? 'border-red-500' : 'border-azul-electrico focus:ring-2 focus:ring-azul-electrico'
              } focus:outline-none`}
              required
            />
            {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 rounded bg-[#1a2d4a] text-white border transition duration-300 ${
                errors.email ? 'border-red-500' : 'border-azul-electrico focus:ring-2 focus:ring-azul-electrico'
              } focus:outline-none`}
              required
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Contraseña (mínimo 6 caracteres)"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 rounded bg-[#1a2d4a] text-white border transition duration-300 ${
                errors.password ? 'border-red-500' : 'border-azul-electrico focus:ring-2 focus:ring-azul-electrico'
              } focus:outline-none`}
              required
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 rounded bg-[#1a2d4a] text-white border transition duration-300 ${
                errors.confirmPassword ? 'border-red-500' : 'border-azul-electrico focus:ring-2 focus:ring-azul-electrico'
              } focus:outline-none`}
              required
            />
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || Object.keys(errors).length > 0}
            className="w-full bg-azul-electrico hover:bg-azul-claro py-3 rounded-lg font-bold text-black transition duration-300 font-orbitron disabled:opacity-50 disabled:cursor-not-allowed"
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