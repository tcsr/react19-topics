import React, { createContext, useContext, useState, useMemo } from 'react';

// Domain Entities
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderSummary {
  totalAmount: number;
  totalItems: number;
  timestamp?: string;
}

// Context Interface
export interface CartContextType {
  cart: CartItem[];
  purchaseSuccess: boolean;
  lastOrderSummary: OrderSummary | null;
  totalItems: number;
  totalAmount: number;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  purchase: () => boolean;
}

// Backward-compatibility type aliases
export type CartState = { items: CartItem[] };
export type CartAction = { type: string };

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);
  const [lastOrderSummary, setLastOrderSummary] = useState<OrderSummary | null>(null);

  // Derived metrics (Computed on the fly)
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  // 1. Add item: increments quantity if exists, otherwise appends
  const addItem = (product: Product) => {
    setPurchaseSuccess(false);
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // 2. Remove item by id
  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // 3. Increase quantity
  const increaseQuantity = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // 4. Decrease quantity: drops item if quantity reaches 0
  const decreaseQuantity = (id: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // 5. Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // 6. Checkout / Purchase
  const purchase = (): boolean => {
    if (cart.length === 0) return false;

    setLastOrderSummary({
      totalAmount,
      totalItems,
      timestamp: new Date().toLocaleTimeString()
    });
    setPurchaseSuccess(true);
    setCart([]);
    return true;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        purchaseSuccess,
        lastOrderSummary,
        totalItems,
        totalAmount,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        purchase
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook with fail-safe guard
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
