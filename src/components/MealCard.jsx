// src/components/MealCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Flag, Tag } from 'lucide-react';

const MealCard = ({ meal }) => {
  if (!meal) return null;

  const { idMeal, strMeal, strMealThumb, strArea, strCategory } = meal;

  return (
    <Card className="max-w-xs overflow-hidden rounded-xl border-2 border-yellow-500 transition-all duration-500 ease-in-out transform hover:shadow-lg hover:translate-y-[-5px] group">

      {/* Title Section */}
      <div className="p-4 flex flex-col items-start gap-1">
        <h3 className="text-xl font-bold truncate w-full text-gray-900 dark:text-white mb-2">
          {strMeal}
        </h3>
      </div>

      {/* Image Section */}
      <div className="px-4 pb-2">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="w-full h-72 object-cover rounded-xl transition-all duration-500"
        />
      </div>

      {/* Origin & Category Section with Icons */}
      <CardContent className="px-4 py-2">
        <div className="flex flex-wrap gap-2 text-sm font-medium">
          {strArea && (
            <span className="inline-flex items-center bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full px-3 py-1">
              <Flag className="mr-2 h-4 w-4" />
              {strArea}
            </span>
          )}
          {strCategory && (
            <span className="inline-flex items-center bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-100 rounded-full px-3 py-1">
              <Tag className="mr-2 h-4 w-4" />
              {strCategory}
            </span>
          )}
        </div>
      </CardContent>

      {/* Button Section */}
      <CardFooter className="p-4 pt-2">
        <Link to={`/meals/${idMeal}`} className="w-full">
          <Button className="w-full font-semibold text-white bg-gradient-to-r from-gray-800 via-gray-700 to-orange-500 hover:from-gray-700 hover:via-gray-600 hover:to-orange-400 transition-all duration-300">
            <ChefHat className="mr-2 h-4 w-4" />
            See Complete Recipe
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MealCard;