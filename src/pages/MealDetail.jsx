import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getMealById } from "@/services/mealApi";
import { Flag, Tag, ArrowLeft } from "lucide-react";
import { FavoriteButton } from "@/components/ui/Buttons/FavoriteButton";
import { ShareButton } from "@/components/ui/Buttons/ShareButton";
import IngredientsSection from "@/components/MealDetail/IngredientsSection";
import VideoSection from "@/components/MealDetail/VideoSection";
import InstructionsSection from "@/components/MealDetail/InstructionsSection";

import { getRandomMeal } from "@/services/mealApi";
import { Button } from "@/components/ui/Buttons/button";

const MealDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const query_params = new URLSearchParams(location.search);
  const random = query_params.get("random");

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeal = async (id) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching meal for id:", id);
      const data = await getMealById(id);
      console.log("Raw data from API:", data);

      // If the API returns { meals: [...] }, get the first meal
      const mealData = data?.meals ? data.meals[0] : data;

      if (mealData) {
        setMeal(mealData);
      } else {
        setMeal(null);
        setError("Meal not found.");
      }
    } catch (err) {
      console.error("Error fetching meal:", err);
      setError("Failed to fetch meal. Please try again later.");
      setMeal(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMeal(id);
    } else {
      setError("Invalid meal ID.");
      setLoading(false);
    }
  }, [id]);

  const handleRandomMeal = async () => {
    try {
      const random_meal = await getRandomMeal();
      console.log("Random meal YouTube URL:", random_meal?.strYoutube);
      if (random_meal?.idMeal) {
        navigate(`/meals/${random_meal.idMeal}?random=true`);
      } else {
        alert("Could not fetch a random meal. Please try again.");
      }
    } catch (err) {
      console.error("Failed to fetch random meal:", err);
      alert("Failed to fetch a random meal. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading meal...</p>
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

  if (!meal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400 text-center">No meal found.</p>
      </div>
    );
  }

  return (
    <main className="p-6 w-full">
      <div className="flex items-center justify-between">
        <Link
          to="/recipes"
          className="flex gap-1 w-fit text-yellow-500 py-1 px-2 rounded-md hover:bg-yellow-100 transition-colors"
        >
          <ArrowLeft className="w-4" /> Back
        </Link>

        {random && (
          <Button
            className="py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
            onClick={handleRandomMeal}
          >
            Try again
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-full">
          {/* Meal image */}
          <div>
            {meal.strMealThumb ? (
              <img
                src={meal.strMealThumb}
                alt={meal.strMealAlternate || meal.strMeal || "Meal image"}
                className="w-full object-cover rounded-lg border-4 border-yellow-500 shadow-lg"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg border-4 border-yellow-500 shadow-lg">
                <span className="text-gray-400 text-center">No image available</span>
              </div>
            )}
          </div>

          {/* Meal Detail Section */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold">
              {meal.strMeal ? meal.strMeal : "Meal Name Unavailable"}
            </h1>

            {/* Meal details */}
            <div className="flex flex-wrap gap-2 text-sm font-medium">
              {meal.strArea ? (
                <span className="inline-flex items-center bg-yellow-500 text-white rounded-sm px-3 py-1">
                  <Flag className="mr-2 h-4 w-4" />
                  {meal.strArea}
                </span>
              ) : (
                "Unavailable"
              )}
              {meal.strCategory ? (
                <span className="inline-flex items-center bg-gray-100 text-black rounded-sm px-3 py-1">
                  <Tag className="mr-2 h-4 w-4" />
                  {meal.strCategory}
                </span>
              ) : (
                "Unavailable"
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <FavoriteButton mealId={meal.idMeal} />
              <ShareButton />
            </div>

            <IngredientsSection meal={meal} />
          </div>
        </div>

        <VideoSection url={meal.strYoutube} />

        <InstructionsSection instructions={meal.strInstructions} />
      </div>
    </main>
  );
};

export default MealDetail;
