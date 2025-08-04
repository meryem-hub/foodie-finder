// src/pages/RecipesPage.jsx
import React, { useState, useEffect } from 'react';
import MealCard from '@/components/MealCard';
import { getMealsByFirstLetter } from '@/services/mealApi';

const RecipesPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await getMealsByFirstLetter('c');
        if (data) {
          setMeals(data);
        } else {
          setMeals([]);
        }
      } catch (err) {
        setError("Failed to fetch meals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading meals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No meals found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        All Recipes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;