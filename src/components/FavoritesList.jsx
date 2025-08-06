import React, { useEffect, useState } from 'react';
import MealCard from './MealCard';

export const FavoritesList = ({ meals }) => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
    const filtered = meals.filter(meal => favoriteIds.includes(meal.idMeal));
    setFavoriteMeals(filtered);
  }, [meals]);

  if (favoriteMeals.length === 0) {
    return <p className="text-center text-muted-foreground">You haven’t added any favorites yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favoriteMeals.map(meal => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
};
