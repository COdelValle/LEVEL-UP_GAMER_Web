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

export default {
  getOrders,
  saveOrders,
  addOrder
};
