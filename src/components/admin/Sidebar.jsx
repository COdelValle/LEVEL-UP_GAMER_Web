import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="bg-azul-oscuro text-white w-64 p-4 space-y-4">
      <h2 className="font-bold text-lg">Admin</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/nuevo-producto">Nuevo Producto</Link>
        <Link to="/admin/usuarios">Usuarios</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
