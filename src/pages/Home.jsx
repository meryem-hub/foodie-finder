import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MealCard from "@/components/MealCard";
import { getMealsByFirstLetter, getMealsByCategory, getMealsByCountry } from "@/services/mealApi";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


useEffect(() => {
  const fetchMeals = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;

      if (searchTerm.trim()) {
        // Try category first
        data = await getMealsByCategory(searchTerm.trim());

        // If no data, try country
        if (!data || data.length === 0) {
          data = await getMealsByCountry(searchTerm.trim());
        }
      } else {
        data = await getMealsByFirstLetter("a");
      }

      setMeals(data || []);
    } catch {
      setError("Failed to fetch meals.");
    } finally {
      setLoading(false);
    }
  };
  fetchMeals();
}, [searchTerm]);


  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-[Dancing_Script] font-semibold text-[#FFD700] drop-shadow-sm">
          Featured Recipes
        </h1>

        <Link to="/recipes" className="w-full sm:w-auto">
          <Button variant="outline" className="gap-2 text-base py-5 px-6">
            See All Recipes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {meals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No meals found.</p>
      )}
    </div>
  );
};

export default Home;
