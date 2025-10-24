// /src/components/admin/BasicAdminPage.jsx
import { useNavigate } from 'react-router-dom';

const BasicAdminPage = ({ title, description }) => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#0f1e3a] border-2 border-azul-electrico rounded-xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold gradient-text mb-4">{title}</h1>
          <p className="text-gray-300 mb-6">{description}</p>
          <p className="text-gray-400 text-sm mb-6">
            ⚠️ Esta sección está en desarrollo. Próximamente tendrás todas las funcionalidades.
          </p>
          
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/admin')}
              className="bg-azul-electrico hover:bg-azul-claro px-6 py-3 rounded-lg text-black font-bold transition duration-300"
            >
              ← Volver al Dashboard
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded-lg text-white transition duration-300"
            >
              🔄 Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicAdminPage;