import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('electrowave_cart') || '[]'));
  useEffect(() => localStorage.setItem('electrowave_cart', JSON.stringify(items)), [items]);
  const add = (product) => setItems(prev => {
    const found = prev.find(x => x.id === product.id);
    if (found) return prev.map(x => x.id === product.id ? { ...x, quantity: x.quantity + 1 } : x);
    return [...prev, { ...product, quantity: 1 }];
  });
  const increase = (id) => setItems(prev => prev.map(x => x.id === id ? { ...x, quantity: x.quantity + 1 } : x));
  const decrease = (id) => setItems(prev => prev.flatMap(x => x.id !== id ? x : (x.quantity <= 1 ? [] : [{ ...x, quantity: x.quantity - 1 }])));
  const remove = (id) => setItems(prev => prev.filter(x => x.id !== id));
  const clear = () => setItems([]);
  const subtotal = items.reduce((sum, x) => sum + x.price * x.quantity, 0);
  const count = items.reduce((sum, x) => sum + x.quantity, 0);
  const value = useMemo(() => ({ items, add, increase, decrease, remove, clear, subtotal, count }), [items, subtotal, count]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { return useContext(CartContext); }
