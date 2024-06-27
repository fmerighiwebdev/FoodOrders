import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";

const CartModal = forwardRef(function CartModal({ setIsCartOpen }, ref) {
  const { cart, total } = useContext(CartContext);

  const cartModalRef = useRef(null);

  const truncTotal = total.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    roundingMode: "trunc",
  });

  useImperativeHandle(ref, () => {
    return {
      openModal() {
        cartModalRef.current.showModal();
      },
      closeModal() {
        cartModalRef.current.close();
      },
    };
  });

  function closeCart() {
    setIsCartOpen(false);
  }

  return createPortal(
    <dialog ref={cartModalRef} className="cart">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })}
          </ul>
          <div className="cart-total">
            <p>${truncTotal}</p>
          </div>
          <div className="modal-actions">
            <button type="button" className="text-button" onClick={closeCart}>Close</button>
            <button type="button" className="button">Go to Checkout</button>
          </div>
        </>
      ) : (
        <>
          <p>There are no items in your cart.</p>
          <div className="modal-actions">
            <button type="button" onClick={closeCart}>Close</button>
          </div>
        </>
      )}
    </dialog>,
    document.getElementById("cart-modal-root")
  );
});

export default CartModal;
