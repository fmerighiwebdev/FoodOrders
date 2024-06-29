import React, { useContext, useEffect, useState, useRef } from "react";

import foodAppLogo from "../assets/logo.jpg";
import { CartContext } from "../context/CartContext";
import OrderModal from "./OrderModal";

function Header() {
  const { cart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("cart");

  const modalRef = useRef(null);

  const cartItems = cart.length;

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.openModal();
    }
  }, [isModalOpen]);
  useEffect(() => {
    if (!isModalOpen && modalRef.current) {
      modalRef.current.closeModal();
    }
  }, [isModalOpen]);

  function openCart() {
    setIsModalOpen(true);
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
      {isModalOpen && (
        <OrderModal ref={modalRef} setIsModalOpen={setIsModalOpen} type={modalType} setType={setModalType} />
      )}
    </>
  );
}

export default Header;
