import { useState, useEffect, useCallback, useRef } from 'react';
import { getOrders as getStoredOrders } from '../utils/ordersStorage';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simular datos de pedidos - reemplazar con tu API real
  const mockOrders = [
    {
      id: 1,
      fecha: new Date('2024-01-15'),
      total: 699990,
      estado: 'completado',
      metodoPago: 'tarjeta',
      items: [
        { nombre: 'PlayStation 5', cantidad: 1, precio: 699990 }
      ]
    },
    {
      id: 2,
      fecha: new Date('2024-01-10'),
      total: 299990,
      estado: 'pendiente',
      metodoPago: 'transferencia',
      items: [
        { nombre: 'Monitor Gaming 27"', cantidad: 1, precio: 299990 }
      ]
    }
  ];

  const timerRef = useRef(null);

  const getOrdersByUser = useCallback(async (userId) => {
    setLoading(true);

    // clear any previous pending timer to avoid overlapping calls
    if (timerRef.current) clearTimeout(timerRef.current);

    // Simular llamada API
    timerRef.current = setTimeout(() => {
      // merge stored orders (from localStorage) with mock orders
      const stored = getStoredOrders();
      const merged = [...stored, ...mockOrders];

      if (!userId) {
        setOrders(merged);
      } else {
        // filter by userId or email if provided
        const filtered = merged.filter(o => {
          if (!o) return false;
          if (o.userId && String(o.userId) === String(userId)) return true;
          if (o.user && o.user.id && String(o.user.id) === String(userId)) return true;
          if (o.shipping && o.shipping.email && typeof userId === 'string') return o.shipping.email === userId;
          return false;
        });
        setOrders(filtered);
      }
      setLoading(false);
      timerRef.current = null;
    }, 500);
  }, []);

  useEffect(() => {
    // Cargar pedidos iniciales desde localStorage + mocks
    const stored = getStoredOrders();
    setOrders([...stored, ...mockOrders]);
    setLoading(false);

    return () => {
      // cleanup any pending timer
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return {
    orders,
    loading,
    getOrdersByUser
  };
};