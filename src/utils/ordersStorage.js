// Utilities to persist orders in localStorage
const STORAGE_KEY = 'orders';

export const getOrders = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) : [];
    return stored;
  } catch (e) {
    console.error('Error reading orders from localStorage', e);
    return [];
  }
};

export const saveOrders = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to localStorage', e);
  }
};

export const addOrder = (order) => {
  const current = getOrders();
  // ensure id uniqueness if numeric or string
  current.unshift(order);
  saveOrders(current);
  return order;
};

export const updateOrder = (orderId, updates) => {
  try {
    const current = getOrders();
    const idx = current.findIndex(o => String(o.id) === String(orderId));
    if (idx === -1) return null;
    const updated = { ...current[idx], ...updates };
    current[idx] = updated;
    saveOrders(current);
    return updated;
  } catch (e) {
    console.error('Error updating order', e);
    return null;
  }
};

export default {
  getOrders,
  saveOrders,
  addOrder
};
