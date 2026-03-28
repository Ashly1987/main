import { seedProducts } from './seedProducts';

// ─── Keys ────────────────────────────────────────────────────────────────────
const KEYS = {
  products: 'kb_products',
  orders: 'kb_orders',
  settings: 'kb_settings',
};

// ─── Generic helpers ─────────────────────────────────────────────────────────
const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// ─── Products ────────────────────────────────────────────────────────────────
const defaultSettings = {
  storeName: 'Kiln Bakers',
  storeAddress: '12, Baker Street, Chennai – 600001',
  storePhone: '+91 98765 43210',
  taxRate: 5,          // percent
  upiId: 'kilnbakers@upi',
  upiName: 'Kiln Bakers',
};

export const productService = {
  getAll() {
    const stored = load(KEYS.products, null);
    if (!stored) {
      save(KEYS.products, seedProducts);
      return seedProducts;
    }
    return stored;
  },
  save(products) {
    save(KEYS.products, products);
  },
  add(product) {
    const products = this.getAll();
    const newProduct = { ...product, id: `p_${Date.now()}` };
    const updated = [...products, newProduct];
    this.save(updated);
    return newProduct;
  },
  update(id, changes) {
    const products = this.getAll().map(p => (p.id === id ? { ...p, ...changes } : p));
    this.save(products);
  },
  delete(id) {
    const products = this.getAll().filter(p => p.id !== id);
    this.save(products);
  },
};

// ─── Orders ──────────────────────────────────────────────────────────────────
export const orderService = {
  getAll() {
    return load(KEYS.orders, []);
  },
  save(orders) {
    save(KEYS.orders, orders);
  },
  add(order) {
    const orders = this.getAll();
    const newOrder = {
      ...order,
      id: `ord_${Date.now()}`,
      billNo: `KB-${String(orders.length + 1).padStart(4, '0')}`,
      createdAt: new Date().toISOString(),
    };
    this.save([...orders, newOrder]);
    return newOrder;
  },
  getByMonth(year, month) {
    // month is 1-indexed
    return this.getAll().filter(o => {
      const d = new Date(o.createdAt);
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    });
  },
};

// ─── Settings ────────────────────────────────────────────────────────────────
export const settingsService = {
  get() {
    return load(KEYS.settings, defaultSettings);
  },
  save(settings) {
    save(KEYS.settings, { ...this.get(), ...settings });
  },
};
