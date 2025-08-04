import React, { useEffect, useState } from "react";
import MealCard from "../components/MealCard";
import { Heart } from "lucide-react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const removeFavorite = (idMeal) => {
    const updated = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-center mb-9 gap-2">
        <Heart className="w-9 h-9 stroke-red-500 fill-red-500" />
      <h1 className="text-4xl font-extrabold text-center text-orange-500 ">
         My Favorite Meals
      </h1>
      </div>
      

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No favorite meals yet. Browse and add some!
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((meal) => (
            <div
              key={meal.idMeal}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <MealCard meal={meal} />
              <button
                onClick={() => removeFavorite(meal.idMeal)}
                className="absolute top-3 right-3 p-2 rounded-full   transition duration-200"
                title="Remove from favorites"
              >
                <Heart className="h-6 w-6 stroke-red-500 fill-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favorites;
