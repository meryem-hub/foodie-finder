import { useContext } from "react";
import { FavoritesList } from "@/components/FavoritesList";
import { Button } from "@/components/ui/Buttons/button";
import { FavoriteMealsContext } from "@/contexts/FavouriteMealsContext";

const FavoritesPage = () => {
    const {favoriteMeals, loading, error} = useContext(FavoriteMealsContext);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-pulse h-12 w-12 rounded-full bg-muted" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <p className="text-destructive text-lg">{error}</p>
                <Button onClick={window.location.reload}>Retry</Button>
            </div>
        );
    }

    const meals = Array.from(favoriteMeals.values())
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Your Favorite Meals</h1>
            <FavoritesList meals={meals} />
        </div>
    );
};

export default FavoritesPage;
