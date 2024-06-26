import React, { useEffect, useState } from "react";
import axios from "axios";

import MealItem from "./MealItem";

function MealsMenu() {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [mealsLoading, setMealsLoading] = useState(true);

  useEffect(() => {
    async function getAvailableMeals() {
      try {
        const response = await axios.get("http://localhost:3000/meals");
        setAvailableMeals(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setMealsLoading(false);
      }
    }

    getAvailableMeals();
  }, []);

  return (
    <main id="meals">
      {mealsLoading && (
        <section className="loading">
          <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </section>
      )}
      {availableMeals.length > 0 ? (
        availableMeals.map((meal) => {
          return <MealItem key={meal.id} meal={meal} />;
        })
      ) : (
        <p className="no-meals-text">
          There's no available meals to order. We're sorry.
        </p>
      )}
    </main>
  );
}

export default MealsMenu;
