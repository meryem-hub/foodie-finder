import { createContext, useState, useEffect } from "react";
import { getMealsListById } from "@/services/mealApi";

export const FavoriteMealsContext = createContext({
    favoriteMeals: {},
    setFavoriteMeals: () => {},
    storeFavoriteMeals : ()=>{},
    loading : false,
    error : null,
});

export const FavoriteMealsContextProvider = ({ children }) => {
    const [favoriteMeals, setFavoriteMeals] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMeals = async (favoriteIds) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getMealsListById(favoriteIds);
            console.log("data", data)
            const favMeals = data.reduce((acc, meal) => {
                if (meal) {
                    console.log("meal id: ", meal.idMeal)
                    acc[meal.idMeal] = meal;
                }
                return acc;
            }, {});
            console.log("Fetched favorite meals:", favMeals);
            setFavoriteMeals(favMeals);
        } catch (err) {
            setError("Failed to fetch meals.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStoredFavoriteMeals = (favoriteMeals) => {
        localStorage.setItem("favorites", JSON.stringify(Object.keys(favoriteMeals)));
    };

    useEffect(() => {
        const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
        console.log("favoriteIds: ", favoriteIds)
        fetchMeals(favoriteIds);
    }, []);

    return (
        <FavoriteMealsContext.Provider
            value={{ favoriteMeals, setFavoriteMeals, updateStoredFavoriteMeals, loading, error }}
        >
            {children}
        </FavoriteMealsContext.Provider>
    );
};
