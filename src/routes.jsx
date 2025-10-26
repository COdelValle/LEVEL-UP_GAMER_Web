import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy } from 'react';
import PageTransition from './components/common/PageTransition';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load components
// Páginas públicas
const Home = lazy(() => import('./pages/public/Home'));
const Products = lazy(() => import('./pages/public/Productos/Products'));
const ProductDetail = lazy(() => import("./pages/public/Productos/ProductDetail.jsx"));
const Nosotros = lazy(() => import('./pages/public/Nosotros'));
const Login = lazy(() => import('./pages/public/Session/Login'));
const Register = lazy(() => import('./pages/public/Session/Register'));
const Blogs = lazy(() => import('./pages/public/Blog/Blogs'));
const BlogDetail = lazy(() => import('./pages/public/Blog/BlogDetail'));
const Categorias = lazy(() => import('./pages/public/Categoria/Categorias'))
const CategoriaDetail = lazy(() => import('./pages/public/Categoria/CategoriaDetail'))
const Cart = lazy(() => import('./pages/public/Compra/Cart'))
const Comprar = lazy(() => import('./pages/public/Compra/Comprar'))
const CompraDetail = lazy(() => import('./pages/public/Compra/CompraDetail'))
const Ofertas = lazy(() => import('./pages/public/Productos/Ofertas'))

// Páginas Administración
const AdminHome = lazy(() => import('./pages/admin/AdminHome'))
const BoletaDetail = lazy(() => import('./pages/admin/Boleta/BoletaDetail'))
const Boletas = lazy(() => import('./pages/admin/Boleta/Boletas'))
const CategoriasAdmin = lazy(() => import('./pages/admin/Categoria/Categorias.jsx'))
const NuevaCategoria = lazy(() => import('./pages/admin/Categoria/NuevaCategoria.jsx'))
const EditarCategoria = lazy(() => import('./pages/admin/Categoria/EditarCategoria.jsx'))
const VerProducto = lazy(() => import('./pages/admin/Productos/VerProducto.jsx'))
const NuevoProducto = lazy(() => import('./pages/admin/Productos/NuevoProducto'))
const EditarProducto = lazy(() => import('./pages/admin/Productos/EditarProducto.jsx'))
const Perfil = lazy(() => import('./pages/admin/Perfil'))
const ProductosCriticos = lazy(() => import('./pages/admin/AdminHome'))
const Reportes = lazy(() => import('./pages/admin/Reportes.jsx'))
const ReportesProductos = lazy(() => import('./pages/admin/Productos/ReportesProductos.jsx'))
const Usuarios = lazy(() => import('./pages/admin/Usuario/Usuarios.jsx'))
const VerUsuarios = lazy(() => import('./pages/admin/Usuario/VerUsuarios.jsx'))
const NuevoUsuario = lazy(() => import('./pages/admin/Usuario/NuevoUsuario.jsx'))
const EditarUsuario = lazy(() => import('./pages/admin/Usuario/EditarUsuario.jsx'))
const HistorialCompras = lazy(() => import('./pages/admin/Usuario/HistorialCompras'))


const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes location={location} key={location.pathname}>
          {/* Rutas públicas */}
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/productos" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/producto/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="/blogs" element={<PageTransition><Blogs /></PageTransition>} />
          <Route path="/nosotros" element={<PageTransition><Nosotros /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/registro" element={<PageTransition><Register /></PageTransition>} />
          <Route path="/blog/:id" element={<PageTransition><BlogDetail /></PageTransition>} />
          <Route path="/categorias" element={<PageTransition><Categorias /></PageTransition>} />
          <Route path="/categorias/:id" element={<PageTransition><CategoriaDetail /></PageTransition>} />
          <Route path="/carrito" element={<PageTransition><Cart /></PageTransition>} />
          <Route path="/comprar" element={<PageTransition><Comprar /></PageTransition>} />
          <Route path="/comprar/:id" element={<PageTransition><CompraDetail /></PageTransition>} />
          <Route path="/ofertas" element={<PageTransition><Ofertas /></PageTransition>} />
          
          {/* Rutas Administración */}
          <Route path="/admin" element={<PageTransition><AdminHome /></PageTransition>} />
          <Route path="/admin/boletas/:id" element={<PageTransition><BoletaDetail /></PageTransition>} />
          <Route path="/admin/boletas" element={<PageTransition><Boletas /></PageTransition>} />
          <Route path="/admin/categorias" element={<PageTransition><CategoriasAdmin /></PageTransition>} />
          <Route path="/admin/categorias/nueva-categoria" element={<PageTransition><NuevaCategoria /></PageTransition>} />
          <Route path="/admin/categorias/:id/editar-categoria" element={<PageTransition><EditarCategoria /></PageTransition>} />
          <Route path="/admin/productos/:id" element={<PageTransition><VerProducto /></PageTransition>} />
          <Route path="/admin/productos/nuevo-producto" element={<PageTransition><NuevoProducto /></PageTransition>} />
          <Route path="/admin/productos/:id/editar-producto" element={<PageTransition><EditarProducto /></PageTransition>} />
          <Route path="/admin/perfil" element={<PageTransition><Perfil /></PageTransition>} />
          <Route path="/admin/productos/criticos" element={<PageTransition><ProductosCriticos /></PageTransition>} />
          <Route path="/admin/productos/reportes" element={<PageTransition><ReportesProductos /></PageTransition>} />
          <Route path="/admin/reportes" element={<PageTransition><Reportes /></PageTransition>} />
          <Route path="/admin/usuarios" element={<PageTransition><Usuarios /></PageTransition>} />
          <Route path="/admin/usuarios/nuevo-usuario" element={<PageTransition><NuevoUsuario /></PageTransition>} />
          <Route path="/admin/usuarios/:id/editar-usuario" element={<PageTransition><EditarUsuario /></PageTransition>} />
          <Route path="/admin/usuario/:id" element={<PageTransition><VerUsuarios /></PageTransition>} />
          <Route path="/admin/usuario/:id/historial-compras" element={<PageTransition><HistorialCompras /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRoutes;