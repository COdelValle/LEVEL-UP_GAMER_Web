// /src/components/common/BackButton.jsx
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300"
    >
      ← Volver
    </button>
  );
};

export default BackButton;