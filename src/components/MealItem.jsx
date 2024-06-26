import React from 'react'

function MealItem({ meal }) {

    const imageURL = `http://localhost:3000/${meal.image}`;

  return (
    <div className="meal-item">
      <article>
        <img src={imageURL} alt="Meal Photo"></img>
        <h3>{meal.name}</h3>
        <p className="meal-item-price">${meal.price}</p>
        <p className="meal-item-description">{meal.description}</p>
        <div className='meal-item-actions'>
            <button className='button'>Add to Cart</button>
        </div>
      </article>
    </div>
  );
}

export default MealItem