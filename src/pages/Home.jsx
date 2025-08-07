import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Buttons/button";
import MealCard from "@/components/MealCard";
import CategoryFilter from "@/components/CategoryFilter";
import { getMealsByFirstLetter, getMealsByCategory, getMealsByCountry, getMealsByIngredient, getMealsByName } from "@/services/mealApi";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  const [featuredMeals, setFeaturedMeals] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("Seafood");
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [errorCategory, setErrorCategory] = useState(null);

  useEffect(() => {
    const fetchFeaturedMeals = async () => {
  setLoadingFeatured(true);
  setErrorFeatured(null);

  try {
    let data = [];

    if (searchTerm.trim()) {
      data = await getMealsByCategory(searchTerm.trim());

      if (!data || data.length === 0) {
        data = await getMealsByCountry(searchTerm.trim());
      }

      if (!data || data.length === 0) {
        data = await getMealsByName(searchTerm.trim());
      }

      if (!data || data.length === 0) {
        data = await getMealsByIngredient(searchTerm.trim());
      }
    } else {
      data = await getMealsByFirstLetter("a");
    }

    setFeaturedMeals(data || []);
  } catch {
    setErrorFeatured("Failed to fetch featured meals.");
  } finally {
    setLoadingFeatured(false);
  }
};

    fetchFeaturedMeals();
  }, [searchTerm]);

  useEffect(() => {
    const fetchCategoryMeals = async () => {
      setLoadingCategory(true);
      setErrorCategory(null);
      try {
        const data = await getMealsByCategory(selectedCategory);
        setCategoryMeals(data || []);
      } catch  {
        setErrorCategory("Failed to fetch meals for category.");
      } finally {
        setLoadingCategory(false);
      }
    };
    fetchCategoryMeals();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-16">
      {/* Featured Recipes Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-[Dancing_Script] font-semibold text-[#FFD700] drop-shadow-sm">
            Featured Recipes
          </h1>
          <Link to="/recipes" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto gap-2 text-base py-5 px-6">
              See All Recipes
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {loadingFeatured ? (
          <p className="text-center py-12 text-lg text-gray-500">Loading featured recipes...</p>
        ) : errorFeatured ? (
          <p className="text-red-500 text-center">{errorFeatured}</p>
        ) : featuredMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredMeals.slice(0, 4).map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">No featured recipes found.</p>
        )}
      </section>

      {/* Browse by Category Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-[#FFD700] font-[Dancing_Script] drop-shadow-sm">
          Browse by Category
        </h2>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {loadingCategory ? (
          <p className="text-center py-12 text-lg text-gray-500">Loading category meals...</p>
        ) : errorCategory ? (
          <p className="text-red-500 text-center">{errorCategory}</p>
        ) : categoryMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryMeals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">No meals found for this category.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
