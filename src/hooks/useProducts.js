import { useState, useEffect } from 'react';
import productosData from '../assets/data/productos.json';
import createAPI from '../lib/APIHelper';
import { useAuth } from '../context/AuthContext';

export const useProducts = () => {
  const [products, setProducts] = useState(productosData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Preferir la instancia `api` del AuthContext (tendrá token si el usuario está autenticado)
  let api;
  try {
    const auth = useAuth();
    api = auth?.api || createAPI(import.meta.env.VITE_API_URL || '');
  } catch (e) {
    // Si no estamos dentro de un AuthProvider (p. ej. en tests), crear instancia propia
    api = createAPI(import.meta.env.VITE_API_URL || '');
  }

  const addProduct = async (product) => {
    // intentar crear en backend, si falla usar fallback local
    try {
      const payload = {
        nombre: product.nombre,
        precio: Number(product.precio),
        categoria: product.categoria,
        descripcion: product.descripcion,
        stock: Number(product.stock),
        imagen: product.imagen,
        destacado: !!product.destacado,
        nuevo: !!product.nuevo
      };
      const created = await api.post('/api/v1/productos', payload);
      // si backend devuelve el recurso, actualizar estado
      if (created) {
        setProducts(prev => [...prev, created]);
        return created;
      }
    } catch (err) {
      console.warn('useProducts.addProduct: fallo backend, usando fallback local', err);
      try { console.error('useProducts.addProduct: status=', err.status, 'body=', err.body); } catch(_){}
    }

    // Fallback local si algo falla
    const newProduct = {
      ...product,
      id: Date.now(),
      fechaCreacion: new Date().toISOString()
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const payload = {
        nombre: updatedProduct.nombre,
        precio: Number(updatedProduct.precio),
        categoria: updatedProduct.categoria,
        descripcion: updatedProduct.descripcion,
        stock: Number(updatedProduct.stock),
        imagen: updatedProduct.imagen,
        destacado: !!updatedProduct.destacado,
        nuevo: !!updatedProduct.nuevo
      };
      const res = await api.put(`/api/v1/productos/${id}`, payload);
      if (res) {
        setProducts(prev => prev.map(product => product.id === id ? res : product));
        return res;
      }
    } catch (err) {
      console.warn('useProducts.updateProduct: fallo backend, aplicando update local', err);
    }

    // Fallback local
    setProducts(prev => 
      prev.map(product => 
        String(product.id) === String(id) 
          ? { ...product, ...updatedProduct, fechaActualizacion: new Date().toISOString() }
          : product
      )
    );
    return getProductById(id);
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/api/v1/productos/${id}`);
      setProducts(prev => prev.filter(product => String(product.id) !== String(id)));
      return true;
    } catch (err) {
      console.warn('useProducts.deleteProduct: fallo backend, aplicando delete local', err);
      setProducts(prev => prev.filter(product => String(product.id) !== String(id)));
      return false;
    }
  };

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    if (!category) return products;
    return products.filter(product => product.categoria === category);
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.destacado);
  };

  const getNewProducts = () => {
    return products.filter(product => product.nuevo);
  };

  const searchProducts = (query) => {
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
      product.nombre.toLowerCase().includes(lowerQuery) ||
      product.descripcion.toLowerCase().includes(lowerQuery) ||
      product.categoria.toLowerCase().includes(lowerQuery)
    );
  };

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await api.get('/api/v1/productos');
        if (mounted && Array.isArray(data)) setProducts(data);
      } catch (err) {
        // fallback a datos locales si el backend no está disponible
        console.warn('useProducts: error al obtener productos desde backend, usando datos locales', err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => { mounted = false; };
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    getNewProducts,
    searchProducts
  };
};