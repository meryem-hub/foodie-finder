import { createContext, useState, useEffect } from "react";

export const FavoriteMealsContext = createContext({
    favoriteMeals: {},
    setFavoriteMeals: () => {},
    storeFavoriteMeals : ()=>{},
    loading : false,
    error : null,
});

export const FavoriteMealsProvider = ({ children }) => {
    const [favoriteMeals, setFavoriteMeals] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMeals = async (favoriteIds) => {
        try {
            const data = await getMealsListById(favoriteIds);
            const favMeals = data.reduce((acc, meal) => {
                if (meal) {
                    acc[meal.isMeal] = meal;
                }
                return acc;
            }, {});
            setFavoriteMeals(favMeals);
        } catch (err) {
            setError("Failed to fetch meals.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    
    const storeFavoriteMeals = (favoriteMeals) => {
        localStorage.setItem("favorites", JSON.stringify(favoriteMeals));
    };

    useEffect(() => {
        const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
        fetchMeals(favoriteIds);
    }, []);

    return (
        <FavoriteMealsContext.Provider
            value={{ favoriteMeals, setFavoriteMeals, storeFavoriteMeals, loading, error }}
        >
            {children}
        </FavoriteMealsContext.Provider>
    );
};
