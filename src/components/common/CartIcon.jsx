// /src/components/common/CartIcon.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartIcon = () => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <Link to="/carrito" className="relative flex items-center text-white hover:text-azul-claro transition-colors">
      <span className="text-2xl">🛒</span>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;