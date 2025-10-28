import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy } from 'react';
import PageTransition from './components/common/PageTransition';
import LoadingSpinner from './components/common/LoadingSpinner';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedAdminRoute from './components/common/ProtectedAdminRoute';

// Lazy load components
// Páginas públicas
const Home = lazy(() => import('./pages/public/Home'));
const Products = lazy(() => import('./pages/public/Productos/Products'));
const ProductDetail = lazy(() => import('./pages/public/Productos/ProductDetail'));
const Nosotros = lazy(() => import('./pages/public/Nosotros'));
const Login = lazy(() => import('./pages/public/Session/Login'));
const Register = lazy(() => import('./pages/public/Session/Register'));
const Blogs = lazy(() => import('./pages/public/Blog/Blogs'));
const BlogDetail = lazy(() => import('./pages/public/Blog/BlogDetail'));
const Categorias = lazy(() => import('./pages/public/Categoria/Categorias'));
const CategoriaDetail = lazy(() => import('./pages/public/Categoria/CategoriaDetail'));
const Cart = lazy(() => import('./pages/public/Compra/Cart'));
const Checkout = lazy(() => import('./pages/public/Compra/Checkout'));
const Payment = lazy(() => import('./pages/public/Compra/Payment'));
const Comprar = lazy(() => import('./pages/public/Compra/Comprar'));
const CompraDetail = lazy(() => import('./pages/public/Compra/CompraDetail'));
const Ofertas = lazy(() => import('./pages/public/Productos/Ofertas'));
const Profile = lazy(() => import('./pages/public/Session/Profile'));
const Boleta = lazy(() => import('./pages/public/Compra/Boleta'));

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
const ProductosCriticos = lazy(() => import('./pages/admin/Productos/ProductosCriticos'))
const Reportes = lazy(() => import('./pages/admin/Reporte/Reportes.jsx'))
const ReportesProductos = lazy(() => import('./pages/admin/Productos/ReportesProductos.jsx'))
const Usuarios = lazy(() => import('./pages/admin/Usuario/Usuarios.jsx'))
const VerUsuarios = lazy(() => import('./pages/admin/Usuario/VerUsuarios.jsx'))
const NuevoUsuario = lazy(() => import('./pages/admin/Usuario/NuevoUsuario.jsx'))
const EditarUsuario = lazy(() => import('./pages/admin/Usuario/EditarUsuario.jsx'))
const HistorialCompras = lazy(() => import('./pages/admin/Usuario/HistorialCompras'))

// Componentes básicos para rutas que no existen aún
const BasicAdminPage = lazy(() => import('./components/admin/BasicAdminPage'));

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes location={location} key={location.pathname}>
          {/* ========== RUTAS PÚBLICAS ========== */}
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/productos" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/producto/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="/blogs" element={<PageTransition><Blogs /></PageTransition>} />
          <Route path="/blog/:id" element={<PageTransition><BlogDetail /></PageTransition>} />
          <Route path="/nosotros" element={<PageTransition><Nosotros /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/registro" element={<PageTransition><Register /></PageTransition>} />
          <Route path="/categorias" element={<PageTransition><Categorias /></PageTransition>} />
          <Route path="/categorias/:id" element={<PageTransition><CategoriaDetail /></PageTransition>} />
          <Route path="/ofertas" element={<PageTransition><Ofertas /></PageTransition>} />
          <Route path="/perfil" element={<PageTransition><Profile /></PageTransition>} /> {/* ✅ NUEVA RUTA */}
          
          {/* ========== CARRITO Y PROCESO DE COMPRA ========== */}
          {/* Rutas del carrito */}
          <Route path="/carrito" element={<PageTransition><Cart /></PageTransition>} />
          
          {/* Proceso de pago */}
          <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
          <Route path="/payment" element={<PageTransition><Payment /></PageTransition>} />
          
          {/* Proceso de compra */}
          <Route path="/comprar" element={<PageTransition><Comprar /></PageTransition>} />
          <Route path="/comprar/:id" element={<PageTransition><CompraDetail /></PageTransition>} />
          <Route path="/boleta" element={<PageTransition><Boleta /></PageTransition>} />
          
          {/* ========== RUTAS DE ADMINISTRACIÓN ========== */}
          {/* Dashboard */}
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition><AdminHome /></PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          {/* Productos */}
          <Route path="/admin/productos/nuevo-producto" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition><NuevoProducto /></PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/productos/criticos" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition><ProductosCriticos /></PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/productos/reportes" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition><ReportesProductos /></PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          {/* Reportes */}
          <Route path="/admin/reportes" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition><Reportes /></PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          {/* Usuarios */}
          <Route path="/admin/usuarios" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition><Usuarios /></PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          {/* Rutas temporales - usar BasicAdminPage para las que no existen */}
          <Route path="/admin/boletas" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition>
                  <BasicAdminPage 
                    title="Gestión de Boletas" 
                    description="Administra y visualiza todas las boletas de venta."
                  />
                </PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/boletas/:id" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition>
                  <BasicAdminPage 
                    title="Detalle de Boleta" 
                    description="Detalle completo de la boleta seleccionada."
                  />
                </PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/usuario/:id/historial-compras" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition>
                  <BasicAdminPage 
                    title="Historial de Compras" 
                    description="Historial completo de compras del usuario."
                  />
                </PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/perfil" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition>
                  <BasicAdminPage 
                    title="Perfil de Administrador" 
                    description="Gestiona tu perfil y configuración."
                  />
                </PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/usuario/:id" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition>
                  <BasicAdminPage 
                    title="Detalle de Usuario" 
                    description="Información detallada del usuario."
                  />
                </PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          {/* Categorías */}
          <Route path="/admin/categorias" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition><CategoriasAdmin /></PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/categorias/nueva-categoria" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition><NuevaCategoria /></PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/categorias/:id/editar-categoria" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition><EditarCategoria /></PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />

          {/* Productos */}
          <Route path="/admin/productos/:id" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition><VerProducto /></PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/productos/:id/editar-producto" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition><EditarProducto /></PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />

          {/* Usuarios */}
          <Route path="/admin/usuarios/nuevo-usuario" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition><NuevoUsuario /></PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/usuarios/:id/editar-usuario" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <PageTransition><EditarUsuario /></PageTransition>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRoutes;