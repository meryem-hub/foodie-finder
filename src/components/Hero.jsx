import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Globe, Clock, Shuffle, Flag, Tag, Heart } from "lucide-react";
import { Button } from "@/components/ui/Buttons/button";
import heroImage from "../assets/images/image.png";

const getRandomMeal = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Failed to fetch random meal:", error);
    return null;
  }
};

const IngredientsSection = ({ meal }: { meal: any }) => {
  if (!meal) return null;
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
      <ul className="list-disc list-inside space-y-1">
        {ingredients.map((item, index) => (
          <li key={index}>
            <span className="font-semibold">{item.ingredient}</span> - {item.measure}
          </li>
        ))}
      </ul>
    </div>
  );
};

const VideoSection = ({ url }: { url?: string }) => {
  if (!url) return null;
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Video Instructions</h2>
      <div className="relative w-full pb-[30%]">
        <iframe
          className="absolute inset-0 w-full h-[78vh] rounded-lg"
          src={url.replace("watch?v=", "embed/")}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        ></iframe>
      </div>
    </div>
  );
};

const InstructionsSection = ({ instructions }: { instructions?: string }) => {
  if (!instructions) return null;
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Instructions</h2>
      <p className="whitespace-pre-line text-gray-700">{instructions}</p>
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meal, setMeal] = useState<any | null>(null);
  const [showMeal, setShowMeal] = useState(false);

  const handleSurpriseMeClick = async () => {
    setLoading(true);
    setError(null);
    setShowMeal(false);

    try {
      // Artificial delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const randomMeal = await getRandomMeal();
      if (randomMeal) {
        setMeal(randomMeal);
        setShowMeal(true);
        // Navigate to detailed page if needed:
        // navigate(`/meals/${randomMeal.idMeal}?random=true`);
      } else {
        setError("No random meal found. Please try again.");
      }
    } catch (err) {
      setError("Failed to fetch meal. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[84vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Delicious food background"
            className="w-900 h-[110vh] py-4 object-cover scale-105 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-800/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Let us pick your <span className="text-yellow-400">meal</span>
              <span className="text-white"> for today!</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Just tap and let the magic begin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                onClick={handleSurpriseMeClick}
                className="h-12 px-8 text-lg font-semibold text-white bg-gradient-to-r from-gray-800 via-gray-700 to-yellow-500 hover:from-gray-700 hover:via-gray-600 hover:to-yellow-400 transition-all duration-300"
                disabled={loading}
              >
                <Shuffle className="mr-2 h-5 w-5" />
                {loading ? "Surprising you..." : "Surprise Me!"}
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full"></div>
        </div>
      </section>

      {/* Surprise Meal Display */}
      {showMeal && (
        <main className="p-6 w-full my-8">
          {loading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <p>Loading meal...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-[300px] text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-full">
                <div>
                  {meal?.strMealThumb ? (
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal || "Meal image"}
                      className="w-full object-cover rounded-lg border-4 border-yellow-500 shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg border-4 border-yellow-500 shadow-lg">
                      <span className="text-gray-400 text-center">
                        No image available
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-6">
                  <h1 className="text-4xl font-bold">
                    {meal?.strMeal || "Meal Name Unavailable"}
                  </h1>

                  <div className="flex flex-wrap gap-2 text-sm font-medium">
                    {meal?.strArea && (
                      <span className="inline-flex items-center bg-yellow-500 text-white rounded-sm px-3 py-1">
                        <Flag className="mr-2 h-4 w-4" />
                        {meal.strArea}
                      </span>
                    )}
                    {meal?.strCategory && (
                      <span className="inline-flex items-center bg-gray-100 text-black rounded-sm px-3 py-1">
                        <Tag className="mr-2 h-4 w-4" />
                        {meal.strCategory}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button className="flex px-4 py-2 text-xs bg-white rounded-sm border-2 border-yellow-500 hover:bg-gray-100 transition-colors font-medium">
                      <Heart className="mr-2 h-4 w-4" />
                      Add to Favorites
                    </button>
                  </div>

                  <IngredientsSection meal={meal} />
                </div>
              </div>

              <VideoSection url={meal?.strYoutube} />
              <InstructionsSection instructions={meal?.strInstructions} />
            </div>
          )}
        </main>
      )}

      <section className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50">
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Explore a World of Flavors
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Browse our extensive collection of recipes from across the globe, find
            your next favorite dish, and cook with confidence using our
            easy-to-follow instructions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
            <Search className="w-14 h-14 text-yellow-500 mb-4" />
            <h3 className="text-3xl font-bold text-gray-800">1000+ Recipes</h3>
            <p className="text-gray-500 mt-2">from every corner of the world</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
            <Globe className="w-14 h-14 text-orange-500 mb-4" />
            <h3 className="text-3xl font-bold text-gray-800">25+ Countries</h3>
            <p className="text-gray-500 mt-2">savor international cuisine</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
            <Clock className="w-14 h-14 text-red-500 mb-4" />
            <h3 className="text-3xl font-bold text-gray-800">Step-by-step</h3>
            <p className="text-gray-500 mt-2">detailed, easy instructions</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
