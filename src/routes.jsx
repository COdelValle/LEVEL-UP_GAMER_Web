import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Nosotros from './pages/Nosotros';
import Login from './pages/Login';
import Register from './pages/Register';
import Blogs from './pages/Blogs'; 
import BlogDetail from './pages/BlogDetail';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Products />} />
      <Route path="/producto/:id" element={<ProductDetail />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/blog/:id" element={<BlogDetail />} /> {/* ✅ Solo una vez */}
      
      {/* Rutas temporales - redirigen a páginas existentes */}
      <Route path="/admin" element={<Home />} />
      <Route path="/admin/nuevo-producto" element={<Home />} />
      <Route path="/admin/usuarios" element={<Home />} />
      <Route path="/admin/usuario/:id" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;