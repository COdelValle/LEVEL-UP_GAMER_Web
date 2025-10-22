import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy } from 'react';
import PageTransition from './components/common/PageTransition';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Cart = lazy(() => import('./pages/Cart'));

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
          <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
          
          {/* Rutas temporales - redirigen a páginas existentes */}
          <Route path="/admin" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/admin/nuevo-producto" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/admin/usuarios" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/admin/usuario/:id" element={<PageTransition><Home /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRoutes;