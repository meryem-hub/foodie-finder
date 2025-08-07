import { useEffect, useState, useContext } from "react";
import { Button } from "@/components/ui/Buttons/button";

import { FavoriteMealsContext } from "@/contexts/FavouriteMealsContext";

export const FavoriteButton = ({ meal }) => {
    const mealId = meal.idMeal;

    const { favoriteMeals, setFavoriteMeals, updateStoredFavoriteMeals } =
        useContext(FavoriteMealsContext);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        console.log("favoriteMeals:", favoriteMeals);
        setIsFavorite(Boolean(favoriteMeals[mealId]));
    }, [mealId, favoriteMeals]);

    const toggleFavorite = () => {
        setFavoriteMeals(prev=>{
          let updated = {...prev};
          if(updated[mealId]){
            delete updated[mealId]
          }
          else{
              updated[mealId] = meal
          }
          updateStoredFavoriteMeals(updated)
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
