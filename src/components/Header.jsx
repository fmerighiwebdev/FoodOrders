import React, { useContext, useEffect, useState, useRef } from 'react';

import foodAppLogo from '../assets/logo.jpg';
import { CartContext } from '../context/CartContext';
import CartModal from './CartModal';

function Header() {

  const { cart } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartModalRef = useRef(null);

  const cartItems = cart.length;

  useEffect(() => {
    if (isCartOpen && cartModalRef.current) {
      cartModalRef.current.openModal();
    }
  }, [isCartOpen]);
  useEffect(() => {
    if (!isCartOpen && cartModalRef.current) {
      cartModalRef.current.closeModal();
    }
  }, [isCartOpen]);

  function openCart() {
    setIsCartOpen(true);
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={foodAppLogo} alt="Food App Logo"></img>
          <h1>REACTFOOD</h1>
        </div>
        <button onClick={openCart}>Cart ({cartItems})</button>
      </header>
      {isCartOpen && <CartModal ref={cartModalRef} setIsCartOpen={setIsCartOpen} />}
    </>
  );
}

export default Header