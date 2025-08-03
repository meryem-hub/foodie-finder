import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MealCard from '@/components/MealCard';
import { getMealsByFirstLetter } from '@/services/mealApi';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await getMealsByFirstLetter('a');
        setMeals(data || []);
      } catch (err) {
        setError("Failed to fetch meals. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500 text-lg">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
<h1 className="text-4xl font-[Dancing_Script] font-semibold text-[#FFD700] drop-shadow-sm"> Featured Recipes
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

      {meals.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {meals.slice(0, 4).map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No featured recipes found</p>
        </div>
      )}
    </div>
  );
};

export default Home;