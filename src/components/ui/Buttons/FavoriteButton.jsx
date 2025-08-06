import { useEffect, useState, useContext } from "react";
import { Button } from "@/components/ui/Buttons/button";

import { FavoriteMealsContext } from "@/contexts/FavouriteMealsContext";

export const FavoriteButton = ({ meal }) => {
    const mealId = meal.idMeal;

    const { favoriteMeals, setFavoriteMeals, storeFavoriteMeals } =
        useContext(FavoriteMealsContext);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(Boolean(favoriteMeals[mealId]));
    }, [mealId]);

    const toggleFavorite = () => {
        setFavoriteMeals(prev=>{
          let updated = {...prev};
          if(favoriteMeals[mealId]){
            delete favoriteMeals[mealId]
          }
          else{
              updated[mealId] = meal
          }
          storeFavoriteMeals(updated.values())
          return updated;
        })
        setIsFavorite(!isFavorite);
    };

    return (
        <Button
            variant={isFavorite ? "destructive" : "outline"}
            onClick={toggleFavorite}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium"
        >
            {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
        </Button>
    );
};
