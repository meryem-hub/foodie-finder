import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Buttons/button';

export const FavoriteButton = ({ meal }) => {
  const mealId = meal.idMeal;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(mealId));
  }, [mealId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let updated;

    if (favorites.includes(mealId)) {
      updated = favorites.filter(id => id !== mealId);
    } else {
      updated = [...favorites, mealId];
    }

    localStorage.setItem('favorites', JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  return (
    <Button
      variant={isFavorite ? 'destructive' : 'outline'}
      onClick={toggleFavorite}
      className="flex items-center gap-2 px-4 py-2 text-xs font-medium"
    >
      {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
    </Button>
  );
};
