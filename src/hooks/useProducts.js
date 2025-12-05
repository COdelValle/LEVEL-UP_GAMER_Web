import { useState, useEffect } from 'react';
import productosData from '../assets/data/productos.json';
import createAPI from '../lib/APIHelper';

export const useProducts = () => {
  const [products, setProducts] = useState(productosData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = createAPI(import.meta.env.VITE_API_URL || '');

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      fechaCreacion: new Date().toISOString()
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id 
          ? { ...product, ...updatedProduct, fechaActualizacion: new Date().toISOString() }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
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