import React, { useEffect, useState } from 'react';
import { FavoritesList } from '@/components/FavoritesList';
import { getMealsByFirstLetter } from '@/services/mealApi';
import { Button } from '@/components/ui/Buttons/button';

const FavoritesPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await getMealsByFirstLetter("a");
        setMeals(data || []);
      } catch (err) {
        setError("Failed to fetch meals.");
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
        <div className="animate-pulse h-12 w-12 rounded-full bg-muted" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-destructive text-lg">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Favorite Meals</h1>
      <FavoritesList meals={meals} />
    </div>
  );
};

export default FavoritesPage;
