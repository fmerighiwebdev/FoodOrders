import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function MealItem({ meal }) {
  const { total, setCart, setTotal } = useContext(CartContext);

  const imageURL = `http://localhost:3000/${meal.image}`;

  function handleAddToCart() {
    setCart((prevCart) => [...prevCart, meal]);
    setTotal((prevValue) => Number(prevValue) + Number(meal.price));
    console.log(total);
  }

  return (
    <div className="meal-item">
      <article>
        <img src={imageURL} alt="Meal Photo"></img>
        <h3>{meal.name}</h3>
        <p className="meal-item-price">${meal.price}</p>
        <p className="meal-item-description">{meal.description}</p>
        <div className="meal-item-actions">
          <button className="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </article>
    </div>
  );
}

export default MealItem;
