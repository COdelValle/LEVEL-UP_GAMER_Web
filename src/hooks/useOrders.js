import { useState, useEffect, useCallback, useRef } from 'react';
import { getOrders as getStoredOrders } from '../utils/ordersStorage';
import createAPI from '../lib/APIHelper';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const api = createAPI(import.meta.env.VITE_API_URL || '');

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

    // Intentar obtener desde backend; si falla, usar datos locales (mock + localStorage)
    timerRef.current = setTimeout(async () => {
      try {
        const data = await api.get('/api/v1/ordenes');
        let list = Array.isArray(data) ? data : [];
        const stored = getStoredOrders();
        list = [...stored, ...list];

        if (!userId) {
          setOrders(list);
        } else {
          const filtered = list.filter(o => {
            if (!o) return false;
            if (o.usuarioId && String(o.usuarioId) === String(userId)) return true;
            if (o.usuario && o.usuario.id && String(o.usuario.id) === String(userId)) return true;
            if (o.infoEnvio && o.infoEnvio.email && typeof userId === 'string') return o.infoEnvio.email === userId;
            return false;
          });
          setOrders(filtered);
        }
      } catch (err) {
        console.warn('useOrders: error al obtener ordenes desde backend, usando mocks/localStorage', err);
        const stored = getStoredOrders();
        const merged = [...stored, ...mockOrders];
        if (!userId) setOrders(merged);
        else {
          const filtered = merged.filter(o => {
            if (!o) return false;
            if (o.userId && String(o.userId) === String(userId)) return true;
            if (o.user && o.user.id && String(o.user.id) === String(userId)) return true;
            if (o.shipping && o.shipping.email && typeof userId === 'string') return o.shipping.email === userId;
            return false;
          });
          setOrders(filtered);
        }
      } finally {
        setLoading(false);
        timerRef.current = null;
      }
    }, 500);
  }, []);

  const createOrder = useCallback(async (orderPayload) => {
    setLoading(true);
    try {
      // Construir payload según DTO CreateOrdenRequest del backend
      const shipping = orderPayload.shipping || orderPayload.shippingInfo || {};
      const itemsForBackend = (orderPayload.items || [])
        .map(i => ({
          productoId: i.productoId ?? i.id ?? (i.producto && (i.producto.productoId ?? i.producto.id)) ?? null,
          cantidad: i.cantidad ?? i.quantity ?? i.qty ?? 1
        }))
        .map(it => ({ productoId: Number(it.productoId), cantidad: Number(it.cantidad) }))
        .filter(it => Number.isFinite(it.productoId) && it.productoId > 0 && Number.isFinite(it.cantidad) && it.cantidad > 0);

      if (!itemsForBackend.length) {
        console.error('useOrders.createOrder: payload tiene items inválidos o vacíos', orderPayload.items);
        throw new Error('No hay items válidos para crear la orden');
      }

      // Sanitizar teléfono: backend acepta solo dígitos entre 7 y 15
      const rawTelefono = (shipping.telefono || shipping.telefonoEnvio || orderPayload.telefono || '') + '';
      const telefonoDigits = (rawTelefono || '').toString().replace(/\D/g, '');
      let telefonoFinal = telefonoDigits;
      if (!(telefonoFinal && telefonoFinal.length >= 7 && telefonoFinal.length <= 15)) {
        console.warn('useOrders.createOrder: telefono inválido o con formato, se aplicará fallback', { rawTelefono, telefonoDigits });
        // fallback seguro que cumple validación (9 dígitos)
        telefonoFinal = '000000000';
      }

      const backendPayload = {
        items: itemsForBackend,
        metodoPago: orderPayload.metodoPago || orderPayload.metodo || 'transferencia',
        nombreEnvio: shipping.nombre || shipping.nombreEnvio || orderPayload.nombre || (orderPayload.user && orderPayload.user.nombre) || 'Cliente',
        apellidoEnvio: shipping.apellido || shipping.apellidoEnvio || orderPayload.apellido || '',
        telefonoEnvio: telefonoFinal,
        direccionEnvio: shipping.direccion || shipping.direccionEnvio || orderPayload.direccion || '',
        ciudadEnvio: shipping.ciudad || shipping.ciudadEnvio || orderPayload.ciudad || '',
        regionEnvio: shipping.region || shipping.regionEnvio || orderPayload.region || '',
        codigoPostal: shipping.codigoPostal || orderPayload.codigoPostal || '000000',
        observaciones: orderPayload.observaciones || '',
        email: shipping.email || orderPayload.email || (orderPayload.user && orderPayload.user.email) || '',
        pais: shipping.pais || 'Chile',
        comuna: shipping.comuna || '',
        departamentoEnvio: shipping.departamentoEnvio || '' ,
        usuarioId: orderPayload.userId || orderPayload.usuarioId || null
      };

      // Intentar crear la orden en el backend
      console.debug('useOrders.createOrder: enviando payload al backend', backendPayload);
      const created = await api.post('/api/v1/ordenes', backendPayload);

      // Si backend devuelve algo útil (ej. objeto con id), añadir al estado local
      const newOrder = created || { ...orderPayload, ...backendPayload };
      setOrders(prev => [newOrder, ...prev]);

      // Persistir en storage local como fallback/registro inmediato
      try {
        const { addOrder } = await import('../utils/ordersStorage');
        addOrder(newOrder);
      } catch (err) {
        console.warn('useOrders.createOrder: no se pudo persistir en storage local', err);
      }

      return newOrder;
    } catch (err) {
      // Mostrar detalles del error retornado por el backend para depuración
      console.warn('useOrders.createOrder: fallo al crear orden en backend, usando fallback local', err);
      try {
        console.error('useOrders.createOrder: status=', err.status, 'body=', err.body);
      } catch (e) {
        console.error('useOrders.createOrder: error indefinido', e);
      }
      const fallback = { ...orderPayload, id: orderPayload.id || `ORDER${Date.now()}` };
      setOrders(prev => [fallback, ...prev]);
      try {
        const { addOrder } = await import('../utils/ordersStorage');
        addOrder(fallback);
      } catch (e) {
        console.warn('useOrders.createOrder: error al guardar fallback en storage', e);
      }
      return fallback;
    } finally {
      setLoading(false);
    }
  }, [api]);

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
    getOrdersByUser,
    createOrder
  };
};