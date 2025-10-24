import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy } from 'react';
import PageTransition from './components/common/PageTransition';
import LoadingSpinner from './components/common/LoadingSpinner';
import AdminLayout from './components/admin/AdminLayout';

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
const Comprar = lazy(() => import('./pages/public/Compra/Comprar'));
const CompraDetail = lazy(() => import('./pages/public/Compra/CompraDetail'));
const Ofertas = lazy(() => import('./pages/public/Productos/Ofertas'));

// Carrito y compras
const Cart = lazy(() => import('./pages/public/Compra/Cart'));
const Checkout = lazy(() => import('./pages/public/Compra/Checkout'));
const Payment = lazy(() => import('./pages/public/Compra/Payment'));

// Páginas Administración
const AdminHome = lazy(() => import('./pages/admin/AdminHome'));
const NuevoProducto = lazy(() => import('./pages/admin/Productos/NuevoProducto'));
const Reportes = lazy(() => import('./pages/admin/Reporte/Reportes'));
const ReportesProductos = lazy(() => import('./pages/admin/Reporte/ReportesProductos'));
const Usuarios = lazy(() => import('./pages/admin/Usuario/Usuarios'));
const ProductosCriticos = lazy(() => import('./pages/admin/Productos/ProductosCriticos'));

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
          <Route path="/comprar" element={<PageTransition><Comprar /></PageTransition>} />
          <Route path="/comprar/:id" element={<PageTransition><CompraDetail /></PageTransition>} />
          <Route path="/ofertas" element={<PageTransition><Ofertas /></PageTransition>} />
          
          {/* ========== CARRITO Y PAGOS ========== */}
          <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
          <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
          <Route path="/payment" element={<PageTransition><Payment /></PageTransition>} />
          
          {/* ========== RUTAS DE ADMINISTRACIÓN ========== */}
          {/* Dashboard */}
          <Route path="/admin" element={
            <AdminLayout>
              <PageTransition><AdminHome /></PageTransition>
            </AdminLayout>
          } />
          
          {/* Productos */}
          <Route path="/admin/productos/nuevo-producto" element={
            <AdminLayout>
              <PageTransition><NuevoProducto /></PageTransition>
            </AdminLayout>
          } />
          
          <Route path="/admin/productos/criticos" element={
            <AdminLayout>
              <PageTransition><ProductosCriticos /></PageTransition>
            </AdminLayout>
          } />
          
          <Route path="/admin/productos/reportes" element={
            <AdminLayout>
              <PageTransition><ReportesProductos /></PageTransition>
            </AdminLayout>
          } />
          
          {/* Reportes */}
          <Route path="/admin/reportes" element={
            <AdminLayout>
              <PageTransition><Reportes /></PageTransition>
            </AdminLayout>
          } />
          
          {/* Usuarios */}
          <Route path="/admin/usuarios" element={
            <AdminLayout>
              <PageTransition><Usuarios /></PageTransition>
            </AdminLayout>
          } />
          
          {/* Rutas temporales - usar BasicAdminPage para las que no existen */}
          <Route path="/admin/boletas" element={
            <AdminLayout>
              <PageTransition>
                <BasicAdminPage 
                  title="Gestión de Boletas" 
                  description="Administra y visualiza todas las boletas de venta."
                />
              </PageTransition>
            </AdminLayout>
          } />
          
          <Route path="/admin/boletas/:id" element={
            <AdminLayout>
              <PageTransition>
                <BasicAdminPage 
                  title="Detalle de Boleta" 
                  description="Detalle completo de la boleta seleccionada."
                />
              </PageTransition>
            </AdminLayout>
          } />
          
          <Route path="/admin/usuario/:id/historial-compras" element={
            <AdminLayout>
              <PageTransition>
                <BasicAdminPage 
                  title="Historial de Compras" 
                  description="Historial completo de compras del usuario."
                />
              </PageTransition>
            </AdminLayout>
          } />
          
          <Route path="/admin/perfil" element={
            <AdminLayout>
              <PageTransition>
                <BasicAdminPage 
                  title="Perfil de Administrador" 
                  description="Gestiona tu perfil y configuración."
                />
              </PageTransition>
            </AdminLayout>
          } />
          
          <Route path="/admin/usuario/:id" element={
            <AdminLayout>
              <PageTransition>
                <BasicAdminPage 
                  title="Detalle de Usuario" 
                  description="Información detallada del usuario."
                />
              </PageTransition>
            </AdminLayout>
          } />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRoutes;