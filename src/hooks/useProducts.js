import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export const useProducts = () => {
  const { api } = useAuth();
  const apiRef = useRef(api);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Actualizar la referencia cuando cambie api
  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Cargar productos directamente de la BD a través de la API
        const res = await apiRef.current.get('/api/v1/productos');
        if (!mounted) return;
        setProducts(Array.isArray(res) ? res : (res?.data || []));
        setError(null);
      } catch (err) {
        console.error('useProducts: Error cargando productos de la BD', err?.message || err);
        if (mounted) setProducts([]);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => { mounted = false; };
  }, []);

  // Operaciones que intentan usar API y si fallan actúan localmente
  const addProduct = async (product) => {
    try {
      const created = await apiRef.current.post('/api/v1/productos', product);
      setProducts(prev => [...prev, created]);
      return created;
    } catch (err) {
      console.warn('addProduct: API failed, adding locally', err?.message || err);
      const newProduct = { ...product, id: Date.now(), fechaCreacion: new Date().toISOString() };
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const res = await apiRef.current.put(`/api/v1/productos/${id}`, updatedProduct);
      setProducts(prev => prev.map(p => (p.id === id ? res : p)));
      return res;
    } catch (err) {
      console.warn('updateProduct: API failed, updating locally', err?.message || err);
      setProducts(prev => prev.map(product => product.id === id ? { ...product, ...updatedProduct, fechaActualizacion: new Date().toISOString() } : product));
      return { ...updatedProduct, id };
    }
  };

  const deleteProduct = async (id) => {
    try {
      await apiRef.current.delete(`/api/v1/productos/${id}`);
      setProducts(prev => prev.filter(product => product.id !== id));
      return true;
    } catch (err) {
      console.warn('deleteProduct: API failed, deleting locally', err?.message || err);
      setProducts(prev => prev.filter(product => product.id !== id));
      return false;
    }
  };

  const getProductById = (id) => {
    return products.find(product => parseInt(product.id) === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    if (!category) return products;
    return products.filter(product => (product.categoria || product.category || '').toString() === category.toString());
  };

  const getFeaturedProducts = () => products.filter(product => product.destacado || product.featured);
  const getNewProducts = () => products.filter(product => product.nuevo || product.isNew);

  const searchProducts = (query) => {
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(product => {
      const name = (product.nombre || product.name || '').toString().toLowerCase();
      const desc = (product.descripcion || product.description || '').toString().toLowerCase();
      const cat = (product.categoria || product.category || '').toString().toLowerCase();
      return name.includes(lowerQuery) || desc.includes(lowerQuery) || cat.includes(lowerQuery);
    });
  };

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