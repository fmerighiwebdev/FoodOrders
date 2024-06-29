import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";

import CartItem from "./CartItem";
import CheckoutInput from "./CheckoutInput";

const CartModal = forwardRef(function CartModal(
  { setIsModalOpen, type, setType },
  ref
) {
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    street: "",
    "postal-code": "",
    city: "",
  });
  const [error, setError] = useState("");
  const { cart, total, setCart } = useContext(CartContext);

  const modalRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      openModal() {
        modalRef.current.showModal();
      },
      closeModal() {
        modalRef.current.close();
      },
    };
  });

  function closeOrder() {
    if (type === "success") {
      setCart([]);
    }
    setIsModalOpen(false);
    setType("cart");
  }

  function changeType() {
    setType("checkout");
  }

  function handleChanges(event) {
    setCustomerDetails((prevValue) => {
      return {
        ...prevValue,
        [event.target.name]: event.target.value,
      };
    });
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const order = {
      items: cart,
      customer: customerDetails,
    };

    try {
      await axios.post("http://localhost:3000/orders", {
        order,
      });
      setType("success");
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return createPortal(
    <dialog ref={modalRef} className="cart">
      {type === "cart" ? (
        <>
          <h2>Your Cart</h2>
          {cart.length > 0 ? (
            <>
              <ul>
                {cart.map((item) => {
                  return <CartItem key={item.id} item={item} />;
                })}
              </ul>
              <div className="cart-total">
                <p>${total}</p>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="text-button"
                  onClick={closeOrder}
                >
                  Close
                </button>
                <button type="button" className="button" onClick={changeType}>
                  Go to Checkout
                </button>
              </div>
            </>
          ) : (
            <>
              <p>There are no items in your cart.</p>
              <div className="modal-actions">
                <button
                  type="button"
                  className="text-button"
                  onClick={closeOrder}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </>
      ) : type === "checkout" ? (
        <>
          <h2>Checkout</h2>
          <p className="total-amount">Total Amount: ${total}</p>
          {error && <p className="error">{error}</p>}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <CheckoutInput
              className="checkout-input"
              name="name"
              type="text"
              onChange={handleChanges}
            >
              Full Name
            </CheckoutInput>
            <CheckoutInput
              className="checkout-input"
              name="email"
              type="email"
              onChange={handleChanges}
            >
              Email Address
            </CheckoutInput>
            <CheckoutInput
              className="checkout-input"
              name="street"
              type="text"
              onChange={handleChanges}
            >
              Street
            </CheckoutInput>
            <div className="checkout-row">
              <CheckoutInput
                className="checkout-column-input"
                name="postal-code"
                type="text"
                onChange={handleChanges}
              >
                Postal Code
              </CheckoutInput>
              <CheckoutInput
                className="checkout-column-input"
                name="city"
                type="text"
                onChange={handleChanges}
              >
                City
              </CheckoutInput>
            </div>
            <div className="modal-actions" style={{ marginTop: "2rem" }}>
              <button
                type="button"
                className="text-button"
                onClick={closeOrder}
              >
                Close
              </button>
              <button type="submit" className="button">
                Submit Order
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2>Success!</h2>
          <p>Your order was submitted succesfully.</p>
          <p>We will get back to you with more details via email within the next few minutes.</p>
          <div className="modal-actions" style={{ marginTop: "2rem" }}>
            <button type="button" className="button" onClick={closeOrder}>
              Okay
            </button>
          </div>
        </>
      )}
    </dialog>,
    document.getElementById("cart-modal-root")
  );
});

export default CartModal;
