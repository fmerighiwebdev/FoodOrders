import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  function addItemToCart(item) {
    setCart((prevCart) => {
      // Controllo se l'elemento è già stato aggiunto al carrello
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Se è già presente nell'array (già aggiunto al carrello), allora aggiorno la sua quantità
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Altrimenti ritorno prevCart ("vecchio" carrello) e aggiungo il nuovo elemento con quantità 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    // Aggiorno il totale del carrello
    setTotal((prevTotal) => {
      const itemPrice = parseFloat(item.price);
      return !isNaN(itemPrice)
        ? Math.round((prevTotal + itemPrice) * 100) / 100
        : prevTotal;
    });
  }

  function removeItemFromCart(item) {
    setCart((prevCart) => {
      // Controllo se l'elemento si trova nel carrello
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      // Controllo se la quantità dell'elemento è 1
      if (existingItem.quantity === 1) {
        // Se è 1, allora tolgo l'elemento dall'array (rimuovo dal carrello)
        return prevCart.filter((cartItem) => cartItem.id !== item.id);
      } else {
        // Altrimenti, diminuisco la sua quantità di 1
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
    });
    // Aggiorno il totale del carrello
    setTotal((prevTotal) => {
      const itemPrice = parseFloat(item.price);
      return !isNaN(itemPrice)
        ? Math.round((prevTotal - itemPrice) * 100) / 100
        : prevTotal;
    });
  }

  return (
    // Rendo disponibile il contesto del carrello a {children} tramite il Provider
    <CartContext.Provider
      value={{
        cart,
        setCart,
        total,
        setTotal,
        addItemToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
