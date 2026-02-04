import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  months: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  paymentMethod: 'cartao' | 'boleto' | 'pix';
  total: number;
  createdAt: Date;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, months: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateMonths: (productId: string, months: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  createOrder: (paymentMethod: 'cartao' | 'boleto' | 'pix') => Order;
  orders: Order[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cenemed_cart');
    const storedOrders = localStorage.getItem('cenemed_orders');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cenemed_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('cenemed_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product, quantity: number, months: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, months }
            : item
        );
      }
      
      return [...prevItems, { product, quantity, months }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateMonths = (productId: string, months: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, months } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity * item.months,
      0
    );
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const createOrder = (paymentMethod: 'cartao' | 'boleto' | 'pix'): Order => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: [...items],
      paymentMethod,
      total: getTotal(),
      createdAt: new Date(),
    };
    
    setOrders((prevOrders) => [...prevOrders, order]);
    clearCart();
    
    return order;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateMonths,
        clearCart,
        getTotal,
        getItemCount,
        createOrder,
        orders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
