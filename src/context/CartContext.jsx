import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartContextProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    return (
        <CartContext.Provider value={{ cart, setCart, total, setTotal }}>
            {children}
        </CartContext.Provider>
    );
}