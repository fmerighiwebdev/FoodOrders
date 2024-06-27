import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

function CartItem({ item }) {
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);

  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x ${item.price}
      </p>
      <div className="cart-item-actions">
        <button onClick={() => removeItemFromCart(item)}>-</button>
        <p>{item.quantity}</p>
        <button onClick={() => addItemToCart(item)}>+</button>
      </div>
    </li>
  );
}

export default CartItem;
