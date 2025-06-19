import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  function addToCart(product) {
    setCartItems((prev) => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setShowCart(true); 
  }

  function removeFromCart(id) {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  function updateQty(id, qty) {
    setCartItems((prev) =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    showCart,
    setShowCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
