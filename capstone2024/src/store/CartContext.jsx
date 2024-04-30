import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [cart, setCart] = useState(initialCart);

  const [itemAmount, setItemAmount] = useState(0);
  
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  useEffect(() => {

    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, id) => {
    const amount = 'amount' in product?product.amount:1
    const newItem = { ...product, amount: amount };

    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const setInitialCart = (cart)=>{
    setCart(cart);
  }
  
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + 1 };
      } else {
        return item;
      }
    });
    setCart(newCart);
  };

  const decreaseAmount = (id) => {
    const newCart = cart.map((item) => {
      if (item.id === id && item.amount > 1) {
        return { ...item, amount: item.amount - 1 };
      } else {
        return item;
      }
    });
    setCart(newCart.filter((item) => item.amount > 0));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
        setInitialCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

