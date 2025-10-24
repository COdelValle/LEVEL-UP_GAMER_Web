function ProductModal({ producto, onClose }) {
  const base = import.meta.env.BASE_URL || '/';
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <img
          src={`${base}assets/img/${producto.imagen}`}
          alt={producto.nombre}
          className="mb-4"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `${base}assets/img/placeholder.svg`; }}
        />
        <h2 className="text-xl font-bold">{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <button onClick={onClose} className="mt-4 bg-negro text-white px-4 py-2 rounded">
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ProductModal;
