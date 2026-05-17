import React, { createContext, useContext, useState, useEffect } from "react";
import { getShoppingCart } from "../../api/endpoints/cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartSize, setCartSize] = useState(0);

  const fetchCart = async () => {
    try {
      const cartData = await getShoppingCart();
      const backendCartItems = cartData?.cartItems || [];
      return backendCartItems.length;

    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const updateCartSize = () => {
    const loggedIn = localStorage.getItem("loggedInUser") !== null;
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartSize = loggedIn ? fetchCart() : cartItems.reduce((sum, item) => sum + item.quantity, 0)
      setCartSize(cartSize);
  };

  useEffect(() => {
    updateCartSize();
  }, []);

  return (
    <CartContext.Provider value={{ cartSize, updateCartSize }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
