import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Buttons/button";
import MealCard from "@/components/MealCard";
import CategoryFilter from "@/components/CategoryFilter";
import {
  getMealsByFirstLetter,
  getMealsByCategory,
} from "@/services/mealApi";
import { ArrowRight } from "lucide-react";

const Home = () => {
  // For featured recipes (first letter 'a')
  const [featuredMeals, setFeaturedMeals] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState(null);

  // For category filter
  const [selectedCategory, setSelectedCategory] = useState("Seafood");
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [errorCategory, setErrorCategory] = useState(null);

  useEffect(() => {
    const fetchFeaturedMeals = async () => {
      try {
        setLoadingFeatured(true);
        const data = await getMealsByFirstLetter("a");
        setFeaturedMeals(data || []);
        setErrorFeatured(null);
      } catch (err) {
        setErrorFeatured("Failed to fetch featured meals.");
        console.error(err);
      } finally {
        setLoadingFeatured(false);
      }
    };
    fetchFeaturedMeals();
  }, []);

  useEffect(() => {
    const fetchCategoryMeals = async () => {
      try {
        setLoadingCategory(true);
        const data = await getMealsByCategory(selectedCategory);
        setCategoryMeals(data || []);
        setErrorCategory(null);
      } catch (err) {
        setErrorCategory("Failed to fetch meals for category.");
        console.error(err);
      } finally {
        setLoadingCategory(false);
      }
    };
    fetchCategoryMeals();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-16">
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-[Dancing_Script] font-semibold text-[#FFD700] drop-shadow-sm">
            Featured Recipes
          </h1>

          <Link to="/recipes" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto gap-2 text-base py-5 px-6 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              See All Recipes
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {loadingFeatured ? (
          <div className="text-center py-12 text-lg text-gray-500">
            Loading featured recipes...
          </div>
        ) : errorFeatured ? (
          <p className="text-red-500 text-center">{errorFeatured}</p>
        ) : featuredMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredMeals.slice(0, 4).map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">
            No featured recipes found.
          </p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 ext-4xl font-[Dancing_Script] font-semibold text-[#FFD700] drop-shadow-sm">Browse by Category</h2>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {loadingCategory ? (
          <div className="text-center py-12 text-lg text-gray-500">
            Loading category meals...
          </div>
        ) : errorCategory ? (
          <p className="text-red-500 text-center">{errorCategory}</p>
        ) : categoryMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryMeals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">
            No meals found for this category.
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
