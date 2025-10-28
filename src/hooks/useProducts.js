import { useState, useEffect } from 'react';
import productosData from '../assets/data/productos.json';

export const useProducts = () => {
  const [products, setProducts] = useState(productosData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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