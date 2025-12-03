import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrders as getStoredOrders, addOrder as storeOrder } from '../utils/ordersStorage';

// Single implementation: try backend API when available, otherwise use local storage + mocks
export const useOrders = () => {
  const { api, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  const mockOrders = [
    {
      id: 1,
      fecha: new Date('2024-01-15').toISOString(),
      total: 699990,
      estado: 'completado',
      metodoPago: 'tarjeta',
      items: [ { nombre: 'PlayStation 5', cantidad: 1, precio: 699990 } ]
    },
    {
      id: 2,
      fecha: new Date('2024-01-10').toISOString(),
      total: 299990,
      estado: 'pendiente',
      metodoPago: 'transferencia',
      items: [ { nombre: 'Monitor Gaming 27"', cantidad: 1, precio: 299990 } ]
    }
  ];

  // Load initial orders (local + mocks)
  useEffect(() => {
    const stored = getStoredOrders();
    setOrders([...stored, ...mockOrders]);
    setLoading(false);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // getOrdersByUser: when using API attempt to fetch, otherwise filter local stored orders
  const getOrdersByUser = useCallback(async (userId) => {
    setLoading(true);
    if (timerRef.current) clearTimeout(timerRef.current);

    // If API available, try to fetch from backend
    if (api) {
      try {
        if (user && (user.role === 'admin' || (user.rol && user.rol.toLowerCase() === 'admin'))) {
          const res = await api.get('/api/v1/ordenes');
          setOrders(Array.isArray(res) ? res : (res?.data || []));
        } else {
          const res = await api.get(`/api/v1/ordenes?usuarioId=${userId || user?.id || ''}`);
          setOrders(Array.isArray(res) ? res : (res?.data || []));
        }
        setLoading(false);
        return;
      } catch (err) {
        console.warn('useOrders: api fetch failed, falling back to local', err?.message || err);
      }
    }

    // Fallback: simulate delay and filter local stored orders
    timerRef.current = setTimeout(() => {
      const stored = getStoredOrders();
      const merged = [...stored, ...mockOrders];
      if (!userId) {
        setOrders(merged);
      } else {
        const filtered = merged.filter(o => {
          if (!o) return false;
          if (o.userId && String(o.userId) === String(userId)) return true;
          if (o.user && o.user.id && String(o.user.id) === String(userId)) return true;
          if (o.shipping && o.shipping.email && String(o.shipping.email) === String(userId)) return true;
          return false;
        });
        setOrders(filtered);
      }
      setLoading(false);
      timerRef.current = null;
    }, 350);
  }, [api, user]);

  // Listen to global ordersUpdated event so multiple hook instances stay in sync
  useEffect(() => {
    const onUpdated = () => {
      // Re-fetch orders for current user (best-effort)
      getOrdersByUser(user?.id);
    };

    window.addEventListener('ordersUpdated', onUpdated);
    return () => window.removeEventListener('ordersUpdated', onUpdated);
  }, [getOrdersByUser, user]);

  const createOrder = async (orderPayload) => {
    // Try api first
    if (api) {
      try {
        const created = await api.post('/api/v1/ordenes', orderPayload);
        setOrders(prev => [...(prev || []), created]);
        try { window.dispatchEvent(new Event('ordersUpdated')); } catch(_) {}
        return created;
      } catch (err) {
        console.warn('useOrders.createOrder: api failed, storing locally', err?.message || err);
      }
    }

    // Fallback: store in localStorage
    const created = { ...orderPayload, id: `LOCAL-${Date.now()}`, fecha: new Date().toISOString() };
    try {
      storeOrder(created);
      setOrders(prev => [...(prev || []), created]);
      try { window.dispatchEvent(new Event('ordersUpdated')); } catch(_) {}
    } catch (e) {
      console.error('useOrders.createOrder: failed to store locally', e);
    }
    return created;
  };

  const getOrderById = (id) => {
    return orders.find(o => String(o.id) === String(id) || String(o.orderId) === String(id));
  };

  return {
    orders,
    loading,
    getOrdersByUser,
    createOrder,
    getOrderById
  };
};