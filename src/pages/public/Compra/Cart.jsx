import { useCart } from '../../../context/CartContext';
import { formatPrice } from '../../../utils/formatters';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cartItems.reduce((s, i) => s + (i.precio || 0) * (i.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-oscuro to-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 gradient-text font-orbitron">Tu Carrito</h1>

        {cartItems.length === 0 ? (
          <div className="card-gaming p-8 text-center">
            <p className="text-gray-300 mb-4">Tu carrito está vacío.</p>
            <Link to="/productos" className="btn-primary">Ver Productos</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="card-gaming p-4 flex items-center gap-4">
                  <img src={item.imagen} alt={item.nombre} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{item.nombre}</h3>
                    <p className="text-gray-300">{formatPrice(item.precio)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity || 1}
                        onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value || '1')))}
                        className="w-20 rounded bg-gray-800 px-2 py-1 text-white"
                      />
                      <button onClick={() => removeFromCart(item.id)} className="btn-secondary">Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-gaming p-6">
              <h3 className="text-xl font-bold mb-4">Resumen</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Subtotal</span>
                <span className="font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex flex-col gap-3">
                <button className="btn-primary">Proceder al pago</button>
                <button className="btn-secondary" onClick={() => clearCart()}>Vaciar carrito</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
