// Cart.jsx - Componente del carrito de compras
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { formatPrice } from '../../../utils/formatters';
import BackButton from '../../../components/common/BackButton';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black py-12 pt-32">
      <div className="max-w-4xl mx-auto px-4">
        <BackButton />
        <div className="card-gaming p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Carrito Vacío</h2>
            <p className="text-gray-300 mb-6">No hay productos en tu carrito</p>
            <Link to="/productos" className="btn-primary">
              Seguir Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black py-12 pt-32"> {/* Cambiado pt-24 por pt-32 */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="card-gaming p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold gradient-text">Tu Carrito</h2>
            <button
              onClick={clearCart}
              className="btn-secondary text-sm"
            >
              Vaciar Carrito
            </button>
          </div>

          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={(item.imagen && (item.imagen.startsWith('http') || item.imagen.startsWith('/'))) ? item.imagen : `/assets/img/${item.imagen}`}
                    alt={item.nombre}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{item.nombre}</h3>
                    <p className="text-gray-300">{formatPrice(item.precio)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600"
                    >
                      -
                    </button>
                    <span className="text-white w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-white font-bold w-20 text-right">
                    {formatPrice(item.precio * item.quantity)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-white">Total:</span>
              <span className="text-2xl font-bold gradient-text">
                {formatPrice(getCartTotal())}
              </span>
            </div>

            <Link to="/checkout" className="btn-primary w-full py-4 text-lg text-center block">
              Proceder al Pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;