import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useProducts = () => {
  const [products, setProducts] = useLocalStorage('products', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar productos iniciales si no existen
  useEffect(() => {
    if (products.length === 0) {
      loadInitialProducts();
    }
  }, []);

  const loadInitialProducts = async () => {
    setLoading(true);
    try {
      // Simular carga de datos iniciales
      setTimeout(() => {
        const initialProducts = [
          {
            id: 1,
            nombre: "PlayStation 5",
            precio: 699990,
            categoria: "consolas",
            imagen: "/assets/img/PlayStation5.png",
            descripcion: "La última consola de Sony con tecnología de vanguardia",
            stock: 15,
            destacado: true,
            nuevo: false,
            especificaciones: {
              "Almacenamiento": "825GB SSD",
              "Resolución": "4K",
              "Características": "Ray Tracing, 120Hz"
            }
          },
          {
            id: 2,
            nombre: "Nintendo Switch Lite",
            precio: 249990,
            categoria: "consolas",
            imagen: "/assets/img/SwitchLite.png",
            descripcion: "Consola portátil perfecta para gaming on-the-go",
            stock: 25,
            destacado: false,
            nuevo: true,
            especificaciones: {
              "Pantalla": "5.5 pulgadas",
              "Batería": "3-7 horas",
              "Colores": "Disponible en múltiples colores"
            }
          },
          {
            id: 3,
            nombre: "PC Gamer ASUS ROG Strix",
            precio: 1299990,
            categoria: "pc-gamers",
            imagen: "/assets/img/AsusRogStrix.png",
            descripcion: "Potente PC gaming para los más exigentes",
            stock: 8,
            destacado: true,
            nuevo: false,
            especificaciones: {
              "Procesador": "Intel i7-13700K",
              "GPU": "RTX 4070",
              "RAM": "32GB DDR5"
            }
          },
          {
            id: 4,
            nombre: "Audífonos HyperX Cloud II",
            precio: 89990,
            categoria: "perifericos",
            imagen: "/assets/img/HyperXCloud2.png",
            descripcion: "Audífonos gaming con sonido surround 7.1",
            stock: 30,
            destacado: false,
            nuevo: true,
            especificaciones: {
              "Conectividad": "USB y 3.5mm",
              "Micrófono": "Desmontable con cancelación de ruido",
              "Compatibilidad": "PC, PS4, PS5, Xbox, Switch"
            }
          },
          {
            id: 5,
            nombre: "Silla Gaming SecretLab Titan",
            precio: 499990,
            categoria: "sillas",
            imagen: "/assets/img/SecretLabTitan.png",
            descripcion: "Silla gaming ergonómica de alta gama",
            stock: 12,
            destacado: true,
            nuevo: false,
            especificaciones: {
              "Material": "Cuero sintético premium",
              "Ajustes": "Altura, inclinación, apoyabrazos 4D",
              "Garantía": "5 años"
            }
          }
        ];
        setProducts(initialProducts);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

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