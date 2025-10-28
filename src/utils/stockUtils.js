// Función para calcular el nivel de stock crítico
export const getStockLevel = (stock, stockMinimo) => {
  if (stock === 0) return 'agotado';
  if (stock <= stockMinimo) return 'critico';
  if (stock <= stockMinimo * 2) return 'bajo';
  return 'normal';
};

// Función para filtrar productos críticos
export const getProductosCriticos = (productos) => {
  return productos.filter(producto => {
    const nivel = getStockLevel(producto.stock, producto.stockMinimo || 5);
    return nivel === 'critico' || nivel === 'agotado';
  });
};

// Función para obtener el texto y color del estado del stock
export const getStockStatus = (stock, stockMinimo) => {
  const nivel = getStockLevel(stock, stockMinimo);
  
  const estados = {
    agotado: {
      texto: 'Agotado',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500'
    },
    critico: {
      texto: 'Stock Crítico',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500'
    },
    bajo: {
      texto: 'Stock Bajo',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500'
    },
    normal: {
      texto: 'Stock Normal',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500'
    }
  };

  return estados[nivel];
};