import { useMemo } from "react";
import MealCard from "./MealCard";

export const FavoritesList = ({ meals }) => {
    const favoriteMeals = useMemo(() => meals || [], [meals]);

    if (favoriteMeals.length === 0) {
        return (
            <p className="text-center text-muted-foreground">
                You haven't added any favorites yet.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6">
            {favoriteMeals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
            ))}
        </div>
    );
};
