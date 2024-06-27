import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function MealItem({ meal }) {
  const { addItemToCart } = useContext(CartContext);

  const imageURL = `http://localhost:3000/${meal.image}`;
  const imageAlt = `${meal.name} Photo`;

  return (
    <div className="meal-item">
      <article>
        <img src={imageURL} alt={imageAlt}></img>
        <h3>{meal.name}</h3>
        <p className="meal-item-price">${meal.price}</p>
        <p className="meal-item-description">{meal.description}</p>
        <div className="meal-item-actions">
          <button className="button" onClick={() => addItemToCart(meal)}>
            Add to Cart
          </button>
        </div>
      </article>
    </div>
  );
}

export default MealItem;
