import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false); 

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === product.id);
      if (itemIndex > -1) {
        // Jika produk sudah ada, update quantity
        const newItems = [...prevItems];
        newItems[itemIndex].qty += 1;
        return newItems;
      } else {
        // Jika produk belum ada, tambahkan sebagai item baru
        return [...prevItems, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQty = (id, newQty) => {
    if (newQty <= 0) {
        removeFromCart(id); 
    } else {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, qty: newQty } : item
            )
        );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      showCart, 
      setShowCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
